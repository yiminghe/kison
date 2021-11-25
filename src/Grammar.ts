import Utils from './utils';
var { filterRhs, serializeObject, eachRhs, globalUtils, getAstNodeClassName } =
  Utils;
import NonTerminal from './NonTerminal';
import Lexer, { LexerRule } from './Lexer';
import Production from './Production';
import data from './data';
import type { Table } from './data';
import { Rh, Rhs } from './types';
import ItemSet from './lalr/ItemSet';

const {
  productionAddAstNodeFlag,
  gened: dataGened,
  START_TAG,
  astStack,
} = data;
const {
  isOneOrMoreSymbol,
  isOptionalSymbol,
  isZeroOrMoreSymbol,
  normalizeSymbol,
} = Utils;

const startGroupMarker = `'('`;
const startPredictGroupMarker = `'(?'`;
const endGroupMarker = `')'`;
const alterMark = `'|'`;
const alterPredictMark = `'|?'`;

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
  label?: string;
  rhs: Rhs;

  //begin internal: not public api
  flat?: boolean;
  ruleIndex?: number;
  skipAstNode?: boolean;
  isWrap?: boolean;
  // end internal
}

interface Params {
  productions: ProductionRule[];
  lexer: {
    rules: LexerRule[];
  };
}

type FakeThis = { productions: ProductionRule[] };

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
  predict: Function | undefined,
  action: Function | undefined,
) {
  for (const p of localPs) {
    if (
      p.skipAstNode === skipNode &&
      p.action === action &&
      arrayEqual(p.rhs, rhs) &&
      p.predict == predict
    ) {
      return p;
    }
  }
}

class Grammar {
  checkConflicts: boolean = false;

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
      isWrap: 5,
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
  genDTs(base: string, astNodeUserDataTypes: string) {
    const fake: FakeThis = {
      productions: this.productions.concat(),
    };
    this.expandProductionAlternativeAndGroup(fake);
    // this.expandProductionAlternative(fake);
    // this.expandProductionGroup(fake);
    this.expandOptionalSymbol(fake);

    let code = [];

    const { productions } = fake;
    productions.shift();

    const allTokens = new Map();
    const rules = [...this.lexer.rules];
    const tokenAstNodeClassNames = new Map<string, string>();

    function argumentUserDataType(names: string[], cls: string) {
      if (astNodeUserDataTypes) {
        return `type ${cls} = ${cls}_ & {userData:AstNodeUserDataType<${JSON.stringify(
          names,
        )}>};`;
      } else {
        return `type ${cls} = ${cls}_;`;
      }
    }

    if (astNodeUserDataTypes) {
      code.push(astNodeUserDataTypes);
      code.push(
        `
      type SingleAstNodeUserDataType<T extends string> =  T extends keyof AstNodeUserDataTypes?AstNodeUserDataTypes[T]:{};

      type ShiftArray<A extends any[]> = A extends [any,...infer U]?U:[];

      type AstNodeUserDataType<T extends string[], R={}> =  
      T['length'] extends 0 ?R:AstNodeUserDataType<ShiftArray<T>,R & SingleAstNodeUserDataType<T[0]>>
      ;
      `.trim(),
      );
    }

    for (const token of ['$EOF', '$UNKNOWN']) {
      rules.push({
        token,
        regexp: /./,
      });
      const cls = getAstNodeClassName(token);
      tokenAstNodeClassNames.set(token, cls);
      code.push(
        `interface ${cls}_ extends BaseTokenNode {
      token:${JSON.stringify(token)};
      parent:AstSymbolNode;
    }`,
      );
      code.push('export ' + argumentUserDataType([token, 'token', 'ast'], cls));
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
          code.push(`interface ${cls}_ extends BaseTokenNode {
            token:${JSON.stringify(r)};
            ${parents && parents.length ? `parent:${parents.join(' | ')};` : ''}
          }`);
          code.push('export ' + argumentUserDataType([r, 'token', 'ast'], cls));
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
          code.push(`interface ${className}_ extends BaseSymbolNode {
        symbol:${JSON.stringify(p.symbol)};
        ${p.label ? `label:${JSON.stringify(p.label)};` : ''}
        children:${childrenType};
        ${parents && parents.length ? `parent:${parents.join(' | ')};` : ''}
      }`);
          const names = [p.symbol, 'symbol', 'ast'];
          if (p.label) {
            names.unshift(p.label);
          }
          code.push(argumentUserDataType(names, className));
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
      return p && p[this.productionIndexMap[itemType]];
    }
    return p && p[itemType];
  }

