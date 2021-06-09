const Grammar = require("../Grammar");
var Utils = require("../utils");
const Production = require("../Production");

var { serializeObject, assertSymbolString, filterRhs } = Utils;

class LLGrammar extends Grammar {
  table = {};

  constructor(cfg) {
    super(cfg);
  }

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

  eliminateLeftRecursive(getSlashSymbol) {
    let { productions } = this;

    // eliminate left recursive
    const nonTerminals = {};
    for (const p of productions) {
      nonTerminals[p.symbol] = 1;
    }
    const nonTerminalsList = Object.keys(nonTerminals);
    const n = nonTerminalsList.length;
    for (let i = 0; i < n - 1; i++) {
      let newProductionsOuter = [...productions];
      const leftSymbol = nonTerminalsList[i];
      for (let j = i + 1; j < n; j++) {
        const rightSymbol = nonTerminalsList[j];
        let newProductions = [];
        let changed;
        for (const p of newProductionsOuter) {
          if (p.symbol === leftSymbol && p.rhs[0] === rightSymbol) {
            for (const p2 of newProductionsOuter) {
              if (p2.symbol === rightSymbol) {
                changed = true;
                newProductions.push(
                  new Production({
                    symbol: p.symbol,
                    rhs: [...p2.rhs, ...p.rhs.slice(1)]
                  })
                );
              }
            }
          } else {
            newProductions.push(p);
          }
        }
        if (changed) {
          newProductionsOuter = newProductions;
        }
      }
      let needReplace = false;
      let newProductions2 = [];
      const deletedProductions = new Map();
      for (const p of newProductionsOuter) {
        if (p.symbol === p.rhs[0]) {
          needReplace = true;

          const slashSymbol = getSlashSymbol(p.symbol);

          for (const p2 of newProductionsOuter) {
            if (p === p2) {
              newProductions2.push(
                new Production({
                  symbol: slashSymbol,
                  rhs: [...p.rhs.slice(1), slashSymbol]
                })
              );
              newProductions2.push(
                new Production({
                  symbol: slashSymbol,
                  rhs: []
                })
              );
            } else if (p2.symbol === p.symbol && p2.symbol !== p2.rhs[0]) {
              deletedProductions.set(p2, 1);
              newProductions2.push(
                new Production({
                  symbol: p2.symbol,
                  rhs: [...p2.rhs, slashSymbol]
                })
              );
            }
          }
        } else {
          newProductions2.push(p);
        }
      }
      if (needReplace) {
        this.productions = productions = newProductions2.filter(
          p => !deletedProductions.has(p)
        );
      }
    }
  }

