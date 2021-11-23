import parser from '../parser';
import type {
  AstRootNode,
  AstNode,
  AstTokenNode,
  Ast_END_Node,
} from '../parser';
import {
  VBNativeClass,
  VBBindClass,
  VBValue,
  SubBinder,
  VBFile,
  VBSub,
  VBClass,
  VariableBinder,
  UserVariableBinder,
  UserClassBinder,
  VBValuePointer,
  VB_TRUE,
  VB_FALSE,
  SymbolItem,
  VBScope,
  ArgInfo,
  VBNamespace,
  VB_EMPTY,
  VBPointer,
  FileSymbolTable,
  ClassBinder,
  NamespaceMap,
  VBInteger,
  VBString,
  VBVariable,
} from './types';
import { evaluate } from './evaluator/index';
import { load } from './loader/index';
import { last } from './utils';
import bindings from './binding/bindings';

const defaultFileId: VBFile = {
  id: Math.random() + '',
  name: 'default',
  type: 'module',
};

export interface CallOptions {
  logError?: boolean;
  file?: VBFile;
}

interface MemberItem {
  parentMember?: VBPointer | VBValue | undefined;
}

export class VBArguments {
  constructor(public scope: VBScope) {}
  async getValue(name: string) {
    const obj = await this.scope.getVariable(name);
    if (obj.type === 'Pointer') {
      return obj.getValue();
    }
  }
  async setValue(name: string, value: VBValue) {
    const obj = await this.scope.getVariable(name);
    if (obj.type === 'Pointer') {
      return obj.setValue(value);
    }
  }
}

export class Context {
  parentMember?: VBPointer | VBValue | undefined;

  memberStack: MemberItem[] = [];

  astMap = new Map<string, AstRootNode>();

  bindersMap: NamespaceMap = new Map();

  currentFile: VBFile = defaultFileId;

  symbolTable = new Map<string, FileSymbolTable>();

  scopeStack: VBScope[] = [];

  currentAstNode: AstNode | undefined;

  constructor() {
    for (const b of bindings) {
      this._registerBinder(b);
    }
  }

  stashMemberInternal() {
    this.memberStack.push({
      parentMember: this.parentMember,
    });
    this.parentMember = undefined;
  }

  popMemberInternal() {
    const item = this.memberStack.pop();
    if (!item) {
      throw new Error('Internal Error at popMember');
    }
    this.parentMember = item.parentMember;
  }

  registerSymbolItemInternal(name: string, item: SymbolItem) {
    const { symbolTable, currentFile: currentFileId } = this;
    const currentTable = symbolTable.get(currentFileId.id)!;
    currentTable.symbolTable.set(name.toLowerCase(), item);
  }

  _registerBinder(userBinder: VariableBinder | SubBinder | ClassBinder) {
    const names = userBinder.name.split('.');
    const namespace = this._findBind(names);
    if (namespace) {
      const name = last(names);
      let binder;
      if (userBinder.type === 'VariableBinder') {
        binder = new VBValuePointer(userBinder.value, undefined, true);
      } else {
        binder = userBinder;
      }
      namespace.set(name, binder);
    } else {
      throw new Error('error when binding');
    }
  }

