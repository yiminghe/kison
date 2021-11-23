import {
  VBValidPrimitiveType,
  Subscript,
  VBValue,
  VBPrimitiveTypeClass,
  VBInteger,
} from './VBValue';
import { VBPointer, VBValuePointer } from './VBPointer';
import { IndexType } from './runtime';

type ArrayElement = VBPointer | VBPointer[];

const ARRAY_ACCESS_ERROR = `Subscript out of Range`;

export class VBArray {
  type: 'Array' = 'Array';
  value: ArrayElement[] = [];
  dynamic: boolean = false;

  constructor(
    public elementType: VBValidPrimitiveType,
    public subscripts: Subscript[] = [],
    public base: number = 0,
  ) {
    if (!subscripts.length) {
      this.dynamic = true;
    }
  }

  jsUBound(i: number = 0) {
    return this.subscripts[i].upper;
  }

  jsLBound(i: number = 0) {
    const subscript = this.subscripts[i];
    return subscript.lower === undefined ? this.base : subscript.lower;
  }

  lbound(i: number = 0) {
    return new VBInteger(this.jsLBound(i));
  }

  ubound(i: number = 0) {
    return new VBInteger(this.jsUBound(i));
  }

  async getElement(indexes: IndexType[]) {
    let { value, elementType, subscripts } = this;
    if (indexes.length !== subscripts.length) {
      throw new Error(ARRAY_ACCESS_ERROR);
    }
    let element = value[0];
    for (let i = 0; i < indexes.length; i++) {
      const index = indexes[i];
      if (typeof index !== 'number') {
        throw new Error('expect number index for array!');
      }
      const subscript = subscripts[i];
      if (!subscript) {
        throw new Error(ARRAY_ACCESS_ERROR);
      }
      const lbound = this.jsLBound(i);
      const ubound = this.jsUBound(i);
      if (index < lbound || index > ubound) {
        throw new Error(ARRAY_ACCESS_ERROR);
      }
      if (value[index] === undefined) {
        if (i < subscripts.length - 1) {
          value[index] = [];
        } else {
          const VBPrimitiveClass = VBPrimitiveTypeClass[elementType];
          value[index] = new VBValuePointer(new VBPrimitiveClass(), {
            type: elementType,
            isArray: false,
          });
        }
      }
      element = value[index];
      value = value[index] as (VBPointer | VBPointer[])[];
    }
    return element as VBPointer;
  }

  async setElement(indexes: IndexType[], value: VBValue | VBPointer) {
    const obj = await this.getElement(indexes);
    return obj.setValue(value);
  }
}
