import type { VBFile } from './runtime';
import type { Context } from '../Context';
import type { VBValue } from './VBValue';
import type { VBClass } from './VBClass';
import { VBObject } from './VBObject';

export class VBScope {
  constructor(
    public file: VBFile,
    public subName: string,
    public context: Context,
    public classObj?: VBClass,
  ) {}

  variableMap = new Map<String, VBObject>();

  hasVariable(name: string) {
    return !!this._getVariable(name);
  }

  _getVariable(name: string): VBObject | undefined {
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
      v = classObj.get(name);
    }

    if (v) {
      return v;
    }

    // binder
    v = context.bindersMap.get(name);
    if (v) {
      return v;
    }

    const vItem = context.getSymbolItem(name, file);
    if (vItem && vItem.type === 'variable') {
      v = vItem.value;
    }
    return v;
  }

  getVariable(name: string): VBObject {
    let v = this._getVariable(name);
    if (v) {
      return v;
    }
    v = new VBObject();
    this.variableMap.set(name, v);
    return v;
  }

  setVariable(name: string, value: VBObject) {
    this.variableMap.set(name, value);
    return value;
  }

  setVariableValue(name: string, value: VBValue | VBObject) {
    let v = this.getVariable(name);
    const setValue = value.type === 'Object' ? value.value : value;
    v.value = setValue;
    return v;
  }
}
