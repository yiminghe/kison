// @ts-check

const Grammar = require('../Grammar');
var Utils = require('../utils');
const Production = require('../Production');
const Lexer = require('../Lexer');

const { serializeObject, assertSymbolString, filterRhs } = Utils;

// placeholder
const {
  productionSkipAstNodeSet,
  productionAddAstNodeFlag,
  productionEndFlag,
  parser,
} = require('../data');

class AstNode {
  children = [];
  symbol = 'a';
  label = 'a';
  parent = null;
  type = '';
  constructor(a) {}
}

const ParserCode = `
class AstNode {
  constructor(cfg) {
    Object.assign(this, cfg);
    if (cfg.children) {
      this.setChildren(cfg.children);
    }
  }

  addChild(c) {
    this.addChildren([c]);
  }

  addChildren(cs) {
    this.children.push(...cs);
    this.setChildren(this.children);
  }

  setChildren(cs) {
    if (!cs.length) {
      this.children = [];
      return;
    }
    const first = cs[0];
    const last = cs[cs.length - 1];
    this.start = first.start;
    this.end = last.end;
    this.firstLine = first.firstLine;
    this.lastLine = last.lastLine;
    this.firstColumn = first.firstColumn;
    this.lastColumn = last.lastColumn;
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
`;

function isAddAstNodeFlag(t) {
  return t === productionAddAstNodeFlag;
}

function isProductionEndFlag(t) {
  return t === productionEndFlag;
}

function inProductions(productions, production) {
  for (const p of productions) {
    if (p.equals(production)) {
      return true;
    }
  }
  return false;
}

function addToProductions(productions, production) {
  if (inProductions(productions, production)) {
    return;
  }
  productions.push(production);
}

class LLGrammar extends Grammar {
  table = {};

  findFollows(symbol) {
    assertSymbolString(symbol);
    var { nonTerminals } = this;
    if (!nonTerminals[symbol]) {
      return { [symbol]: 1 };
      // non terminal
    } else {
      return nonTerminals[symbol].follows;
    }
  }

