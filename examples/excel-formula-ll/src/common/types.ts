import type {
  VALUE_ERROR,
  NULL_ERROR,
  DIV_ERROR,
  NA_ERROR,
  REF_ERROR,
  NUM_ERROR,
  NAME_ERROR,
  CYCLE_ERROR,
  EMPTY_VALUE,
} from '../common/constants';

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

export type Empty_Type = typeof EMPTY_VALUE;

export interface Array_Type {
  type: 'array';
  value: Atom_Value_Type[][];
}

export type ERROR_ENUM =
  | typeof VALUE_ERROR
  | typeof NULL_ERROR
  | typeof DIV_ERROR
  | typeof NA_ERROR
  | typeof REF_ERROR
  | typeof NUM_ERROR
  | typeof NAME_ERROR
  | typeof CYCLE_ERROR
  | '#ERROR!';

export interface Error_Type {
  type: 'error';
  value: ERROR_ENUM;
  message: string;
}

export interface CellAddress {
  col: number;
  row: number;
  isRowAbsolute?: boolean;
  isColAbsolute?: boolean;
}

export interface CellRange {
  start: CellAddress;
  end: CellAddress;
}

export interface Ref_Type {
  type: 'reference';
  value: CellRange[];
}

export type Atom_Type =
  | String_Type
  | Number_Type
  | Ref_Type
  | Empty_Type
  | Error_Type
  | Bool_Type;

export type All_Type = Atom_Type | Array_Type;

export type All_Value_Type = Atom_Type | Array_Type;

export type Atom_Value_Type = Exclude<Atom_Type, Ref_Type>;

export type Raw_Value = Atom_Value_Type['value'];
