const Grammar = require("../Grammar");
var Utils = require("../utils");
const Production = require("../Production");

var { serializeObject, assertSymbolString, filterRhs } = Utils;

const productionEndToken = "kison-end-" + Date.now();

class LLGrammar extends Grammar {
  table = {};

  findFollows(symbol) {
    assertSymbolString(symbol);
    var self = this;
    var nonTerminals = self.nonTerminals;
    if (!nonTerminals[symbol]) {
      return { [symbol]: 1 };
      // non terminal
    } else {
      return nonTerminals[symbol].follows;
    }
  }

  buildFollows() {
    var self = this;
    const { productions, lexer } = self;
    var nonTerminals = self.nonTerminals;
    var cont = true;
    var nonTerminal, symbol;
    var mappedStartTag = productions[0].symbol;
    var mappedEndTag = lexer.mapEndSymbol();
    nonTerminals[mappedStartTag].addFollows({
      [mappedEndTag]: 1
    });
    // loop until no further changes have been made
    while (cont) {
      cont = false;
      for (symbol in nonTerminals) {
        nonTerminal = nonTerminals[symbol];
        for (const p of productions) {
          let { rhs, symbol: leftSymbol } = p;
          rhs = filterRhs(rhs);
          const index = rhs.indexOf(symbol);
          if (index !== -1) {
            if (index !== rhs.length - 1) {
              const nextSymbols = rhs.slice(index + 1);
              cont =
                cont || nonTerminal.addFollows(this.findFirst(nextSymbols));
              if (this.isNullable(nextSymbols)) {
                cont =
                  cont || nonTerminal.addFollows(this.findFollows(leftSymbol));
              }
            } else {
              cont =
                cont || nonTerminal.addFollows(this.findFollows(leftSymbol));
            }
          }
        }
      }
    }
  }

  eliminateLeftRecursive(getSuffixSymbol) {
    let { productions } = this;

    // eliminate left recursive
    const nonTerminals = {};
    for (const p of productions) {
      nonTerminals[p.symbol] = 1;
    }
    const nonTerminalsList = Object.keys(nonTerminals);
    const n = nonTerminalsList.length;
    let needReplace = true;
    // direct left recursive
    // TODO: support indirect recursive
    while (needReplace) {
      needReplace = false;
      let newProductions2 = [];
      let emptySlashSet = new Set();
      const deletedMap = new Set();
      const slashArgumentMap = new Map();
      const l = productions.length;
      for (let i = 0; i < l; i++) {
        const p = productions[i];
        if (p.symbol === p.rhs[0]) {
          needReplace = true;
          const slashSymbol = getSuffixSymbol(p.symbol);
          newProductions2.push(
            new Production({
              symbol: slashSymbol,
              // instruct ast processor
              rhs: [...p.rhs.slice(1), { s: 1 }, slashSymbol]
            })
          );
          emptySlashSet.add(slashSymbol);
          for (let j = 0; j < l; j++) {
            const p2 = productions[j];
            if (p2.symbol === p.symbol && p2.symbol !== p2.rhs[0]) {
              if (slashArgumentMap.get(slashSymbol) === p2) {
                continue;
              }
              slashArgumentMap.set(slashSymbol, p2);
              newProductions2.push(
                new Production({
                  symbol: p.symbol,
                  label: p.label,
                  // instruct ast processor
                  rhs: [...p2.rhs, { s: 1 }, slashSymbol]
                })
              );
              deletedMap.add(p2);
            }
          }
        } else {
          newProductions2.push(p);
        }
      }
      if (needReplace) {
        this.productions = productions = newProductions2.filter(
          p => !deletedMap.has(p)
        );
        for (const slashSymbol of emptySlashSet.values()) {
          productions.push(
            new Production({
              symbol: slashSymbol,
              rhs: []
            })
          );
        }
      }
    }
  }

  extractCommonPrefix(getPrefixSymbol) {
    let { productions } = this;

    let needReplace;
    // extract common prefix
    const groupedProductions = {};

    for (const p of productions) {
      const ps = (groupedProductions[p.symbol] =
        groupedProductions[p.symbol] || []);
      ps.push(p);
    }

    for (const symbol of Object.keys(groupedProductions)) {
      const ps = groupedProductions[symbol];
      if (ps.length > 1) {
        const ret = this.extractProductionCommonPrefix(ps, getPrefixSymbol);
        if (ret !== ps) {
          needReplace = true;
          groupedProductions[symbol] = ret;
        }
      }
    }

    if (needReplace) {
      productions = this.productions = [];
      for (const symbol of Object.keys(groupedProductions)) {
        productions.push(...groupedProductions[symbol]);
      }
      this.removeDuplicate(productions);
    }
  }

