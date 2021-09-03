import { toReference } from "../functions/utils.js";

export function expandReference(ref1, ref2) {
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
      endCol = Math.max(endCol, col + colCount)
    }

    if (rowCount === 0) {
      endRow = Infinity;
    } else {
      endRow = Math.max(rowCount, row + rowCount)
    }
  }

  const rowCount = isFinite(endRow) ? endRow - startRow : 0;
  const colCount = isFinite(endCol) ? endCol - startCol : 0;

  return toReference([{
    row: startRow,
    col: startCol,
    rowCount,
    colCount,
  }]);
}
