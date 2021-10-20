import type { Context } from '../Context';
import type { Block_Node, SubStmt_Node } from '../../parser';
import { build } from '../symbol-table/builds';
import {
  VBObject,
  VB_EMPTY,
  VBValue,
  VBPrimitive,
  VBNothing,
  VBEmpty,
  VBNull,
} from './VBValue';

export type FileId = string;
export type SymbolName = string;

export class VBScope {
  fileId: FileId = '';

  variableMap = new Map<String, VBVariable>();

  getVariable(name: string): VBVariable {
    let v = this.variableMap.get(name);
    if (v) {
      return v;
    }
    v = new VBVariable(name, VB_EMPTY, true);
    this.variableMap.set(name, v);
    return v;
  }

  setVariable(name: string, value: VBVariable) {
    this.variableMap.set(name, value);
    return value;
  }

  setVariableValue(name: string, value: VBValue | VBVariable) {
    let v = this.getVariable(name);
    v.value = value;
    return v;
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
  address: VBObject;
  variant: boolean;

  constructor(name: string, value: VBValue | VBObject, variant: boolean) {
    this.name = name;
    if (value.type === 'Object') {
      this.address = value;
    } else {
      this.address = new VBObject(value);
    }
    this.variant = variant;
  }

  get value(): VBValue {
    return this.address.value;
  }

  set value(value: VBValue | VBVariable) {
    if (value.type === 'Variable') {
      this.address.value = value.address.value;
    } else {
      this.address.value = value;
    }
  }
}

export interface VBVariableInfo {
  name: string;
  value: VBValue;
  variant: boolean;
}
