import type { VBClass } from './VBClass';
import type { VBArray } from './VBArray';

export class VBByte {
  type: 'Byte' = 'Byte';
  constructor(public readonly value: number = 0) {}
}

export class VBDouble {
  type: 'Double' = 'Double';
  constructor(public readonly value: number = 0) {}
}

export class VBSingle {
  type: 'Single' = 'Single';
  constructor(public readonly value: number = 0) {}
}

export class VBInteger {
  type: 'Integer' = 'Integer';
  readonly value: number = 0;
  constructor(value: number = 0) {
    this.value = value & 0xffff;
  }
}

export class VBLongLong {
  type: 'LongLong' = 'LongLong';
  constructor(public readonly value: number = 0) {}
}

export const VBLongPtr = VBLongLong;

export class VBLong {
  type: 'Long' = 'Long';
  constructor(public readonly value: number = 0) {}
}

export class VBCurrency {
  type: 'Currency' = 'Currency';
  constructor(public readonly value: number = 0) {}
}

export class VBDate {
  type: 'Date' = 'Date';
  constructor(public readonly value: number = 0) {}
}

export class VBDecimal {
  type: 'Decimal' = 'Decimal';
  constructor(public readonly value: number = 0) {}
}

export class VBString {
  type: 'String' = 'String';
  constructor(public readonly value: string = '') {}
}

export class VBNull {
  type: 'Null' = 'Null';
  readonly value = null;
}

export class VBEmpty {
  type: 'Empty' = 'Empty';
  readonly value = undefined;
}

export class VBBoolean {
  type: 'Boolean' = 'Boolean';
  constructor(public readonly value: boolean = false) {}
}

export interface Subscript {
  lower: number;
  upper: number;
  one: boolean;
}

export class VBNothing {
  type: 'Nothing' = 'Nothing';
  readonly value: undefined;
}

export type VBPrimitive =
  | VBByte
  | VBCurrency
  | VBDate
  | VBDecimal
  | VBInteger
  | VBDouble
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
  Currency: VBCurrency,
  Date: VBDate,
  Decimal: VBDecimal,
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
