import type {
  VALUE_ERROR,
  NULL_ERROR,
  DIV_ERROR,
  NA_ERROR,
  REF_ERROR,
  NUM_ERROR,
  NAME_ERROR,
} from '../common/constants';
import type { AstVisitors } from '../parser';

export interface String_Type {
  type: 'string';
  value: string;
}

export interface Number_Type {
  type: 'number';
  value: number;
}

export interface Bool_Type {
  type: 'boolean';
  value: boolean;
}

export type Array_Element_Type = Exclude<Atom_Type, Ref_Type>;

export interface Array_Type {
  type: 'array';
  value: Array_Element_Type[][];
}

export type Primary_Type = number | boolean | string;

export type ERROR_ENUM =
  | typeof VALUE_ERROR
  | typeof NULL_ERROR
  | typeof DIV_ERROR
  | typeof NA_ERROR
  | typeof REF_ERROR
  | typeof NUM_ERROR
  | typeof NAME_ERROR
  | '#ERROR!';

export interface Error_Type {
  type: 'error';
  value: ERROR_ENUM;
  message: string;
}

export interface Range {
  row: number;
  rowCount: number;
  col: number;
  colCount: number;
}

export interface Ref_Type {
  type: 'reference';
  value: Range[];
}

export type Atom_Type =
  | String_Type
  | Number_Type
  | Ref_Type
  | Error_Type
  | Bool_Type;

export type All_Type = Atom_Type | Array_Type;

export type Atom_Value_Type = Exclude<Atom_Type, Ref_Type>;

export interface Context {
  getCellValues: (ref: Ref_Type) => Atom_Value_Type[][];
}

export type Evaluators = AstVisitors<'evaluate', Context, All_Type>;
