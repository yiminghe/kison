import type {
  EXIT_DO_Node,
  EXIT_FOR_Node,
  EXIT_FUNCTION_Node,
  EXIT_PROPERTY_Node,
  EXIT_SUB_Node,
} from '../../parser';

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
  constructor(public value: number = 0) {}
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
};

export interface Subscript {
  lower: number;
  upper: number;
  one: boolean;
}

type ArrayElement = VBObject | VBObject[];

export class VBArray {
  type: 'Array' = 'Array';
  subscripts: Subscript[] = [];
  value: ArrayElement[] = [];
  constructor(public elementType: VBValidPrimitiveType) {}

  getElement(indexes: number[]) {
    let { value, elementType, subscripts } = this;
    if (indexes.length !== subscripts.length) {
      throw new Error('unexpected array access!');
    }
    let element = value[0];
    for (let i = 0; i < indexes.length; i++) {
      const index = indexes[i];
      const subscript = subscripts[i];
      if (!subscript) {
        throw new Error('unexpected array access!');
      }
      if (index < subscript.lower || index > subscript.upper) {
        throw new Error('unexpected array access!');
      }
      if (value[index] === undefined) {
        if (i < subscripts.length - 1) {
          value[index] = [];
        } else if (elementType === 'Variant') {
          value[index] = new VBObject();
        } else {
          const VBC = VBPrimitiveTypeClass[elementType];
          value[index] = new VBObject(new VBC(), elementType);
        }
      }
      element = value[index];
      value = value[index] as (VBObject | VBObject[])[];
    }
    return element as VBObject;
  }

  setElement(indexes: number[], value: VBValue) {
    this.getElement(indexes).value = value;
  }
}

export class ExitResult {
  type: 'Exit' = 'Exit';
  constructor(
    public token:
      | EXIT_DO_Node
      | EXIT_FOR_Node
      | EXIT_FUNCTION_Node
      | EXIT_PROPERTY_Node
      | EXIT_SUB_Node,
  ) {}
}

// address
export class VBObject {
  type: 'Object' = 'Object';

  constructor(
    // nested address or value
    private _value: VBValue | VBObject = VB_EMPTY,
    public asType: VBValidPrimitiveType = 'Variant',
  ) {}

  get value(): VBValue {
    if (this._value.type === 'Object') {
      return this._value.value;
    }
    return this._value;
  }

  _getObject(): VBObject {
    if (this._value.type === 'Object') {
      return this._value._getObject();
    }
    return this;
  }

  set value(value: VBValue | VBObject) {
    if (value.type === 'Object') {
      this._getObject()._value = value.value;
    } else {
      this._getObject()._value = value;
    }
  }
}

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

export type VBValidPrimitiveType =
  | Exclude<VBPrimitive, VBEmpty | VBNothing | VBNull>['type']
  | 'Variant';

export type VBValue = VBPrimitive | VBArray;

export const VB_NULL = new VBNull();
export const VB_NOTHING = new VBNothing();
export const VB_EMPTY = new VBEmpty();
