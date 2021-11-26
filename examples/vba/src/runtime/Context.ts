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
  VBArray,
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
  VBAny,
  VBMissingArgument,
  ExitToken,
} from './types';
import { evaluate } from './evaluator/index';
import { load } from './loader/index';
import { last } from './utils';
import bindings from './std/libs';
import {
  throwVBRuntimeError,
  VBParseError,
  VBRuntimeError,
} from './data-structure/VBError';
import { VBArguments } from './data-structure/VBArguments';

type ShiftArray<T> = T extends [any, ...infer u] ? u : never;

const defaultFileId: VBFile = {
  id: Math.random() + '',
  name: 'default',
  type: 'module',
};

export interface CallOptions {
  logError?: boolean;
  file?: VBFile;
  args?: VBArguments;
}

interface MemberItem {
  parentMember?: VBAny | undefined;
}

export class VBBinderArguments {
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
  parentMember?: VBAny | undefined;

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

  resetMemberInternal() {
    this.memberStack = [];
    this.parentMember = undefined;
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
      throwVBRuntimeError(this, 'INTERNAL_ERROR', 'popMember');
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
        const get = userBinder.get;
        binder = new VBValuePointer(
          this,
          get ? () => get(this) : userBinder.value,
          undefined,
          true,
        );
      } else {
        binder = userBinder;
      }
      namespace.set(name, binder);
    } else {
      throwVBRuntimeError(this, 'BINDING_ERROR');
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
      throwVBRuntimeError(this, 'BINDING_ERROR');
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
      throwVBRuntimeError(this, 'NOT_FOUND_FILE', name);
    }
    return name;
  }

  async _setupScope(
    sub: VBSub | SubBinder,
    args: VBArguments,
    argumentsInfo: ArgInfo[],
    file: VBFile = this.currentFile,
  ) {
    const fillOptionalArgument = async (argInfo: ArgInfo) => {
      if (argInfo.optional) {
        await scope.setVariableValue(
          argInfo.name,
          new VBValuePointer(
            this,
            argInfo.defaultValue || new VBMissingArgument(),
            argInfo.asType,
          ),
        );
        return;
      }
      throwVBRuntimeError(this, 'NO_OPTIONAL_ARGUMENT', argInfo.name);
    };

    const fillParamArrayArgument = async (
      argInfo: ArgInfo,
      getArgs: () => VBAny[],
    ) => {
      if (argInfo?.paramArray) {
        const args = getArgs();
        const params = this.createArray('variant', [
          { upper: args.length - 1 },
        ]);
        for (let j = 0; j < args.length; j++) {
          const nest = args[j];
          // The parameter array is always zero based and
          // is not effected by the Option Base statement.
          params.setElement([j], nest);
        }
        await scope.setVariable(argInfo.name, new VBValuePointer(this, params));
        i = argumentsInfo.length;
        return true;
      }
    };
    const scope = new VBScope(file, sub, this);
    let i = 0;
    for (; i < argumentsInfo.length; i++) {
      const argInfo = argumentsInfo[i];
      const a = args.getIndexedValue(i) || args.getNamedValue(argInfo.name);
      if (
        !args.namedValues &&
        (await fillParamArrayArgument(argInfo, () =>
          args.indexedValues.slice(i),
        ))
      ) {
        break;
      }
      if (!a || a.type === 'MissingArgument') {
        await fillOptionalArgument(argInfo);
        continue;
      }
      if (a.type === 'Pointer' && argInfo.byRef) {
        await scope.setVariable(
          argInfo.name,
          new VBValuePointer(this, a, argInfo.asType),
        );
      } else {
        await scope.setVariableValue(argInfo.name, a);
      }
    }
    this.scopeStack.push(scope);
    return scope;
  }

  async callVBSubInternal(
    subSymbolItem: VBSub,
    args: VBArguments = new VBArguments(this),
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
      subSymbolItem,
      args,
      argumentsInfo,
      subSymbolItem.file,
    );
    const clean = () => {
      this.currentFile = currentFile;
      this.popMemberInternal();
      this.scopeStack.pop();
    };
    if (classObj) {
      currentScope.classObj = classObj;
    }
    let ret: VBValue = VB_EMPTY;
    try {
      ret = await evaluate(subSymbolItem.block, this);
    } catch (e: unknown) {
      let error = e;
      let run = true;
      while (run) {
        run = false;
        const exitNode = error as ExitToken;
        if (error instanceof VBRuntimeError) {
          if (currentScope.error || !subSymbolItem.onErrorLineLabel) {
            clean();
            throw error;
          } else {
            currentScope.error = error;
            try {
              await subSymbolItem.onError();
            } catch (e2) {
              error = e2;
              run = true;
            }
          }
        } else if (
          exitNode &&
          exitNode.type === 'Exit' &&
          (exitNode.subType === 'EXIT_FUNCTION' ||
            exitNode.subType === 'EXIT_PROPERTY' ||
            exitNode.subType === 'EXIT_SUB')
        ) {
          // just exit sub
        } else {
          throw e;
        }
      }
    }

    clean();
    if (subSymbolItem.type === 'function') {
      const obj = await currentScope.getVariable(subName);
      if (obj.type === 'Namespace') {
        throwVBRuntimeError(this, 'UNEXPECTED_ERROR', 'return namespace');
      }
      ret = await obj.getValue();
    } else {
      ret = VB_EMPTY;
    }

    return ret;
  }

  async callSubBinderInternal(
    subDef: SubBinder,
    args: VBArguments = new VBArguments(this),
  ): Promise<VBValue> {
    this.stashMemberInternal();
    const scope = await this._setupScope(
      subDef,
      args,
      subDef.argumentsInfo || [],
    );
    let ret;
    try {
      ret = await subDef.value(new VBBinderArguments(scope), this);
    } finally {
      this.popMemberInternal();
      this.scopeStack.pop();
    }
    if (ret !== undefined) {
      return ret;
    }
    return VB_EMPTY;
  }

  async callSubInternal(
    subName: string,
    args: VBArguments = new VBArguments(this),
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
        throwVBRuntimeError(this, 'NOT_FOUND_SUB', subName);
      }
      if (namespace.type === 'Namespace') {
        defMap = namespace.value;
      } else if (namespace.type === 'SubBinder' && i === names.length - 1) {
        subDef = namespace;
      }
    }

    if (!subDef) {
      throwVBRuntimeError(this, 'NOT_FOUND_SUB', subName);
    }

    return this.callSubBinderInternal(subDef, args);
  }

  public async load(code: string, file: VBFile = defaultFileId) {
    this.resetMemberInternal();
    if (!code) {
      this.symbolTable.delete(file.id);
      return;
    }
    const currentFile = this.getFileById(file.id) || file;
    currentFile.name = file.name.toLowerCase();
    this.currentFile = currentFile;
    const currentFileSymbolTable = this.symbolTable.get(currentFile.id);
    if (currentFileSymbolTable && currentFileSymbolTable.code === code) {
      currentFileSymbolTable.file = currentFile;
      return;
    }
    const { ast, error } = parser.parse(code);
    if (error) {
      throw new VBParseError(error);
    }
    this.astMap.set(currentFile.id, ast);
    this.symbolTable.set(
      currentFile.id,
      new FileSymbolTable(currentFile, code),
    );
    try {
      await load(ast, this);
    } catch (e) {
      this.symbolTable.delete(currentFile.id);
      this.astMap.delete(currentFile.id);
      throw e;
    }
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

  public reset() {
    this.resetMemberInternal();
    this.scopeStack = [];
  }

  public getPublicModuleSubs(file?: VBFile) {
    const ret: string[] = [];
    const { symbolTable } = this;
    let items: FileSymbolTable[] = [];
    if (file) {
      const table = symbolTable.get(file.id);
      if (table) {
        items.push(table);
      }
    } else {
      items = Array.from(this.symbolTable.values());
    }
    for (const item of items) {
      if (item.type === 'module') {
        const table = item.symbolTable;
        table.forEach((value) => {
          if (!value.isPrivate()) {
            ret.push(value.name);
          }
        });
      }
    }
    return ret;
  }

  public async callSub(subName: string, options: CallOptions = {}) {
    const { currentFile } = this;
    if (options.file) {
      const { file } = options;
      const existingFile = this.getFileById(file.id);
      if (!existingFile) {
        throwVBRuntimeError(this, 'NOT_FOUND_FILE_ID', file.id);
      }
      this.currentFile = existingFile;
    }
    try {
      return await this.callSubInternal(subName, options.args);
    } catch (e: unknown) {
      if (e instanceof Error && this.currentAstNode && this.currentFile) {
        if (options.logError !== false) {
          console.error(e);
        }
        if (e instanceof VBRuntimeError) {
          e.completeVBPositionInfo();
        }
        this.reset();
        throw e;
      }

      const exit = e as ExitToken;

      if (exit.type === 'Exit' && exit.subType === 'END') {
      } else {
        console.error(e);
        // unknown error
        console.error(
          `unkown error: (line ${this.currentAstNode?.firstLine} at file ${this.currentFile.name})`,
        );
        this.reset();
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

  public createArray(
    ...args: ShiftArray<ConstructorParameters<typeof VBArray>>
  ) {
    return new VBArray(this, ...args);
  }

  public throwError(number: number, source?: string, description?: string) {
    const error = new VBRuntimeError(number);
    error.vbFile = this.currentFile;
    error.vbFirstLine = this.currentAstNode?.firstLine || -1;
    if (source) error.vbErrorSource = source;
    if (description) error.message = description;
    throw error;
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
      throwVBRuntimeError(this, 'NOT_FOUND_CLASS', name);
    }
    await value.init();
    return value;
  }
}
