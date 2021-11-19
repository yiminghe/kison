import type { Context } from '../Context';
import { VBString, VBValue, VB_EMPTY } from './VBValue';
import { VBNativeObject, VBObject } from './VBObject';
import { ClassBinder, IndexType, InstanceBinder } from './runtime';
import { getVBValue } from '../evaluator/common';
import {
  getPropertyGetSubName,
  getPropertySetSubName,
  isClassProperty,
} from '../utils';
import { SubBinder } from '../types';

interface VBClassMember {
  value: VBObject;
  isPrivate: boolean;
}

// user class
export class VBNativeClass {
  type: 'Class' = 'Class';
  subType: 'native' = 'native';
  _init: boolean = false;
  members = new Map<string, VBClassMember>();
  value: string;

  constructor(public id: string, public context: Context) {
    this.value = `[class ${id}]`;
  }

  get fileSymbolTable() {
    const fileSymbolTable = this.context.symbolTable.get(this.id);
    if (!fileSymbolTable) {
      throw new Error('Can not find class: ' + this.id);
    }
    return fileSymbolTable;
  }

  async init() {
    if (this._init) {
      return;
    }
    this._init = true;
    const { fileSymbolTable, context, members } = this;
    for (const vbVariable of fileSymbolTable.symbolTable.values()) {
      if (
        vbVariable.type === 'variable' &&
        vbVariable.value.subType === 'address'
      ) {
        members.set(vbVariable.name, {
          value: vbVariable.value!.clone(),
          isPrivate: vbVariable.isPrivate(),
        });
      }
    }
    const { currentFile } = context;
    context.currentFile = fileSymbolTable.file;
    let ret;
    ret = await this.callSub('Class_Initialize', [], false);
    context.currentFile = currentFile;
    return ret;
  }

  async callSub(
    name: string,
    args: (VBValue | VBObject)[] = [],
    check: boolean = true,
  ) {
    name = name.toLowerCase();
    const fileSymbolTable = this.context.symbolTable.get(this.id)!;
    const sub = fileSymbolTable.symbolTable.get(name);
    if (sub && sub.type !== 'variable') {
      if (sub.isPrivate() && this.id !== this.context.currentFile.id) {
        const type = isClassProperty(name) ? 'property' : 'method';
        throw new Error(`Can not access non-public ${type}!`);
      }
      return this.context.callVBSubInternal(sub, args, this);
    } else {
      if (check) {
        throw new Error(`Can not find sub!`);
      }
    }
    return VB_EMPTY;
  }

  async set(name: string, value: VBObject | VBValue): Promise<void> {
    if (this.members.has(name)) {
      const member = this.members.get(name)!;
      if (this.context.currentFile.id !== this.id && member.isPrivate) {
        throw new Error('Can not access non-public member!');
      }
      return member.value.setValue(await getVBValue(value));
    } else {
      await this.callSub(getPropertySetSubName(name), [
        await getVBValue(value),
      ]);
    }
  }

  async get(name: string) {
    if (this.members.has(name)) {
      const member = this.members.get(name)!;
      if (this.context.currentFile.id !== this.id && member.isPrivate) {
        throw new Error('Can not access non-public member!');
      }
      return member.value;
    } else {
      const propertyName = getPropertyGetSubName(name);
      if (this.fileSymbolTable.symbolTable.has(propertyName)) {
        return new VBNativeProperty(this, name, () =>
          this.callSub(propertyName),
        );
      }
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
  ) { }

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

  public constructor(public instance: VBBindClass, public name: string) { }

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
  ) { }

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

  value: string;

  instance: InstanceBinder = null!;

  private properties = new Map<string, VBBindProperty>();

  constructor(public binder: ClassBinder, public context: Context) {
    this.value = `[class ${binder.name}]`;
  }

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
    return this.context.callSubBinderInternal(sub, args);
  }
}

export type VBClass = VBNativeClass | VBBindClass;
