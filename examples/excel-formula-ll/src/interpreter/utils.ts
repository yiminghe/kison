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
  RawCellAddress,
  CellRange,
} from './types';

import { parseCoord } from '../utils';

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
    const { start, end } = r;
    let row = start.row;
    let col = start.col;
    startRow = Math.min(startRow, row);
    startCol = Math.min(startCol, col);
    if (end) {
      endCol = Math.max(endCol, end.col);
      endRow = Math.max(endRow, end.row);
    }
  }

  return makeReference([
    {
      start: {
        row: startRow,
        col: startCol,
        isColAbsolute: true,
        isRowAbsolute: true,
      },
      end: {
        row: endRow,
        col: endCol,
        isColAbsolute: true,
        isRowAbsolute: true,
      },
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

export function addressInRange(range: CellRange, address: RawCellAddress) {
  return (
    range.start.row <= address.row &&
    range.end.row >= address.row &&
    range.start.col <= address.col &&
    range.end.col >= address.col
  );
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
    const { start, end } = r;
    startRow = Math.max(startRow, start.row);
    startCol = Math.max(startCol, start.col);
    if (end) {
      endCol = Math.min(endCol, end.col);
      endRow = Math.min(endRow, end.row);
    }
  }

  if (endRow <= startRow || endCol <= startCol) {
    return makeError('no intersect reference!', NULL_ERROR);
  }

  return makeReference([
    {
      start: {
        row: startRow,
        col: startCol,
        isColAbsolute: true,
        isRowAbsolute: true,
      },
      end: {
        row: endRow,
        col: endCol,
        isColAbsolute: true,
        isRowAbsolute: true,
      },
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
  if (ref.value.length !== 1) {
    return false;
  }
  const range = ref.value[0];
  if (range.start.col === Infinity || range.start.row === Infinity) {
    return false;
  }
  return (
    !range.end ||
    (range.end.row - range.start.row === 1 &&
      range.end.col - range.start.col === 1)
  );
}

export function isSingleCellRange(range: CellRange) {
  if (range.start.col === Infinity || range.start.row === Infinity) {
    return false;
  }
  return range.start === range.end;
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

export function resolveNamedExpression(text: string) {
  if (text.match(/^[A-Za-z]+$/)) {
    const start = parseCoord(text);
    return makeReference([
      {
        start,
        end: start,
      },
    ]);
  } else {
    return makeError('TODO namedexpression' + text);
  }
}

const rowRangeAddress = new RegExp(`^(?:(\\$?\\d+)\\:(\\$?\\d+))$`);
const cellAddressLiteral = `(\\$?[A-Za-z]+\\$?[0-9]+)`;
const cellAddress = `(?:
  ${cellAddressLiteral}
  (?:
    \\s*
    \\:
    \\s*
    ${cellAddressLiteral}
    )?
  #?
)`.replace(/\s/g, '');

export function resolveCell(text: string) {
  let rowMatch = text.match(rowRangeAddress);
  if (rowMatch) {
    let [_, start, end] = rowMatch;
    const startAbsolute = start.startsWith('$');
    if (startAbsolute) {
      start = start.slice(1);
    }
    const endAbsolute = end.startsWith('$');
    if (endAbsolute) {
      end = end.slice(1);
    }
    let startRow = parseInt(start, 10);
    let endRow = parseInt(end, 10);
    return makeReference([
      {
        start: {
          row: startRow,
          col: Infinity,
          isRowAbsolute: startAbsolute,
          isColAbsolute: false,
        },
        end: {
          row: endRow,
          col: Infinity,
          isRowAbsolute: endAbsolute,
          isColAbsolute: false,
        },
      },
    ]);
  }
  const cellMatch = text.match(cellAddress);
  assertIsDefined(cellMatch);
  const start = parseCoord(cellMatch[1]);
  let end = start;
  if (cellMatch[2]) {
    end = parseCoord(cellMatch[2]);
  }
  return makeReference([
    {
      start,
      end,
    },
  ]);
}