  buildFollows() {
    const { productions, nonTerminals } = this;
    var cont = true;
    var nonTerminal, symbol;
    var mappedStartTag = productions[0].symbol;
    var mappedEndTag = Lexer.STATIC.EOF_TOKEN;
    nonTerminals[mappedStartTag].addFollows({
      [mappedEndTag]: 1,
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
                nonTerminal.addFollows(this.findFirst(nextSymbols)) || cont;
              if (this.isNullable(nextSymbols)) {
                cont =
                  nonTerminal.addFollows(this.findFollows(leftSymbol)) || cont;
              }
            } else {
              cont =
                nonTerminal.addFollows(this.findFollows(leftSymbol)) || cont;
            }
          }
        }
      }
    }
  }

  extractCommonPrefix() {
    const prefixSymbolSlashMap = {};

    function getPrefixSymbol(symbol) {
      let n = 1;
      if (prefixSymbolSlashMap[symbol]) {
        n = ++prefixSymbolSlashMap[symbol];
      } else {
        prefixSymbolSlashMap[symbol] = n;
      }
      return '_' + n + '(' + symbol + ')';
    }

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
      this.productions = this.removeDuplicate(productions);
    }
  }

  removeDuplicate(newPs) {
    return newPs;
    // TODO: optimize
    // const nonTerminals = {};
    // newPs.forEach(p => (nonTerminals[p.symbol] = 1));
    // let cont = true;
    // while (cont) {
    //   cont = false;
    //   for (let i = newPs.length - 1; i--; i >= 0) {
    //     const current = newPs[i];
    //     if (current.rhsEqSymbol(nonTerminals)) {
    //       newPs.splice(i, 1);
    //       newPs.forEach(p => p.replaceSymbol(current.symbol, current.rhs[0]));
    //       cont = true;
    //     }
    //   }
    // }
    // return newPs
  }

  expandProductionsInternal() {
    this.expandOptionalSymbol();
    this.expandOneOrMoreSymbol();
    this.expandZeroOrMoreSymbol();
    this.expandProductionPriority();
  }

  buildProductions() {
    const firstProduction = this.productions[0];
    this.productions.splice(0, 1);
    this.eliminateLeftRecursive();
    this.extractCommonPrefix();
    this.productions.splice(0, 0, firstProduction);
  }

  extractProductionCommonPrefix(ps, getPrefixSymbol) {
    let cont = true;
    let newPs = [...ps];
    let changed;
    while (cont) {
      cont = false;

      for (let i = 0; i < newPs.length - 1; i++) {
        let indexes = [];
        indexes.push(i);
        let minLeft = 9999;
        const left = newPs[i];

        for (let j = i + 1; j < newPs.length; j++) {
          const right = newPs[j];
          let commonLeftIndex = left.commonLeftIndex(right);
          if (commonLeftIndex) {
            if (commonLeftIndex < minLeft) {
              minLeft = commonLeftIndex;
            }
            indexes.push(j);
          }
        }

        if (indexes.length > 1) {
          indexes.reverse();
          const newSymbol = getPrefixSymbol(left.symbol);
          const ps = [];
          for (const index of indexes) {
            ps.push(newPs[index]);
            newPs.splice(index, 1);
          }
          for (const p of ps) {
            const two = new Production({
              symbol: newSymbol,
              rhs: p.rhs.slice(p.indexAtStringIndex(minLeft, true)),
              skipAstNode: true,
            });
            addToProductions(newPs, two);
          }
          const one = new Production({
            symbol: left.symbol,
            label: left.label,
            skipAstNode: left.skipAstNode,
            rhs: [
              ...left.rhs.slice(0, left.indexAtStringIndex(minLeft)),
              newSymbol,
            ],
          });
          addToProductions(newPs, one);
          cont = true;
          changed = true;
          break;
        }
      }
    }
    return changed ? this.removeDuplicate(newPs) : ps;
  }

  build() {
    super.build();
    this.buildFollows();
    this.buildTable();
  }

  setTable(symbol, terminal, index, follow = false) {
    index = follow ? -index : index;
    const { lexer, table, productions } = this;
    table[symbol] = table[symbol] || {};
    const original = table[symbol][terminal];
    table[symbol][terminal] = index;
    if (original !== undefined && original !== index) {
      const e = ['', `Conflict: ${symbol} , ${terminal} ->`];
      for (const i of [original, index]) {
        e.push(
          (i > 0 ? '' : '-: ') +
            productions[Math.abs(i)].toString(undefined, lexer),
        );
      }
      e.push('');
      console.error(e.join('\n'));
    }
  }

  getTableVal(row, col) {
    const { table } = this;
    return table[row] && table[row][col];
  }

  buildTable() {
    const { productions } = this;
    for (let index = 0; index < productions.length; index++) {
      const p = productions[index];
      const { symbol, rhs } = p;
      const firsts = this.findFirst(rhs);
      for (const terminal of Object.keys(firsts)) {
        this.setTable(symbol, terminal, index);
      }
      if (this.isNullable(rhs)) {
        const follows = this.findFollows(symbol);
        for (const terminal of Object.keys(follows)) {
          this.setTable(symbol, terminal, index, true);
        }
      }
    }
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
            const production = productions[Math.abs(ps)];
            ret.push(
              (ps > 0 ? '' : '-: ') +
                `${nonTerminal} ${terminal} => ${production.symbol} -> ${
                  filterRhs(production.rhs).join(', ') || 'EMPTY'
                }`,
            );
          }
        }
      }
    }
    return ret.join('\n');
  }

  genCodeInternal(code) {
    const { productions } = this;
    const productionSkipAstNodeSet = [];
    productions.forEach((p, index) => {
      if (p.skipAstNode) {
        productionSkipAstNodeSet.push(index);
      }
    });
    code.push(
      `const productionSkipAstNodeSet = new Set([${productionSkipAstNodeSet.join(
        ',',
      )}]);`,
    );
    code.push(
      'const productionEndFlag = ' + serializeObject(productionEndFlag) + ';',
    );
    code.push(
      'const productionAddAstNodeFlag = ' +
        serializeObject(productionAddAstNodeFlag) +
        ';',
    );
    code.push(
      'const isProductionEndFlag = ' + serializeObject(isProductionEndFlag),
    );
    code.push('const isAddAstNodeFlag = ' + serializeObject(isAddAstNodeFlag));
    const { table, lexer } = this;
    const mappedTable = {};
    for (const nonTerminal of Object.keys(table)) {
      const col = table[nonTerminal];
      if (col) {
        const mappedCol = {};
        for (const terminal of Object.keys(col)) {
          const ps = col[terminal];
          if (ps !== undefined) {
            col[terminal] = Math.abs(ps);
            mappedCol[lexer.mapSymbol(terminal)] = col[terminal];
          }
        }
        mappedTable[lexer.mapSymbol(nonTerminal)] = mappedCol;
      }
    }
    code.push('parser.table = ' + serializeObject(mappedTable) + ';');
    code.push(
      'parser.prioritySymbolMap = ' +
        serializeObject(this.prioritySymbolMap) +
        ';',
    );
    code.push(ParserCode);
    code.push('parser.parse = ' + parse.toString() + ';');
    return code.join('\n');
  }
}

