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
  constructor(value: number) {
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
  constructor(value: boolean) {
    super();
    this.value = value;
  }
}

export class VBArray {
  type: 'Array' = 'Array';
  lower: number = 0;
  upper: number = -1;
  value: VBValue[] = [];
  constructor(value: VBValue[] = []) {
    this.value = value;
  }
}

// address
export class VBObject {
  type: 'Object' = 'Object';
  value: VBValue;
  constructor(value: VBValue = VB_EMPTY) {
    this.value = value;
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

export type VBValue = VBPrimitive | VBArray;

export const VB_NULL = new VBNull();
export const VB_NOTHING = new VBNothing();
export const VB_EMPTY = new VBEmpty();