  __expandProductions = 0;

  expandProductions() {
    if (this.__expandProductions) {
      return;
    }
    this.__expandProductions = 1;
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

  __expandProductionAlternativeAndGroup = 0;

  expandProductionAlternativeAndGroup(fake?: FakeThis) {
    if (!fake && this.__expandProductionAlternativeAndGroup) {
      return;
    }

    if (!fake) {
      this.__expandProductionAlternativeAndGroup = 1;
    }

    fake = fake || this;

    let newPs: ProductionRule[] = [];
    const uuid = { id: 1 };
    for (const p of fake.productions) {
      this.expandOneProductionAlternativeAndGroup(p, uuid, newPs);
    }
    fake.productions = newPs;
  }

  expandOneProductionAlternativeAndGroup(
    p: ProductionRule,
    uuid: { id: number },
    newPs: ProductionRule[],
  ) {
    const originalLength = newPs.length;

    const { rhs } = p;

    type Node = {
      predict: boolean;
      rh: Rh;
      tail: Node;
      groupEnd: Node | undefined;
      childIndex: number;
      children: Node[];
    };

    const rhsRoot: Node = {
      predict: false,
      rh: '',
      tail: null!,
      groupEnd: undefined,
      childIndex: -1,
      children: [],
    };

    function wrapRh(rh: Rh, predict: boolean): Node {
      return {
        predict,
        rh,
        groupEnd: undefined,
        tail: null!,
        childIndex: -1,
        children: [],
      };
    }

    function addChildren(node: Node, child: Node) {
      if (
        node.rh === startGroupMarker ||
        node.rh === startPredictGroupMarker ||
        !node.rh
      ) {
        child.childIndex = node.children.length;
      } else if (node.childIndex !== undefined) {
        child.childIndex = node.childIndex;
      }
      node.children.push(child);
    }

    let stack = [rhsRoot];
    let current = stack[0];
    let predict = false;

    for (const rh of rhs) {
      if (rh === alterMark || rh === alterPredictMark) {
        current = stack[stack.length - 1];
        if (rh === alterPredictMark) {
          predict = true;
        }
        continue;
      }

      if (typeof rh === 'string' && rh.startsWith(endGroupMarker)) {
        let newChild = wrapRh(rh, false);
        const parent = stack.pop()!;
        for (const c of parent.children) {
          addChildren(c.tail, newChild);
          c.groupEnd = newChild;
        }
        newChild.childIndex = parent.childIndex;
        current = newChild;
      } else {
        let newChild = wrapRh(rh, predict);
        addChildren(current, newChild);
        current = newChild;
        if (predict) {
          if (typeof rh !== 'function') {
            throw new Error('expect predict function!');
          }

          predict = false;
        }
      }

      const topItem = stack[stack.length - 1];
      topItem.children[current.childIndex].tail = current;

      if (rh === startGroupMarker || rh === startPredictGroupMarker) {
        stack.push(current);
        if (rh === startPredictGroupMarker) {
          predict = true;
        }
      }
    }

    function collect(
      node: Node,
      end: Node | undefined,
      ret: { predict?: any; rhs: Rh[] },
    ): void {
      if (node === end) {
        return;
      }
      const { rh } = node;

      function pushNode() {
        if (
          node.rh &&
          (typeof node.rh !== 'string' || !node.rh.startsWith(endGroupMarker))
        ) {
          if (node.predict) {
            ret.predict = node.rh;
          } else {
            ret.rhs.push(node.rh);
          }
        }
      }

      if (!node.children.length) {
        pushNode();
      } else {
        const child = node.children[0];
        if (node.children.length === 1) {
          if (rh === startGroupMarker || rh === startPredictGroupMarker) {
            const crh = child.groupEnd?.rh;
            if (
              typeof crh !== 'string' ||
              crh === endGroupMarker ||
              !crh.startsWith(endGroupMarker)
            ) {
              return collect(child, child.groupEnd, ret);
            }
          } else {
            pushNode();
            return collect(child, end, ret);
          }
        }
        let subEnd;
        if (child.groupEnd) {
          subEnd = child.groupEnd;
        }
        const quantifier = subEnd
          ? (subEnd.rh as string).slice(endGroupMarker.length)
          : '';

        let groupSymbol = `${p.symbol}_group_${uuid.id++}`;

        for (const c of node.children) {
          const subRet = { predict: undefined, rhs: [] };

          collect(c, subEnd, subRet);
          const existingP = findIdenticalProductionRule(
            newPs,
            subRet.rhs,
            true,
            subRet.predict,
            undefined,
          );

          let newSymbol =
            existingP?.symbol || `${p.symbol}_group_def_${uuid.id++}`;

          if (!existingP) {
            newPs.push({
              ruleIndex: p.ruleIndex,
              symbol: newSymbol,
              rhs: subRet.rhs,
              skipAstNode: true,
            });
          }

          if (node.children.length === 1 && !subRet.predict) {
            groupSymbol = newSymbol;
          } else {
            newPs.push({
              symbol: groupSymbol,
              predict: subRet.predict,
              ruleIndex: p.ruleIndex,
              rhs: [newSymbol],
              skipAstNode: true,
            });
          }
        }

        ret.rhs.push(groupSymbol + quantifier);

        if (subEnd) {
          collect(subEnd, end, ret);
        }
      }
    }
    function processOneRoot(node: Node) {
      const ret = { predict: undefined, rhs: [] };

      collect(node, undefined, ret);

      newPs.push({
        ...p,
        ...ret,
      });
    }

    if (rhsRoot.children.length > 1 && !rhsRoot.children[0].groupEnd) {
      for (const c of rhsRoot.children) {
        processOneRoot(c);
      }
    } else {
      processOneRoot(rhsRoot);
    }

    if (p.predict) {
      for (let l = originalLength; l < newPs.length; l++) {
        if (!newPs[l].predict) {
          newPs[l].predict = p.predict;
        }
      }
    }
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
      if (
        node.rh === startGroupMarker ||
        node.rh === startPredictGroupMarker ||
        !node.rh
      ) {
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

      if (rh === startGroupMarker || rh === startPredictGroupMarker) {
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
          if (rh === startGroupMarker || rh === startPredictGroupMarker) {
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
              if (
                subRh === startGroupMarker ||
                subRh === startPredictGroupMarker
              ) {
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
            const quantifier = subRh.slice(endGroupMarker.length);
            const validRhs = subRhs.filter((rh) => {
              if (typeof rh !== 'string') {
                return false;
              }
              if (
                rh === startGroupMarker ||
                rh === startPredictGroupMarker ||
                rh === endGroupMarker
              ) {
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
              undefined,
              undefined,
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
                // // do not keep label
                ...p2,
                //label:'',
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
            symbol: expSymbol,
            ruleIndex: p.ruleIndex,
            // will collapse when node is done(all children computed)
            isWrap: true,
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
  setTable(symbol: string, terminal: string, index: number, follow = false) {
    index = follow ? -index : index;
    const { table, productionInstances } = this;
    table[symbol] = table[symbol] || {};
    const predicts = (table[symbol][terminal] = table[symbol][terminal] || []);
    if (predicts.indexOf(index) === -1) {
      predicts.push(index);
    }
    if (this.checkConflicts && predicts.length > 1) {
      const e = ['', `Conflict: ${symbol} , ${terminal} ->`];
      for (const i of predicts) {
        e.push(
          (i > 0 ? '' : '-: ') + productionInstances[Math.abs(i)].toString(),
        );
      }
      e.push('');
      console.error(e.join('\n'));
    }
  }

  buildTable() {
    const { productionInstances } = this;
    for (let index = 0; index < productionInstances.length; index++) {
      const p = productionInstances[index];
      let { symbol, rhs: oRhs } = p;
      const rhs = filterRhs(oRhs);
      if (symbol === '_1(Group)') {
        debugger;
      }
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
    const { table, productionInstances } = this;
    for (const nonTerminal of Object.keys(table)) {
      const col = table[nonTerminal];
      if (col) {
        for (const terminal of Object.keys(col)) {
          const pss = col[terminal];
          if (pss !== undefined) {
            for (const ps of pss) {
              const production = productionInstances[Math.abs(ps)];
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
    }
    return ret.join('\n');
  }

  buildMeta() {
    this.buildNonTerminals();
    this.buildNullable();
    this.buildFirsts();
    this.buildFollows();
    debugger;
    this.buildTable();
  }

  genTable(code: string[]) {
    const { table, lexer } = this;
    const mappedTable: Table = {};
    for (const nonTerminal of Object.keys(table)) {
      const col = table[nonTerminal];
      if (col) {
        const mappedCol: Record<string, number[]> = {};
        for (const terminal of Object.keys(col)) {
          const ps = col[terminal];
          if (ps !== undefined) {
            col[terminal] = ps.map((p) => Math.abs(p));
            mappedCol[lexer.mapSymbol(terminal)] = col[terminal];
          }
        }
        mappedTable[lexer.mapSymbol(nonTerminal)] = mappedCol;
      }
    }
    code.push(
      'const parserPredictTable = ' + serializeObject(mappedTable) + ';',
    );
  }

  build() {
    this.expandProductions();
    this.productionInstances = this.productions.map((p) => new Production(p));
    this.buildProductions();
    this.buildMeta();
  }

  buildProductions() {}

  buildNonTerminals() {
    var { lexer, nonTerminals, productionInstances } = this;
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
        rh = normalizeSymbol(rh);
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
    var { nonTerminals, productionInstances } = this;
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

    if (isOptionalSymbol(symbol) || isZeroOrMoreSymbol(symbol)) {
      return true;
    }
    symbol = normalizeSymbol(symbol);
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
        const normalizeT = normalizeSymbol(t);

        if (!nonTerminals[normalizeT]) {
          firsts[normalizeT] = 1;
        } else {
          Object.assign(firsts, nonTerminals[normalizeT].firsts);
        }

        if (!this.isNullable(t)) {
          break;
        }
      }
      return firsts;
      // terminal
    }
    symbol = normalizeSymbol(symbol);
    if (!nonTerminals[symbol]) {
      return { [symbol]: 1 };
      // non terminal
    } else {
      return nonTerminals[symbol].firsts;
    }
  }

  table: Table = {};

  findFollows(symbol: string) {
    var { nonTerminals } = this;
    if (!nonTerminals[symbol]) {
      return { [symbol]: 1 };
      // non terminal
    } else {
      return nonTerminals[symbol].follows;
    }
  }

  buildFollows() {
    const { productionInstances, nonTerminals } = this;
    var cont = true;
    var nonTerminal, symbol;
    var mappedStartTag = productionInstances[0].symbol;
    var { EOF_TOKEN } = Lexer.STATIC;
    nonTerminals[mappedStartTag].addFollows({
      [EOF_TOKEN]: 1,
    });
    // loop until no further changes have been made
    while (cont) {
      cont = false;
      for (symbol of Object.keys(nonTerminals)) {
        nonTerminal = nonTerminals[symbol];
        for (const p of productionInstances) {
          let { rhs, symbol: leftSymbol } = p;
          rhs = filterRhs(rhs);
          let index = -1;
          for (let i = 0; i < rhs.length; i++) {
            const rh = normalizeSymbol(rhs[i]);
            if (rh === symbol) {
              index = i;
            }
          }
          if (index !== -1) {
            const rh = rhs[index];
            const isZeroOrMore = isZeroOrMoreSymbol(rh);
            if (index !== rhs.length - 1 || isZeroOrMore) {
              const nextSymbols = filterRhs(
                rhs.slice(isZeroOrMore ? index : index + 1),
              );
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

  buildFirsts() {
    var { nonTerminals, productionInstances } = this;
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
  getProductionIsWrap(p: ProductionRule) {
    return this.getProductionItemByType(p, 'isWrap');
  }
  getProductionLabel(p: ProductionRule) {
    return this.getProductionItemByType(p, 'label');
  }

  getCurrentSymbolNode() {
    return astStack[astStack.length - 1];
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

  genCode(
    cfg: {
      compressSymbol?: boolean;
      compressState?: boolean;
    } = {},
  ) {
    var { lexer } = this;
    var lexerCode = lexer.genCode(cfg);
    this.build();
    var productions = [];
    const { productionIndexMap } = this;
    for (const p of this.productionInstances) {
      var { action, label, predict, isWrap } = p;
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
      if (isWrap) {
        ret[productionIndexMap.isWrap] = isWrap;
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

    const methodKeys = [
      'getProductionItemByType',
      'getProductionSymbol',
      'getProductionRhs',
      'getProductionAction',
      'getProductionPredict',
      'getProductionIsWrap',
      'getProductionLabel',
      'getCurrentSymbolNode',
    ];

    code.push(
      'var parser = ' +
        serializeObject({
          productions,
          productionIndexMap,
          isCompress: 1,
          ...methodKeys.reduce((ret: any, m) => {
            ret[m] = (this as any)[m];
            return ret;
          }, {} as any),
        }) +
        ';',
    );

    code.push(
      ...methodKeys.map((m) => `parser.${m}=parser.${m}.bind(parser);`),
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
      this.productionRuleIndexMap[index++] = p.ruleIndex!;
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