  extractCommonPrefix(getSlashSymbol) {
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
        const ret = this.extractProductionCommonPrefix(ps, getSlashSymbol);
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
    }
  }

  buildProductions() {
    const symbolSlashMap = {};

    function getSlashSymbol(symbol) {
      let n = 1;
      if (symbolSlashMap[symbol]) {
        n = ++symbolSlashMap[symbol];
      } else {
        symbolSlashMap[symbol] = n;
      }
      return symbol + new Array(n + 1).join("|");
    }

    this.eliminateLeftRecursive(getSlashSymbol);
    this.extractCommonPrefix(getSlashSymbol);
    super.buildProductions();
  }

  extractProductionCommonPrefix(ps, getSlashSymbol) {
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
            const newSymbol = getSlashSymbol(left.symbol);
            newPs.splice(
              i,
              0,
              new Production({
                symbol: left.symbol,
                rhs: [
                  ...left.rhs.slice(
                    0,
                    left.indexAtStringIndex(comminLeftIndex)
                  ),
                  newSymbol
                ]
              }),
              new Production({
                symbol: newSymbol,
                rhs: left.rhs.slice(left.indexAtStringIndex(comminLeftIndex))
              }),
              new Production({
                symbol: newSymbol,
                rhs: right.rhs.slice(right.indexAtStringIndex(comminLeftIndex))
              })
            );
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

    toJSON() {
      const ret = {};
      for (const k of Object.keys(this)) {
        if (k !== "parent") {
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

  const endToken = "kison-end-" + Date.now();

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

  function getOriginalSymbol(s) {
    return lexer.mapReverseSymbol(s);
  }

  options = options || {};
  let error;
  var { onErrorRecovery, onAction = noop } = options;
  var self = this;
  var {
    lexer,
    operatorPriorityMap,
    rightOperatorMap,
    table,
    productions
  } = self;
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

  // const operatorPriorityStack = [-Infinity];

  // function lastOperatorPriority(n) {
  //   n = n || 1;
  //   return operatorPriorityStack[operatorPriorityStack.length - n];
  // }

  let production;

  while (1) {
    topSymbol = peekStack(symbolStack);

    while (topSymbol === endToken) {
      const ast = astStack.pop();
      if (ast.symbol && isExtraSymbol(ast)) {
        const topAst = peekStack(astStack);
        topAst.children.pop();
        topAst.children.push(...ast.children);
      }
      symbolStack.pop();
      topSymbol = peekStack(symbolStack);
    }

    if (typeof topSymbol === "string") {
      currentToken = token = token || lexer.lex();

      // const currentPriority = operatorPriorityMap && operatorPriorityMap[token];
      // if (currentPriority) {
      //   operatorPriorityStack.push(currentPriority);
      // }

      if (topSymbol === token) {
        symbolStack.pop();
        peekStack(astStack).addChild(new AstNode(lexer.toJSON()));
        token = null;
      } else if ((next = getTableVal(topSymbol, token)) !== undefined) {
        let n = next[0];
        // if (next.length > 1) {
        //   if (currentPriority) {
        //     const reduceIndex = next[1];
        //     const shiftIndex = next[0];
        //     const lastPriority = lastOperatorPriority(2);
        //     if (currentPriority < lastPriority || (lastPriority === currentPriority && !rightOperatorMap[token])) {
        //       n = reduceIndex;
        //     } else {
        //       n = shiftIndex;
        //     }
        //   } else {
        //     const e = [`Conflict ${lexer.mapReverseSymbol(symbol)} : ${lexer.mapReverseSymbol(f)} ->`];
        //     for (const index of next) {
        //       e.push(productions[index].toString(undefined, lexer));
        //     }
        //     throw new Error(e.join('\n'));
        //   }
        // }
        const newAst = new AstNode({
          symbol: getOriginalSymbol(topSymbol),
          children: []
        });
        peekStack(astStack).addChild(newAst);
        astStack.push(newAst);
        symbolStack.pop();
        production = productions[n];
        symbolStack.push.apply(
          symbolStack,
          getProductionRhs(production)
            .concat(endToken)
            .reverse()
        );
      } else {
        if (token === lexer.mapEndSymbol()) {
          error = {
            lexer,
            errorMessage: getError(),
            expected: getExpected(),
            symbol: lexer.mapReverseSymbol(topSymbol),
            token: null
          };
          if (onErrorRecovery) {
            onErrorRecovery(error);
          } else {
            closeAstWhenError();
          }
          break;
        } else {
          error = {
            lexer,
            errorMessage: getError(),
            expected: getExpected(),
            symbol: lexer.mapReverseSymbol(topSymbol),
            token
          };
          if (onErrorRecovery) {
            const recovery = onErrorRecovery(error) || {};
            const { action } = recovery;
            if (!action || action === "del") {
              lexer.matched = lexer.matched.slice(0, -lexer.match.length);
              token = null;
            } else if (action === "add") {
              token = lexer.mapSymbol(recovery.token);
              lexer.text = recovery.content || "<?>";
              lexer.matched += lexer.text;
            }
          } else {
            closeAstWhenError();
            return {
              ast: astStack[0],
              error
            };
          }
        }
      }
    }

    topSymbol = peekStack(symbolStack);

    while (topSymbol && typeof topSymbol !== "string") {
      onAction({
        lexer,
        action: topSymbol
      });
      symbolStack.pop();
      topSymbol = peekStack(symbolStack);
    }

    if (!symbolStack.length) {
      break;
    }
  }

  if (currentToken !== lexer.mapEndSymbol()) {
    error = {
      lexer,
      errorMessage: getError(),
      symbol: null,
      token: currentToken
    };
    if (onErrorRecovery) {
      onErrorRecovery(error);
    } else if (!error) {
      closeAstWhenError();
    }
  }

  const ast = astStack[0] && astStack[0].children && astStack[0].children[0];

  if (ast) {
    delete ast.parent;
  }

  return {
    ast,
    errorNode,
    error
  };
}

module.exports = LLGrammar;
