// @ts-check

var Utils = require('./utils');
var {
  each,
  filterRhs,
  serializeObject,
  eachRhs,
  globalUtils,
  assertSymbolString,
  getAstNodeClassName,
} = Utils;
var NonTerminal = require('./NonTerminal');
var Lexer = require('./Lexer');
var Production = require('./Production');
const { productionAddAstNodeFlag, gened: dataGened } = require('./data');
const {
  isOneOrMoreSymbol,
  isOptionalSymbol,
  isZeroOrMoreSymbol,
  normalizeSymbol,
} = require('./utils');

const startGroupMarker = `'('`;
const endGroupMarker = `')'`;
const alterMark = `'|'`;

function setSize(set3) {
  return Object.keys(set3).length;
}

function camelCase(str) {
  return str.replace(/-(\w)/g, (m, m1) => {
    return m1.toUpperCase();
  });
}

function emurate(keys, ret, callback) {
  if (!keys.length) {
    if (callback) {
      callback(ret);
    }
    return;
  }
  const rest = keys.slice(1);
  const k = keys[0];
  ret[k] = 1;
  emurate(rest, ret, callback);
  ret[k] = 0;
  emurate(rest, ret, callback);
}

const START_TAG = '$START';

class Grammar {
  table = {};

  prioritySymbolMap = {};

  nonTerminals = {};

  itemSets = [];

  productions = [];

  isCompress = false;

  operators = undefined;

  my = undefined;

  lexer = undefined;

  static START_TAG = START_TAG;

  constructor(cfg) {
    Object.assign(this, cfg);

    if (this.productions && this.productions[0]) {
      this.productions = [
        {
          symbol: Grammar.START_TAG,
          rhs: [this.productions[0].symbol],
        },
        ...this.productions,
      ];
    }

    if (cfg.lexer) {
      this.setLexer(this.lexer);
    }

    this.productionIndexMap = {
      symbol: 0,
      rhs: 1,
      action: 2,
      label: 3,
    };
  }

  setLexer(v) {
    if (!(v instanceof Lexer)) {
      v = new Lexer(v);
      var { productions } = this;
      const nonTerminals = {};
      for (const production of productions) {
        var { symbol } = production;
        nonTerminals[symbol] = 1;
      }
      for (const production of productions) {
        eachRhs(production.rhs, (rh) => {
          if (rh.length > 1 && (rh.endsWith('?') || rh.endsWith('*'))) {
            rh = normalizeSymbol(rh);
          }
          if (!v.hasToken(rh) && !nonTerminals[rh]) {
            v.addRule({
              token: rh,
              regexp: new RegExp(Utils.regexEscape(rh), 'g'),
            });
          }
        });
      }
    }
    this.lexer = v;
  }

