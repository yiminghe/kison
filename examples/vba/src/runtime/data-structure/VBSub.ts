import type { Context } from '../Context';
import type {
  Ast_Block_Node,
  Ast_SubStmt_Node,
  Ast_FunctionStmt_Node,
  Ast_PropertyGetStmt_Node,
  Ast_PropertyLetStmt_Node,
  Ast_PropertySetStmt_Node,
} from '../../parser';
import { load } from '../loader/loaders';
import { AsTypeClauseInfo, getDEFAULT_AS_TYPE } from './VBValue';
import { VBPointer } from './VBPointer';
import type { VBFile, ArgInfo, Visibility } from './runtime';

export class VBSub {
  block: Ast_Block_Node | undefined;
  name: string = '';
  private _argumentsInfo?: ArgInfo[];
  private _returnInfo?: AsTypeClauseInfo;
  type: 'sub' | 'function';
  private _visibility?: Visibility;
  file: VBFile;
  _static?: boolean;
  staticVariables: Map<string, VBPointer> = new Map();

  addStaticVariable(name: string, value: VBPointer) {
    this.staticVariables.set(name, value);
  }

  getStaticVariable(name: string) {
    return this.staticVariables.get(name);
  }

  hasStaticVariable(name: string) {
    return this.staticVariables.has(name);
  }

  constructor(
    public sub:
      | Ast_FunctionStmt_Node
      | Ast_SubStmt_Node
      | Ast_PropertyGetStmt_Node
      | Ast_PropertyLetStmt_Node
      | Ast_PropertySetStmt_Node,
    public context: Context,
  ) {
    this.file = context.currentFile;
    const subSymbol = this.sub.symbol;
    this.type =
      subSymbol === 'subStmt' ||
      subSymbol === 'propertyLetStmt' ||
      subSymbol === 'propertySetStmt'
        ? 'sub'
        : 'function';
    let block;
    for (const c of sub.children) {
      if (c.type === 'symbol' && c.symbol === 'block') {
        block = c;
      } else if (c.type === 'symbol' && c.symbol === 'ambiguousIdentifier') {
        this.name = c.children[0].text;
      }
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

  isPrivate() {
    return this.visibility === 'PRIVATE';
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