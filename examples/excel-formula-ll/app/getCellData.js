import { utils } from "../src/index.js";
import { matchNumber } from "./utils.js";

const { parseCoord } = utils;

export function getCellData(str) {
  let cells = [];
  str = str.trim();
  const lines = str.split(/\n/);
  for (let l of lines) {
    l = l.trim();
    const items = l.split(":");
    const indexStr = items[0].trim();
    const value = items[1].trim();
    const { row, col } = parseCoord(indexStr);
    cells[row] = cells[row] || [];
    cells[row][col] = matchNumber(value) ? Number(value) : value;
  }
  return cells;
}

export function getCellValuesByRange(cells, ranges, ifEmpty) {
  const values = [];
  for (const r of ranges) {
    const { row, col, rowCount, colCount } = r;
    if (!colCount) {
      const endRow = Math.min(cells.length, row + rowCount);
      for (let currentRow = row; currentRow < endRow; currentRow++) {
        const rowData = cells[currentRow];
        if (rowData) {
          const rowValue = [];
          values[currentRow] = rowValue;
          rowData.forEach((value, currentCol) => {
            if (value !== undefined) {
              const type = typeof value === "number" ? "number" : "string";
              rowValue[currentCol] = {
                type,
                value
              };
            }
          });
        }
      }
    } else if (!rowCount) {
      cells.forEach((rowData, currentRow) => {
        if (!rowData) {
          return;
        }
        const rowValue = [];
        values[currentRow] = rowValue;
        const endCol = Math.min(rowData.length, col + colCount);
        for (let currentCol = col; currentCol < endCol; currentCol++) {
          if (rowData && rowData[currentCol] !== undefined) {
            const value = rowData[currentCol];
            const type = typeof value === "number" ? "number" : "string";
            rowValue[currentCol] = {
              type,
              value
            };
          }
        }
      });
    } else {
      const endRow = Math.min(cells.length, row + rowCount);
      for (let currentRow = row; currentRow < endRow; currentRow++) {
        const rowData = cells[currentRow];

        if (!rowData) {
          continue;
        }
        const rowValue = [];
        values[currentRow] = rowValue;
        const endCol = Math.min(rowData.length, col + colCount);
        for (let currentCol = col; currentCol < endCol; currentCol++) {
          const value = rowData[currentCol];
          if (value !== undefined) {
            const type = typeof value === "number" ? "number" : "string";
            rowValue[currentCol] = {
              type,
              value
            };
          }
        }
      }
    }
  }
  return values;
}
