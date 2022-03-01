import { RawCellAddress, CellRange } from '../interpreter/types';

export function getCellAddressKey(address: RawCellAddress) {
  return `${address.row}_${address.col}`;
}

export function getCellRangeKey(range: CellRange) {
  return `${getCellAddressKey(range.start)}_${
    range.end && getCellAddressKey(range.end)
  }`;
}
