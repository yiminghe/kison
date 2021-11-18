import { VBBindIndex, VBBindProperty, VBNativeProperty } from './VBClass';
import {
  VBValue,
  AsTypeClauseInfo,
  getDEFAULT_AS_TYPE,
  VB_EMPTY,
} from './VBValue';

export type VBObject =
  | VBNativeObject
  | VBBindProperty
  | VBBindIndex
  | VBNativeProperty;

// address
export class VBNativeObject {
  type: 'Object' = 'Object';
  subType: 'address' = 'address';
  dynamicArray: boolean = false;

  constructor(
    // nested address or value
    private _value: VBValue | VBObject = VB_EMPTY,
    public asType: AsTypeClauseInfo = getDEFAULT_AS_TYPE(),
    public constant: boolean = false,
  ) {
    if (_value.type === 'Array') {
      this.dynamicArray = _value.dynamic;
      if (asType.type === 'Variant') {
        this.dynamicArray = true;
      }
    }
  }

  clone() {
    const newObj = new VBNativeObject(this._value, this.asType);
    newObj.dynamicArray = this.dynamicArray;
    return newObj;
  }

  async getValue(): Promise<VBValue> {
    if (this._value.type === 'Object') {
      return this._value.getValue();
    }
    return this._value;
  }

  _getObject(): VBObject {
    if (this._value.type === 'Object') {
      return this._value._getObject();
    }
    return this;
  }

  async setValue(value: VBValue | VBObject) {
    if (this.constant) {
      throw new Error('Can not set const variable!');
    }
    const obj = this._getObject();
    if (obj.subType === 'address') {
      if (value.type === 'Object') {
        obj._value = await value.getValue();
      } else {
        obj._value = value;
      }
    } else {
      await obj.setValue(value);
    }
  }
}
