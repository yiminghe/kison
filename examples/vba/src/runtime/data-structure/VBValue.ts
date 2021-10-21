export class VBBase {}

export class VBCollection extends VBBase {
  type: 'Collection' = 'Collection';
  value = new Set<VBValue>();
  constructor() {
    super();
  }
}

export class VBDictionary extends VBBase {
  type: 'Dictionary' = 'Dictionary';
  value = new Map<VBValue, VBValue>();
  constructor() {
    super();
  }
}

export class VBByte extends VBBase {
  type: 'Byte' = 'Byte';
  value: number;
  constructor(value: number = 0) {
    super();
    this.value = value;
  }
}

export class VBDouble extends VBBase {
  type: 'Double' = 'Double';
  value: number;
  constructor(value: number = 0) {
    super();
    this.value = value;
  }
}

export class VBSingle extends VBBase {
  type: 'Single' = 'Single';
  value: number;
  constructor(value: number = 0) {
    super();
    this.value = value;
  }
}

export class VBInteger extends VBBase {
  type: 'Integer' = 'Integer';
  value: number;
  constructor(value: number = 0) {
    super();
    this.value = value;
  }
}

export class VBLongLong extends VBBase {
  type: 'LongLong' = 'LongLong';
  value: number;
  constructor(value: number = 0) {
    super();
    this.value = value;
  }
}

export const VBLongPtr = VBLongLong;

export class VBLong extends VBBase {
  type: 'Long' = 'Long';
  value: number;
  constructor(value: number = 0) {
    super();
    this.value = value;
  }
}

export class VBCurrency extends VBBase {
  type: 'Currency' = 'Currency';
  value: number;
  constructor(value: number = 0) {
    super();
    this.value = value;
  }
}

export class VBDate extends VBBase {
  type: 'Date' = 'Date';
  value: number;
  constructor(value: number = 0) {
    super();
    this.value = value;
  }
}

export class VBDecimal extends VBBase {
  type: 'Decimal' = 'Decimal';
  value: number;
  constructor(value: number = 0) {
    super();
    this.value = value;
  }
}

export class VBString extends VBBase {
  type: 'String' = 'String';
  value: string;
  constructor(value: string = '') {
    super();
    this.value = value;
  }
}

export class VBNull extends VBBase {
  type: 'Null' = 'Null';
  value = null;
}

export class VBEmpty extends VBBase {
  type: 'Empty' = 'Empty';
  value = undefined;
}

export class VBBoolean extends VBBase {
  type: 'Boolean' = 'Boolean';
  value: boolean;
  constructor(value: boolean = false) {
    super();
    this.value = value;
  }
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
  elementType: VBValidPrimitiveType;
  value: ArrayElement[] = [];
  constructor(elementType: VBValidPrimitiveType) {
    this.elementType = elementType;
  }

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
          value[index] = new VBObject(new VBC());
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

// address
export class VBObject {
  type: 'Object' = 'Object';
  asType: VBValidPrimitiveType;

  // nested address or value
  _value: VBValue | VBObject;

  constructor(
    value: VBValue | VBObject = VB_EMPTY,
    asType: VBValidPrimitiveType = 'Variant',
  ) {
    this._value = value;
    this.asType = asType;
  }

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

  set value(value: VBValue) {
    this._getObject()._value = value;
  }
}

export class VBNothing extends VBBase {
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
