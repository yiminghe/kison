import { throwVBRuntimeError } from './VBError';
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
  PromiseOrNotFn,
} from './VBValue';
import type { Context } from '../Context';

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
    private context: Context,
    // nested address or value
    private _value: VBAny | PromiseOrNotFn<VBAny> = VB_EMPTY,
    public asType: AsTypeClauseInfo = getDEFAULT_AS_TYPE(),
    public constant: boolean = false,
  ) {
    if (typeof _value !== 'function' && _value.type === 'Array') {
      this.dynamicArray = _value.dynamic;
      if (asType.type === 'variant') {
        this.dynamicArray = true;
      }
    }
  }

  clone() {
    const newObj = new VBValuePointer(this.context, this._value, this.asType);
    newObj.dynamicArray = this.dynamicArray;
    return newObj;
  }

  async getValue(): Promise<VBValue> {
    let _value = this._value;
    if (typeof _value === 'function') {
      _value = await _value();
    }
    if (_value.type === 'Pointer') {
      return _value.getValue();
    }
    return _value;
  }

  _getObject(): VBPointer {
    let _value = this._value;
    if (typeof _value !== 'function' && _value.type === 'Pointer') {
      return _value._getObject();
    }
    return this;
  }

  async setValue(value: VBAny) {
    if (this.constant) {
      throwVBRuntimeError(this.context, 'SET_CONST');
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