  removeDuplicate(newPs) {
    const nonTerminals = {};
    newPs.forEach(p => (nonTerminals[p.symbol] = 1));
    let cont = true;
    while (cont) {
      cont = false;
      for (let i = newPs.length - 1; i--; i >= 0) {
        const current = newPs[i];
        if (current.rhsEqSymbol(nonTerminals)) {
          newPs.splice(i, 1);
          newPs.forEach(p => p.replaceSymbol(current.symbol, current.rhs[0]));
          cont = true;
        }
      }
    }
  }

  buildProductions() {
    const symbolSlashMap = {};

    function getSuffixSymbol(symbol) {
      let n = 1;
      if (symbolSlashMap[symbol]) {
        n = symbolSlashMap[symbol];
      } else {
        symbolSlashMap[symbol] = n;
      }
      return symbol + new Array(n + 1).join("_");
    }

    const prefixSymbolSlashMap = {};

    function getPrefixSymbol(symbol) {
      let n = 1;
      if (prefixSymbolSlashMap[symbol]) {
        n = prefixSymbolSlashMap[symbol];
      } else {
        prefixSymbolSlashMap[symbol] = n;
      }
      return new Array(n + 1).join("_") + symbol;
    }

    const firstProduction = this.productions[0];
    this.productions.splice(0, 1);
    this.eliminateLeftRecursive(getSuffixSymbol);
    this.extractCommonPrefix(getPrefixSymbol);
    this.productions.splice(0, 0, firstProduction);
    super.buildProductions();
  }

  extractProductionCommonPrefix(ps, getPrefixSymbol) {
    let cont = true;
    let newPs = [...ps];
    let changed;
    while (cont) {
      cont = false;

      for (let i = 0; i < newPs.length - 1; i++) {
        for (let j = i + 1; j < newPs.length; j++) {
          const left = newPs[i];
          const right = newPs[j];
          let comminLeftIndex = left.commonLeftIndex(right);
          if (comminLeftIndex) {
            changed = true;
            newPs.splice(j, 1);
            newPs.splice(i, 1);
            const newSymbol = getPrefixSymbol(left.symbol);
            const one = new Production({
              symbol: left.symbol,
              label: left.label,
              rhs: [
                ...left.rhs.slice(0, left.indexAtStringIndex(comminLeftIndex)),
                newSymbol
              ]
            });
            const two = new Production({
              symbol: newSymbol,
              rhs: left.rhs.slice(
                left.indexAtStringIndex(comminLeftIndex, true)
              )
            });
            const three = new Production({
              symbol: newSymbol,
              rhs: right.rhs.slice(
                right.indexAtStringIndex(comminLeftIndex, true)
              )
            });
            newPs.splice(i, 0, one, two, three);
            cont = true;
            break;
          }
        }

        if (cont) {
          break;
        }
      }
    }
    if (changed) {
      this.removeDuplicate(newPs);
    }
    return changed ? newPs : ps;
  }

  build() {
    super.build();
    this.buildFollows();
    this.buildTable();
  }

  setTable(symbol, terminal, index) {
    const { lexer, table, productions } = this;
    table[symbol] = table[symbol] || {};
    const original = (table[symbol][terminal] = table[symbol][terminal] || []);
    original.push(index);
    original.sort();
    if (original.length > 1) {
      const e = [
        `Conflict: ${lexer.mapReverseSymbol(symbol)} , ${lexer.mapReverseSymbol(
          terminal
        )} ->`
      ];
      for (const i of original) {
        e.push(productions[i].toString(undefined, lexer));
      }
      console.warn(e.join("\n"));
    }
  }

  getTableVal(row, col) {
    const { table } = this;
    return table[row] && table[row][col];
  }