  _findBind(names: string[]): NamespaceMap | null {
    let namespace = this.bindersMap;
    const len = names.length;
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      if (i === len - 1) {
        return namespace;
      } else {
        if (!namespace.get(name)) {
          const newNamespace = new VBNamespace(name);
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

  _getBinder(names: string[]) {
    const namespace = this._findBind(names);
    if (namespace) {
      return namespace.get(last(names));
    } else {
      throw new Error('error when binding');
    }
  }

  getCurrentScopeInternal() {
    return last(this.scopeStack)!;
  }

  getSymbolItemInternal(name: string, myFile?: VBFile) {
    const { symbolTable } = this;
    if (myFile) {
      const item = this.getSymbolItemFromFileInternal(name, myFile.id, true);
      if (item) {
        return item;
      }
    }
    for (const file of symbolTable.keys()) {
      const item = this.getSymbolItemFromFileInternal(name, file);
      if (item) {
        return item;
      }
    }
  }

  getSymbolItemFromFileInternal(
    name: string,
    file: string,
    noCheckPublic: boolean = false,
  ) {
    const item = this.symbolTable.get(file);
    if (item && item.type === 'module') {
      const sub = item.symbolTable.get(name);
      if (sub) {
        if (noCheckPublic || !sub.isPrivate()) {
          return sub;
        }
      }
    }
  }

  getFileIdFromFileNameInternal(name: string) {
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
    args: (VBValue | VBPointer)[],
    argumentsInfo: ArgInfo[],
    file: VBFile = this.currentFile,
  ) {
    async function fillOptionalArgument(argInfo: ArgInfo) {
      if (argInfo.optional && argInfo.defaultValue) {
        await scope.setVariableValue(
          argInfo.name,
          new VBValuePointer(argInfo.defaultValue, argInfo.asType),
        );
        return;
      }
      throw new Error('No optional argument: ' + argInfo.name);
    }

    const scope = new VBScope(file, subName, this);
    let i = 0;
    for (; i < args.length; i++) {
      const a = args[i];
      const argInfo = argumentsInfo[i];
      if (!argInfo) {
        throw new Error('argument size is not same with parameter size!');
      }
      if (a.type === 'MissingArgument') {
        await fillOptionalArgument(argInfo);
        continue;
      }
      if (a.type === 'Pointer' && argInfo.byRef) {
        await scope.setVariable(
          argInfo.name,
          new VBValuePointer(a, argInfo.asType),
        );
      } else {
        await scope.setVariableValue(argInfo.name, a);
      }
    }
    while (i < argumentsInfo.length) {
      const argInfo = argumentsInfo[i];
      await fillOptionalArgument(argInfo);
      ++i;
    }
    this.scopeStack.push(scope);
    return scope;
  }

  async callVBSubInternal(
    subSymbolItem: VBSub,
    args: (VBValue | VBPointer)[] = [],
    classObj?: VBClass,
  ) {
    if (!subSymbolItem.block) {
      return VB_EMPTY;
    }
    this.stashMemberInternal();
    const currentFile = this.currentFile;
    this.currentFile = subSymbolItem.file;
    const argumentsInfo = subSymbolItem.arugmentsInfo;
    const subName = subSymbolItem.name;
    const currentScope = await this._setupScope(
      subName,
      args,
      argumentsInfo,
      subSymbolItem.file,
    );
    if (classObj) {
      currentScope.classObj = classObj;
    }
    let ret: VBValue = VB_EMPTY;
    try {
      ret = await evaluate(subSymbolItem.block, this);
    } catch (e: unknown) {
      const exitNode = e as AstTokenNode;
      if (
        exitNode &&
        exitNode.type === 'token' &&
        (exitNode.token === 'EXIT_FUNCTION' ||
          exitNode.token === 'EXIT_PROPERTY' ||
          exitNode.token === 'EXIT_SUB')
      ) {
        // just exit sub
      } else {
        throw e;
      }
    }
    this.currentFile = currentFile;
    this.popMemberInternal();
    this.scopeStack.pop();
    if (subSymbolItem.type === 'function') {
      const obj = await currentScope.getVariable(subName);
      if (obj.type === 'Namespace') {
        throw new Error('unexpected return namespace!');
      }
      ret = await obj.getValue();
    } else {
      ret = VB_EMPTY;
    }

    return ret;
  }

  async callSubBinderInternal(
    subDef: SubBinder,
    args: (VBValue | VBPointer)[] = [],
  ): Promise<VBValue> {
    this.stashMemberInternal();
    const scope = await this._setupScope(
      subDef.name,
      args,
      subDef.argumentsInfo || [],
    );
    const ret = await subDef.value(new VBArguments(scope), this);
    this.popMemberInternal();
    this.scopeStack.pop();
    if (ret !== undefined) {
      return ret;
    }
    return VB_EMPTY;
  }

  async callSubInternal(
    subName: string,
    args: (VBValue | VBPointer)[] = [],
  ): Promise<VBValue> {
    const { bindersMap: subBindersMap, symbolTable } = this;

    let subSymbolItem: VBSub | VBVariable | undefined =
      this.getSymbolItemFromFileInternal(subName, this.currentFile.id, true);

    if (subSymbolItem?.type === 'variable') {
      subSymbolItem = undefined;
    }

    if (!subSymbolItem) {
      for (const fileId of symbolTable.keys()) {
        subSymbolItem = this.getSymbolItemFromFileInternal(subName, fileId);
        if (subSymbolItem?.type === 'variable') {
          subSymbolItem = undefined;
        }
        if (subSymbolItem) {
          break;
        }
      }
    }

    if (subSymbolItem) {
      return this.callVBSubInternal(subSymbolItem, args);
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

    return this.callSubBinderInternal(subDef, args);
  }

  public async load(code: string, file: VBFile = defaultFileId) {
    if (!code) {
      this.symbolTable.delete(file.id);
      return;
    }
    file = this.getFileById(file.id) || file;
    file.name = file.name.toLowerCase();
    const { ast, error } = parser.parse(code);
    if (error) {
      throw new Error(error.errorMessage);
    }
    this.astMap.set(file.id, ast);
    this.currentFile = file;
    this.symbolTable.set(file.id, new FileSymbolTable(file));
    return load(ast, this);
  }

  public registerSubBinder(subBinder: Omit<SubBinder, 'type'>) {
    const binder: SubBinder = {
      ...subBinder,
      type: 'SubBinder',
      name: subBinder.name.toLowerCase(),
    };
    this._registerBinder(binder);
  }

  public registerVariableBinder(variableBinder: UserVariableBinder) {
    const binder: VariableBinder = {
      ...variableBinder,
      type: 'VariableBinder',
      name: variableBinder.name.toLowerCase(),
    };
    this._registerBinder(binder);
  }

  public registerClassBinder(classBinder: UserClassBinder) {
    const binder: ClassBinder = {
      type: 'ClassBinder',
      ...classBinder,
      name: classBinder.name.toLowerCase(),
    };
    this._registerBinder(binder);
  }

  public async callSub(
    subName: string,
    args: (VBValue | VBPointer)[] = [],
    options: CallOptions = {},
  ) {
    const { currentFile } = this;
    if (options.file) {
      const { file } = options;
      const existingFile = this.getFileById(file.id);
      if (!existingFile) {
        throw new Error('Can not find file id:' + file.id);
      }
      this.currentFile = existingFile;
    }
    try {
      return await this.callSubInternal(subName, args);
    } catch (e: unknown) {
      if (e instanceof Error && this.currentAstNode && this.currentFile) {
        if (options.logError !== false) {
          console.error(e);
        }
        throw new Error(
          e.message +
            ` (line ${this.currentAstNode.firstLine} at file ${this.currentFile.name})`,
        );
      }

      const exit: Ast_END_Node = e as Ast_END_Node;

      if (exit.type === 'token' && exit.token === 'END') {
      } else {
        // unknown error
        console.error(
          `unkown error: (line ${this.currentAstNode?.firstLine} at file ${this.currentFile.name})`,
        );
        throw exit;
      }
    }
    this.currentFile = currentFile;
  }

  public renameFile(id: string, name: string) {
    const file = this.getFileById(id);
    if (file) {
      file.name = name.toLowerCase();
    }
  }

  public getFileById(id: string) {
    const { symbolTable } = this;
    for (const fileSymbolTable of symbolTable.values()) {
      const { file } = fileSymbolTable;
      if (file.id === id) {
        return file;
      }
    }
  }

  public static createInteger(value: number) {
    return new VBInteger(value);
  }

  public static createString(value: string) {
    return new VBString(value);
  }

  public static createBoolean(value: boolean) {
    return value ? VB_TRUE : VB_FALSE;
  }

  public createInteger(value: number) {
    return Context.createInteger(value);
  }

  public createString(value: string) {
    return Context.createString(value);
  }

  public createBoolean(value: boolean) {
    return Context.createBoolean(value);
  }

  public async createObject(name: string) {
    const classType = name.toLowerCase().split('.');
    const binder = this._getBinder(classType);
    let value: VBClass | undefined;
    if (binder && binder.type === 'ClassBinder') {
      value = new VBBindClass(binder, this);
    } else if (classType.length === 1) {
      const classId = this.getFileIdFromFileNameInternal(classType[0]);
      const symbolItem = this.symbolTable.get(classId);
      if (symbolItem && symbolItem.type === 'class') {
        value = new VBNativeClass(classId, this);
      }
    }
    if (!value) {
      throw new Error('Can not find class: ' + name);
    }
    await value.init();
    return value;
  }
}
