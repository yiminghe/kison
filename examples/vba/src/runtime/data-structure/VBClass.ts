import type { Context } from '../Context';
import { VBValue, VB_EMPTY } from './VBValue';
import { VBPointer } from './VBPointer';
import { ClassBinder, IndexType, InstanceBinder } from './runtime';
import { getVBValue } from '../evaluator/common';
import {
  getPropertyGetSubName,
  getPropertySetSubName,
  isClassProperty,
} from '../utils';
import { SubBinder, VBAny } from '../types';
import { throwVBRuntimeError } from '../errorCodes';
import { VBArguments } from './VBArguments';

interface VBClassMember {
  value: VBPointer;
  isPrivate: boolean;
}

// user class
export class VBNativeClass {
  type: 'Class' = 'Class';
  subType: 'Native' = 'Native';
  _init: boolean = false;
  members = new Map<string, VBClassMember>();
  value: string;

  constructor(public id: string, public context: Context) {
    this.value = `[class ${id}]`;
  }

  get fileSymbolTable() {
    const fileSymbolTable = this.context.symbolTable.get(this.id);
    if (!fileSymbolTable) {
      throwVBRuntimeError('NOT_FOUND_CLASS');
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
    const { currentFile } = context;
    context.currentFile = fileSymbolTable.file;
    let ret;
    ret = await this.callSub('Class_Initialize', undefined, false);
    context.currentFile = currentFile;
    return ret;
  }

  async callSub(
    name: string,
    args: VBArguments = new VBArguments(),
    check: boolean = true,
  ) {
    name = name.toLowerCase();
    const fileSymbolTable = this.context.symbolTable.get(this.id)!;
    const sub = fileSymbolTable.symbolTable.get(name);
    if (sub && sub.type !== 'variable') {
      if (sub.isPrivate() && this.id !== this.context.currentFile.id) {
        const type = isClassProperty(name) ? 'property' : 'method';
        throwVBRuntimeError('NO_PRIVATE_TYPE', type);
      }
      return this.context.callVBSubInternal(sub, args, this);
    } else {
      if (check) {
        throwVBRuntimeError('NOT_FOUND_SUB', name);
      }
    }
    return VB_EMPTY;
  }

  async set(name: string, value: VBAny): Promise<void> {
    if (this.members.has(name)) {
      const member = this.members.get(name)!;
      if (this.context.currentFile.id !== this.id && member.isPrivate) {
        throwVBRuntimeError('NO_PRIVATE_MEMBER');
      }
      return member.value.setValue(await getVBValue(value));
    } else {
      await this.callSub(
        getPropertySetSubName(name),
        new VBArguments([await getVBValue(value)]),
      );
    }
  }

  async get(name: string) {
    if (this.members.has(name)) {
      const member = this.members.get(name)!;
      if (this.context.currentFile.id !== this.id && member.isPrivate) {
        throwVBRuntimeError('NO_PRIVATE_MEMBER');
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
  type: 'Pointer' = 'Pointer';

  subType: 'Property' = 'Property';

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

  async setValue(value: VBAny) {
    return this.classObj.set(this.name, value);
  }
}

export class VBBindPropertyPointer {
  type: 'Pointer' = 'Pointer';

  subType: 'BindProperty' = 'BindProperty';

  _value: VBValue = VB_EMPTY;

  public constructor(public instance: VBBindClass, public name: string) {}

  _getObject() {
    return this;
  }

  async getValue() {
    return (await this.instance.get(this.name))._value;
  }

  async setValue(value: VBAny) {
    return this.instance.set(this.name, value);
  }
}

export class VBBindIndexPointer {
  type: 'Pointer' = 'Pointer';

  subType: 'BindIndex' = 'BindIndex';

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
        throwVBRuntimeError('NOT_FOUND_GET_ELEMENT_CLASS_BINDER');
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
  type: 'Class' = 'Class';
  subType: 'bind' = 'bind';
  _init: boolean = false;

  value: string;

  instance: InstanceBinder = null!;

  private properties = new Map<string, VBBindPropertyPointer>();

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

  async set(name: string, value: VBAny) {
    let v: VBValue;
    if (value.type === 'Pointer') {
      v = await value.getValue();
    } else {
      v = value;
    }
    return this.instance.set(name, v);
  }
  async get(name: string): Promise<VBBindPropertyPointer> {
    let obj = this.properties.get(name);
    if (!obj) {
      obj = new VBBindPropertyPointer(this, name);
      this.properties.set(name, obj);
    }
    obj._value = await this.instance.get(name);
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
      throwVBRuntimeError('NOT_FOUND_SET_ELEMENT_CLASS_BINDER');
    }
    return this.instance.setElement(indexes, v);
  }

  async callSub(name: string, args: VBArguments = new VBArguments()) {
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