  // parser.d.ts
  genDTs(base) {
    const fake = {
      productions: this.productions,
    };

    this.expandProductionAlternation(fake);
    this.expandProductionGroup(fake);
    this.expandOptionalSymbol(fake);
    this.expandOneOrMoreSymbol(fake);
    this.expandZeroOrMoreSymbol(fake);

    const { productions } = fake;
    const symbolMap = new Map();
    for (const p of productions) {
      symbolMap.set(p.symbol, []);
    }

    let literalTokens = [];

    const allTokens = new Map();

    const rules = [
      ...this.lexer.rules,
      {
        token: '$EOF',
      },
      {
        token: '$UNKOWN',
      },
    ];

    for (const r of rules) {
      if (r.token && r.token.match(/^[\d\w\$]+$/)) {
        literalTokens.push(r.token);
        allTokens.set(r.token, r.token);
      }
    }

    const tokenMap = new Map();
    let tokenIndex = 0;

    const parentMap = new Map();

    let classNameMap = new Map();
    let reverseClassNameMap = new Map();

    let usedClassName = {};

    let firstCls;

    const flatSymbols = {};
    const skipNodeClass = {};
    const parentNodeClassMap = new Map();

    for (let i = 0; i < productions.length; i++) {
      const p = productions[i];
      if (p.symbol === START_TAG) {
        continue;
      }
      if (p.flat) {
        flatSymbols[p.symbol] = 1;
      }
      let clsName = getAstNodeClassName(p.symbol);
      const normalizeClsName = clsName;
      if (p.skipAstNode) {
        skipNodeClass[clsName + '_0'] = 1;
      }
      firstCls = firstCls || clsName;
      if (usedClassName[clsName]) {
        const prevP = reverseClassNameMap.get(clsName);
        if (prevP) {
          classNameMap.set(prevP, { name: clsName + '_0', index: 0, zero: 1 });
          reverseClassNameMap.set(clsName + '_0', prevP);
          reverseClassNameMap.delete(clsName);
        }
        clsName += '_' + i;
      }
      if (p.skipAstNode) {
        skipNodeClass[clsName] = 1;
      }
      usedClassName[clsName] = 1;
      classNameMap.set(p, { name: clsName, index: i });
      reverseClassNameMap.set(clsName, p);
      const { rhs } = p;
      for (const r of rhs) {
        if (typeof r !== 'string') {
          continue;
        }
        let rhName;
        if (symbolMap.has(r)) {
          rhName = r;
        } else if (allTokens.has(r)) {
          rhName = allTokens.get(r);
        } else {
          literalTokens.push(r);
          rhName = 'TOKEN_' + tokenIndex++;
          allTokens.set(r, rhName);
        }
        let parents = parentMap.get(rhName);
        if (!parents) {
          parents = new Set();
          parentMap.set(rhName, parents);
          parentNodeClassMap.set(getAstNodeClassName(rhName), parents);
        }
        if (!parents.has(normalizeClsName)) {
          parents.add(clsName);
        }
      }
    }

    function filterSkipNodeParents(childName) {
      const parentIter = parentMap.get(childName);

      if (!parentIter) {
        return null;
      }

      let parents = Array.from(parentMap.get(childName));

      let processed = {};

      const f = (p) => {
        return !skipNodeClass[p];
      };

      while (true) {
        let prev = parents;
        parents = parents.filter(f);
        if (prev.length !== parents.length) {
          const skipNodeParents = prev.filter((p) => !f(p));
          if (skipNodeParents.every((f) => !!processed[f])) {
            break;
          }
          for (const skipNodeParent of skipNodeParents) {
            processed[skipNodeParent] = 1;
            if (parentNodeClassMap.get(skipNodeParent)) {
              parents = parents.concat(
                Array.from(parentNodeClassMap.get(skipNodeParent)),
              );
            }
          }
        } else {
          break;
        }
      }

      parents = parents.filter(f);

      return parents;
    }

    for (const p of productions) {
      if (p.symbol === START_TAG) {
        continue;
      }
      const classes = symbolMap.get(p.symbol);
      const { rhs } = p;
      const rhsTypes = [];

      let looseRhType = p.flat;

      for (const r of rhs) {
        if (typeof r !== 'string') {
          continue;
        }
        if (p.flat && r === p.symbol) {
          continue;
        }
        let rhName;

        if (symbolMap.has(r)) {
          rhName = r;
        } else if (allTokens.has(r)) {
          rhName = allTokens.get(r);
        } else {
          throw new Error('Error token:' + r);
        }

        const cls = getAstNodeClassName(rhName);

        if (!symbolMap.has(rhName) && !tokenMap.has(rhName)) {
          let parents = filterSkipNodeParents(rhName);

          let code = `interface ${cls} extends BaseTokenNode {
            token:${JSON.stringify(r)};
            ${parents && parents.length ? `parent:${parents.join(' | ')};` : ''}
          }`;
          tokenMap.set(rhName, code);
        }

        if (skipNodeClass[cls]) {
          let nonSkipChildClasses = {};
          let seed = { [cls]: 1 };
          while (true) {
            const currentChildClassesLength =
              Object.keys(nonSkipChildClasses).length;
            const seedLength = Object.keys(seed).length;
            for (const c of parentNodeClassMap.keys()) {
              const parents = parentNodeClassMap.get(c);
              for (const s of Object.keys(seed)) {
                if (parents.has(s)) {
                  if (!skipNodeClass[c]) {
                    nonSkipChildClasses[c] = 1;
                  } else {
                    seed[c] = 1;
                  }
                }
              }
            }
            if (
              currentChildClassesLength ===
                Object.keys(nonSkipChildClasses).length &&
              seedLength === Object.keys(seed).length
            ) {
              break;
            }
          }
          delete nonSkipChildClasses[cls];
          rhsTypes.push(...Object.keys(nonSkipChildClasses));
          looseRhType = true;
        } else {
          rhsTypes.push(cls);
        }
      }

      for (const t of ['$EOF', '$UNKNOWN']) {
        tokenMap.set(
          t,
          `interface ${t}_Node extends BaseTokenNode {
        token:${JSON.stringify(t)};
        parent:AstSymbolNode;
      }`,
        );
      }

      {
        const { index, name: className, zero } = classNameMap.get(p);
        if (!skipNodeClass[className]) {
          let childrenType = `[${rhsTypes.join(',')}]`;
          if (looseRhType) {
            childrenType = `Array<${rhsTypes.join(' | ')}>`;
          }
          let parents = filterSkipNodeParents(p.symbol);
          if (parents && flatSymbols[p.symbol]) {
            const cls = getAstNodeClassName(p.symbol);
            parents = parents.filter((s) => !s.startsWith(cls));
          }
          let code = `interface ${className} extends BaseSymbolNode {
        symbol:${JSON.stringify(p.symbol)};
        ${p.label ? `label:${JSON.stringify(p.label)};` : ''}
        children:${childrenType};
        ${parents && parents.length ? `parent:${parents.join(' | ')};` : ''}
      }`;
          classes.push({ code, index, zero });
        }
      }
    }

    let code = [];

    let allClassNames = [];

    for (const symbol of symbolMap.keys()) {
      const classes = symbolMap.get(symbol);
      if (classes.length) {
        const className = getAstNodeClassName(symbol);
        allClassNames.push(className);
        code.push(...classes.map((c) => c.code));
        if (classes.length > 1) {
          code.push(
            `type ${className} = ${classes
              .map(({ index, zero }) => {
                if (index || zero) {
                  return className + '_' + index;
                }
                return className;
              })
              .join(' | ')};`,
          );
        }
      }
    }

    let allExports = allClassNames;

    base = base.replace(/type AstSymbolNode =[^\n]+/, () => {
      return `type AstSymbolNode = ${allClassNames.join('|')};`;
    });

    base = base.replace(/type AstRootNode =[^\n]+/, () => {
      return `type AstRootNode = ${firstCls};`;
    });

    allClassNames = [];

    for (const tokenName of tokenMap.keys()) {
      const className = getAstNodeClassName(tokenName);
      allClassNames.push(className);
      code.push(tokenMap.get(tokenName));
    }

    base = base.replace(/type AstTokenNode =[^\n]+/, () => {
      return `type AstTokenNode = ${allClassNames.join('|')};`;
    });

    allExports.push(...allClassNames);

    base = base.replace(/type LiteralToken =[^\n]+/, () => {
      return `type LiteralToken = ${literalTokens
        .map((r) => JSON.stringify(r))
        .join('|')};`;
    });

    const exporsCode = `export type { ${allExports.join(',')} }`;

    return [base, ...code, exporsCode].join('\n');
  }

