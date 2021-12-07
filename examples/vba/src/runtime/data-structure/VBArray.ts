import {
  VBBasicTypeKey,
  Subscript,
  VBBasicTypeClasses,
  VBInteger,
  VBValue,
  VB_EMPTY,
} from './VBValue';
import { VBPointer, VBValuePointer, VBAny } from './VBPointer';
import type { IndexType } from './runtime';
import { throwVBRuntimeError } from './VBError';
import type { Context } from '../Context';
import { getVBValue } from '../evaluator/common';

type ArrayElement = VBPointer | VBPointer[];

interface VBIteratorReturn {
  value: VBAny;
  done: boolean;
}

export interface VBIterator {
  next: () => Promise<VBIteratorReturn> | VBIteratorReturn;
}

export interface VBIterable {
  vbIterator?(): VBIterator;
}

export function isVBIterable(a: any): a is Required<VBIterable> {
  return a && 'vbIterable' in a && !!a.vbIterable();
}

export class VBArray implements VBIterable {
  type: 'Array' = 'Array';
  value: ArrayElement[] = [];
  dynamic: boolean = false;

  constructor(
    private context: Context,
    public elementType: VBBasicTypeKey,
    public subscripts: Subscript[] = [],
    public base: number = 0,
  ) {
    if (!subscripts.length) {
      this.dynamic = true;
    }
  }

  vbIterable() {
    return true;
  }

  vbIterator() {
    let i = this.jsLBound();
    let len = this.jsUBound();
    return {
      next: async () => {
        if (i > len) {
          return {
            value: VB_EMPTY,
            done: true,
          };
        }
        return {
          value: await this.getElement([i++]),
          done: false,
        };
      },
    };
  }

  jsUBound(i: number = 0) {
    const { subscripts } = this;
    if (!subscripts.length) {
      throwVBRuntimeError(this.context, 'UNEXPECTED_ERROR', 'index access');
    }
    return subscripts[i].upper;
  }

  jsLBound(i: number = 0) {
    const { subscripts } = this;
    if (!subscripts.length) {
      throwVBRuntimeError(this.context, 'UNEXPECTED_ERROR', 'index access');
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
      throwVBRuntimeError(this.context, 'INDEX_OUT_OF_RANGE');
    }
    let element = value[0];
    for (let i = 0; i < indexes.length; i++) {
      const index = indexes[i];
      if (typeof index !== 'number') {
        throwVBRuntimeError(this.context, 'INDEX_NUMBER');
      }
      const subscript = subscripts[i];
      if (!subscript) {
        throwVBRuntimeError(this.context, 'INDEX_OUT_OF_RANGE');
      }
      const lbound = this.jsLBound(i);
      const ubound = this.jsUBound(i);
      if (index < lbound || index > ubound) {
        throwVBRuntimeError(this.context, 'INDEX_OUT_OF_RANGE');
      }
      if (value[index] === undefined) {
        if (i < subscripts.length - 1) {
          value[index] = [];
        } else {
          const VBBasicTypeClass = VBBasicTypeClasses[elementType];
          value[index] = new VBValuePointer(
            this.context,
            new VBBasicTypeClass(),
            {
              type: elementType,
            },
          );
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
