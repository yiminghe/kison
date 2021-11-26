import type { Context, VBBinderArguments } from '../Context';
import type { AstVisitors, Ast_Visibility_Node } from '../../parser';
import { VBValue, AsTypeClauseInfo } from './VBValue';
import { VBPointer } from './VBPointer';
import type { VBSub } from './VBSub';

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

export type SubBinderReturnType = VBValue | void;

export interface SubBinder {
  type: 'SubBinder';
  value: (
    args: VBBinderArguments,
    context: Context,
  ) => Promise<SubBinderReturnType> | SubBinderReturnType;
  argumentsInfo?: ArgInfo[];
  name: string;
}

export interface VariableBinder {
  type: 'VariableBinder';
  value?: VBValue;
  get?: (context: Context) => VBValue | Promise<VBValue>;
  name: string;
}

export type IndexType = string | number;

export interface InstanceBinder {
  getElement?(indexes: IndexType[]): Promise<VBValue>;
  setElement?(indexes: IndexType[], value: VBValue): Promise<void>;
  get(name: string): Promise<VBValue>;
  set(name: string, value: VBValue): Promise<void>;
  subs?: Record<string, Exclude<UserSubBinder, 'name'>>;
}

export interface ClassBinder {
  type: 'ClassBinder';
  name: string;
  value: (context: Context) => Promise<InstanceBinder> | InstanceBinder;
}

export type UserClassBinder = Omit<ClassBinder, 'type'>;
export type UserVariableBinder = Omit<VariableBinder, 'type'>;
export type UserSubBinder = Omit<SubBinder, 'type'>;

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
  value: () => Promise<VBPointer> | VBPointer;
}

export type Evaluators = AstVisitors<'evaluate', Context>;

export type Loaders = AstVisitors<'load', Context>;

export class FileSymbolTable {
  symbolTable = new Map<SymbolName, SymbolItem>();
  constructor(public file: VBFile, public code: string) {}

  get type() {
    return this.file.type;
  }
}
