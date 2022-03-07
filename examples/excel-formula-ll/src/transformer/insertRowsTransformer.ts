import { transformRoot } from './transformers';
import { CellAddress, CellRange } from '../common/types';
import { Ast_Formula_Node } from '../parser';

function transformCellAdressByInsertRows(
  addr: CellAddress,
  before: number,
  rowCount = 1,
) {
  if (addr.row >= before) {
    return {
      ...addr,
      row: addr.row + rowCount,
    };
  }
  return addr;
}

export function transformRangeByInsertRows(
  range: CellRange,
  before: number,
  rowCount = 1,
) {
  let newRange = range;
  const start = transformCellAdressByInsertRows(range.start, before, rowCount);
  if (start !== range.start) {
    newRange = { ...newRange, start };
  }
  const end = transformCellAdressByInsertRows(range.end, before, rowCount);
  if (end !== range.end) {
    newRange = { ...newRange, end };
  }
  return newRange;
}

export function transformByInsertRows(
  address: CellAddress,
  ast: Ast_Formula_Node,
  before: number,
  rowCount = 1,
): { ast: Ast_Formula_Node; address: CellAddress } {
  const newAst: Ast_Formula_Node = transformRoot(ast, {
    transformCellAdress(addr) {
      return transformCellAdressByInsertRows(addr, before, rowCount);
    },
    transformCellRange(range) {
      return transformRangeByInsertRows(range, before, rowCount);
    },
  });
  const newAddress = transformCellAdressByInsertRows(address, before, rowCount);
  return {
    ast: newAst,
    address: newAddress,
  };
}
