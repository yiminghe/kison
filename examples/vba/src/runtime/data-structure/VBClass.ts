import type { Context } from '../Context';
import { VBString, VBValue, VB_EMPTY } from './VBValue';
import { VBObject } from './VBObject';
import { ClassBinder, IndexType, InstanceBinder } from './runtime';

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

export class VBBindIndex {
  type: 'Object' = 'Object';

  subType: 'bindIndex' = 'bindIndex';

  _value: VBValue = VB_EMPTY;

  public constructor(
    public instance: VBBindClass,
    public indexes: IndexType[],
  ) {
    if (!instance.instance.getElement) {
      throw new Error('no getElement on ClassBinder!');
    }
    this._value = instance.instance.getElement(indexes);
  }

  _getObject() {
    return this;
  }

  get value(): VBValue {
    return this._value;
  }

  setValue(value: VBObject | VBValue) {
    this.value = value;
  }

  set value(value: VBObject | VBValue) {
    this.instance.setElement(this.indexes, value);
  }
}

export class VBBindClass {
  type: 'Class' = 'Class';
  subType: 'bind' = 'bind';
  _init: boolean = false;

  _value: VBString;

  instance: InstanceBinder = null!;

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
  getElement(indexes: IndexType[]) {
    return new VBBindIndex(this, indexes);
  }
  setElement(indexes: IndexType[], value: VBObject | VBValue) {
    let v: VBValue;
    if (value.type === 'Object') {
      v = value.value;
    } else {
      v = value;
    }
    if (!this.instance.setElement) {
      throw new Error('no setElement on ClassBinder!');
    }
    return this.instance.setElement(indexes, v);
  }

  callSub() {}
}

export type VBClass = VBNativeClass | VBBindClass;
