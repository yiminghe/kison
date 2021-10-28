import type { Context } from '../Context';
import type { VBValue } from './VBValue';
import type { VBObject } from './VBObject';

// user class
export class VBClass {
  type: 'Class' = 'Class';
  private _init: boolean = false;
  value = new Map<string, VBObject>();
  constructor(public classType: string, public context: Context) {}
  async init() {
    if (this._init) {
      return;
    }
    this._init = true;
    const fileSymbolTable = this.context.symbolTable.get(this.classType);
    if (!fileSymbolTable) {
      throw new Error('Can not find class: ' + this.classType);
    }
    for (const symbolItem of fileSymbolTable.symbolTable.values()) {
      if (symbolItem.type === 'variable') {
        this.value.set(symbolItem.name, symbolItem.value.clone());
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
    const fileSymbolTable = this.context.symbolTable.get(this.classType)!;
    const sub = fileSymbolTable.symbolTable.get(name);
    if (sub && sub.type === 'sub') {
      return this.context.callSubSymbolItem(sub, args, this);
    } else {
      if (check) {
        throw new Error(`Can not find sub ${name} in class ${this.classType}!`);
      }
    }
  }
  callFunction() {}
  letProperty() {}
  setProperty() {}
  getProperty() {}
  set() {}
  get(name: string) {
    return this.value.get(name);
  }
}
