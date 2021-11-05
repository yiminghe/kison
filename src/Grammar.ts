import Utils from './utils';
var { filterRhs, serializeObject, eachRhs, globalUtils, getAstNodeClassName } =
  Utils;
import NonTerminal from './NonTerminal';
import Lexer, { LexerRule } from './Lexer';
import Production from './Production';
import data from './data';
import { Rh, Rhs } from './types';
import ItemSet from './lalr/ItemSet';

const { productionAddAstNodeFlag, gened: dataGened, START_TAG } = data;
const {
  isOneOrMoreSymbol,
  isOptionalSymbol,
  isZeroOrMoreSymbol,
  normalizeSymbol,
} = Utils;

const startGroupMarker = `'('`;
const endGroupMarker = `')'`;
const alterMark = `'|'`;

function setSize(set3: any) {
  return Object.keys(set3).length;
}

function camelCase(str: string) {
  return str.replace(/-(\w)/g, (_, m1) => {
    return m1.toUpperCase();
  });
}

function emurate(
  keys: number[],
  ret: Record<string, number>,
  callback: (ret: Record<string, number>) => void,
) {
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

export interface ProductionRule {
  symbol: string;
  predict?: Function;
  precedence?: string;
  action?: Function;
  flat?: boolean;
  ruleIndex: number;
  label?: string;
  skipAstNode?: boolean;
  rhs: Rhs;
}

interface Params {
  productions: ProductionRule[];
  lexer: {
    rules: LexerRule[];
  };
}

type FakeThis = { productions: ProductionRule[] };

class Grammar {
  prioritySymbolMap: Record<string, string> = {};

  nonTerminals: Record<string, NonTerminal> = {};

  itemSets: ItemSet[] = [];

  productions: ProductionRule[] = [];

  productionInstances: Production[] = [];

  isCompress: boolean = false;

  operators?: string[][];

  my?: any;

  lexer: Lexer = undefined!;

  static START_TAG = START_TAG;

  productionRuleIndexMap: Record<number, number> = {};

  productionIndexMap: Record<string, number>;

  constructor(cfg: Params) {
    Object.assign(this, cfg);

    let index = 0;

    for (const p of this.productions) {
      p.ruleIndex = ++index;
    }

    if (this.productions && this.productions[0]) {
      this.productions = [
        {
          ruleIndex: 1,
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
      predict: 4,
    };
  }

  setLexer(v: { rules: LexerRule[] } | Lexer) {
    if (!(v instanceof Lexer)) {
      const lexerInstance = new Lexer(v);
      var { productions } = this;
      const nonTerminals: Record<string, number> = {};
      for (const production of productions) {
        var { symbol } = production;
        nonTerminals[symbol] = 1;
      }
      for (const production of productions) {
        eachRhs(production.rhs, (rh) => {
          if (rh.length > 1 && (rh.endsWith('?') || rh.endsWith('*'))) {
            rh = normalizeSymbol(rh);
          }
          if (!lexerInstance.hasToken(rh) && !nonTerminals[rh]) {
            lexerInstance.addRule({
              token: rh,
              regexp: new RegExp(Utils.regexEscape(rh), 'g'),
            });
          }
        });
      }
      this.lexer = lexerInstance;
    }
    if (v instanceof Lexer) this.lexer = v;
  }

  // parser.d.ts
  genDTs(base: string) {
    const fake: FakeThis = {
      productions: this.productions.concat(),
    };

    this.expandProductionAlternative(fake);
    this.expandProductionGroup(fake);
    this.expandOptionalSymbol(fake);

    let code = [];

    const { productions } = fake;
    productions.shift();

    const allTokens = new Map();
    const rules = [...this.lexer.rules];
    const tokenAstNodeClassNames = new Map<string, string>();

    for (const token of ['$EOF', '$UNKNOWN']) {
      rules.push({
        token,
        regexp: /./,
      });
      const cls = getAstNodeClassName(token);
      tokenAstNodeClassNames.set(token, cls);
      code.push(
        `export interface ${cls} extends BaseTokenNode {
      token:${JSON.stringify(token)};
      parent:AstSymbolNode;
    }`,
      );
    }

    for (const r of rules) {
      if (r.token && r.token.match(/^[\d\w\$]+$/)) {
        allTokens.set(r.token, r.token);
      }
    }

    let tokenIndex = 0;

    const parentMap = new Map<string, Set<string>>();

    let firstSymbol: string = '';

    const productionsBySymbol: Record<
      string,
      {
        ruleIndexes: number[];
        skipAstNode: boolean;
        productions: ProductionRule[];
      }
    > = {};

    const productionsByLabel: Record<
      string,
      {
        ruleIndexes: number[];
        productions: ProductionRule[];
      }
    > = {};

    function getAstClassForParent(p: ProductionRule, index: number) {
      let n = getAstNodeClassName(
        p.skipAstNode ? p.symbol + '_Parent' : p.symbol,
      );
      if (productionsBySymbol[p.symbol].ruleIndexes.length > 1) {
        n += '_' + index;
      }
      return n;
    }

    function getAstClass(p: ProductionRule, index: number) {
      let n = getAstNodeClassName(p.symbol);
      if (productionsBySymbol[p.symbol].ruleIndexes.length > 1) {
        n += '_' + index;
      }
      return n;
    }

    for (let i = 0; i < productions.length; i++) {
      const p = productions[i];
      const { symbol, label } = p;
      {
        const item = (productionsBySymbol[symbol] = productionsBySymbol[
          symbol
        ] || {
          ruleIndexes: [],
          skipAstNode: false,
          productions: [],
        });
        item.skipAstNode = !!p.skipAstNode;
        item.productions[i] = p;
        item.ruleIndexes.push(i);
      }

      if (label) {
        const item = (productionsByLabel[label] = productionsByLabel[label] || {
          ruleIndexes: [],
          productions: [],
        });
        item.productions[i] = p;
        item.ruleIndexes.push(i);
      }
    }

    for (let i = 0; i < productions.length; i++) {
      const p = productions[i];
      const clsName = getAstClassForParent(p, i);
      if (!p.skipAstNode && !firstSymbol) {
        firstSymbol = p.symbol;
      }

      const { rhs } = p;
      for (let r of rhs) {
        if (typeof r !== 'string') {
          continue;
        }
        r = normalizeSymbol(r);
        let rhName;
        if (productionsBySymbol[r]) {
          rhName = r;
        } else if (allTokens.has(r)) {
          rhName = allTokens.get(r);
        } else {
          rhName = 'TOKEN_' + tokenIndex++;
          allTokens.set(r, rhName);
        }
        let parents = parentMap.get(rhName);
        if (!parents) {
          parents = new Set();
          parentMap.set(rhName, parents);
        }
        if (!parents.has(clsName)) {
          parents.add(clsName);
        }
      }
    }

    for (let i = 0; i < productions.length; i++) {
      const p = productions[i];
      if (p.skipAstNode) {
        const parents = Array.from(parentMap.get(p.symbol) || []);
        if (parents.length) {
          code.push(`
        type ${getAstClassForParent(p, i)} = ${parents.join('|')};
        `);
        }
      }
    }

    for (let i = 0; i < productions.length; i++) {
      const p = productions[i];
      const { rhs } = p;
      const rhsTypes = [];

      for (let or of rhs) {
        if (typeof or !== 'string') {
          continue;
        }

        const r = normalizeSymbol(or);
        let rhName;

        if (productionsBySymbol[r]) {
          rhName = r;
        } else if (allTokens.has(r)) {
          rhName = allTokens.get(r);
        } else {
          throw new Error('Error token:' + r);
        }

        let cls = getAstNodeClassName(rhName);
        if (
          !productionsBySymbol[rhName] &&
          !tokenAstNodeClassNames.has(rhName)
        ) {
          let parents = Array.from(parentMap.get(rhName) || []);
          code.push(`export interface ${cls} extends BaseTokenNode {
            token:${JSON.stringify(r)};
            ${parents && parents.length ? `parent:${parents.join(' | ')};` : ''}
          }`);
          tokenAstNodeClassNames.set(rhName, cls);
        }
        if (isOneOrMoreSymbol(or)) {
          cls = `...OneOrMore<${cls}>`;
        } else if (isZeroOrMoreSymbol(or)) {
          cls = `...ZeroOrMore<${cls}>`;
        } else if (productionsBySymbol[r]?.skipAstNode) {
          cls = `...${cls}`;
        }
        rhsTypes.push(cls);
      }

      {
        const className = getAstClass(p, i);
        let childrenType = `[${rhsTypes.join(',')}]`;
        if (p.skipAstNode) {
          code.push(`type ${className}  = ${childrenType};`);
        } else {
          let parents = Array.from(parentMap.get(p.symbol) || []);
          code.push(`interface ${className} extends BaseSymbolNode {
        symbol:${JSON.stringify(p.symbol)};
        ${p.label ? `label:${JSON.stringify(p.label)};` : ''}
        children:${childrenType};
        ${parents && parents.length ? `parent:${parents.join(' | ')};` : ''}
      }`);
        }
      }
    }

    const allClassNames: string[] = [];

    for (const symbol of Object.keys(productionsBySymbol)) {
      const { ruleIndexes, skipAstNode } = productionsBySymbol[symbol];
      const normalizeClassName = getAstNodeClassName(symbol);
      if (!skipAstNode) {
        allClassNames.push(normalizeClassName);
      }
      if (ruleIndexes.length > 1) {
        code.push(
          `${
            skipAstNode ? '' : 'export '
          }type ${normalizeClassName} = ${ruleIndexes
            .map((index) => {
              return getAstClass(productions[index], index);
            })
            .join(' | ')};`,
        );
      } else if (!skipAstNode) {
        code.push(`export type { ${normalizeClassName} };`);
      }
    }

    for (const label of Object.keys(productionsByLabel)) {
      const { ruleIndexes } = productionsByLabel[label];
      const normalizeClassName = getAstNodeClassName(label);
      code.push(
        `export type ${normalizeClassName} = ${ruleIndexes
          .map((index) => {
            return getAstClass(productions[index], index);
          })
          .join(' | ')};`,
      );
    }

    base = base.replace(/type AstSymbolNode =[^\n]+/, () => {
      return `type AstSymbolNode = ${allClassNames.join('|')};`;
    });

    base = base.replace(/type AstRootNode =[^\n]+/, () => {
      return `type AstRootNode = ${getAstNodeClassName(firstSymbol)};`;
    });

    base = base.replace(/type AstTokenNode =[^\n]+/, () => {
      return `type AstTokenNode = ${Array.from(
        tokenAstNodeClassNames.values(),
      ).join('|')};`;
    });

    base = base.replace(/type LiteralToken =[^\n]+/, () => {
      return `type LiteralToken = ${Array.from(allTokens.keys())
        .map((r) => JSON.stringify(r))
        .join('|')};`;
    });

    const AstNodeTypeMap: string[] = [];

    AstNodeTypeMap.push(`export type AstNodeTypeMap = { ast: AstNode;`);

    for (const symbol of Object.keys(productionsBySymbol)) {
      const { skipAstNode } = productionsBySymbol[symbol];
      if (!skipAstNode) {
        AstNodeTypeMap.push(`${symbol}: ${getAstNodeClassName(symbol)};`);
      }
    }
    for (const label of Object.keys(productionsByLabel)) {
      AstNodeTypeMap.push(`${label}: ${getAstNodeClassName(label)};`);
    }
    for (const token of tokenAstNodeClassNames.keys()) {
      AstNodeTypeMap.push(`${token}: ${tokenAstNodeClassNames.get(token)};`);
    }

    AstNodeTypeMap.push('};');

    base = base.replace(/export type AstNodeTypeMap =[^\n]+/, () =>
      AstNodeTypeMap.join('\n'),
    );

    return [base, ...code].join('\n');
  }

  // https://www.w3.org/TR/2010/REC-xquery-20101214/#EBNFNotation
  // https://www.bottlecaps.de/rr/ui
  toBNF() {
    const skipNodeProductionsMap: Record<string, string[]> = {};
    for (const p of this.productions) {
      if (p.skipAstNode) {
        skipNodeProductionsMap[p.symbol] = filterRhs(p.rhs);
      }
    }
    const { lexer } = this;
    const ret = [];

    function getSymbolBnf(r: string): string[] {
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

  getProductionItemByType(p: any, itemType: string | number) {
    if (this.isCompress) {
      return p[this.productionIndexMap[itemType]];
    }
    return p[itemType];
  }

  __expandProductions = 0;

  expandProductions() {
    if (this.__expandProductions) {
      return;
    }
    this.__expandProductions = 1;
    this.expandProductionAlternative();
    this.expandProductionGroup();
    this.expandProductionsInternal();
  }

  __expandProductionAlternatives = 0;

  expandProductionAlternative(fake?: FakeThis) {
    if (!fake && this.__expandProductionAlternatives) {
      return;
    }

    if (!fake) {
      this.__expandProductionAlternatives = 1;
    }

    fake = fake || this;

    let newPs: ProductionRule[] = [];
    for (const p of fake.productions) {
      newPs.push(...this.expandOneProductionAlternative(p));
    }
    fake.productions = newPs;
  }

  expandOneProductionAlternative(p: ProductionRule) {
    const { rhs } = p;

    type Node = {
      rh: Rh;
      tail: Node;
      childIndex: number;
      children: Node[];
    };

    const rhsRoot: Node = {
      rh: '',
      tail: null!,
      childIndex: -1,
      children: [],
    };

    function wrapRh(rh: Rh): Node {
      return {
        rh,
        tail: null!,
        childIndex: -1,
        children: [],
      };
    }

    function addChildren(node: Node, child: Node) {
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
      if (typeof rh === 'string' && rh.startsWith(endGroupMarker)) {
        let newChild = wrapRh(rh);
        const parent = stack.pop()!;
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

    function collect(node: Node, ret: Rh[], rets: Rh[][]) {
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

    const rhses: Rh[][] = [];

    collect(rhsRoot, [], rhses);

    return rhses.map((rhs) => ({
      ...p,
      rhs,
    }));
  }

  __expandProductionGroup = 0;

  expandProductionGroup(fake?: FakeThis) {
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
      const addedPs: ProductionRule[] = [];

      for (const p of ps) {
        uuid++;
        const { rhs } = p;
        const newRhs = [];
        for (let i = 0; i < rhs.length; i++) {
          const rh = rhs[i];
          if (rh === startGroupMarker) {
            changed = true;
            const start = i;
            i++;
            const subRhs = [];
            let nest = 0;
            let subRh: Rh = rhs[i];
            while (
              subRh &&
              (nest ||
                typeof subRh !== 'string' ||
                !subRh.startsWith(endGroupMarker))
            ) {
              if (subRh === startGroupMarker) {
                nest++;
              } else if (
                typeof subRh === 'string' &&
                subRh.startsWith(endGroupMarker)
              ) {
                nest--;
              }
              subRhs.push(subRh);
              i++;
              subRh = rhs[i];
            }
            if (typeof subRh !== 'string') {
              throw new Error('unexpected rh: ' + subRh);
            }
            const quantifier = subRh.slice(startGroupMarker.length);
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

            const existingP = findIdenticalProductionRule(
              [...newPs, ...addedPs, ...ps],
              subRhs,
              true,
            );

            let newSymbol =
              existingP?.symbol || `${p.symbol}_${uuid}_group_${start}`;
            if (!existingP) {
              addedPs.push({
                // do not keep label
                symbol: newSymbol,
                rhs: subRhs,
                ruleIndex: p.ruleIndex,
                skipAstNode: true,
              });
            }
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

    function arrayEqual<T>(a1: T[], a2: T[]) {
      const l = a1.length;
      if (a2.length !== l) {
        return false;
      }
      for (let i = 0; i < l; i++) {
        if (a1[i] !== a2[i]) {
          return false;
        }
      }
      return true;
    }

    function findIdenticalProductionRule(
      localPs: ProductionRule[],
      rhs: Rhs,
      skipNode: boolean,
    ) {
      for (const p of localPs) {
        if (p.skipAstNode === skipNode && arrayEqual(p.rhs, rhs)) {
          return p;
        }
      }
    }
    fake.productions = newPs;
  }

  expandProductionsInternal() {}

  getPrecedenceTerminal(p: ProductionRule) {
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
    const symbolSlashMap: Record<string, number> = {};

    function getSuffixSymbol(symbol: string) {
      let n = 1;
      if (symbolSlashMap[symbol]) {
        n = symbolSlashMap[symbol];
      } else {
        symbolSlashMap[symbol] = n;
      }
      return '(' + symbol + ')' + n + '_';
    }

    let { productionInstances } = this;

    // eliminate left recursive
    const nonTerminals: Record<string, number> = {};
    for (const p of productionInstances) {
      nonTerminals[p.symbol] = 1;
    }
    let needReplace = true;
    // direct left recursive
    // TODO: support indirect recursive
    while (needReplace) {
      needReplace = false;
      let newProductions2: Production[] = [];
      let emptySlashSet = new Set<string>();
      const deletedMap = new Set();
      const slashArgumentMap = new Map<string, Set<Production>>();
      const l = productionInstances.length;
      for (let i = 0; i < l; i++) {
        const p = productionInstances[i];
        if (p.symbol === p.rhs[0]) {
          const isFlat = p.flat;
          needReplace = true;
          const slashSymbol = getSuffixSymbol(p.symbol);
          const rhs = isFlat
            ? [...p.rhs.slice(1), slashSymbol]
            : [...p.rhs.slice(1), productionAddAstNodeFlag, slashSymbol];
          const newProd = new Production({
            // keep label here!
            ...p,
            skipAstNode: true,
            symbol: slashSymbol,
            rhs,
          });
          newProductions2.push(newProd);
          emptySlashSet.add(slashSymbol);
          for (let j = 0; j < l; j++) {
            const p2 = productionInstances[j];
            if (p2.symbol === p.symbol && p2.symbol !== p2.rhs[0]) {
              let slashSymbolSet = slashArgumentMap.get(slashSymbol);
              if (!slashSymbolSet) {
                slashSymbolSet = new Set();
                slashArgumentMap.set(slashSymbol, slashSymbolSet);
              }
              if (slashSymbolSet.has(p2)) {
                continue;
              }
              slashSymbolSet.add(p2);
              const rhs = isFlat
                ? [...p2.rhs, slashSymbol]
                : [...p2.rhs, productionAddAstNodeFlag, slashSymbol];
              const newProd = new Production({
                // do not keep label
                symbol: p.symbol,
                ruleIndex: p.ruleIndex,
                skipAstNode: p.skipAstNode,
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
        this.productionInstances = productionInstances = newProductions2.filter(
          (p) => !deletedMap.has(p),
        );
        for (const slashSymbol of emptySlashSet.values()) {
          const newProd = new Production({
            skipAstNode: true,
            symbol: slashSymbol,
            ruleIndex: 0,
            rhs: [],
          });
          productionInstances.push(newProd);
        }
      }
    }
  }

  expandProductionPriority() {
    // expand priority
    const { operators } = this;

    const { productions } = this;

    if (!operators) {
      return;
    }

    const rightMap: Record<string, number> = {};
    const priorityMap: Record<string, number> = {};
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

    const getPriority = (p1: ProductionRule) => {
      const precedenceTerminal1 = this.getPrecedenceTerminal(p1)!;
      const priority1 = priorityMap[precedenceTerminal1];
      return priority1;
    };

    const unrelevants = productions.filter((p) => !getPriority(p));
    const relevantProductions = productions.filter((p) => !!getPriority(p));

    relevantProductions.sort((p1: ProductionRule, p2: ProductionRule) => {
      return getPriority(p1) - getPriority(p2);
    });

    function getSymbol(s: string, priority: string | number) {
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
    const newRelevants: ProductionRule[] = [];

    function getNextP(productions: ProductionRule[], index: number) {
      const p = productions[index];
      const priority = getPriority(p);
      while (++index < productions.length) {
        if (getPriority(productions[index]) > priority) {
          return productions[index];
        }
      }
    }
    const { prioritySymbolMap } = this;

    const transformPart = (ps: ProductionRule[]) => {
      const l = ps.length;
      const symbol = ps[0].symbol;
      const startSymbol = getSymbol(symbol, getPriority(ps[0]));
      const endSymbol = getSymbol(symbol, 'end');
      prioritySymbolMap[endSymbol] = symbol;
      let already = new Map();
      for (let i = 0; i < l; i++) {
        const p = ps[i];
        const { rhs } = p;
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
            // do not keep label
            symbol: expSymbol,
            ruleIndex: p.ruleIndex,
            rhs: [nextSymbol],
          });
          already.set(expSymbol, nextSymbol);
        }
        // unary
        if (rhs.filter((r) => r === symbol).length === 1) {
          newRelevants.push({
            ...p,
            symbol: expSymbol,
            rhs: rhs.map((r) => {
              return r === symbol ? expSymbol : r;
            }),
          });
          continue;
        }
        let newRhs;
        if (precedenceTerminal && rightMap[precedenceTerminal]) {
          let replaced = false;
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
          ...p,
          symbol: expSymbol,
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

  __expandOptionalSymbol = 0;

  expandOptionalSymbol(fake?: FakeThis) {
    if (!fake && this.__expandOptionalSymbol) {
      return;
    }
    if (!fake) {
      this.__expandOptionalSymbol = 1;
    }
    fake = fake || this;
    var { productions: vs } = fake;
    const newVs: ProductionRule[] = [];
    for (const p of vs) {
      const { rhs } = p;
      const keys: number[] = [];
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

  __expandOneOrMoreSymbol = 0;

  expandOneOrMoreSymbol(fake?: FakeThis) {
    if (!fake && this.__expandOneOrMoreSymbol) {
      return;
    }
    if (!fake) {
      this.__expandOneOrMoreSymbol = 1;
    }
    let newPs: ProductionRule[] = [];
    fake = fake || this;
    for (const p of fake.productions) {
      const { rhs } = p;
      const newRhs = [];
      for (let i = 0; i < rhs.length; i++) {
        const r = rhs[i];
        if (isOneOrMoreSymbol(r) && typeof r === 'string') {
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

  __expandZeroOrMoreSymbol = 0;

  expandZeroOrMoreSymbol(fake?: FakeThis) {
    if (!fake && this.__expandZeroOrMoreSymbol) {
      return;
    }
    if (!fake) {
      this.__expandZeroOrMoreSymbol = 1;
    }
    fake = fake || this;
    const gened: Record<string, string> = {};
    let zeroMoreIndex = 1;
    const zeroMorePrefix = 'zeroMore';
    let newVs2: ProductionRule[] = [];
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
          if (typeof r === 'string') {
            if (!gened[r]) {
              const nr = normalizeSymbol(r);
              const genId = (gened[r] =
                zeroMorePrefix + '_' + nr + '_' + zeroMoreIndex++);
              newVs2.push(
                {
                  symbol: genId,
                  ruleIndex: p.ruleIndex,
                  rhs: [genId, nr],
                  flat: true,
                  skipAstNode: true,
                },
                {
                  symbol: genId,
                  ruleIndex: p.ruleIndex,
                  rhs: [],
                  skipAstNode: true,
                },
              );
            }
            newRhs[k] = gened[r];
          } else {
            newRhs[k] = r;
          }
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
    this.productionInstances = this.productions.map((p) => new Production(p));
    this.buildProductions();
    this.buildMeta();
  }

  buildProductions() {}

  buildNonTerminals() {
    var { lexer, nonTerminals } = this;
    var productionInstances = this.productionInstances;
    for (const production of productionInstances) {
      var { symbol } = production;
      var nonTerminal = nonTerminals[symbol];
      if (!nonTerminal) {
        nonTerminal = nonTerminals[symbol] = new NonTerminal({
          symbol: symbol,
        });
      }
      nonTerminal.productions.push(production);
      eachRhs(production.rhs, (rh) => {
        if (!lexer.hasToken(rh) && !nonTerminals[rh]) {
          nonTerminals[rh] = new NonTerminal({
            symbol: rh,
          });
        }
      });
    }
  }

  buildNullable() {
    var i, rhs, n, t, production;
    var { nonTerminals } = this;
    var productionInstances = this.productionInstances;
    var cont = true;
    // loop until no further changes have been made
    while (cont) {
      cont = false;
      // 传递
      // S -> T
      // T -> t
      // check if each production is null able
      for (const production of productionInstances) {
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
      for (const k of Object.keys(nonTerminals)) {
        const v = nonTerminals[k];
        if (!v.nullable) {
          ({ productions: productionInstances } = v);
          for (i = 0; (production = productionInstances[i]); i++) {
            if (production.nullable) {
              v.nullable = cont = true;
              break;
            }
          }
        }
      }
    }
  }

  isNullable(symbol: string | string[]) {
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
    if (!nonTerminals[symbol]) {
      return false;
      // non terminal
    } else {
      return nonTerminals[symbol].nullable;
    }
  }

  findFirst(symbol: string | string[]) {
    var firsts: Record<string, number> = {};
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
    const productionInstances = this.productionInstances;
    // loop until no further changes have been made
    while (cont) {
      cont = false;
      // 传递
      // S -> T
      // T -> t

      // S -> S y
      // S -> t
      for (const production of productionInstances) {
        const firsts = this.findFirst(filterRhs(production.rhs));
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

  getProductionSymbol(p: ProductionRule) {
    return this.getProductionItemByType(p, 'symbol');
  }
  getProductionRhs(p: ProductionRule) {
    return this.getProductionItemByType(p, 'rhs');
  }
  getProductionAction(p: ProductionRule) {
    return this.getProductionItemByType(p, 'action');
  }
  getProductionPredict(p: ProductionRule) {
    return this.getProductionItemByType(p, 'predict');
  }
  getProductionLabel(p: ProductionRule) {
    return this.getProductionItemByType(p, 'label');
  }

  mapSymbol(s: Rh): Rh {
    if (typeof s === 'string') {
      return this.lexer.mapSymbol(s);
    }
    return s;
  }

  mapSymbols(s: Rhs): Rhs {
    return s.map((t) => this.mapSymbol(t));
  }

  genCodeInternal(code: string[], cfg: any) {
    console.log(code, cfg);
    return '';
  }

  genCode(cfg: any) {
    cfg = cfg || {};
    var { lexer } = this;
    var lexerCode = lexer.genCode(cfg);
    this.build();
    var productions = [];
    const { productionIndexMap } = this;
    for (const p of this.productionInstances) {
      var { action, label, predict } = p;
      var ret = [];
      ret[productionIndexMap.symbol] = this.mapSymbol(p.symbol);
      ret[productionIndexMap.rhs] = this.mapSymbols(p.rhs);
      if (action) {
        ret[productionIndexMap.action] = action;
      }
      if (label) {
        ret[productionIndexMap.label] = this.mapSymbol(label);
      }
      if (predict) {
        ret[productionIndexMap.predict] = predict;
      }
      productions.push(ret);
    }
    var code = [];
    for (const key of Object.keys(globalUtils)) {
      code.push(`var ${key} = ${serializeObject((globalUtils as any)[key])};`);
    }
    for (const key of Object.keys(dataGened)) {
      code.push(`var ${key} = ${serializeObject((dataGened as any)[key])};`);
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
          getProductionPredict: this.getProductionPredict,
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

    const productionSkipAstNodeSet: number[] = [];
    this.productionInstances.forEach((p, index) => {
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

    let index = 0;

    for (const p of this.productions) {
      this.productionRuleIndexMap[index++] = p.ruleIndex;
    }

    internalCode +=
      '\n' +
      'var productionRuleIndexMap = ' +
      serializeObject(this.productionRuleIndexMap) +
      ';';

    if (cfg.compressSymbol) {
      internalCode +=
        '\nlexer.symbolMap = ' + serializeObject(lexer.symbolMap) + ';';
    }

    return '(function(undefined){' + internalCode + '\n return parser; \n})()';
  }
}

export default Grammar;
