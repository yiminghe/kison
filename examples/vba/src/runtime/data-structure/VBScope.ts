import type { VBFile } from './runtime';
import type { Context } from '../Context';
import type { VBClass } from './VBClass';
import { VBPointer, VBValuePointer, VBAny } from './VBPointer';
import { VBNamespace } from './VBNamespace';
import { last } from '../utils';
import { throwVBError } from '../errorCodes';

export class VBScope {
  constructor(
    public file: VBFile,
    public subName: string,
    public context: Context,
    public classObj?: VBClass,
  ) {
    const returnName = last(subName.split('.'));
    this.variableMap.set(returnName, new VBValuePointer());
  }

  variableMap = new Map<string, VBPointer>();

  async hasVariable(name: string) {
    return !!(await this._getVariable(name));
  }

  async _getVariable(
    name: string,
  ): Promise<VBPointer | VBNamespace | undefined> {
    const { variableMap, context, classObj, file, subName } = this;

    // local scope variable
    let v = variableMap.get(name);
    if (v) {
      return v;
    }

    const subItem = context.getSymbolItemFromFileInternal(subName, file.id);

    // static variable
    if (subItem && subItem.type !== 'variable') {
      v = subItem.getStaticVariable(name);
    }
    if (v) {
      return v;
    }

    // class member
    if (classObj) {
      v = await classObj.get(name);
    }

    if (v) {
      return v;
    }

    // binder
    const binder = context.bindersMap.get(name);
    if (binder) {
      if (binder.type === 'Namespace') {
        return binder;
      }
      if (binder.type === 'Pointer') {
        return binder;
      }
    }

    const vItem = context.getSymbolItemInternal(name, file);
    if (vItem && vItem.type === 'variable') {
      v = vItem.value;
    }
    return v;
  }

  async getVariable(name: string): Promise<VBPointer | VBNamespace> {
    let v = await this._getVariable(name);
    if (v) {
      return v;
    }
    v = new VBValuePointer();
    this.variableMap.set(name, v);
    return v;
  }

  async setVariable(name: string, value: VBPointer) {
    this.variableMap.set(name, value);
    return value;
  }

  async setVariableValue(name: string, value: VBAny) {
    let v = await this.getVariable(name);
    const setValue = value.type === 'Pointer' ? await value.getValue() : value;
    if (v.type === 'Pointer') {
      await v.setValue(setValue);
    } else {
      throwVBError('UNEXPECTED_ERROR', 'namespace');
    }
    return v;
  }
}
