import parser from '../parser';
import type { AstRootNode } from '../parser';
import {
  VBValue,
  SubBinder,
  VBFile,
  SubSymbolItem,
  VBClass,
  VariableBinder,
  UserVariableBinder,
  UserClassBinder,
  VBNativeObject,
  VB_TRUE,
  VB_FALSE,
} from './types';
import { evaluate } from './evaluator/index';
import { load } from './loader/index';
import {
  SymbolItem,
  VBScope,
  ArgInfo,
  VBNamespaceBinder,
  VB_EMPTY,
  VBObject,
  ExitResult,
  VBEmpty,
  END_EXIT_RESULT,
  FileSymbolTable,
  ClassBinder,
  BinderMap,
  VBInteger,
  VBString,
} from './types';
import { last } from './utils';

const defaultFileId: VBFile = {
  id: Math.random() + '',
  name: 'default',
  type: 'module',
};

export class Context {
  astMap = new Map<VBFile, AstRootNode>();

  bindersMap: BinderMap = new Map();

  currentFile: VBFile = defaultFileId;

  symbolTable = new Map<string, FileSymbolTable>();

  scopeStack: VBScope[] = [];

  load(code: string, file: VBFile = defaultFileId) {
    file.name = file.name.toLowerCase();
    if (!code) {
      this.symbolTable.delete(file.id);
    }
    const { ast, error } = parser.parse(code);
    if (error) {
      throw new Error(error.errorMessage);
    }
    this.astMap.set(file, ast);
    this.currentFile = file;
    this.symbolTable.set(file.id, new FileSymbolTable(file));
    return load(ast, this);
  }

  registerSymbolItem(name: string, item: SymbolItem) {
    const { symbolTable, currentFile: currentFileId } = this;
    const currentTable = symbolTable.get(currentFileId.id)!;
    currentTable.symbolTable.set(name.toLowerCase(), item);
  }

  registerSubBinder(subBinder: Omit<SubBinder, 'type'>) {
    const binder: SubBinder = {
      ...subBinder,
      type: 'SubBinder',
      name: subBinder.name.toLowerCase(),
    };
    this._registerBinder(binder);
  }

  registerVariableBinder(variableBinder: UserVariableBinder) {
    const binder: VariableBinder = {
      ...variableBinder,
      type: 'VariableBinder',
      name: variableBinder.name.toLowerCase(),
    };
    this._registerBinder(binder);
  }

  registerClassBinder(classBinder: UserClassBinder) {
    const binder: ClassBinder = {
      type: 'ClassBinder',
      ...classBinder,
      name: classBinder.name.toLowerCase(),
    };
    this._registerBinder(binder);
  }

  _registerBinder(userBinder: VariableBinder | SubBinder | ClassBinder) {
    const names = userBinder.name.split('.');
    const namespace = this._findBind(names);
    if (namespace) {
      const name = last(names);
      let binder;
      if (userBinder.type === 'VariableBinder') {
        binder = new VBNativeObject(userBinder.value, undefined, true);
      } else {
        binder = userBinder;
      }
      namespace.set(name, binder);
    } else {
      throw new Error('error when binding');
    }
  }

