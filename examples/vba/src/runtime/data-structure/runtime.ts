import type { Context, VBBindingArguments } from '../Context';
import type { AstVisitors, Ast_Visibility_Node } from '../../parser';
import { VBValue, AsTypeClauseInfo } from './VBValue';
import { VBAny, VBPointer } from './VBPointer';
import type { VBSub } from './VBSub';
import { VBIterable } from './VBArray';

export interface VBFile {
  id: string;
  name: string;
  type: 'module' | 'class';
}

export type SymbolName = string;

export type SymbolItem = VBSub | VBVariable;

export class VBVariable {
  type: 'variable' = 'variable';
  file: VBFile;
  constructor(
    public value: VBPointer,
    public variableInfo: VBVariableInfo,
    public isStatic: boolean,
    public visibility: Visibility,
    public context: Context,
  ) {
    this.file = context.currentFile;
  }

  get name() {
    return this.variableInfo.name;
  }

  isPrivate() {
    return this.visibility === 'PRIVATE';
  }
}

export type Visibility = Ast_Visibility_Node['children'][0]['token'];

export type SubBindingReturnType = VBValue | void;

export interface SubBinding {
  type: 'SubBinding';
  value: (
    args: VBBindingArguments,
    context: Context,
  ) => OptionalPromise<SubBindingReturnType>;
  argumentsInfo?: ArgInfo[];
  returnInfo?: AsTypeClauseInfo;
  name: string;
}

export interface VariableBinding {
  type: 'VariableBinding';
  value?: VBValue;
  get?: (context: Context) => OptionalPromise<VBValue>;
  name: string;
}

export type IndexType = string | number;

export type Optional<T> = T | undefined;

export type OptionalPromise<T> = T | Promise<T>;

export interface InstanceBinding extends VBIterable {
  getElement?(indexes: IndexType[]): OptionalPromise<VBValue>;
  setElement?(indexes: IndexType[], value: VBValue): OptionalPromise<void>;
  get(name: string): OptionalPromise<Optional<VBValue>>;
  set(name: string, value: VBValue): OptionalPromise<void>;
  subs?: Record<string, Omit<UserSubBinding, 'name'>>;
}

export interface ClassBinding {
  type: 'ClassBinding';
  name: string;
  value: (context: Context) => OptionalPromise<InstanceBinding>;
}

export type UserClassBinding = Omit<ClassBinding, 'type'>;
export type UserVariableBinding = Omit<VariableBinding, 'type'>;
export type UserSubBinding = Omit<SubBinding, 'type'>;

export interface ArgInfo {
  byRef?: boolean;
  name: string;
  asType?: AsTypeClauseInfo;
  optional?: boolean;
  defaultValue?: VBValue;
  paramArray?: boolean;
}

export interface VBVariableInfo {
  name: string;
  value: () => OptionalPromise<VBPointer>;
}

export type EvaluateParams = {
  selectValue?: VBValue | undefined;
  parentMember?: VBAny | undefined;
};

export type Evaluators = AstVisitors<'evaluate', Context, EvaluateParams>;

export type Loaders = AstVisitors<'load', Context>;

export class FileSymbolTable {
  symbolTable = new Map<SymbolName, SymbolItem>();
  constructor(public file: VBFile, public code: string) {}

  get type() {
    return this.file.type;
  }
}
