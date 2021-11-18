import type { Context } from '../Context';
import { VBString, VBValue, VB_EMPTY } from './VBValue';
import { VBNativeObject, VBObject } from './VBObject';
import { ClassBinder, IndexType, InstanceBinder } from './runtime';
import { getVBValue } from '../evaluator/common';
import { getPropertyGetSubName, getPropertySetSubName } from '../utils';
import { SubBinder } from '../types';

// user class
export class VBNativeClass {
  type: 'Class' = 'Class';
  subType: 'native' = 'native';
  _init: boolean = false;
  value = new Map<string, VBObject>();

  constructor(public name: string, public context: Context) {}

  get fileSymbolTable() {
    const fileSymbolTable = this.context.symbolTable.get(this.name);
    if (!fileSymbolTable) {
      throw new Error('Can not find class: ' + this.name);
    }
    return fileSymbolTable;
  }

  async init() {
    if (this._init) {
      return;
    }
    this._init = true;
    const fileSymbolTable = this.fileSymbolTable;
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
    if (sub && sub.type !== 'variable') {
      return this.context.callSubSymbolItem(sub, args, this);
    } else {
      if (check) {
        throw new Error(`Can not find sub!`);
      }
    }
  }

  async set(name: string, value: VBObject | VBValue): Promise<void> {
    if (this.value.has(name)) {
      const v = this.value.get(name)!;
      return v.setValue(await getVBValue(value));
    } else {
      return this.callSub(getPropertySetSubName(name), [
        await getVBValue(value),
      ]);
    }
  }

  async get(name: string) {
    if (this.value.has(name)) {
      return this.value.get(name);
    } else if (
      this.fileSymbolTable.symbolTable.has(getPropertyGetSubName(name))
    ) {
      return new VBNativeProperty(this, name, () =>
        this.callSub(getPropertyGetSubName(name)),
      );
    }
  }
}

export class VBNativeProperty {
  type: 'Object' = 'Object';

  subType: 'nativeProperty' = 'nativeProperty';

  public constructor(
    public classObj: VBNativeClass,
    public name: string,
    public _value: () => Promise<VBValue>,
  ) {}

  _getObject() {
    return this;
  }

  async getValue() {
    return this._value();
  }

  async setValue(value: VBObject | VBValue) {
    return this.classObj.set(this.name, value);
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

  async getValue() {
    return (await this.instance.get(this.name))._value;
  }

  async setValue(value: VBObject | VBValue) {
    return this.instance.set(this.name, value);
  }
}

export class VBBindIndex {
  type: 'Object' = 'Object';

  subType: 'bindIndex' = 'bindIndex';

  _value: VBValue | undefined;

  public constructor(
    public instance: VBBindClass,
    public indexes: IndexType[],
  ) {}

  _getObject() {
    return this;
  }

  async getValue() {
    if (!this._value) {
      if (!this.instance.instance.getElement) {
        throw new Error('no getElement on ClassBinder!');
      }
      this._value = await this.instance.instance.getElement(this.indexes);
    }
    return this._value;
  }

  async setValue(value: VBObject | VBValue) {
    return this.instance.setElement(this.indexes, value);
  }
}

export class VBBindClass {
  type: 'Class' = 'Class';
  subType: 'bind' = 'bind';
  _init: boolean = false;

  _value: VBString;

  instance: InstanceBinder = null!;

  private properties = new Map<string, VBBindProperty>();

  constructor(public binder: ClassBinder, public context: Context) {
    this._value = new VBString(`[class ${binder.name}]`);
  }

  get value() {
    return this._value;
  }

  getValue() {
    return this._value;
  }

  setValue(_value: VBObject | VBValue) {}

  async init() {
    if (this._init) {
      return;
    }
    this._init = true;
    this.instance = await this.binder.value();
  }
  async set(name: string, value: VBObject | VBValue) {
    let v: VBValue;
    if (value.type === 'Object') {
      v = await value.getValue();
    } else {
      v = value;
    }
    return this.instance.set(name, v);
  }
  async get(name: string): Promise<VBBindProperty> {
    let obj = this.properties.get(name);
    if (!obj) {
      obj = new VBBindProperty(this, name);
      this.properties.set(name, obj);
    }
    obj._value = await this.instance.get(name);
    return obj;
  }
  async getElement(indexes: IndexType[]) {
    return new VBBindIndex(this, indexes);
  }
  async setElement(indexes: IndexType[], value: VBObject | VBValue) {
    let v: VBValue;
    if (value.type === 'Object') {
      v = await value.getValue();
    } else {
      v = value;
    }
    if (!this.instance.setElement) {
      throw new Error('no setElement on ClassBinder!');
    }
    return this.instance.setElement(indexes, v);
  }

  async callSub(name: string, args: (VBValue | VBObject)[] = []) {
    const subs = this.instance.subs || {};
    const sub: SubBinder = {
      ...subs[name],
      type: 'SubBinder',
      name,
    };
    return this.context.callSubBinder(sub, args);
  }
}

export type VBClass = VBNativeClass | VBBindClass;
