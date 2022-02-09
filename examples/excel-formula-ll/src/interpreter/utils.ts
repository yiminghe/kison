import {
  makeError,
  makeReference,
  NULL_ERROR,
  VALUE_ERROR,
} from '../functions/utils';

import type {
  All_Type,
  Array_Type,
  Atom_Type,
  Array_Element_Type,
  Error_Type,
  Ref_Type,
} from './types';

export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

export function assertTrue(val: boolean): asserts val is true {
  if (val !== true) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

type TypeMap = {
  boolean: boolean;
  string: string;
  number: number;
};

export function assertType<T, S extends 'string' | 'number' | 'boolean'>(
  val: T,
  t: S,
): asserts val is TypeMap[S] extends T ? TypeMap[S] : never {
  if (typeof val !== t) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

export function expandReference(
  ref1: Error_Type | Ref_Type,
  ref2: Error_Type | Ref_Type,
) {
  if (ref1.type === 'error') {
    return ref1;
  } else if (ref2.type === 'error') {
    return ref2;
  }

  let startRow = Infinity;
  let endRow = -Infinity;
  let startCol = Infinity;
  let endCol = -Infinity;

  let ranges = ref1.value.concat(ref2.value);

  for (const r of ranges) {
    const { row, col, rowCount, colCount } = r;
    startRow = Math.min(startRow, row);
    startCol = Math.min(startCol, col);
    if (colCount === 0) {
      endCol = Infinity;
    } else {
      endCol = Math.max(endCol, col + colCount);
    }

    if (rowCount === 0) {
      endRow = Infinity;
    } else {
      endRow = Math.max(endRow, row + rowCount);
    }
  }

  const rowCount = isFinite(endRow) ? endRow - startRow : 0;
  const colCount = isFinite(endCol) ? endCol - startCol : 0;

  return makeReference([
    {
      row: startRow,
      col: startCol,
      rowCount,
      colCount,
    },
  ]);
}

export function unionReference(
  ref1: Error_Type | Ref_Type,
  ref2: Error_Type | Ref_Type,
) {
  if (ref1.type === 'error') {
    return ref1;
  } else if (ref2.type === 'error') {
    return ref2;
  }
  return makeReference(ref1.value.concat(ref2.value));
}

export function intersectReference(
  ref1: Error_Type | Ref_Type,
  ref2: Error_Type | Ref_Type,
) {
  if (ref1.type === 'error') {
    return ref1;
  } else if (ref2.type === 'error') {
    return ref2;
  }

  let startRow = -Infinity;
  let endRow = Infinity;
  let startCol = -Infinity;
  let endCol = Infinity;

  let ranges = ref1.value.concat(ref2.value);

  for (const r of ranges) {
    const { row, col, rowCount, colCount } = r;
    startRow = Math.max(startRow, row);
    startCol = Math.max(startCol, col);
    if (colCount !== 0) {
      endCol = Math.min(endCol, col + colCount);
    }
    if (rowCount !== 0) {
      endRow = Math.min(endRow, row + rowCount);
    }
  }

  if (endRow <= startRow || endCol <= startCol) {
    return makeError('no intersect reference!', NULL_ERROR);
  }

  const rowCount = isFinite(endRow) ? endRow - startRow : 0;
  const colCount = isFinite(endCol) ? endCol - startCol : 0;

  return makeReference([
    {
      row: startRow,
      col: startCol,
      rowCount,
      colCount,
    },
  ]);
}

export function checkError(...args: All_Type[]) {
  for (const a of args) {
    if (a?.type === 'error') {
      return a;
    }
  }
}

export function checkNumber(...args: (All_Type | null)[]) {
  for (const a of args) {
    if (a && a.type !== 'number' && a.type !== 'array') {
      return makeError('not number!', VALUE_ERROR);
    }
  }
}

export function isSingleCellReference(ref: Ref_Type) {
  const range = ref.value[0];
  return ref.value.length === 1 && range.rowCount === 1 && range.colCount === 1;
}

export function isSingleValueArray(array: Atom_Type[][]) {
  return array.length == 1 && array[0].length === 1;
}

export function mapArray(
  arr: Array_Type['value'],
  fn: (arg: Array_Element_Type) => Array_Element_Type,
) {
  const ret = [];
  for (let rowIndex = 0; rowIndex < arr.length; rowIndex++) {
    const row = arr[rowIndex];
    const newRow = [];
    if (row) {
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        newRow[colIndex] = fn(row[colIndex]);
      }
    }
    ret[rowIndex] = newRow;
  }
  return ret;
}
