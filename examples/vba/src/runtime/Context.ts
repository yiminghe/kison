import parser from '../parser';
import type { AstRootNode, AstNode } from '../parser';
import {
  VBNativeClass,
  VBBindClass,
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
  AsTypeClauseInfo,
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
import { evaluate } from './evaluator/index';
import { load } from './loader/index';
import { last } from './utils';

const defaultFileId: VBFile = {
  id: Math.random() + '',
  name: 'default',
  type: 'module',
};

export interface CallOptions {
  logError?: boolean;
}

interface MemberItem {
  parentMember?: VBObject | VBValue | undefined;
}

export class VBArguments {
  constructor(public scope: VBScope) {}
  async getValue(name: string) {
    const obj = await this.scope.getVariable(name);
    if (obj.type === 'Object') {
      return obj.getValue();
    }
  }
  async setValue(name: string, value: VBValue) {
    const obj = await this.scope.getVariable(name);
    if (obj.type === 'Object') {
      return obj.setValue(value);
    }
  }
}

export class Context {
  parentMember?: VBObject | VBValue | undefined;

  memberStack: MemberItem[] = [];

  astMap = new Map<VBFile, AstRootNode>();

  bindersMap: BinderMap = new Map();

  currentFile: VBFile = defaultFileId;

  symbolTable = new Map<string, FileSymbolTable>();

  scopeStack: VBScope[] = [];

  currentAstNode: AstNode | undefined;

  stashMember() {
    this.memberStack.push({
      parentMember: this.parentMember,
    });
    this.parentMember = undefined;
  }

  popMember() {
    const item = this.memberStack.pop();
    if (!item) {
      throw new Error('Internal Error at popMember');
    }
    this.parentMember = item.parentMember;
  }

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
    if (name !== 'object') {
      throw new Error('Can not find file name: ' + name);
    }
    return name;
  }

  async _setupScope(
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
        await scope.setVariable(
          argInfo.name,
          new VBNativeObject(a, argInfo.asType),
        );
      } else {
        await scope.setVariableValue(argInfo.name, a);
      }
    }
    while (i < argumentsInfo.length) {
      const argInfo = argumentsInfo[i];
      if (argInfo) {
        if (argInfo.optional && argInfo.defaultValue) {
          await scope.setVariableValue(
            argInfo.name,
            new VBNativeObject(
              await argInfo.defaultValue.getValue(),
              argInfo.asType,
            ),
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
    this.stashMember();
    this.currentFile = subSymbolItem.file;
    const argumentsInfo = subSymbolItem.arugmentsInfo;
    const subName = subSymbolItem.name;
    await this._setupScope(subName, args, argumentsInfo, subSymbolItem.file);
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
      const obj = await last(this.scopeStack).getVariable(subName);
      if (obj.type === 'Namespace') {
        throw new Error('unexpected return namespace!');
      }
      ret = await obj.getValue();
    } else {
      ret = VBEmpty;
    }
    this.popMember();
    this.scopeStack.pop();
    return ret;
  }

  async callSubBinder(
    subDef: SubBinder,
    args: (VBValue | VBObject)[] = [],
  ): Promise<VBValue | VBNamespaceBinder | typeof END_EXIT_RESULT> {
    this.stashMember();
    await this._setupScope(subDef.name, args, subDef.argumentsInfo || []);
    const scope = this.getCurrentScope();
    const ret = await subDef.value(new VBArguments(scope), this);
    this.popMember();
    this.scopeStack.pop();
    if (ret === false) {
      return END_EXIT_RESULT;
    }
    if (ret !== undefined) {
      return ret;
    }
    return VB_EMPTY;
  }

  async callSub(
    subName: string,
    args: (VBValue | VBObject)[] = [],
    options: CallOptions = {},
  ) {
    try {
      return await this.callSubInternal(subName, args);
    } catch (e: unknown) {
      if (options.logError !== false) {
        console.error(e);
      }
      if (e instanceof Error && this.currentAstNode && this.currentFile) {
        throw new Error(
          e.message +
            ` (line ${this.currentAstNode.firstLine} at file ${this.currentFile.name})`,
        );
      }
    }
  }

  async callSubInternal(subName: string, args: (VBValue | VBObject)[] = []) {
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

  async createObject(name: string) {
    const classType = name.toLowerCase().split('.');
    const binder = this.getBinder(classType);
    let value: VBClass | undefined;
    if (binder && binder.type === 'ClassBinder') {
      value = new VBBindClass(binder, this);
    } else if (classType.length === 1) {
      const classId = this.getFileIdFromFileName(classType[0]);
      const symbolItem = this.symbolTable.get(classId);
      if (symbolItem && symbolItem.type === 'class') {
        value = new VBNativeClass(classId, this);
      }
    }
    if (!value) {
      throw new Error('Can not find class: ' + classType.join('.'));
    }
    await value.init();
    return value;
  }
}