  // https://www.w3.org/TR/2010/REC-xquery-20101214/#EBNFNotation
  // https://www.bottlecaps.de/rr/ui
  toBNF() {
    const skipNodeProductionsMap = {};
    for (const p of this.productions) {
      if (p.skipAstNode) {
        skipNodeProductionsMap[p.symbol] = filterRhs(p.rhs);
      }
    }
    const { lexer } = this;
    const ret = [];

    function getSymbolBnf(r) {
      const line = [];
      let s = normalizeSymbol(r);
      let quantifier = s === r ? '' : r.slice(s.length);
      let m;
      if ((m = s.match(/^'([^']+)'$/))) {
        line.push(m[1]);
      } else if (lexer.hasToken(s)) {
        line.push(`'${s}'`);
      } else {
        const rhs = skipNodeProductionsMap[s];
        if (rhs) {
          line.push('(', ...rhs.map(getSymbolBnf).flat(2), ')');
        } else {
          line.push(camelCase(s));
        }
      }
      if (quantifier) {
        line[line.length - 1] += quantifier;
      }
      return line;
    }

    for (const p of this.productions) {
      if (p.symbol === Grammar.START_TAG || skipNodeProductionsMap[p.symbol]) {
        continue;
      }
      const line = [camelCase(p.symbol), '::='];
      for (const r of p.rhs) {
        if (typeof r === 'string') {
          line.push(...getSymbolBnf(r));
        }
      }
      ret.push(line.join(' '));
    }
    return ret.join('\n');
  }

