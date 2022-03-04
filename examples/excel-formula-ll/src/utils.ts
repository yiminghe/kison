import { CellAddress } from './common/types';
import { assertIsDefined } from './interpreter/utils';

const A = 'A'.charCodeAt(0);

const HEADER_RADIX = 26;

export function toColumnString(n: number) {
  const str = [];
  let modulo;
  while (n > 0) {
    modulo = (n - 1) % HEADER_RADIX;
    str.push(String.fromCharCode(A + modulo));
    n = ((n - modulo) / HEADER_RADIX) | 0;
  }
  return str.reverse().join('');
}

export function toCoordString({
  row,
  col,
  isColAbsolute,
  isRowAbsolute,
}: CellAddress) {
  return `${isColAbsolute ? '$' : ''}${toColumnString(col)}${
    isRowAbsolute ? '$' : ''
  }${row}`;
}

export function parseCoord(str: string): CellAddress {
  var [_, colStr, rowStr] = (str.match(/(\$?[A-Z]*)(\$?[0-9]*)/i) ||
    []) as string[];
  let isColAbsolute = false;
  let isRowAbsolute = false;
  assertIsDefined(_);
  var col = Infinity;
  if (colStr) {
    if (colStr.startsWith('$')) {
      isColAbsolute = true;
      colStr = colStr.slice(1);
    }
    col = colStr
      .split('')
      .map((item: string) => item.toUpperCase().charCodeAt(0) - A + 1)
      .reduce((x: number, y: number) => HEADER_RADIX * x + y, 0);
  }
  var row = Infinity;
  if (rowStr) {
    if (rowStr.startsWith('$')) {
      isRowAbsolute = true;
      rowStr = rowStr.slice(1);
    }
    row = parseInt(rowStr, 10);
  }
  return { col, row, isRowAbsolute, isColAbsolute };
}

export function captalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function isFormula(text: string) {
  return text.startsWith('=');
}
