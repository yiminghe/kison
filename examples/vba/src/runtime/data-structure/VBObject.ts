import {
  VBValue,
  AsTypeClauseInfo,
  getDEFAULT_AS_TYPE,
  VB_EMPTY,
} from './VBValue';

// address
export class VBObject {
  type: 'Object' = 'Object';

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
    if (this.constant) {
      throw new Error('Can not set const variable!');
    }
    if (value.type === 'Object') {
      this._getObject()._value = value.value;
    } else {
      this._getObject()._value = value;
    }
  }
}