  getProductionItemByType(p, itemType) {
    if (this.isCompress) {
      return p[this.productionIndexMap[itemType]];
    }
    return p[itemType];
  }

  expandProductions() {
    if (this.__expandProductions) {
      return;
    }
    this.__expandProductions = 1;
    this.expandProductionAlternation();
    this.expandProductionGroup();
    this.expandProductionsInternal();
  }

  expandProductionAlternation(fake) {
    if (!fake && this.__expandProductionAlterations) {
      return;
    }

    if (!fake) {
      this.__expandProductionAlterations = 1;
    }

    fake = fake || this;

    let newPs = [];
    for (const p of fake.productions) {
      newPs.push(...this.expandOneProductionAlternation(p));
    }
    fake.productions = newPs;
  }

  expandOneProductionAlternation(p) {
    const { rhs } = p;

    const rhsRoot = {
      children: [],
    };

    function wrapRh(rh) {
      return {
        rh,
        children: [],
      };
    }

    function addChildren(node, child) {
      if (node.rh === startGroupMarker || !node.rh) {
        child.childIndex = node.children.length;
      } else if (node.childIndex !== undefined) {
        child.childIndex = node.childIndex;
      }
      node.children.push(child);
    }

    let stack = [rhsRoot];
    let current = stack[0];
    for (const rh of rhs) {
      if (rh === alterMark) {
        current = stack[stack.length - 1];
        continue;
      }
      if (rh.startsWith && rh.startsWith(endGroupMarker)) {
        let newChild = wrapRh(rh);
        const parent = stack.pop();
        for (const c of parent.children) {
          addChildren(c.tail, newChild);
        }
        newChild.childIndex = parent.childIndex;
        current = newChild;
      } else {
        let newChild = wrapRh(rh);
        addChildren(current, newChild);
        current = newChild;
      }

      const topItem = stack[stack.length - 1];
      topItem.children[current.childIndex].tail = current;

      if (rh === startGroupMarker) {
        stack.push(current);
      }
    }

    function collect(node, ret, rets) {
      if (node.rh) {
        ret.push(node.rh);
      }
      if (!node.children.length) {
        rets.push(ret);
      } else {
        for (const c of node.children) {
          collect(c, [...ret], rets);
        }
      }
    }

    const rhses = [];

    collect(rhsRoot, [], rhses);

    return rhses.map((rhs) => ({
      ...p,
      rhs,
    }));
  }

  expandProductionGroup(fake) {
    if (!fake) {
      if (this.__expandProductionGroup) {
        return;
      }

      this.__expandProductionGroup = 1;
    }

    fake = fake || this;

    let ps = fake.productions;
    let newPs = [];

    let uuid = 0;

    while (true) {
      let changed = false;
      newPs = [];
      const addedPs = [];

      for (const p of ps) {
        uuid++;
        const { rhs } = p;
        const l = rhs.length;
        const newRhs = [];
        for (let i = 0; i < rhs.length; i++) {
          const rh = rhs[i];
          if (rh === startGroupMarker) {
            changed = true;
            const start = i;
            i++;
            const subRhs = [];
            let nest = 0;
            while (
              nest ||
              !rhs[i].startsWith ||
              !rhs[i].startsWith(endGroupMarker)
            ) {
              if (rhs[i] === startGroupMarker) {
                nest++;
              } else if (
                rhs[i].startsWith &&
                rhs[i].startsWith(endGroupMarker)
              ) {
                nest--;
              }
              subRhs.push(rhs[i]);
              i++;
            }
            const quantifier = rhs[i].slice(startGroupMarker.length);
            const validRhs = subRhs.filter((rh) => {
              if (typeof rh !== 'string') {
                return false;
              }
              if (rh === startGroupMarker || rh === endGroupMarker) {
                return false;
              }
              return true;
            });

            if (validRhs.length === 1) {
              newRhs.push(validRhs[0] + quantifier);
              continue;
            }

            if (!quantifier) {
              const allNormalSymbols = validRhs.every((s) => {
                return !(typeof s === 'string' && s.startsWith(endGroupMarker));
              });
              if (allNormalSymbols) {
                newRhs.push(...validRhs);
                continue;
              }
            }

            let newSymbol = `${p.symbol}_${uuid}_group_${start}`;
            addedPs.push({
              symbol: newSymbol,
              rhs: subRhs,
              skipAstNode: true,
            });
            newRhs.push(newSymbol + quantifier);
          } else {
            newRhs.push(rh);
          }
        }

        newPs.push({
          ...p,
          rhs: newRhs,
        });
      }
      if (!changed) {
        break;
      }
      ps = newPs.concat(addedPs);
    }
    fake.productions = newPs;
  }

