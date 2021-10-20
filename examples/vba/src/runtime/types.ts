import type { Runtime } from '../runtime/runtime';
import type { Block_Node, SubStmt_Node } from '../parser';
import { build } from './symbol-table/builds';

export type FileId = string;
export type SymbolName = string;

export class VBBase {
  name: string = '';
  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }
}

export class VBCollection extends VBBase {
  type: 'Collection' = 'Collection';
  value = new Set<VBType>();
  constructor(name?: string) {
    super(name);
  }
}

export class VBDictionary extends VBBase {
  type: 'Dictionary' = 'Dictionary';
  value = new Map<VBType, VBType>();
  constructor(name?: string) {
    super(name);
  }
}

export class VBByte extends VBBase {
  type: 'Byte' = 'Byte';
  value: number;
  constructor(value: number, name?: string) {
    super(name);
    this.value = value;
  }
}

export class VBDouble extends VBBase {
  type: 'Double' = 'Double';
  value: number;
  constructor(value: number, name?: string) {
    super(name);
    this.value = value;
  }
}

export class VBSingle extends VBBase {
  type: 'Single' = 'Single';
  value: number;
  constructor(value: number, name?: string) {
    super(name);
    this.value = value;
  }
}

export class VBInteger extends VBBase {
  type: 'Integer' = 'Integer';
  value: number;
  constructor(value: number, name?: string) {
    super(name);
    this.value = value;
  }
}

export class VBLongLong extends VBBase {
  type: 'LongLong' = 'LongLong';
  value: number;
  constructor(value: number, name?: string) {
    super(name);
    this.value = value;
  }
}

export const VBLongPtr = VBLongLong;

export class VBLong extends VBBase {
  type: 'Long' = 'Long';
  value: number;
  constructor(value: number, name?: string) {
    super(name);
    this.value = value;
  }
}

export class VBCurrency extends VBBase {
  type: 'Currency' = 'Currency';
  value: number;
  constructor(value: number, name?: string) {
    super(name);
    this.value = value;
  }
}

export class VBDate extends VBBase {
  type: 'Date' = 'Date';
  value: number;
  constructor(value: number, name?: string) {
    super(name);
    this.value = value;
  }
}

export class VBDecimal extends VBBase {
  type: 'Decimal' = 'Decimal';
  value: number;
  constructor(value: number, name?: string) {
    super(name);
    this.value = value;
  }
}

export class VBString extends VBBase {
  type: 'String' = 'String';
  value: string;
  constructor(value: string, name?: string) {
    super(name);
    this.value = value;
  }
}

export class VBNull extends VBBase {
  type: 'Null' = 'Null';
  value = null;
  constructor(name?: string) {
    super(name);
  }
}

export class VBEmpty extends VBBase {
  type: 'Empty' = 'Empty';
  value = undefined;
  constructor(name?: string) {
    super(name);
  }
}

export const VB_EMPTY = new VBEmpty();

export class VBBoolean extends VBBase {
  type: 'Boolean' = 'Boolean';
  value: boolean;
  constructor(value: boolean, name?: string) {
    super(name);
    this.value = value;
  }
}

class VBObject {
  type: 'Object' = 'Object';
  value: VBPrimitiveType;
  variant?: boolean;
  constructor(value: VBPrimitiveType) {
    this.value = value;
  }
}

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

  setVariable(name: string, value: VBType) {
    if (value.type === 'Object') {
      this.variableMap.set(name, value);
    } else {
      this.variableMap.set(name, new VBObject(value));
    }
  }

  setVariableValue(name: string, value: VBType) {
    if (value.type === 'Object') {
      this.variableMap.set(name, new VBObject(value.value));
    } else {
      this.variableMap.set(name, new VBObject(value));
    }
  }
}

export type VBPrimitiveType =
  | VBByte
  | VBCollection
  | VBCurrency
  | VBDate
  | VBDecimal
  | VBInteger
  | VBDouble
  | VBDictionary
  | VBLong
  | VBLongLong
  | VBSingle
  | VBNull
  | VBBoolean
  | VBString
  | VBEmpty;

export type VBType = VBPrimitiveType | VBObject;

export class VBVariant extends VBBase {
  type: 'Variant' = 'Variant';
  value: VBPrimitiveType;
  constructor(value: VBPrimitiveType, name?: string) {
    super(name);
    this.value = value;
  }
}

export type SymbolItem = SubSymbolItem;

export class SubSymbolItem {
  type: 'sub' = 'sub';
  sub: SubStmt_Node;
  block: Block_Node;
  runtime: Runtime;
  argumentsInfo?: ArgInfo[];

  constructor(sub: SubStmt_Node, runtime: Runtime) {
    this.runtime = runtime;
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
        this.argumentsInfo = build(c, this.runtime);
      }
    }
    return this.argumentsInfo || [];
  }
}

export interface SubBinder {
  fn: (runtime: Runtime) => Promise<VBType | undefined> | VBType | undefined;
  argumentsInfo: ArgInfo[];
  name: string;
}

export interface ArgInfo {
  byRef?: boolean;
  name: string;
  asType?: AsTypeClauseInfo;
}

export interface AsTypeClauseInfo {
  type: Exclude<VBPrimitiveType, VBEmpty | VBNull>['type'] | 'Variant';
}
