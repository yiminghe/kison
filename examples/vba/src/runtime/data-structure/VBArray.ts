import {
  VBBasicTypeKey,
  Subscript,
  VBBasicTypeClasses,
  VBInteger,
} from './VBValue';
import { VBPointer, VBValuePointer, VBAny } from './VBPointer';
import { IndexType } from './runtime';
import { throwVBRuntimeError } from '../errorCodes';

type ArrayElement = VBPointer | VBPointer[];

export class VBArray {
  type: 'Array' = 'Array';
  value: ArrayElement[] = [];
  dynamic: boolean = false;

  constructor(
    public elementType: VBBasicTypeKey,
    public subscripts: Subscript[] = [],
    public base: number = 0,
  ) {
    if (!subscripts.length) {
      this.dynamic = true;
    }
  }

  jsUBound(i: number = 0) {
    const { subscripts } = this;
    if (!subscripts.length) {
      throwVBRuntimeError('UNEXPECTED_ERROR', 'index access');
    }
    return subscripts[i].upper;
  }

  jsLBound(i: number = 0) {
    const { subscripts } = this;
    if (!subscripts.length) {
      throwVBRuntimeError('UNEXPECTED_ERROR', 'index access');
    }
    const subscript = subscripts[i];
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
      throwVBRuntimeError('INDEX_OUT_OF_RANGE');
    }
    let element = value[0];
    for (let i = 0; i < indexes.length; i++) {
      const index = indexes[i];
      if (typeof index !== 'number') {
        throwVBRuntimeError('INDEX_NUMBER');
      }
      const subscript = subscripts[i];
      if (!subscript) {
        throwVBRuntimeError('INDEX_OUT_OF_RANGE');
      }
      const lbound = this.jsLBound(i);
      const ubound = this.jsUBound(i);
      if (index < lbound || index > ubound) {
        throwVBRuntimeError('INDEX_OUT_OF_RANGE');
      }
      if (value[index] === undefined) {
        if (i < subscripts.length - 1) {
          value[index] = [];
        } else {
          const VBBasicTypeClass = VBBasicTypeClasses[elementType];
          value[index] = new VBValuePointer(new VBBasicTypeClass(), {
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

  async setElement(indexes: IndexType[], value: VBAny) {
    const obj = await this.getElement(indexes);
    return obj.setValue(value);
  }
}
