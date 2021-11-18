import {
  VBValidPrimitiveType,
  Subscript,
  VBValue,
  VBPrimitiveTypeClass,
} from './VBValue';
import { VBObject, VBNativeObject } from './VBObject';
import { IndexType } from './runtime';

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
      if (index < subscript.lower || index > subscript.upper) {
        throw new Error(ARRAY_ACCESS_ERROR);
      }
      if (value[index] === undefined) {
        if (i < subscripts.length - 1) {
          value[index] = [];
        } else {
          const VBPrimitiveClass = VBPrimitiveTypeClass[elementType];
          value[index] = new VBNativeObject(new VBPrimitiveClass(), {
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

  async setElement(indexes: IndexType[], value: VBValue) {
    const obj = await this.getElement(indexes);
    return obj.setValue(value);
  }
}
