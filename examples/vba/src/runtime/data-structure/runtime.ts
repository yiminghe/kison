import type { Context } from '../Context';
import type { AstSymbolNode, LiteralToken, AstNodeTypeMap } from '../../parser';
import { VBValue, AsTypeClauseInfo } from './VBValue';
import { VBObject } from './VBObject';
import { Visibility_Node } from '../../parserLLK';
import type { SubSymbolItem } from './SubSymbolItem';

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
  _value: VBObject | undefined;
  constructor(
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

  get value() {
    if (this._value) {
      return this._value;
    }
    this._value = this.variableInfo.value();
    return this._value;
  }
}

export type Visibility = Visibility_Node['children'][0]['token'];

export interface SubBinder {
  type: 'subBinder';
  value: (
    context: Context,
  ) => Promise<VBValue | undefined> | VBValue | undefined | false;
  argumentsInfo: ArgInfo[];
  name: string;
}

export interface VariableBinder {
  type: 'variableBinder';
  value: VBValue;
  name: string;
}

export interface UserVariableBinder {
  value: VBValue;
  name: string;
}

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
