import type { Context } from '../Context';
import { VBString, VBValue, VB_EMPTY } from './VBValue';
import { VBObject } from './VBObject';
import { ClassBinder, InstanceBinder } from './runtime';

// user class
export class VBNativeClass {
  type: 'Class' = 'Class';
  subType: 'native' = 'native';
  _init: boolean = false;
  value = new Map<string, VBObject>();
  constructor(public name: string, public context: Context) {}

  async init() {
    if (this._init) {
      return;
    }
    this._init = true;
    const fileSymbolTable = this.context.symbolTable.get(this.name);
    if (!fileSymbolTable) {
      throw new Error('Can not find class: ' + this.name);
    }
    for (const symbolItem of fileSymbolTable.symbolTable.values()) {
      if (
        symbolItem.type === 'variable' &&
        symbolItem.value.subType === 'address'
      ) {
        this.value.set(symbolItem.name, symbolItem.value!.clone());
      }
    }
    return this.callSub('Class_Initialize', [], false);
  }
  async callSub(
    name: string,
    args: (VBValue | VBObject)[] = [],
    check: boolean = true,
  ) {
    name = name.toLowerCase();
    const fileSymbolTable = this.context.symbolTable.get(this.name)!;
    const sub = fileSymbolTable.symbolTable.get(name);
    if (sub && sub.type === 'sub') {
      return this.context.callSubSymbolItem(sub, args, this);
    } else {
      if (check) {
        throw new Error(`Can not find sub ${name} in class ${this.name}!`);
      }
    }
  }
  callFunction() {}
  letProperty() {}
  setProperty() {}
  getProperty() {}
  set(_name: string, _value: VBObject | VBValue) {}
  get(name: string) {
    return this.value.get(name);
  }
}

export class VBBindProperty {
  type: 'Object' = 'Object';

  subType: 'bindProperty' = 'bindProperty';

  isProperty: boolean = true;

  _value: VBValue = VB_EMPTY;

  public constructor(public instance: VBBindClass, public name: string) {}

  _getObject() {
    return this;
  }

  get value(): VBValue {
    return this.instance.get(this.name)._value;
  }

  setValue(value: VBObject | VBValue) {
    this.value = value;
  }

  set value(value: VBObject | VBValue) {
    this.instance.set(this.name, value);
  }
}

export class VBBindClass {
  type: 'Class' = 'Class';
  subType: 'bind' = 'bind';
  _init: boolean = false;

  _value: VBString;

  private instance: InstanceBinder = null!;

  private properties = new Map<string, VBBindProperty>();

  constructor(public binder: ClassBinder) {
    this._value = new VBString(`[class ${binder.name}]`);
  }

  get value() {
    return this._value;
  }

  set value(_value: VBObject | VBValue) {}

  async init() {
    if (this._init) {
      return;
    }
    this._init = true;
    this.instance = await this.binder.value();
  }
  set(name: string, value: VBObject | VBValue) {
    let v: VBValue;
    if (value.type === 'Object') {
      v = value.value;
    } else {
      v = value;
    }
    return this.instance.set(name, v);
  }
  get(name: string): VBBindProperty {
    let obj = this.properties.get(name);
    if (!obj) {
      obj = new VBBindProperty(this, name);
      this.properties.set(name, obj);
    }
    obj._value = this.instance.get(name);
    return obj;
  }

  callSub() {}
}

export type VBClass = VBNativeClass | VBBindClass;
