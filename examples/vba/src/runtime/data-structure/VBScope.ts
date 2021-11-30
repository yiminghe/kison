import type { SubBinding, VBFile } from './runtime';
import type { Context } from '../Context';
import type { VBClass } from './VBClass';
import { VBPointer, VBValuePointer, VBAny } from './VBPointer';
import { VBNamespace } from './VBNamespace';
import { last } from '../utils';
import { throwVBRuntimeError, VBRuntimeError } from './VBError';
import { VBSub } from './VBSub';
import { AstNode } from '../../parser';

export class VBScope {
  variableMap = new Map<string, VBPointer>();

  private _error: VBRuntimeError | undefined;
  private _errorAstNode: AstNode | undefined;

  currentAstNode: AstNode | undefined;

  calledScope: VBScope | undefined;

  constructor(
    public file: VBFile,
    public sub: VBSub | SubBinding,
    public context: Context,
    public classObj?: VBClass,
  ) {
    this.calledScope = last(context.scopeStack);
    const returnName = last(this.subName.split('.'));
    this.variableMap.set(returnName, new VBValuePointer(context));
  }

  set error(e: VBRuntimeError | undefined) {
    this._errorAstNode = e ? this.currentAstNode : undefined;
    this._error = e;
  }

  get error(): VBRuntimeError | undefined {
    return this._error;
  }

  getErrorPositionInfo(useLastestPosition?: boolean) {
    if (this.sub.type === 'SubBinding') {
      return `at ${this.subName} (SubBinding)`;
    } else {
      const node = useLastestPosition
        ? this.currentAstNode
        : this._errorAstNode || this.currentAstNode;
      return `at ${this.subName} (${this.file.name}:${node?.firstLine})`;
    }
  }

  get subName() {
    return this.sub.name;
  }

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

    // binding
    const binding = context.bindingMap.get(name);
    if (binding) {
      if (binding.type === 'Namespace') {
        return binding;
      }
      if (binding.type === 'Pointer') {
        return binding;
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
    v = new VBValuePointer(this.context);
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
      throwVBRuntimeError(this.context, 'UNEXPECTED_ERROR', 'namespace');
    }
    return v;
  }
}
