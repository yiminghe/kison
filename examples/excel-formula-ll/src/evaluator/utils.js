// @ts-check
import {
  makeError,
  makeReference,
  NULL_ERROR,
  VALUE_ERROR
} from "../functions/utils.js";

export function expandReference(ref1, ref2) {
  if (ref1.type === "error") {
    return ref1;
  } else if (ref2.type === "error") {
    return ref2;
  }

  let startRow = Infinity;
  let endRow = -Infinity;
  let startCol = Infinity;
  let endCol = -Infinity;

  let ranges = ref1.ranges.concat(ref2.ranges);

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
      colCount
    }
  ]);
}

export function unionReference(ref1, ref2) {
  if (ref1.type === "error") {
    return ref1;
  } else if (ref2.type === "error") {
    return ref2;
  }
  return makeReference(ref1.ranges.concat(ref2.ranges));
}

export function intersectReference(ref1, ref2) {
  if (ref1.type === "error") {
    return ref1;
  } else if (ref2.type === "error") {
    return ref2;
  }

  let startRow = -Infinity;
  let endRow = Infinity;
  let startCol = -Infinity;
  let endCol = Infinity;

  let ranges = ref1.ranges.concat(ref2.ranges);

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
    return makeError("no intersect reference!", NULL_ERROR);
  }

  const rowCount = isFinite(endRow) ? endRow - startRow : 0;
  const colCount = isFinite(endCol) ? endCol - startCol : 0;

  return makeReference([
    {
      row: startRow,
      col: startCol,
      rowCount,
      colCount
    }
  ]);
}

export function checkError(...args) {
  for (const a of args) {
    if (a.type === "error") {
      return a;
    }
  }
}

export function checkNumber(...args) {
  for (const a of args) {
    if (a.type !== "number" && a.type !== "array") {
      return makeError("not number!", VALUE_ERROR);
    }
  }
}

export function isSingleCellReference(ref) {
  const range = ref.ranges[0];
  return (ref.ranges.length =
    1 && range.rowCount === 1 && range.colCount === 1);
}

export function isSingleValueArray(array) {
  return array.length == 1 && array[0].length === 1;
}
