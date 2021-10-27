import type {
  EXIT_DO_Node,
  EXIT_FOR_Node,
  EXIT_FUNCTION_Node,
  EXIT_PROPERTY_Node,
  EXIT_SUB_Node,
  END_Node,
} from '../../parser';
import { Context } from '../Context';

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

export interface Subscript {
  lower: number;
  upper: number;
  one: boolean;
}

type ArrayElement = VBObject | VBObject[];

const ARRAY_ACCESS_ERROR = `Subscript out of Range`;

export class VBArray {
  type: 'Array' = 'Array';
  value: ArrayElement[] = [];
  dynamic: boolean = false;
  constructor(
    public elementType: VBValidPrimitiveType,
    public subscripts: Subscript[],
  ) {
    if (!subscripts.length) {
      this.dynamic = true;
    }
  }

  getElement(indexes: number[]) {
    let { value, elementType, subscripts } = this;
    if (indexes.length !== subscripts.length) {
      throw new Error(ARRAY_ACCESS_ERROR);
    }
    let element = value[0];
    for (let i = 0; i < indexes.length; i++) {
      const index = indexes[i];
      const subscript = subscripts[i];
      if (!subscript) {
        throw new Error(ARRAY_ACCESS_ERROR);
      }
      if (index < subscript.lower || index > subscript.upper) {
        throw new Error(ARRAY_ACCESS_ERROR);
      }
      if (value[index] === undefined) {
        if (i < subscripts.length - 1) {
          value[index] = [];
        } else {
          const VBPrimitiveClass = VBPrimitiveTypeClass[elementType];
          value[index] = new VBObject(new VBPrimitiveClass(), {
            type: elementType,
            isArray: false,
          });
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
      | EXIT_SUB_Node
      | END_Node,
  ) {}
}

export const END_EXIT_RESULT = new ExitResult({
  token: 'END',
} as END_Node);

// address
export class VBObject {
  type: 'Object' = 'Object';

  dynamicArray: boolean = false;

  constructor(
    // nested address or value
    private _value: VBValue | VBObject = VB_EMPTY,
    public asType: AsTypeClauseInfo = getDEFAULT_AS_TYPE(),
  ) {
    if (_value.type === 'Array') {
      this.dynamicArray = _value.dynamic;

      if (asType.type === 'Variant') {
        this.dynamicArray = true;
      }
    }
  }

  clone() {
    const newObj = new VBObject(this._value, this.asType);
    newObj.dynamicArray = this.dynamicArray;
    return newObj;
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

  set value(value: VBValue | VBObject) {
    if (value.type === 'Object') {
      this._getObject()._value = value.value;
    } else {
      this._getObject()._value = value;
    }
  }
}

// user class
export class VBClass {
  type: 'Class' = 'Class';
  private _init: boolean = false;
  value = new Map<string, VBObject>();
  constructor(public classType: string, public context: Context) {}
  ensureInit() {
    if (this._init) {
      return;
    }
    this._init = true;
    const fileSymbolTable = this.context.symbolTable.get(this.classType);
    if (!fileSymbolTable) {
      throw new Error('Can not find class: ' + this.classType);
    }
    for (const symbolItem of fileSymbolTable.symbolTable.values()) {
      if (symbolItem.type === 'variable') {
        this.value.set(symbolItem.name, symbolItem.value.clone());
      }
    }
    this.callSub('Class_Initialize', [], false);
  }
  callSub(
    name: string,
    args: (VBValue | VBObject)[] = [],
    check: boolean = true,
  ) {
    name = name.toLowerCase();
    this.ensureInit();
    const fileSymbolTable = this.context.symbolTable.get(this.classType)!;
    const sub = fileSymbolTable.symbolTable.get(name);
    if (sub && sub.type === 'sub') {
      this.context.callSubSymbolItem(sub, args, this);
    } else {
      if (check) {
        throw new Error(`Can not find sub ${name} in class ${this.classType}!`);
      }
    }
  }
  callFunction() {
    this.ensureInit();
  }
  letProperty() {
    this.ensureInit();
  }
  setProperty() {
    this.ensureInit();
  }
  getProperty() {
    this.ensureInit();
  }
  letMember() {
    this.ensureInit();
  }
  setMember() {
    this.ensureInit();
  }
  getMember(name: string) {
    this.ensureInit();
    return this.value.get(name);
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

export interface AsTypeClauseInfo {
  type?: VBValidPrimitiveType;
  isArray: boolean;
  isNew?: boolean;
  classType?: string[];
}

export const getDEFAULT_AS_TYPE: () => AsTypeClauseInfo = () => ({
  type: 'Variant',
  isArray: false,
});