  buildTable() {
    const { productions, lexer } = this;
    productions.forEach((p, index) => {
      const { symbol, rhs } = p;
      const firsts = this.findFirst(rhs);
      for (const terminal of Object.keys(firsts)) {
        this.setTable(symbol, terminal, index);
      }
      if (this.isNullable(rhs)) {
        const follows = this.findFollows(symbol);
        for (const terminal of Object.keys(follows)) {
          this.setTable(symbol, terminal, index);
        }
      }
    });
  }

  visualizeTable() {
    const ret = [];
    const { table, productions } = this;
    for (const nonTerminal of Object.keys(table)) {
      const col = table[nonTerminal];
      if (col) {
        for (const terminal of Object.keys(col)) {
          const ps = col[terminal];
          if (ps !== undefined) {
            for (const p of ps) {
              const production = productions[p];
              ret.push(
                `${nonTerminal} ${terminal} => ${
                  production.symbol
                } -> ${filterRhs(production.rhs).join(", ") || "EMPTY"}`
              );
            }
          }
        }
      }
    }
    return ret.join("\n");
  }

  genCodeInternal(code) {
    if (this.operatorPriorityMap) {
      code.push(
        `parser.operatorPriorityMap = ${JSON.stringify(
          this.operatorPriorityMap
        )};`
      );
      code.push(
        `parser.rightOperatorMap = ${JSON.stringify(this.rightOperatorMap)};`
      );
    }
    code.push(
      "const productionEndToken = " + JSON.stringify(productionEndToken) + ";"
    );
    code.push("parser.table = " + serializeObject(this.table) + ";");
    code.push("parser.parse = " + parse.toString() + ";");
    return code.join("\n");
  }
}

