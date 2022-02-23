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
import { evaluateNodes } from '../evaluator/evaluators';
import { getIdentifierName, isIdentifierSymbol } from '../utils';
import { throwVBRuntimeError } from './VBError';
import { collect_asTypeClause } from '../collect/collectType';

export class VBSub {
  block: Ast_Block_Node | undefined;
  name = '';
  private _argumentsInfo?: ArgInfo[];
  private _returnInfo?: AsTypeClauseInfo;
  type: 'sub' | 'function' = 'sub';
  private _visibility?: Visibility;
  file: VBFile = null!;
  _static?: boolean;
  staticVariables: Map<string, VBPointer> = new Map();
  private lineLabelMap: Map<string, number> = new Map();

  onErrorLineLabel: string | undefined;

  addStaticVariable(name: string, value: VBPointer) {
    this.staticVariables.set(name, value);
  }

  getStaticVariable(name: string) {
    return this.staticVariables.get(name);
  }

  hasStaticVariable(name: string) {
    return this.staticVariables.has(name);
  }

  async onError() {
    if (!this.onErrorLineLabel) {
      throw new Error('need on error label!');
    }
    await this.gotoLineLabel(this.onErrorLineLabel);
  }

  async gotoLineLabel(name: string) {
    const i = this.lineLabelMap.get(name);
    if (i === undefined) {
      throwVBRuntimeError(this.context, 'NOT_FOUND_LINE_LABEL', name);
    }
    const stmts = this.block?.children || [];
    return evaluateNodes(stmts.slice(i), this.context);
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
    if (sub) {
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
        } else if (isIdentifierSymbol(c)) {
          this.name = c.children[0].text;
        }
      }
      this.block = block;
      this.initLineLabelMap();
    }
  }

  initWithFileAndName(file: VBFile, name: string) {
    this.file = file;
    this.name = name;
  }

  initLineLabelMap() {
    const { block, lineLabelMap } = this;
    const stmts = block?.children || [];
    for (let i = 0; i < stmts.length; i++) {
      const stmt = stmts[i].children[0];
      if (stmt && stmt.type === 'symbol') {
        if (stmt.symbol === 'lineLabel') {
          lineLabelMap.set(getIdentifierName(stmt.children[0]), i);
        } else if (stmt.symbol === 'onErrorStmt') {
          const cs = stmt.children;
          const label = cs[2];
          if (label.type === 'symbol') {
            this.onErrorLineLabel = getIdentifierName(label);
          } else if (label.type === 'token' && label.token === 'NEXT') {
            throwVBRuntimeError(this.context, 'UNSUPPORTED', 'resume next');
          }
        }
      }
    }
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
        this._returnInfo = collect_asTypeClause(c, this.context);
      }
    }
    this._argumentsInfo = this._argumentsInfo || [];
  }

  get arugmentsInfo() {
    return this._argumentsInfo!;
  }

  get returnInfo(): AsTypeClauseInfo {
    return this._returnInfo!;
  }
}
