import type { Context } from './Context';
import type { Block_Node, SubStmt_Node } from '../parser';
import { build } from './symbol-table/builds';
import {
  VBObject,
  VB_EMPTY,
  VBValue,
  VBPrimitive,
  VBNothing,
  VBEmpty,
  VBNull,
} from './data-structure/VBValue';

export type FileId = string;
export type SymbolName = string;

export * from './data-structure/VBValue';

export class VBScope {
  fileId: FileId = '';

  variableMap = new Map<String, VBObject>();

  getVariable(name: string): VBObject {
    let v = this.variableMap.get(name);
    if (v) {
      return v;
    }
    const empty = new VBObject(VB_EMPTY);
    this.variableMap.set(name, empty);
    return empty;
  }

  setVariable(name: string, value: VBValue) {
    if (value.type === 'Object') {
      this.variableMap.set(name, value);
    } else {
      this.variableMap.set(name, new VBObject(value));
    }
  }

  setVariableValue(name: string, value: VBValue) {
    let obj = this.getVariable(name);
    if (value.type === 'Object') {
      obj.value = value.value;
    } else {
      obj.value = value;
    }
  }
}

export type SymbolItem = SubSymbolItem;

export class SubSymbolItem {
  type: 'sub' = 'sub';
  sub: SubStmt_Node;
  block: Block_Node;
  context: Context;
  argumentsInfo?: ArgInfo[];

  constructor(sub: SubStmt_Node, context: Context) {
    this.context = context;
    this.sub = sub;
    let block;
    for (const c of sub.children) {
      if (c.type === 'symbol' && c.symbol === 'block') {
        block = c;
      }
    }
    if (!block) {
      throw new Error('unexpected SubSymbolItem');
    }
    this.block = block;
  }

  getArugmentsInfo(): ArgInfo[] {
    if (this.argumentsInfo) {
      return this.argumentsInfo;
    }
    this.argumentsInfo = [];
    for (const c of this.sub.children) {
      if (c.type === 'symbol' && c.symbol === 'argList') {
        this.argumentsInfo = build(c, this.context);
      }
    }
    return this.argumentsInfo || [];
  }
}

export interface SubBinder {
  fn: (context: Context) => Promise<VBValue | undefined> | VBValue | undefined;
  argumentsInfo: ArgInfo[];
  name: string;
}

export interface ArgInfo {
  byRef?: boolean;
  name: string;
  asType?: AsTypeClauseInfo;
}

export interface AsTypeClauseInfo {
  type: Exclude<VBPrimitive, VBEmpty | VBNothing | VBNull>['type'] | 'Variant';
}

export class VBVariable {
  type: 'Variable' = 'Variable';
  name: string;
  scope: VBScope;

  constructor(name: string, scope: VBScope) {
    this.name = name;
    this.scope = scope;
  }

  get value() {
    return this.scope.getVariable(this.name);
  }

  set value(value: VBValue) {
    this.scope.setVariableValue(this.name, value);
  }
}
