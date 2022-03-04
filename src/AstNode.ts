import type { ParseError } from './types';
import data from './data';

interface Params {
  parent?: AstNode;
}

interface TokenParams extends Params {
  token?: string;
  text?: string;
  t?: string;
}

interface ErrorTokenParams extends TokenParams {
  error?: ParseError;
}

interface SymbolParams extends Params {
  id: number;
  children?: AstNode[] | undefined;
  symbol: string;
  label?: string | undefined;
  isWrap?: boolean | undefined;
  internalRuleIndex?: number | undefined;
}

export type AstNode = AstSymbolNode | AstTokenNode;

export class BaseAstNode {
  parent: AstSymbolNode | undefined;
  start: number = 0;
  end: number = 0;
  firstLine: number = 0;
  lastLine: number = 0;
  firstColumn: number = 0;
  lastColumn: number = 0;

  toJSON() {
    const ret: Record<string, any> = {};
    for (const k of Object.keys(this)) {
      if (k !== 'parent' && k !== 't') {
        const v = (this as any)[k];
        if (v !== undefined) {
          ret[k] = v;
        }
      }
    }
    return ret;
  }
}

export class AstTokenNode extends BaseAstNode {
  token: string = '';
  t: string = '';
  recovery?: string;
  type: 'token' = 'token';
  text: string = '';
  constructor(params: TokenParams) {
    super();
    Object.assign(this, params);
  }
}

export class AstErrorNode extends AstTokenNode {
  error?: ParseError;
  constructor(ErrorTokenParams: ErrorTokenParams) {
    super(ErrorTokenParams);
    Object.assign(ErrorTokenParams);
  }
}

const { productionRuleIndexMap } = data;

export class AstSymbolNode extends BaseAstNode {
  symbol: string = '';
  label: string | undefined;
  type: 'symbol' = 'symbol';
  children: AstNode[] = [];
  ruleIndex: number = -1;
  internalRuleIndex: number = -1;
  isWrap: boolean | undefined;

  constructor(params: SymbolParams) {
    super();
    Object.assign(this, params);
    if (params.children) {
      this.setChildren(params.children);
    }
    if (params.internalRuleIndex !== undefined) {
      this.ruleIndex = productionRuleIndexMap[this.internalRuleIndex];
    }
  }

  addChild(c: AstNode) {
    this.addChildren([c]);
  }

  addChildren(cs: AstNode[]) {
    this.children = this.children || [];
    this.children.push(...cs);
    this.setChildren(this.children);
  }

  done(): boolean {
    if (this.isWrap && this.children.length === 1) {
      const c = this.children[0];
      if (c.type === 'symbol' && c.symbol === this.symbol) {
        this.label = c.label;
        this.setChildren(c.children);
        return false;
      }
    }
    this.setChildren(this.children);
    return true;
  }

  setChildren(cs: AstNode[]) {
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

  override toJSON() {
    const ret = super.toJSON();
    const { children } = ret;
    const l = children?.length;
    if (l) {
      const nc = new Array(l);
      for (let i = 0; i < l; i++) {
        nc[i] = children[i].toJSON();
      }
      ret.children = nc;
    }
    return ret;
  }
}
