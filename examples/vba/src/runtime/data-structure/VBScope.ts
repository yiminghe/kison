import type { VBFile } from './runtime';
import type { Context } from '../Context';
import { VBClass, VBObject, VBValue } from './VBValue';

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
    let v = this.variableMap.get(name);
    if (v) {
      return v;
    }
    const subItem = this.context.getSymbolItemFromFile(
      this.subName,
      this.file.id,
    );
    if (subItem && subItem.type !== 'variable') {
      v = subItem.getStaticVariable(name);
    }
    if (v) {
      return v;
    }

    if (this.classObj) {
      v = this.classObj.getMember(name);
    }

    if (v) {
      return v;
    }

    const vItem = this.context.getSymbolItem(name, this.file);
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
