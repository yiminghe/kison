import type { Context } from '../Context';
import type { Block_Node, SubStmt_Node, FunctionStmt_Node } from '../../parser';
import { load } from '../loader/loaders';
import { VBObject, AsTypeClauseInfo, getDEFAULT_AS_TYPE } from './VBValue';
import type { VBFile, ArgInfo, Visibility } from './runtime';

export class SubSymbolItem {
  block: Block_Node;
  name: string = '';
  private _argumentsInfo?: ArgInfo[];
  private _returnInfo?: AsTypeClauseInfo;
  type: 'sub' | 'function' | 'propertyGet' | 'propertyLet' | 'propertySet';
  private _visibility?: Visibility;
  file: VBFile;
  _static?: boolean;
  staticVariables: Map<string, VBObject> = new Map();

  addStaticVariable(name: string, value: VBObject) {
    this.staticVariables.set(name, value);
  }

  getStaticVariable(name: string) {
    return this.staticVariables.get(name);
  }

  hasStaticVariable(name: string) {
    return this.staticVariables.has(name);
  }

  constructor(
    public sub: SubStmt_Node | FunctionStmt_Node,
    public context: Context,
  ) {
    this.file = context.currentFile;
    this.type = this.sub.symbol === 'subStmt' ? 'sub' : 'function';
    let block;
    for (const c of sub.children) {
      if (c.type === 'symbol' && c.symbol === 'block') {
        block = c;
      } else if (c.type === 'token' && c.token === 'IDENTIFIER') {
        this.name = c.text;
      }
    }
    if (!block) {
      throw new Error('unexpected SubSymbolItem');
    }
    this.block = block;
  }

  get isStatic() {
    if (this._static !== undefined) {
      return this._static;
    }
    const first = this.sub.children[0];
    this._static = false;
    if (first.type === 'token' && first.token === 'STATIC') {
      this._static = true;
    }
    return this._static;
  }

  get visibility() {
    if (this._visibility !== undefined) {
      return this._visibility;
    }
    this._visibility = 'PUBLIC';
    const child0 = this.sub.children[0];
    if (child0.type === 'symbol' && child0.symbol === 'visibility') {
      const access = child0.children[0];
      this._visibility = access.token;
    }
    return this._visibility;
  }

  async init() {
    this._argumentsInfo = [];
    for (const c of this.sub.children) {
      if (c.type === 'symbol' && c.symbol === 'argList') {
        this._argumentsInfo = await load(c, this.context);
      } else if (c.type === 'symbol' && c.symbol === 'asTypeClause') {
        this._returnInfo = await load(c, this.context);
      }
    }
    this._returnInfo = this._returnInfo || getDEFAULT_AS_TYPE();
    this._argumentsInfo = this._argumentsInfo || [];
  }

  get arugmentsInfo() {
    return this._argumentsInfo!;
  }

  get returnInfo(): AsTypeClauseInfo {
    return this._returnInfo!;
  }
}
