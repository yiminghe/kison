import type { Context } from '../Context';
import type { AstVisitors } from '../../parser';
import { VBValue, AsTypeClauseInfo } from './VBValue';
import { VBObject } from './VBObject';
import { Ast_Visibility_Node } from '../../parserLLK';
import type { SubSymbolItem } from './SubSymbolItem';
import { VBNamespaceBinder } from './VBNamespace';

export interface VBFile {
  id: string;
  name: string;
  type: 'module' | 'class';
}

export type SymbolName = string;

export type SymbolItem = SubSymbolItem | VariableSymbolItem;

export class VariableSymbolItem {
  type: 'variable' = 'variable';
  file: VBFile;
  constructor(
    public value: VBObject,
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
}

export type Visibility = Ast_Visibility_Node['children'][0]['token'];

export type SubBinderReturnType =
  | VBValue
  | undefined
  | false
  | VBNamespaceBinder;

export interface SubBinder {
  type: 'SubBinder';
  value: (
    args: Record<string, VBObject>,
  ) => Promise<SubBinderReturnType> | SubBinderReturnType;
  argumentsInfo?: ArgInfo[];
  name: string;
}

export interface VariableBinder {
  type: 'VariableBinder';
  value: VBValue;
  name: string;
}

export interface InstanceBinder {
  get(name: string): VBValue;
  set(name: string, value: VBValue): void;
}

export interface ClassBinder {
  type: 'ClassBinder';
  name: string;
  value: () => Promise<InstanceBinder> | InstanceBinder;
}

export type UserClassBinder = Omit<ClassBinder, 'type'>;
export type UserVariableBinder = Omit<VariableBinder, 'type'>;
export type UserSubBinder = Omit<SubBinder, 'type'>;

export interface ArgInfo {
  byRef?: boolean;
  name: string;
  asType?: AsTypeClauseInfo;
  optional?: boolean;
  defaultValue?: VBObject;
}

export interface VBVariableInfo {
  name: string;
  value: () => Promise<VBObject> | VBObject;
}

export type Evaluators = AstVisitors<'evaluate', Context>;

export type Loaders = AstVisitors<'load', Context>;

export class FileSymbolTable {
  symbolTable = new Map<SymbolName, SymbolItem>();
  constructor(public file: VBFile) {}

  get type() {
    return this.file.type;
  }
}