function parse(input, options) {
  class AstNode {
    constructor(cfg) {
      Object.assign(this, cfg);
    }

    addChild(c) {
      this.addChildren([c]);
    }

    addChildren(cs) {
      this.children.push(...cs);
      for (const c of cs) {
        c.parent = this;
      }
    }

    setChildren(cs) {
      this.children = cs;
      for (const c of cs) {
        c.parent = this;
      }
    }

    toJSON() {
      const ret = {};
      for (const k of Object.keys(this)) {
        if (k !== "parent" && k !== "t") {
          ret[k] = this[k];
        }
      }
      return ret;
    }
  }

  function isExtraSymbol(ast) {
    return ast.children && !ast.children.length;
    // const { children } = ast;
    // if (children.length <= 1) {
    //   return true;
    // }
    // // endsWith _ is extra symbol: add_
    // const s = ast.symbol;
    // const o = lexer.mapReverseSymbol(s);
    // if (o.charAt(o.length - 1) === '_') {
    //   return true;
    // }
    // compress level
    return false;
  }

  function peekStack(stack, n) {
    n = n || 1;
    return stack[stack.length - n];
  }

  function getTableVal(row, col) {
    return table[row] && table[row][col];
  }

  function noop() {}

  function getProductionSymbol(p) {
    return p.symbol || p[0];
  }

  function getProductionRhs(p) {
    return p.rhs || p[1];
  }

  function getProductionLabel(p) {
    return p.label || p[3];
  }

  function getOriginalSymbol(s) {
    return lexer.mapReverseSymbol(s);
  }

  function isSuffixSymbol(s) {
    return s.charAt(s.length - 1) === "_";
  }

  function isPrefixSymbol(s) {
    return s.charAt(0) === "_";
  }

  options = options || {};
  let error;
  var { onErrorRecovery, onAction = noop } = options;
  var self = this;
  var { lexer, table, productions } = self;
  var symbolStack = [getProductionSymbol(productions[0])];
  const astStack = [
    new AstNode({
      children: []
    })
  ];
  lexer.resetInput(input);
  let token;
  let next;
  let currentToken;

  function getError() {
    const expected = getExpected();
    return (
      "syntax error at line " +
      lexer.lineNumber +
      ":\n" +
      lexer.showDebugInfo() +
      "\n" +
      (expected.length ? "expect " + expected.join(", ") : "")
    );
  }

  let topSymbol;

  let errorNode;

  function getExpected() {
    const ret = (table[topSymbol] && Object.keys(table[topSymbol])) || [];
    return ret.map(r => lexer.mapReverseSymbol(r));
  }

  function closeAstWhenError() {
    errorNode = new AstNode({
      error
    });
    peekStack(astStack).addChild(errorNode);
    while (astStack.length !== 1) {
      const ast = astStack.pop();
      if (ast.symbol && isExtraSymbol(ast)) {
        const topAst = peekStack(astStack);
        topAst.children.pop();
        topAst.addChildren(ast.children);
      }
    }
  }

  function replaceStackTopChild(ast) {
    const topAst = peekStack(astStack);
    topAst.children.pop();
    topAst.children.push(...ast.children);
  }

  let production;

  while (1) {
    topSymbol = peekStack(symbolStack);

    if (!topSymbol) {
      break;
    }

    while (topSymbol === productionEndToken || topSymbol.s) {
      if (topSymbol.s) {
        let ast = astStack.pop();
        const stackTop = peekStack(astStack);
        const wrap = new AstNode({
          symbol: ast.symbol,
          children: [ast],
          label: ast.label
        });
        const topChildren = stackTop.children;
        topChildren[topChildren.length - 1] = wrap;
        astStack.push(wrap);
      } else {
        let ast = astStack.pop();
        if (ast.symbol && isExtraSymbol(ast)) {
          replaceStackTopChild(ast);
        }
      }
      symbolStack.pop();
      topSymbol = peekStack(symbolStack);
      if (!topSymbol) {
        break;
      }
    }

    if (typeof topSymbol === "string") {
      if (!token) {
        token = lexer.lex();
      }

      currentToken = token;

      if (topSymbol === token.t) {
        symbolStack.pop();
        peekStack(astStack).addChild(new AstNode(token));
        token = null;
      } else if ((next = getTableVal(topSymbol, token.t)) !== undefined) {
        let n = next[0];

        symbolStack.pop();
        production = productions[n];

        if (isPrefixSymbol(topSymbol) || isSuffixSymbol(topSymbol)) {
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production)
              .concat()
              .reverse()
          );
        } else {
          const newAst = new AstNode({
            symbol: getOriginalSymbol(topSymbol),
            label: getProductionLabel(production),
            children: []
          });
          peekStack(astStack).addChild(newAst);
          astStack.push(newAst);
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production)
              .concat(productionEndToken)
              .reverse()
          );
        }
      } else {
        error = {
          errorMessage: getError(),
          expected: getExpected(),
          symbol: lexer.mapReverseSymbol(topSymbol),
          lexer: token
        };
        if (onErrorRecovery) {
          const recommendedAction = {};
          const nextToken = lexer.peek();

          // should delete
          if (
            topSymbol === nextToken.t ||
            getTableVal(topSymbol, nextToken.t) !== undefined
          ) {
            recommendedAction.action = "del";
          } else if (error.expected.length) {
            recommendedAction.action = "add";
          }

          const recovery = onErrorRecovery(error, recommendedAction) || {};
          const { action } = recovery;

          if (!action) {
            closeAstWhenError();
            break;
          }

          if (action === "del") {
            error.recovery = true;
            token = null;
          } else if (action === "add") {
            error.recovery = true;
            token = {
              ...token,
              token: recovery.token,
              text: recovery.text,
              t: lexer.mapSymbol(recovery.token)
            };
          }
        } else {
          closeAstWhenError();
          break;
        }
      }
    }

    topSymbol = peekStack(symbolStack);

    while (topSymbol && typeof topSymbol === "function") {
      onAction({
        lexer: currentToken,
        action: topSymbol
      });
      symbolStack.pop();
      topSymbol = peekStack(symbolStack);
    }

    if (!symbolStack.length) {
      break;
    }
  }

  if (!error && currentToken.t !== lexer.mapEndSymbol()) {
    error = "parse end error";
    closeAstWhenError();
  }

  const ast = astStack[0] && astStack[0].children && astStack[0].children[0];

  if (ast) {
    delete ast.parent;
  }

  function cleanAst(ast) {
    if (!ast.children) {
      return ast;
    }
    if (ast.children.length === 1) {
      const child = ast.children[0];
      if (ast.label && child.label && ast.label === child.label) {
        ast.setChildren(child.children);
        cleanAst(ast);
      } else {
        cleanAst(child);
      }
    } else {
      for (const c of ast.children) {
        cleanAst(c);
      }
    }
    return ast;
  }

  return {
    ast: cleanAst(ast),
    // ast,
    errorNode,
    error
  };
}

module.exports = LLGrammar;
