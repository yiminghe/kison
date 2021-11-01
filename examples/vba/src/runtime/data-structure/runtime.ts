import type { Context } from '../Context';
import type { AstSymbolNode, LiteralToken, AstNodeTypeMap } from '../../parser';
import { VBValue, AsTypeClauseInfo } from './VBValue';
import { VBObject } from './VBObject';
import { Visibility_Node } from '../../parserLLK';
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

export type Visibility = Visibility_Node['children'][0]['token'];

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

export type ExtractSymbol<
  T extends string = any,
  Prefix extends string = any,
> = T extends `${Prefix}_${infer s}`
  ? s extends LiteralToken | AstSymbolNode['symbol']
    ? s
    : 'ast'
  : 'ast';

export type AstVisitor<T extends string = any, Prefix extends string = any> = (
  node: AstNodeTypeMap[ExtractSymbol<T, Prefix>],
  context: Context,
) => any;

export type Evaluators = {
  [e in
    | `evaluate_${LiteralToken | AstSymbolNode['symbol']}`
    | 'evaluate']?: AstVisitor<e, 'evaluate'>;
};

export type Loaders = {
  [e in `load_${LiteralToken | AstSymbolNode['symbol']}` | 'load']?: AstVisitor<
    e,
    'load'
  >;
};

export class FileSymbolTable {
  symbolTable = new Map<SymbolName, SymbolItem>();
  constructor(public file: VBFile) {}

  get type() {
    return this.file.type;
  }
}