  expandProductionsInternal() {}

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

  eliminateLeftRecursive() {
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
            : [...p.rhs.slice(1), productionAddAstNodeFlag, slashSymbol];
          const newProd = new Production({
            // instruct ast processor
            skipAstNode: true,
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
                : [...p2.rhs, productionAddAstNodeFlag, slashSymbol];
              const newProd = new Production({
                symbol: p.symbol,
                label: p.label,
                skipAstNode: p.skipAstNode,
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
          (p) => !deletedMap.has(p),
        );
        for (const slashSymbol of emptySlashSet.values()) {
          const newProd = new Production({
            skipAstNode: true,
            symbol: slashSymbol,
            rhs: [],
          });
          productions.push(newProd);
        }
      }
    }
  }

  expandProductionPriority() {
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

    const getPriority = (p1) => {
      const precedenceTerminal1 = this.getPrecedenceTerminal(p1);
      const priority1 = priorityMap[precedenceTerminal1];
      return priority1;
    };

    const unrelevants = productions.filter((p) => !getPriority(p));
    const relevantProductions = productions.filter((p) => !!getPriority(p));

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

    const transformPart = (ps) => {
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
            // label, do not keep label
            rhs: [nextSymbol],
          });
          already.set(expSymbol, nextSymbol);
        }
        // unary
        if (rhs.filter((r) => r === symbol).length === 1) {
          newRelevants.push({
            symbol: expSymbol,
            label,
            rhs: rhs.map((r) => {
              return r === symbol ? expSymbol : r;
            }),
          });
          continue;
        }
        let newRhs;
        if (rightMap[precedenceTerminal]) {
          let replaced;
          newRhs = rhs.map((r) => {
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

  expandOptionalSymbol(fake) {
    if (!fake && this.__expandOptionalSymbol) {
      return;
    }
    if (!fake) {
      this.__expandOptionalSymbol = 1;
    }
    fake = fake || this;
    var { productions: vs } = fake;
    const newVs = [];
    for (const p of vs) {
      const { rhs } = p;
      const keys = [];
      for (let i = 0; i < rhs.length; i++) {
        const r = rhs[i];
        if (isOptionalSymbol(r)) {
          keys.push(i);
        }
      }
      if (keys.length) {
        emurate(keys, {}, (ret) => {
          const newP = { ...p, rhs: [...p.rhs] };
          newVs.push(newP);
          const { rhs } = newP;
          for (let i = rhs.length - 1; i >= 0; i--) {
            const r = rhs[i];
            if (isOptionalSymbol(r)) {
              if (ret[i]) {
                rhs[i] = normalizeSymbol(r);
              } else {
                rhs.splice(i, 1);
              }
            }
          }
        });
      } else {
        newVs.push(p);
      }
    }
    fake.productions = newVs;
  }

  expandOneOrMoreSymbol(fake) {
    if (!fake && this.__expandOneOrMoreSymbol) {
      return;
    }
    if (!fake) {
      this.__expandOneOrMoreSymbol = 1;
    }
    let newPs = [];
    fake = fake || this;
    for (const p of fake.productions) {
      const { rhs } = p;
      const newRhs = [];
      for (let i = 0; i < rhs.length; i++) {
        const r = rhs[i];
        if (isOneOrMoreSymbol(r)) {
          const rr = normalizeSymbol(r);
          const lazy = r.endsWith('?') ? '?' : '';
          newRhs.push(rr, `${rr}*${lazy}`);
        } else {
          newRhs.push(r);
        }
      }
      if (newRhs.length !== rhs.length) {
        newPs.push({
          ...p,
          rhs: newRhs,
        });
      } else {
        newPs.push(p);
      }
    }

    fake.productions = newPs;
  }

  expandZeroOrMoreSymbol(fake) {
    if (!fake && this.__expandZeroOrMoreSymbol) {
      return;
    }
    if (!fake) {
      this.__expandZeroOrMoreSymbol = 1;
    }
    fake = fake || this;
    const gened = {};
    let zeroMoreIndex = 1;
    const zeroMorePrefix = 'zeroMore';
    let newVs2 = [];
    for (const p of fake.productions) {
      const { rhs } = p;
      const keys = [];
      for (let i = 0; i < rhs.length; i++) {
        const r = rhs[i];
        if (isZeroOrMoreSymbol(r)) {
          keys.push(i);
        }
      }
      if (keys.length) {
        const newRhs = [...rhs];
        const newP = { ...p, rhs: newRhs };
        for (const k of keys) {
          const r = rhs[k];
          if (!gened[r]) {
            const nr = normalizeSymbol(r);
            const genId = (gened[r] =
              zeroMorePrefix + '_' + nr + '_' + zeroMoreIndex++);
            newVs2.push(
              {
                symbol: genId,
                rhs: [genId, nr],
                flat: true,
                skipAstNode: true,
              },
              {
                symbol: genId,
                rhs: [],
                skipAstNode: true,
              },
            );
          }
          newRhs[k] = gened[r];
        }
        newVs2.push(newP);
      } else {
        newVs2.push(p);
      }
    }
    fake.productions = newVs2;
  }

  buildMeta() {
    this.buildNonTerminals();
    this.buildNullable();
    this.buildFirsts();
  }

  build() {
    this.expandProductions();
    var { productions: vs } = this;
    each(vs, function (v, index) {
      vs[index] = new Production(v);
    });
    this.buildProductions();
    this.buildMeta();
  }

  buildProductions() {}

  buildNonTerminals() {
    var { lexer, nonTerminals, productions } = this;
    for (const production of productions) {
      var { symbol } = production;
      var nonTerminal = nonTerminals[symbol];
      if (!nonTerminal) {
        nonTerminal = nonTerminals[symbol] = new NonTerminal({
          symbol: symbol,
        });
      }
      nonTerminal.productions.push(production);
      eachRhs(production.rhs, (rh) => {
        if (!lexer.hasToken(rh, true) && !nonTerminals[rh]) {
          nonTerminals[rh] = new NonTerminal({
            symbol: rh,
          });
        }
      });
    }
  }

  buildNullable() {
    var i, rhs, n, t, production, productions;
    var { nonTerminals } = this;
    var cont = true;
    // loop until no further changes have been made
    while (cont) {
      cont = false;
      // 传递
      // S -> T
      // T -> t
      // check if each production is null able
      for (const production of this.productions) {
        if (!production.nullable) {
          rhs = filterRhs(production.rhs);
          for (i = 0, n = 0; (t = rhs[i]); ++i) {
            if (this.isNullable(t)) {
              n++;
            }
          }
          if (n === i) {
            // production is null able if all tokens are null able
            production.nullable = cont = true;
          }
        }
      }
      //check if each symbol is null able
      each(nonTerminals, (v) => {
        if (!v.nullable) {
          ({ productions } = v);
          for (i = 0; (production = productions[i]); i++) {
            if (production.nullable) {
              v.nullable = cont = true;
              break;
            }
          }
        }
      });
    }
  }

  isNullable(symbol) {
    var { nonTerminals } = this;
    // rhs
    if (symbol instanceof Array) {
      symbol = filterRhs(symbol);
      for (var i = 0, t; (t = symbol[i]); ++i) {
        if (!this.isNullable(t)) {
          return false;
        }
      }
      return true;
      // terminal
    }
    assertSymbolString(symbol);
    if (!nonTerminals[symbol]) {
      return false;
      // non terminal
    } else {
      return nonTerminals[symbol].nullable;
    }
  }

  findFirst(symbol) {
    var firsts = {};
    var { nonTerminals } = this;
    var t, i;
    // rhs
    if (symbol instanceof Array) {
      symbol = filterRhs(symbol);
      for (i = 0; (t = symbol[i]); ++i) {
        if (!nonTerminals[t]) {
          firsts[t] = 1;
        } else {
          Object.assign(firsts, nonTerminals[t].firsts);
        }
        if (!this.isNullable(t)) {
          break;
        }
      }
      return firsts;
      // terminal
    }
    assertSymbolString(symbol);
    if (!nonTerminals[symbol]) {
      return { [symbol]: 1 };
      // non terminal
    } else {
      return nonTerminals[symbol].firsts;
    }
  }

  buildFirsts() {
    var { nonTerminals } = this;
    var cont = true;
    var nonTerminal, symbol, firsts;
    // loop until no further changes have been made
    while (cont) {
      cont = false;
      // 传递
      // S -> T
      // T -> t

      // S -> S y
      // S -> t
      for (const production of this.productions) {
        var firsts = this.findFirst(production.rhs);
        if (setSize(firsts) !== setSize(production.firsts)) {
          production.firsts = firsts;
          cont = true;
        }
      }
      for (symbol in nonTerminals) {
        nonTerminal = nonTerminals[symbol];
        firsts = {};
        for (const production of nonTerminal.productions) {
          Object.assign(firsts, production.firsts);
        }
        if (setSize(firsts) !== setSize(nonTerminal.firsts)) {
          nonTerminal.firsts = firsts;
          cont = true;
        }
      }
    }
  }

  getProductionSymbol(p) {
    return this.getProductionItemByType(p, 'symbol');
  }
  getProductionRhs(p) {
    return this.getProductionItemByType(p, 'rhs');
  }
  getProductionAction(p) {
    return this.getProductionItemByType(p, 'action');
  }
  getProductionLabel(p) {
    return this.getProductionItemByType(p, 'label');
  }

  mapSymbols(s) {
    if (Array.isArray(s)) {
      return s.map((t) => this.mapSymbols(t));
    }
    if (typeof s === 'string') {
      return this.lexer.mapSymbol(s);
    }
    return s;
  }

  genCodeInternal(code, cfg) {
    return '';
  }

  genCode(cfg) {
    cfg = cfg || {};
    var { lexer } = this;
    var lexerCode = lexer.genCode(cfg);
    this.build();
    var productions = [];
    const { productionIndexMap } = this;
    for (const p of this.productions) {
      var { action, label } = p;
      var ret = [];
      ret[productionIndexMap.symbol] = this.mapSymbols(p.symbol);
      ret[productionIndexMap.rhs] = this.mapSymbols(p.rhs);
      if (action) {
        ret[productionIndexMap.action] = action;
      }
      if (label) {
        ret[productionIndexMap.label] = this.mapSymbols(label);
      }
      productions.push(ret);
    }
    var code = [];
    for (const key of Object.keys(globalUtils)) {
      code.push(`var ${key} = ${serializeObject(globalUtils[key])};`);
    }
    for (const key of Object.keys(dataGened)) {
      code.push(`var ${key} = ${serializeObject(dataGened[key])};`);
    }
    if (this.my) {
      code.push(`var my = ${serializeObject(this.my)};`);
    }
    code.push(lexerCode);
    code.push(
      'var parser = ' +
        serializeObject({
          productions,
          productionIndexMap,
          getProductionItemByType: this.getProductionItemByType,
          getProductionSymbol: this.getProductionSymbol,
          getProductionRhs: this.getProductionRhs,
          getProductionAction: this.getProductionAction,
          getProductionLabel: this.getProductionLabel,
          isCompress: 1,
        }) +
        ';',
    );

    code.push(
      'parser.getProductionSymbol=parser.getProductionSymbol.bind(parser);',
      'parser.getProductionRhs=parser.getProductionRhs.bind(parser);',
      'parser.getProductionAction=parser.getProductionAction.bind(parser);',
      'parser.getProductionLabel=parser.getProductionLabel.bind(parser);',
    );

    code.push('parser.lexer = lexer;');
    code.push('parser.lex = lex;');

    code.push(
      'parser.prioritySymbolMap = ' +
        serializeObject(this.prioritySymbolMap) +
        ';',
    );
    const productionSkipAstNodeSet = [];
    this.productions.forEach((p, index) => {
      if (p.skipAstNode) {
        productionSkipAstNodeSet.push(index);
      }
    });
    if (productionSkipAstNodeSet.length) {
      code.push(
        `productionSkipAstNodeSet = new Set([${productionSkipAstNodeSet.join(
          ',',
        )}]);`,
      );
    }

    let internalCode = this.genCodeInternal(code, cfg);

    if (cfg.compressSymbol) {
      internalCode +=
        '\nlexer.symbolMap = ' + serializeObject(lexer.symbolMap) + ';';
    }

    return '(function(undefined){' + internalCode + '\n return parser; \n})()';
  }
}

module.exports = Grammar;
