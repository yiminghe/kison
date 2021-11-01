import { VBBindProperty } from './VBClass';
import {
  VBValue,
  AsTypeClauseInfo,
  getDEFAULT_AS_TYPE,
  VB_EMPTY,
} from './VBValue';

export type VBObject = VBNativeObject | VBBindProperty;

// address
export class VBNativeObject {
  type: 'Object' = 'Object';
  subType: 'address' = 'address';

  isProperty: boolean = false;
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

  setValue(value: VBObject | VBValue) {
    this.value = value;
  }

  clone() {
    const newObj = new VBNativeObject(this._value, this.asType);
    newObj.dynamicArray = this.dynamicArray;
    newObj.isProperty = this.isProperty;
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
    if (this.constant) {
      throw new Error('Can not set const variable!');
    }
    const obj = this._getObject();
    if (obj.subType === 'address') {
      if (value.type === 'Object') {
        obj._value = value.value;
      } else {
        obj._value = value;
      }
    } else {
      obj.value = value;
    }
  }
}
