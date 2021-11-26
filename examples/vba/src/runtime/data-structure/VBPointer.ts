import { throwVBRuntimeError } from '../errorCodes';
import {
  VBBindIndexPointer,
  VBBindPropertyPointer,
  VBPropertyPointer,
} from './VBClass';
import {
  VBValue,
  AsTypeClauseInfo,
  getDEFAULT_AS_TYPE,
  VB_EMPTY,
} from './VBValue';

export type VBPointer =
  | VBValuePointer
  | VBBindPropertyPointer
  | VBBindIndexPointer
  | VBPropertyPointer;

export type VBAny = VBPointer | VBValue;

// address
export class VBValuePointer {
  type: 'Pointer' = 'Pointer';
  subType: 'Value' = 'Value';
  dynamicArray: boolean = false;

  constructor(
    // nested address or value
    private _value: VBAny = VB_EMPTY,
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
    const newObj = new VBValuePointer(this._value, this.asType);
    newObj.dynamicArray = this.dynamicArray;
    return newObj;
  }

  async getValue(): Promise<VBValue> {
    if (this._value.type === 'Pointer') {
      return this._value.getValue();
    }
    return this._value;
  }

  _getObject(): VBPointer {
    if (this._value.type === 'Pointer') {
      return this._value._getObject();
    }
    return this;
  }

  async setValue(value: VBAny) {
    if (this.constant) {
      throwVBRuntimeError('SET_CONST');
    }
    const obj = this._getObject();
    if (obj.subType === 'Value') {
      if (value.type === 'Pointer') {
        obj._value = await value.getValue();
      } else {
        obj._value = value;
      }
    } else {
      await obj.setValue(value);
    }
  }
}
