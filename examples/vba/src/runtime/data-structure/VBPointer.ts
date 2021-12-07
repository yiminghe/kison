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
  VBDate,
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

  getPointer(): VBPointer {
    let _value = this._value;
    if (typeof _value !== 'function' && _value.type === 'Pointer') {
      return _value.getPointer();
    }
    return this;
  }

  async setValue(value: VBAny) {
    if (this.constant) {
      throwVBRuntimeError(this.context, 'SET_CONST');
    }
    const obj = this.getPointer();
    if (obj.subType === 'Value') {
      let v: VBValue;
      if (value.type === 'Pointer') {
        v = await value.getValue();
      } else {
        v = value;
      }
      const type = obj.asType.type;
      if (type === 'variant' || type === v.type.toLowerCase()) {
        obj._value = v;
      } else {
        if (type === 'date' && v.type === 'string') {
          v = new VBDate(+new Date(v.value));
        }
        obj._value = v;
        // throwVBRuntimeError(this.context, 'TYPE_MISMATCH');
      }
    } else {
      await obj.setValue(value);
    }
  }
}
