import type { VBFile } from './runtime';
import type { Context } from '../Context';
import type { VBValue } from './VBValue';
import type { VBClass } from './VBClass';
import { VBObject, VBNativeObject } from './VBObject';
import { VBNamespaceBinder } from './VBNamespace';
import { last } from '../utils';

export class VBScope {
  constructor(
    public file: VBFile,
    public subName: string,
    public context: Context,
    public classObj?: VBClass,
  ) {
    const returnName = last(subName.split('.'));
    this.variableMap.set(returnName, new VBNativeObject());
  }

  variableMap = new Map<string, VBObject>();

  async hasVariable(name: string) {
    return !!(await this._getVariable(name));
  }

  async _getVariable(
    name: string,
  ): Promise<VBObject | VBNamespaceBinder | undefined> {
    const { variableMap, context, classObj, file, subName } = this;

    // local scope variable
    let v = variableMap.get(name);
    if (v) {
      return v;
    }

    const subItem = context.getSymbolItemFromFile(subName, file.id);

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
      if (binder.type === 'Object') {
        return binder;
      }
    }

    const vItem = context.getSymbolItem(name, file);
    if (vItem && vItem.type === 'variable') {
      v = vItem.value;
    }
    return v;
  }

  async getVariable(name: string): Promise<VBObject | VBNamespaceBinder> {
    let v = await this._getVariable(name);
    if (v) {
      return v;
    }
    v = new VBNativeObject();
    this.variableMap.set(name, v);
    return v;
  }

  async setVariable(name: string, value: VBObject) {
    this.variableMap.set(name, value);
    return value;
  }

  async setVariableValue(name: string, value: VBValue | VBObject) {
    let v = await this.getVariable(name);
    const setValue = value.type === 'Object' ? await value.getValue() : value;
    if (v.type === 'Object') {
      await v.setValue(setValue);
    } else {
      throw new Error('unexpected namespace!');
    }
    return v;
  }
}
