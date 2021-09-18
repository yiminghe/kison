// @ts-check

const Grammar = require('../Grammar');
var Utils = require('../utils');
const Production = require('../Production');
const Lexer = require('../Lexer');

var { serializeObject, assertSymbolString, filterRhs } = Utils;

// placeholder
const productionSkipEndSet = new Set();
const productionReductionFlag = 1;
const productionEndFlag = 2;
const parser = {};

class AstNode {
  children = [];
  symbol = 'a';
  label = 'a';
  parent = null;
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

function isProductionReductionFlag(t) {
  return t === productionReductionFlag;
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

  prioritySymbolMap = {};

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
          const isFlat = p.flat;
          needReplace = true;
          const slashSymbol = getSuffixSymbol(p.symbol);
          const rhs = isFlat
            ? [...p.rhs.slice(1), slashSymbol]
            : [...p.rhs.slice(1), productionReductionFlag, slashSymbol];
          const newProd = new Production({
            // instruct ast processor
            skipEnd: true,
            symbol: slashSymbol,
            rhs,
          });
          newProductions2.push(newProd);
          emptySlashSet.add(slashSymbol);
          for (let j = 0; j < l; j++) {
            const p2 = productions[j];
            if (p2.symbol === p.symbol && p2.symbol !== p2.rhs[0]) {
              if (slashArgumentMap.get(slashSymbol) === p2) {
                continue;
              }
              slashArgumentMap.set(slashSymbol, p2);
              const rhs = isFlat
                ? [...p2.rhs, slashSymbol]
                : [...p2.rhs, productionReductionFlag, slashSymbol];
              const newProd = new Production({
                symbol: p.symbol,
                label: p.label,
                // instruct ast processor
                rhs,
              });
              newProductions2.push(newProd);
              deletedMap.add(p2);
            }
          }
        } else {
          newProductions2.push(p);
        }
      }
      if (needReplace) {
        this.productions = productions = newProductions2.filter(
          p => !deletedMap.has(p),
        );
        for (const slashSymbol of emptySlashSet.values()) {
          const newProd = new Production({
            skipEnd: true,
            symbol: slashSymbol,
            rhs: [],
          });
          productions.push(newProd);
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
    // expand priority
    const { productions, operators } = this;

    if (!operators) {
      return;
    }

    const rightMap = {};
    const priorityMap = {};
    let index = 0;
    for (const ops of operators) {
      ++index;
      const type = ops[0];
      for (const o of ops.slice(1)) {
        priorityMap[o] = index;
        if (type === 'right') {
          rightMap[o] = 1;
        }
      }
    }

    const getPriority = p1 => {
      const precedenceTerminal1 = this.getPrecedenceTerminal(p1);
      const priority1 = priorityMap[precedenceTerminal1];
      return priority1;
    };

    const unrelevants = productions.filter(p => !getPriority(p));
    const relevantProductions = productions.filter(p => !!getPriority(p));

    relevantProductions.sort((p1, p2) => {
      return getPriority(p1) - getPriority(p2);
    });

    function getSymbol(s, priority) {
      return `${s}_p_${priority}`;
    }

    const parts = [];
    let part = [];

    for (let i = 0; i < relevantProductions.length; i++) {
      const p = relevantProductions[i];
      const nextP = relevantProductions[i + 1];
      part.push(p);
      if (!nextP || p.symbol !== nextP.symbol) {
        parts.push(part);
        part = [];
      }
    }

    if (part.length) {
      parts.push(part);
    }
    const newRelevants = [];

    function getNextP(productions, index) {
      const p = productions[index];
      const priority = getPriority(p);
      while (++index < productions.length) {
        if (getPriority(productions[index]) > priority) {
          return productions[index];
        }
      }
    }
    const { prioritySymbolMap } = this;
    const transformPart = ps => {
      const l = ps.length;
      const symbol = ps[0].symbol;
      const startSymbol = getSymbol(symbol, getPriority(ps[0]));
      const endSymbol = getSymbol(symbol, 'end');
      prioritySymbolMap[endSymbol] = symbol;
      let already = new Map();
      for (let i = 0; i < l; i++) {
        const p = ps[i];
        const { rhs, label } = p;
        const precedenceTerminal = this.getPrecedenceTerminal(p);
        const nextP = getNextP(ps, i);
        let expSymbol = getSymbol(symbol, getPriority(p));
        prioritySymbolMap[expSymbol] = symbol;
        expSymbol = expSymbol === startSymbol ? symbol : expSymbol;
        const nextSymbol = nextP
          ? getSymbol(symbol, getPriority(nextP))
          : endSymbol;
        if (already.get(expSymbol) === nextSymbol) {
        } else {
          newRelevants.push({
            symbol: expSymbol,
            label,
            rhs: [nextSymbol],
          });
          already.set(expSymbol, nextSymbol);
        }
        // unary
        if (rhs.filter(r => r === symbol).length === 1) {
          newRelevants.push({
            symbol: expSymbol,
            label,
            rhs: rhs.map(r => {
              return r === symbol ? expSymbol : r;
            }),
          });
          continue;
        }
        let newRhs;
        if (rightMap[precedenceTerminal]) {
          let replaced;
          newRhs = rhs.map(r => {
            if (r === symbol) {
              if (replaced) {
                return expSymbol;
              } else {
                replaced = true;
                return nextSymbol;
              }
            }
            return r;
          });
        } else {
          let replaced;
          newRhs = [...rhs];
          for (let i = newRhs.length - 1; i >= 0; i--) {
            const rh = newRhs[i];
            if (rh === symbol) {
              if (replaced) {
                newRhs[i] = expSymbol;
              } else {
                replaced = true;
                newRhs[i] = nextSymbol;
              }
            }
          }
        }
        newRelevants.push({
          symbol: expSymbol,
          label,
          rhs: newRhs,
        });
      }

      for (const p of unrelevants) {
        if (p.symbol === symbol) {
          p.symbol = endSymbol;
        }
      }
    };

    parts.forEach(transformPart);

    this.productions = unrelevants.concat(newRelevants);
  }

  getPrecedenceTerminal(p) {
    if (p.precedence) {
      return p.precedence;
    }
    const { rhs } = p;
    for (let i = rhs.length - 1; i >= 0; i--) {
      const rh = rhs[i];
      if (typeof rh === 'string' && this.lexer.hasToken(rh)) {
        return rh;
      }
    }
    return null;
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
      return '(' + symbol + ')' + n + '_';
    }

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
              skipEnd: true,
            });
            addToProductions(newPs, two);
          }
          const one = new Production({
            symbol: left.symbol,
            label: left.label,
            skipEnd: left.skipEnd,
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
                `${nonTerminal} ${terminal} => ${
                  production.symbol
                } -> ${filterRhs(production.rhs).join(', ') || 'EMPTY'}`,
            );
          }
        }
      }
    }
    return ret.join('\n');
  }

  genCodeInternal(code) {
    const { productions } = this;
    const productionSkipEndSet = [];
    productions.forEach((p, index) => {
      if (p.skipEnd) {
        productionSkipEndSet.push(index);
      }
    });
    code.push(
      `const productionSkipEndSet = new Set([${productionSkipEndSet.join(
        ',',
      )}]);`,
    );
    code.push(
      'const productionEndFlag = ' + serializeObject(productionEndFlag) + ';',
    );
    code.push(
      'const productionReductionFlag = ' +
        serializeObject(productionReductionFlag) +
        ';',
    );
    code.push(
      'const isProductionEndFlag = ' + serializeObject(isProductionEndFlag),
    );
    code.push(
      'const isProductionReductionFlag = ' +
        serializeObject(isProductionReductionFlag),
    );
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

  function checkSymbolLabel(node, parent) {
    if (node.label || parent.label) {
      if (node.label === parent.label) {
        return node.children;
      }
      return node;
    }
    if (node.symbol === parent.symbol) {
      return node.children;
    }
    return node;
  }

  function defaultTransformNode({ node, parent }) {
    if (node.token || node.error) {
      return node;
    }
    if (node.children.length > 1) {
      if (parent.children.length === 1 && node.symbol === parent.symbol) {
        // do not check label
        return node.children;
      }
      return node;
    }
    // drill down to token
    if (node.children[0]?.token && node.symbol === parent.symbol) {
      // do not check label
      return node.children;
    }
    return checkSymbolLabel(node, parent);
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
    if (lexer.token) {
      tips.push("current token: '" + lexer.token + "'.");
    }
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

  let lastSymbol;

  function popSymbolStack() {
    const last = symbolStack.pop();
    if (typeof last === 'string') {
      lastSymbol = last;
    }
  }

  let getExpected = function() {
    const s = topSymbol || lastSymbol;
    const ret = (table[s] && Object.keys(table[s])) || [];
    return ret.map(r => lexer.mapReverseSymbol(r));
  };

  function closeAstWhenError() {
    errorNode = new AstNode({
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

  while (1) {
    topSymbol = peekStack(symbolStack);

    if (!topSymbol) {
      break;
    }

    while (
      isProductionEndFlag(topSymbol) ||
      isProductionReductionFlag(topSymbol)
    ) {
      let ast = astStack.pop();
      if (isProductionReductionFlag(topSymbol)) {
        const stackTop = peekStack(astStack);
        const wrap = new AstNode({
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
        recoveryTokens.push(token);
      }
      if (topSymbol === token.t) {
        symbolStack.pop();
        const terminalNode = new AstNode(token);
        terminalNodes.push(terminalNode);
        const parent = peekStack(astStack);
        parent.addChild(terminalNode);
        token = null;
      } else if ((next = getTableVal(topSymbol, token.t)) !== undefined) {
        popSymbolStack();
        production = productions[next];

        if (productionSkipEndSet.has(next)) {
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production)
              .concat()
              .reverse(),
          );
        } else {
          const newAst = new AstNode({
            symbol: getOriginalSymbol(topSymbol),
            label: getOriginalSymbol(getProductionLabel(production)),
            children: [],
          });
          peekStack(astStack).addChild(newAst);
          astStack.push(newAst);
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production)
              .concat(productionEndFlag)
              .reverse(),
          );
        }
      } else {
        error = {
          recovery: false,
          ...getError(),
          expected: getExpected(),
          symbol: lexer.mapReverseSymbol(topSymbol),
          lexer: lexer.toJSON(),
        };
        if (onErrorRecovery) {
          const recommendedAction = {};
          const nextToken = lexer.peek();

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
            recoveryTokens.pop();
            token = null;
          } else if (action === 'add') {
            error.recovery = true;
            token = {
              ...token,
              token: recovery.token,
              text: recovery.text,
              t: lexer.mapSymbol(recovery.token),
            };
            recoveryTokens.push(token);
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
          lexer,
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

  if (!error && lexer.token !== Lexer.STATIC.EOF_TOKEN) {
    // reduction done but still has input
    if (!symbolStack.length) {
      getExpected = () => [Lexer.STATIC.EOF_TOKEN];
      lexer.lex();
    }
    error = {
      ...getError(),
      expected: getExpected(),
      symbol: lexer.mapReverseSymbol(topSymbol || lastSymbol),
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
