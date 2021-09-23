// @ts-check

import { assertIsDefined } from "./evaluator/utils";

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

export function parseCoord(str: string) {
  var results = str.match(/([A-Z]*)([0-9]*)/i);
  assertIsDefined(results);
  var col = -1;
  if (results[1]) {
    col = results[1]
      .split('')
      .map((item) => item.toUpperCase().charCodeAt(0) - A + 1)
      .reduce((x, y) => HEADER_RADIX * x + y, 0);
  }
  var row = -1;
  if (results[2]) {
    row = parseInt(results[2], 10);
  }
  return { col, row };
}
