import type { Context } from '../Context';
import { VBValue, VB_EMPTY } from './VBValue';
import { VBPointer } from './VBPointer';
import { ClassBinding, IndexType, InstanceBinding } from './runtime';
import { getVBValue } from '../evaluator/common';
import {
  getPropertyGetSubName,
  getPropertySetSubName,
  isClassProperty,
} from '../utils';
import { SubBinding, VBAny } from '../types';
import { throwVBRuntimeError } from './VBError';
import { VBArguments } from './VBArguments';
import { VBIterable } from './VBArray';

interface VBClassMember {
  value: VBPointer;
  isPrivate: boolean;
}

// user class
export class VBNativeClass {
  readonly type = 'Class';
  readonly subType = 'Native';
  _init: boolean = false;
  members = new Map<string, VBClassMember>();
  value: string;

  constructor(public id: string, public context: Context) {
    this.value = `[class ${id}]`;
  }

  get fileSymbolTable() {
    const fileSymbolTable = this.context.symbolTable.get(this.id);
    if (!fileSymbolTable) {
      throwVBRuntimeError(this.context, 'NOT_FOUND_CLASS');
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
        vbVariable.value.subType === 'Value'
      ) {
        members.set(vbVariable.name, {
          value: vbVariable.value!.clone(),
          isPrivate: vbVariable.isPrivate(),
        });
      }
    }
    let ret;
    ret = await this.callSub('Class_Initialize', undefined, false);
    return ret;
  }

  async callSub(
    name: string,
    args: VBArguments = new VBArguments(this.context),
    check: boolean = true,
  ) {
    const { context } = this;
    name = name.toLowerCase();
    const fileSymbolTable = context.symbolTable.get(this.id)?.symbolTable!;
    if (fileSymbolTable) {
      let isProperty = false;
      let sub = fileSymbolTable.get(name);
      if (!sub) {
        isProperty = true;
        sub = fileSymbolTable.get(getPropertyGetSubName(name));
      }
      if (sub && sub.type !== 'variable') {
        if (sub.isPrivate() && this.id !== context.currentFile.id) {
          const type =
            isProperty || isClassProperty(name) ? 'property' : 'method';
          throwVBRuntimeError(context, 'NO_PRIVATE_TYPE', type);
        }
        return context.callVBSubInternal(sub, args, this);
      }
    }
    if (check) {
      throwVBRuntimeError(this.context, 'NOT_FOUND_SUB', name);
    }
    return VB_EMPTY;
  }

  async set(name: string, value: VBAny): Promise<void> {
    if (this.members.has(name)) {
      const member = this.members.get(name)!;
      if (this.context.currentFile.id !== this.id && member.isPrivate) {
        throwVBRuntimeError(this.context, 'NO_PRIVATE_MEMBER');
      }
      return member.value.setValue(await getVBValue(value));
    } else {
      await this.callSub(
        getPropertySetSubName(name),
        new VBArguments(this.context, [await getVBValue(value)]),
      );
    }
  }

  async get(name: string) {
    if (this.members.has(name)) {
      const member = this.members.get(name)!;
      if (this.context.currentFile.id !== this.id && member.isPrivate) {
        throwVBRuntimeError(this.context, 'NO_PRIVATE_MEMBER');
      }
      return member.value;
    } else {
      const propertyName = getPropertyGetSubName(name);
      if (this.fileSymbolTable.symbolTable.has(propertyName)) {
        return new VBPropertyPointer(this, name, () =>
          this.callSub(propertyName),
        );
      }
    }
  }
}

export class VBPropertyPointer {
  readonly type = 'Pointer';

  readonly subType = 'Property';

  public constructor(
    public classObj: VBNativeClass,
    public name: string,
    public _value: () => Promise<VBValue>,
  ) {}

  getPointer() {
    return this;
  }

  async getValue() {
    return this._value();
  }

  async setValue(value: VBAny) {
    return this.classObj.set(this.name, value);
  }
}

export class VBBindPropertyPointer {
  readonly type = 'Pointer';

  readonly subType = 'BindProperty';

  _value: VBValue = VB_EMPTY;

  public constructor(public instance: VBBindClass, public name: string) {}

  getPointer() {
    return this;
  }

  async getValue() {
    return (await this.instance.get(this.name))!._value;
  }

  async setValue(value: VBAny) {
    return this.instance.set(this.name, value);
  }
}

export class VBBindIndexPointer {
  readonly type = 'Pointer';

  readonly subType = 'BindIndex';

  _value: VBValue | undefined;

  public constructor(
    public instance: VBBindClass,
    public indexes: IndexType[],
  ) {}

  getPointer() {
    return this;
  }

  async getValue() {
    if (!this._value) {
      if (!this.instance.instance.getElement) {
        throwVBRuntimeError(
          this.instance.context,
          'NOT_FOUND_GET_ELEMENT_CLASS_BINDER',
        );
      }
      this._value = await this.instance.instance.getElement(this.indexes);
    }
    return this._value;
  }

  async setValue(value: VBAny) {
    return this.instance.setElement(this.indexes, value);
  }
}

export class VBBindClass {
  readonly type = 'Class';
  readonly subType = 'bind';
  _init: boolean = false;

  value: string;

  instance: InstanceBinding = null!;

  private properties = new Map<string, VBBindPropertyPointer>();

  constructor(public binding: ClassBinding, public context: Context) {
    this.value = `[class ${binding.name}]`;
  }

  async init() {
    if (this._init) {
      return;
    }
    this._init = true;
    this.instance = await this.binding.value(this.context);
    const { subs } = this.instance;
    if (subs) {
      let newSubs: typeof subs = {};
      for (const key of Object.keys(subs)) {
        newSubs[key.toLowerCase()] = subs[key];
      }
      this.instance.subs = newSubs;
    }
  }

  async set(name: string, value: VBAny) {
    let v: VBValue;
    if (value.type === 'Pointer') {
      v = await value.getValue();
    } else {
      v = value;
    }
    return this.instance.set(name, v);
  }
  async get(name: string): Promise<VBBindPropertyPointer | undefined> {
    let obj = this.properties.get(name);
    const instanceValue = await this.instance.get(name);
    if (!instanceValue) {
      return;
    }
    if (!obj) {
      obj = new VBBindPropertyPointer(this, name);
      this.properties.set(name, obj);
    }
    obj._value = instanceValue;
    return obj;
  }
  async getElement(indexes: IndexType[]) {
    return new VBBindIndexPointer(this, indexes);
  }
  async setElement(indexes: IndexType[], value: VBAny) {
    let v: VBValue;
    if (value.type === 'Pointer') {
      v = await value.getValue();
    } else {
      v = value;
    }
    if (!this.instance.setElement) {
      throwVBRuntimeError(this.context, 'NOT_FOUND_SET_ELEMENT_CLASS_BINDER');
    }
    return this.instance.setElement(indexes, v);
  }

  vbIterable() {
    return 'vbIterator' in this.instance;
  }

  vbIterator() {
    return this.instance.vbIterator!();
  }

  async callSub(
    name: string,
    args: VBArguments = new VBArguments(this.context),
  ) {
    const subs = this.instance.subs || {};
    const sub: SubBinding = {
      ...subs[name],
      type: 'SubBinding',
      name,
    };
    return this.context.callSubBindingInternal(sub, args);
  }
}

export type VBClass = VBNativeClass | VBBindClass;