function parse(input, options) {
  const recoveryTokens = [];
  const terminalNodes = [];

  function isExtraSymbol(ast) {
    return ast.children && !ast.children.length;
  }

  function isSymbolName(s) {
    return !!table[s];
  }

  function peekStack(stack, n) {
    n = n || 1;
    return stack[stack.length - n];
  }

  function getTableVal(row, col) {
    return table[row] && table[row][col];
  }

  function getOriginalSymbol(s) {
    let uncompressed = lexer.mapReverseSymbol(s);
    return prioritySymbolMap[uncompressed] || uncompressed;
  }

  options = options || {};
  let error;
  var { onErrorRecovery, onAction, lexerOptions = {}, transformNode } = options;

  function checkLabel(node, parent) {
    if (node.label || parent.label) {
      if (node.label === parent.label) {
        return node.children;
      }
      return node;
    }
    return node.children;
  }

  function defaultTransformNode({ node, parent }) {
    if (node.token || node.error || node.symbol !== parent.symbol) {
      return node;
    }
    if (parent.children.length === 1) {
      // do not check label
      // replace label!
      parent.label = node.label;
      return node.children;
    }
    if (node.children.length > 1) {
      return node;
    }
    // drill down to token
    if (node.children[0]?.token) {
      // do not check label
      // parent.label = node.label;
      return node.children;
    }
    return checkLabel(node, parent);
  }

  if (transformNode !== false && !transformNode) {
    transformNode = defaultTransformNode;
  }

  var {
    lexer,
    table,
    productions,
    prioritySymbolMap,
    getProductionSymbol,
    getProductionRhs,
    getProductionLabel,
  } = parser;

  lexer.options = lexerOptions;
  const startSymbol = getProductionSymbol(productions[0]);
  var symbolStack = [startSymbol];
  const astStack = [
    new AstNode({
      children: [],
    }),
  ];
  lexer.resetInput(input);
  let token;
  let next;

  function getError() {
    const expected = getExpected();
    const tips = [];
    if (expected.length) {
      tips.push("'" + expected.join("', '") + "' expected.");
    }

    tips.push("current token: '" + lexer.getCurrentToken().token + "'.");

    const tip = tips.join('\n');
    return {
      errorMessage: [
        'syntax error at line ' +
          lexer.lineNumber +
          ':\n' +
          lexer.showDebugInfo(),
        ...tips,
      ].join('\n'),
      tip,
    };
  }

  function cleanAst(ast) {
    if (!transformNode) {
      return ast;
    }
    if (ast.children) {
      let children;
      let childrenChanged;
      while (true) {
        let changed = false;
        let index = 0;
        children = [];
        for (const c of ast.children) {
          const node = transformNode({
            node: c,
            index,
            parent: ast,
            defaultTransformNode,
          });
          if (Array.isArray(node)) {
            children.push(...node);
          } else if (node) {
            children.push(node);
          }
          changed = changed || node !== c;
          index++;
        }
        if (!changed) {
          break;
        } else {
          ast.setChildren(children);
          childrenChanged = true;
        }
      }
      if (childrenChanged && ast.parent) {
        cleanAst(ast.parent);
      } else {
        for (const c of children) {
          cleanAst(c);
        }
      }
    }
    return ast;
  }

  function getAst(raw) {
    let ast = astStack[0];
    ast = ast?.children?.[0];
    ast = ast?.children?.[0];
    if (ast) {
      ast.parent = null;
    }
    if (raw) {
      return ast;
    }
    return ast && cleanAst(ast);
  }

  let topSymbol;

  let errorNode;

  function popSymbolStack() {
    symbolStack.pop();
  }

  let getExpected = function () {
    const s = topSymbol;
    if (!isSymbolName(s)) {
      return [lexer.mapReverseSymbol(s)];
    }
    const ret = (table[s] && Object.keys(table[s])) || [];
    return ret.map((r) => lexer.mapReverseSymbol(r));
  };

  function closeAstWhenError() {
    errorNode = new AstNode({
      type: 'token',
      error,
      ...error.lexer,
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

  let production;

  const { EOF_TOKEN } = Lexer.STATIC;

  function pushRecoveryTokens(token) {
    let eof;
    if (recoveryTokens[recoveryTokens.length - 1]?.token === EOF_TOKEN) {
      eof = recoveryTokens.pop();
    }
    recoveryTokens.push(token);
    if (eof && token.token !== EOF_TOKEN) {
      recoveryTokens.push(eof);
    }
  }

  while (1) {
    topSymbol = peekStack(symbolStack);

    if (!topSymbol) {
      break;
    }

    while (isProductionEndFlag(topSymbol) || isAddAstNodeFlag(topSymbol)) {
      let ast = astStack.pop();
      if (isAddAstNodeFlag(topSymbol)) {
        const stackTop = peekStack(astStack);
        const wrap = new AstNode({
          type: 'symbol',
          symbol: ast.symbol,
          children: [ast],
          label: ast.label,
        });
        stackTop.children.pop();
        stackTop.addChild(wrap);
        astStack.push(wrap);
      }
      popSymbolStack();
      topSymbol = peekStack(symbolStack);
      if (!topSymbol) {
        break;
      }
    }

    if (typeof topSymbol === 'string') {
      if (!token) {
        token = lexer.lex();
        pushRecoveryTokens(token);
      }
      if (topSymbol === token.t) {
        symbolStack.pop();
        const terminalNode = new AstNode(token);
        terminalNode.type = 'token';
        terminalNodes.push(terminalNode);
        const parent = peekStack(astStack);
        parent.addChild(terminalNode);
        token = lexer.lex();
        pushRecoveryTokens(token);
      } else if ((next = getTableVal(topSymbol, token.t)) !== undefined) {
        popSymbolStack();
        production = productions[next];

        if (productionSkipAstNodeSet.has(next)) {
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production).concat().reverse(),
          );
        } else {
          const newAst = new AstNode({
            type: 'symbol',
            symbol: getOriginalSymbol(topSymbol),
            label: getOriginalSymbol(getProductionLabel(production)),
            children: [],
          });
          peekStack(astStack).addChild(newAst);
          astStack.push(newAst);
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production).concat(productionEndFlag).reverse(),
          );
        }
      } else {
        error = {
          recovery: false,
          ...getError(),
          expected: getExpected(),
          symbol: peekStack(astStack).symbol,
          lexer: lexer.toJSON(),
        };
        if (onErrorRecovery) {
          const recommendedAction = {};
          lexer.stash();
          const nextToken = lexer.lex();
          lexer.stashPop();
          // should delete
          if (
            topSymbol === nextToken.t ||
            getTableVal(topSymbol, nextToken.t) !== undefined
          ) {
            recommendedAction.action = 'del';
          } else if (error.expected.length) {
            recommendedAction.action = 'add';
          }

          const errorNode = new AstNode({
            error,
            type: 'token',
            ...error.lexer,
          });
          peekStack(astStack).addChild(errorNode);

          const recovery =
            onErrorRecovery(
              {
                errorNode,
                parseTree: getAst(true),
              },
              recommendedAction,
            ) || {};

          const { action } = recovery;

          peekStack(astStack).children.pop();

          if (!action) {
            closeAstWhenError();
            break;
          }

          if (action === 'del') {
            error.recovery = true;
            const deleteToken = recoveryTokens.pop();
            deleteToken.recovery = 'del';
            token = null;
          } else if (action === 'add') {
            error.recovery = true;
            token = {
              ...token,
              token: recovery.token,
              text: recovery.text,
              t: lexer.mapSymbol(recovery.token),
              recovery: 'add',
            };
            lexer.pushToken(token);
            pushRecoveryTokens(token);
          }
        } else {
          closeAstWhenError();
          break;
        }
      }
    }

    topSymbol = peekStack(symbolStack);

    while (topSymbol && typeof topSymbol === 'function') {
      if (onAction) {
        onAction({
          token: lexer.getLastToken(),
          action: topSymbol,
          parseTree: getAst(true),
        });
      }
      popSymbolStack();
      topSymbol = peekStack(symbolStack);
    }

    if (!symbolStack.length) {
      break;
    }
  }

  if (!error && lexer.getCurrentToken().token !== Lexer.STATIC.EOF_TOKEN) {
    // reduction done but still has input
    if (!symbolStack.length) {
      getExpected = () => [Lexer.STATIC.EOF_TOKEN];
      lexer.lex();
    }
    error = {
      ...getError(),
      expected: getExpected(),
      symbol: peekStack(astStack)?.symbol,
      lexer: lexer.toJSON(),
    };
    closeAstWhenError();
  }

  const ast = getAst();

  return {
    ast,
    tokens: lexer.tokens,
    recoveryTokens,
    errorNode,
    error,
    terminalNodes,
  };
}

module.exports = LLGrammar;
