import { Primary_Type, utils, Range, Atom_Value_Type } from '../src/index';
import { matchNumber } from './utils';

const { parseCoord } = utils;

export function getCellData(str: string) {
  let cells: Primary_Type[][] = [];
  str = str.trim();
  const lines = str.split(/\n/);
  for (let l of lines) {
    l = l.trim();
    const items = l.split(':');
    const indexStr = items[0].trim();
    const value = items[1].trim();
    const { row, col } = parseCoord(indexStr);
    cells[row] = cells[row] || [];
    cells[row][col] = matchNumber(value) ? Number(value) : value;
  }
  return cells;
}
function fillCell(row: Atom_Value_Type[], index: number, value: Primary_Type) {
  if (typeof value === 'number') {
    row[index] = {
      type: 'number',
      value,
    };
  } else if (typeof value === 'string') {
    row[index] = {
      type: 'string',
      value,
    };
  }
}
export function getCellValuesByRange(cells: Primary_Type[][], ranges: Range[]) {
  const values: Atom_Value_Type[][] = [];
  for (const r of ranges) {
    const { row, col, rowCount, colCount } = r;
    if (!colCount) {
      const endRow = Math.min(cells.length, row + rowCount);
      for (let currentRow = row; currentRow < endRow; currentRow++) {
        const rowData = cells[currentRow];
        if (rowData) {
          const rowValue: Atom_Value_Type[] = [];
          values[currentRow] = rowValue;
          rowData.forEach((value: Primary_Type, currentCol: number) => {
            if (value !== undefined) {
              fillCell(rowValue, currentCol, value);
            }
          });
        }
      }
    } else if (!rowCount) {
      cells.forEach((rowData, currentRow) => {
        if (!rowData) {
          return;
        }
        const rowValue: Atom_Value_Type[] = [];
        values[currentRow] = rowValue;
        const endCol = Math.min(rowData.length, col + colCount);
        for (let currentCol = col; currentCol < endCol; currentCol++) {
          if (rowData && rowData[currentCol] !== undefined) {
            const value = rowData[currentCol];
            fillCell(rowValue, currentCol, value);
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
        const rowValue: Atom_Value_Type[] = [];
        values[currentRow] = rowValue;
        const endCol = Math.min(rowData.length, col + colCount);
        for (let currentCol = col; currentCol < endCol; currentCol++) {
          const value = rowData[currentCol];
          if (value !== undefined) {
            fillCell(rowValue, currentCol, value);
          }
        }
      }
    }
  }
  return values;
}
