import { RawCellAddress, CellRange, Atom_Value_Type } from '../common/types';

export function getCellAddressKey(address: RawCellAddress) {
  return `${address.row}_${address.col}`;
}

export function getCellRangeKey(range: CellRange) {
  return `${getCellAddressKey(range.start)}_${
    range.end && getCellAddressKey(range.end)
  }`;
}

export function isValueEqual(v1: Atom_Value_Type, v2: Atom_Value_Type) {
  return v1.type === v2.type && v1.value === v2.value;
}
