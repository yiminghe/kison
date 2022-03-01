import { CellValue, utils } from '../src/index';
import { matchNumber } from './utils';

const { parseCoord } = utils;

export function getCellData(str: string) {
  let cells: CellValue[][] = [];
  str = str.trim();
  const lines = str.split(/\n/);
  for (let l of lines) {
    l = l.trim();
    const items = l.split(':');
    const indexStr = items[0].trim();
    const value = items[1].trim();
    let { row, col } = parseCoord(indexStr);
    row--;
    col--;
    cells[row] = cells[row] || [];
    if (matchNumber(value)) {
      cells[row][col] = { type: 'number', value: Number(value) };
    } else if (value.startsWith('=')) {
      cells[row][col] = { type: 'formula', formula: value };
    } else {
      cells[row][col] = { type: 'string', value };
    }
  }
  return cells;
}
