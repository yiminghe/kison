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
  SubBinding,
  VBFile,
  VBSub,
  VBClass,
  VariableBinding,
  UserVariableBinding,
  UserClassBinding,
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
  ClassBinding,
  NamespaceMap,
  VBInteger,
  VBString,
  VBVariable,
  VBAny,
  VBMissingArgument,
  ExitToken,
  VBDouble,
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

const defaultFile: VBFile = {
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

export class VBBindingArguments {
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
  withStack: VBAny[] = [];

  private stashedWithStack: VBAny[][] = [];

  astMap = new Map<string, AstRootNode>();

  bindingMap: NamespaceMap = new Map();

  symbolTable = new Map<string, FileSymbolTable>();

  scopeStack: VBScope[] = [];

  constructor() {
    for (const b of bindings) {
      this._registerBinding(b);
    }
  }

  stashWithStackInternal() {
    this.stashedWithStack.push(this.withStack);
    this.withStack = [];
  }

  popWithStackInternal() {
    this.withStack = this.stashedWithStack.pop()!;
    if (!this.withStack) {
      throwVBRuntimeError(this, 'INTERNAL_ERROR', 'unmatched with statement!');
    }
  }

  get currentFile() {
    return last(this.scopeStack)?.file;
  }

  get currentAstNode(): AstNode | undefined {
    return last(this.scopeStack)?.currentAstNode;
  }

  set currentAstNode(v: AstNode | undefined) {
    last(this.scopeStack).currentAstNode = v;
  }

  registerSymbolItemInternal(name: string, item: SymbolItem) {
    const { symbolTable, currentFile } = this;
    const currentTable = symbolTable.get(currentFile!.id)!;
    currentTable.symbolTable.set(name.toLowerCase(), item);
  }

  _registerBinding(userBinding: VariableBinding | SubBinding | ClassBinding) {
    const names = userBinding.name.split('.');
    const namespace = this._findBind(names);
    if (namespace) {
      const name = last(names);
      let binding;
      if (userBinding.type === 'VariableBinding') {
        const get = userBinding.get;
        binding = new VBValuePointer(
          this,
          get ? () => get(this) : userBinding.value,
          undefined,
          true,
        );
      } else {
        binding = userBinding;
      }
      namespace.set(name, binding);
    } else {
      throwVBRuntimeError(this, 'BINDING_ERROR');
    }
  }

  _findBind(names: string[]): NamespaceMap | null {
    let namespace = this.bindingMap;
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

  _getBinding(names: string[]) {
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

  getLastScopeInternal() {
    return last(this.scopeStack, 2)!;
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
    fileId: string,
    noCheckPublic: boolean = false,
  ) {
    const item = this.symbolTable.get(fileId);
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
    if (this.bindingMap.get(name)?.type === 'Namespace') {
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
    sub: VBSub | SubBinding,
    args: VBArguments,
    argumentsInfo: ArgInfo[],
    file: VBFile,
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
          await params.setElement([j], nest);
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

  _popToScope(scope: VBScope) {
    const { scopeStack } = this;
    for (let i = scopeStack.length - 1; i >= 0; i--) {
      if (scopeStack[i] === scope) {
        break;
      } else {
        scopeStack.pop();
      }
    }
  }

  async callVBSubInternal(
    subSymbolItem: VBSub,
    args: VBArguments = new VBArguments(this),
    classObj?: VBClass,
  ) {
    if (!subSymbolItem.block) {
      return VB_EMPTY;
    }
    const argumentsInfo = subSymbolItem.arugmentsInfo;
    const subName = subSymbolItem.name;
    const currentScope = await this._setupScope(
      subSymbolItem,
      args,
      argumentsInfo,
      subSymbolItem.file,
    );
    this.stashWithStackInternal();
    const clean = () => {
      this.popWithStackInternal();
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
            try {
              this._popToScope(currentScope);
              currentScope.error = error;
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
          clean();
          throw e;
        }
      }
    }
    clean();
    this.scopeStack.pop();
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

  async callSubBindingInternal(
    subDef: SubBinding,
    args: VBArguments = new VBArguments(this),
  ): Promise<VBValue> {
    const scope = await this._setupScope(
      subDef,
      args,
      subDef.argumentsInfo || [],
      this.currentFile,
    );
    let ret;
    ret = await subDef.value(new VBBindingArguments(scope), this);
    this.scopeStack.pop();
    if (ret !== undefined) {
      return ret;
    }
    return VB_EMPTY;
  }

  async callSubInternal(
    subName: string,
    args: VBArguments = new VBArguments(this),
    file = this.currentFile,
  ): Promise<VBValue> {
    const { bindingMap: subBindingsMap, symbolTable } = this;

    let subSymbolItem: VBSub | VBVariable | undefined =
      this.getSymbolItemFromFileInternal(subName, file?.id, true);

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

    let defMap = subBindingsMap;
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
      } else if (namespace.type === 'SubBinding' && i === names.length - 1) {
        subDef = namespace;
      }
    }

    if (!subDef) {
      throwVBRuntimeError(this, 'NOT_FOUND_SUB', subName);
    }

    return this.callSubBindingInternal(subDef, args);
  }

  public async load(code: string, file: VBFile = defaultFile) {
    if (!code) {
      this.symbolTable.delete(file.id);
      return;
    }
    const currentFile = this.getFileById(file.id) || file;
    currentFile.name = file.name.toLowerCase();

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
    this.reset(file);
    try {
      await load(ast, this);
    } catch (e) {
      this.symbolTable.delete(currentFile.id);
      this.astMap.delete(currentFile.id);
      throw e;
    }
  }

  public registerSubBinding(subBinding: Omit<SubBinding, 'type'>) {
    const binding: SubBinding = {
      ...subBinding,
      type: 'SubBinding',
      name: subBinding.name.toLowerCase(),
    };
    this._registerBinding(binding);
  }

  public registerVariableBinding(variableBinding: UserVariableBinding) {
    const binding: VariableBinding = {
      ...variableBinding,
      type: 'VariableBinding',
      name: variableBinding.name.toLowerCase(),
    };
    this._registerBinding(binding);
  }

  public registerClassBinding(classBinding: UserClassBinding) {
    const binding: ClassBinding = {
      type: 'ClassBinding',
      ...classBinding,
      name: classBinding.name.toLowerCase(),
    };
    this._registerBinding(binding);
  }

  public reset(file?: VBFile) {
    this.withStack = [];
    this.scopeStack = [];
    if (file) {
      const sub = new VBSub(null!, this);
      sub.initWithFileAndName(file, 'TOP');
      this.scopeStack = [new VBScope(file, sub, this)];
    }
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

  private nested = 0;

  public async callSub(subName: string, options: CallOptions = {}) {
    let { file } = options;
    if (this.nested === 0) {
      if (!file) {
        const sub = this.getSymbolItemInternal(subName);
        if (sub && sub.type != 'variable') {
          file = file || sub.file;
        }
      }
      this.reset(file || defaultFile);
      this.nested++;
    }
    let filePassed = this.currentFile;
    if (file) {
      const existingFile = this.getFileById(file.id);
      if (!existingFile) {
        this.nested--;
        throwVBRuntimeError(this, 'NOT_FOUND_FILE_ID', file.id);
      }
      filePassed = existingFile;
    }
    try {
      return await this.callSubInternal(subName, options.args, filePassed);
    } catch (e: unknown) {
      if (e instanceof Error) {
        if (this.nested === 1) {
          if (options.logError !== false) {
            console.error(e);
            if (e instanceof VBRuntimeError) {
              console.log('vb stack:  *****************');
              console.log(e.vbStack);
            }
          }
          this.reset();
        }
        throw e;
      }

      const exit = e as ExitToken;

      if (exit.type === 'Exit' && exit.subType === 'END') {
      } else {
        if (this.nested === 1) {
          console.error(e);
          // unknown error
          console.error(
            `unkown error: (line ${this.currentAstNode?.firstLine} at file ${this.currentFile.name})`,
          );
          this.reset();
        }
        throw exit;
      }
    } finally {
      this.nested--;
    }
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

  public static createDouble(value: number) {
    return new VBDouble(value);
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

  public createDouble(value: number) {
    return Context.createDouble(value);
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

  public throwError(
    number: number,
    source?: string,
    description?: string,
    scope?: VBScope,
  ) {
    const error = new VBRuntimeError(number);
    error.initWithVBScope(scope || this.getCurrentScopeInternal());
    if (source) error.vbErrorSource = source;
    if (description) error.message = description;
    throw error;
  }

  public async createObject(name: string) {
    const classType = name.toLowerCase().split('.');
    const binding = this._getBinding(classType);
    let value: VBClass | undefined;
    if (binding && binding.type === 'ClassBinding') {
      value = new VBBindClass(binding, this);
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