  _findBind(names: string[]): BinderMap | null {
    let namespace = this.bindersMap;
    const len = names.length;
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      if (i === len - 1) {
        return namespace;
      } else {
        if (!namespace.get(name)) {
          const newNamespace = new VBNamespaceBinder(name);
          namespace.set(name, newNamespace);
        }
        const n2 = namespace.get(name);
        if (n2?.type !== 'Namespace') {
          return null;
        }
        namespace = n2.value;
      }
    }
    return null;
  }

  getBinder(names: string[]) {
    const namespace = this._findBind(names);
    if (namespace) {
      return namespace.get(last(names));
    } else {
      throw new Error('error when binding');
    }
  }

  getCurrentScope() {
    return last(this.scopeStack)!;
  }

  renameFile(id: string, name: string) {
    name = name.toLowerCase();
    const { symbolTable } = this;
    for (const fileSymbolTable of symbolTable.values()) {
      const { file } = fileSymbolTable;
      if (file.id === id) {
        file.name = name;
      }
    }
  }

  getSymbolItem(name: string, myFile?: VBFile) {
    const { symbolTable } = this;
    if (myFile) {
      const item = this.getSymbolItemFromFile(name, myFile.id, true);
      if (item) {
        return item;
      }
    }
    for (const file of symbolTable.keys()) {
      const item = this.getSymbolItemFromFile(name, file);
      if (item) {
        return item;
      }
    }
  }

  getSymbolItemFromFile(
    name: string,
    file: string,
    noCheckPublic: boolean = false,
  ) {
    const item = this.symbolTable.get(file);
    if (item && item.type === 'module') {
      const sub = item.symbolTable.get(name);
      if (sub) {
        if (noCheckPublic || sub.visibility === 'PUBLIC') {
          return sub;
        }
      }
    }
  }

  getFileIdFromFileName(name: string) {
    if (this.bindersMap.get(name)?.type === 'Namespace') {
      return name;
    }
    for (const fileSymbolTable of this.symbolTable.values()) {
      const { file } = fileSymbolTable;
      if (file.name === name) {
        return file.id;
      }
    }
    throw new Error('Can not find file name: ' + name);
  }

  _setupScope(
    subName: string,
    args: (VBValue | VBObject)[],
    argumentsInfo: ArgInfo[],
    file: VBFile = this.currentFile,
  ) {
    const scope = new VBScope(file, subName, this);
    let i = -1;
    for (const a of args) {
      ++i;
      const argInfo = argumentsInfo[i];
      if (!argInfo) {
        continue;
      }
      if (a.type === 'Object' && argInfo.byRef) {
        scope.setVariable(argInfo.name, new VBNativeObject(a, argInfo.asType));
      } else {
        scope.setVariableValue(argInfo.name, a);
      }
    }
    while (i < argumentsInfo.length) {
      const argInfo = argumentsInfo[i];
      if (argInfo) {
        if (argInfo.optional && argInfo.defaultValue) {
          scope.setVariableValue(
            argInfo.name,
            new VBNativeObject(argInfo.defaultValue.value, argInfo.asType),
          );
        }
      }
      ++i;
    }
    this.scopeStack.push(scope);
  }

  async callSubSymbolItem(
    subSymbolItem: SubSymbolItem,
    args: (VBValue | VBObject)[] = [],
    classObj?: VBClass,
  ) {
    const argumentsInfo = subSymbolItem.arugmentsInfo;
    const subName = subSymbolItem.name;
    this._setupScope(subName, args, argumentsInfo, subSymbolItem.file);
    if (classObj) {
      last(this.scopeStack).classObj = classObj;
    }
    let ret = await evaluate(subSymbolItem.block, this);
    if (ret && (ret as ExitResult).type === 'Exit') {
      const exit: ExitResult = ret;
      if (exit.token.token === 'END') {
        return exit;
      }
    }
    if (subSymbolItem.type === 'function') {
      ret = last(this.scopeStack).getVariable(subName).value;
    } else {
      ret = VBEmpty;
    }
    this.scopeStack.pop();
    return ret;
  }

  async callSubBinder(
    subDef: SubBinder,
    args: (VBValue | VBObject)[] = [],
  ): Promise<VBValue | VBNamespaceBinder | typeof END_EXIT_RESULT> {
    this._setupScope(subDef.name, args, subDef.argumentsInfo || []);
    const passedArgs: Record<string, VBObject> = {};
    const scope = this.getCurrentScope();
    for (const name of scope.variableMap.keys()) {
      Object.defineProperty(passedArgs, name, {
        get() {
          const v = scope.getVariable(name);
          if (v.type === 'Object') {
            return v;
          }
          return undefined;
        },
      });
    }
    const ret = await subDef.value(passedArgs);
    if (ret === false) {
      return END_EXIT_RESULT;
    }
    this.scopeStack.pop();
    if (ret !== undefined) {
      return ret;
    }
    return VB_EMPTY;
  }

  async callSub(subName: string, args: (VBValue | VBObject)[] = []) {
    function getItemFromFile(file: string, noCheck: boolean = false) {
      const item = symbolTable.get(file);
      if (item && item.type === 'module') {
        const sub = item.symbolTable.get(subName);
        if (sub && sub.type !== 'variable') {
          if (noCheck || sub.visibility === 'PUBLIC') {
            return sub;
          }
        }
      }
    }

    const { bindersMap: subBindersMap, symbolTable } = this;
    let subSymbolItem: SubSymbolItem | undefined = getItemFromFile(
      this.currentFile.id,
      true,
    );
    if (!subSymbolItem) {
      for (const file of symbolTable.keys()) {
        subSymbolItem = getItemFromFile(file);
        if (subSymbolItem) {
          break;
        }
      }
    }
    if (subSymbolItem) {
      return this.callSubSymbolItem(subSymbolItem, args);
    }
    const names = subName.split('.');

    let defMap = subBindersMap;
    let i;
    let subDef;

    for (i = 0; i < names.length; i++) {
      const n = names[i];
      const namespace = defMap.get(n);
      if (!namespace) {
        throw new Error('Can not find sub definition: ' + subName);
      }
      if (namespace.type === 'Namespace') {
        defMap = namespace.value;
      } else if (namespace.type === 'SubBinder' && i === names.length - 1) {
        subDef = namespace;
      }
    }

    if (!subDef) {
      throw new Error('Can not find sub definition: ' + subName);
    }

    return this.callSubBinder(subDef, args);
  }

  static createInteger(value: number) {
    return new VBInteger(value);
  }

  static createString(value: string) {
    return new VBString(value);
  }

  static createBoolean(value: boolean) {
    return value ? VB_TRUE : VB_FALSE;
  }
}
