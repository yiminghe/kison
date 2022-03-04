import './transformReference';
import { transformRoot } from './transformers';
import { CellAddress, CellRange } from '../common/types';
import { Ast_Formula_Node } from '../parser';

function transformCellAdressByInsertRow(
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

export function transformRangeByInsertRow(
  range: CellRange,
  before: number,
  rowCount = 1,
) {
  let newRange = range;
  const start = transformCellAdressByInsertRow(range.start, before, rowCount);
  if (start !== range.start) {
    newRange = { ...newRange, start };
  }
  const end = transformCellAdressByInsertRow(range.end, before, rowCount);
  if (end !== range.end) {
    newRange = { ...newRange, end };
  }
  return newRange;
}

export function transformByInsertRow(
  address: CellAddress,
  ast: Ast_Formula_Node,
  before: number,
  rowCount = 1,
): { ast: Ast_Formula_Node, address: CellAddress } {
  const newAst: Ast_Formula_Node = transformRoot(ast, {
    transformCellAdress(addr) {
      return transformCellAdressByInsertRow(addr, before, rowCount);
    },
  });
  const newAddress = transformCellAdressByInsertRow(address, before, rowCount);
  return {
    ast: newAst,
    address: newAddress,
  };
}
