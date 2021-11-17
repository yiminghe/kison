import type {
  Ast_EXIT_DO_Node,
  Ast_EXIT_FOR_Node,
  Ast_EXIT_FUNCTION_Node,
  Ast_EXIT_PROPERTY_Node,
  Ast_EXIT_SUB_Node,
  Ast_END_Node,
} from '../../parser';
import type { VBClass } from './VBClass';
import type { VBArray } from './VBArray';

export class VBCollection {
  type: 'Collection' = 'Collection';
  value = new Set<VBValue>();
}

export class VBDictionary {
  type: 'Dictionary' = 'Dictionary';
  value = new Map<VBValue, VBValue>();
}

export class VBByte {
  type: 'Byte' = 'Byte';
  constructor(public value: number = 0) {}
}

export class VBDouble {
  type: 'Double' = 'Double';
  constructor(public value: number = 0) {}
}

export class VBSingle {
  type: 'Single' = 'Single';
  constructor(public value: number = 0) {}
}

export class VBInteger {
  type: 'Integer' = 'Integer';
  value: number = 0;
  constructor(value: number = 0) {
    this.value = value & 0xffff;
  }
}

export class VBLongLong {
  type: 'LongLong' = 'LongLong';
  constructor(public value: number = 0) {}
}

export const VBLongPtr = VBLongLong;

export class VBLong {
  type: 'Long' = 'Long';
  constructor(public value: number = 0) {}
}

export class VBCurrency {
  type: 'Currency' = 'Currency';
  constructor(public value: number = 0) {}
}

export class VBDate {
  type: 'Date' = 'Date';
  constructor(public value: number = 0) {}
}

export class VBDecimal {
  type: 'Decimal' = 'Decimal';
  constructor(public value: number = 0) {}
}

export class VBString {
  type: 'String' = 'String';
  constructor(public value: string = '') {}
}

export class VBNull {
  type: 'Null' = 'Null';
  value = null;
}

export class VBEmpty {
  type: 'Empty' = 'Empty';
  value = undefined;
}

export class VBBoolean {
  type: 'Boolean' = 'Boolean';
  constructor(public value: boolean = false) {}
}

export interface Subscript {
  lower: number;
  upper: number;
  one: boolean;
}

export class ExitResult {
  type: 'Exit' = 'Exit';
  constructor(
    public token:
      | Ast_EXIT_DO_Node
      | Ast_EXIT_FOR_Node
      | Ast_EXIT_FUNCTION_Node
      | Ast_EXIT_PROPERTY_Node
      | Ast_EXIT_SUB_Node
      | Ast_END_Node,
  ) {}
}

export const END_EXIT_RESULT = new ExitResult({
  token: 'END',
} as Ast_END_Node);

export class VBNothing {
  type: 'Nothing' = 'Nothing';
  value: undefined;
}

export type VBPrimitive =
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
  | VBNothing
  | VBEmpty;

export const VBPrimitiveTypeClass = {
  String: VBString,
  Single: VBSingle,
  Integer: VBInteger,
  Boolean: VBBoolean,
  Byte: VBByte,
  Collection: VBCollection,
  Currency: VBCurrency,
  Date: VBDate,
  Decimal: VBDecimal,
  Dictionary: VBDictionary,
  Double: VBDouble,
  Long: VBLong,
  LongLong: VBLongLong,
  Variant: VBEmpty,
};

Object.keys(VBPrimitiveTypeClass).forEach((k) => {
  (VBPrimitiveTypeClass as any)[k.toLowerCase()] = (
    VBPrimitiveTypeClass as any
  )[k];
});

export type VBValidPrimitiveType = keyof typeof VBPrimitiveTypeClass;

export type VBValue = VBPrimitive | VBArray | VBClass;

export const VB_NULL = new VBNull();
export const VB_NOTHING = new VBNothing();
export const VB_EMPTY = new VBEmpty();

export const VB_TRUE = new VBBoolean(true);
export const VB_FALSE = new VBBoolean(false);

export interface AsTypeClauseInfo {
  type?: VBValidPrimitiveType;
  isArray: boolean;
  isNew?: boolean;
  classType?: string[];
  className?: string;
}

export const getDEFAULT_AS_TYPE: () => AsTypeClauseInfo = () => ({
  type: 'Variant',
  isArray: false,
});
