import { transformRoot } from './transformers';
import { CellAddress, CellRange } from '../common/types';
import { Ast_Formula_Node } from '../parser';
import { isValidCellAddress } from '../utils';

function transformCellAdressByDeleteRows(
  addr: CellAddress,
  at: number,
  rowCount = 1,
) {
  const end = at + rowCount - 1;
  if (addr.row > end) {
    return {
      ...addr,
      row: addr.row - rowCount,
    };
  } else if (addr.row >= at && addr.row <= end) {
    return {
      ...addr,
      row: -1,
    };
  }
  return addr;
}

export function transformRangeByDeleteRows(
  range: CellRange,
  at: number,
  rowCount = 1,
) {
  const end = at + rowCount - 1;
  const rangeStart = range.start.row;
  const rangeEnd = range.end.row;
  if (rangeStart > end || rangeEnd < at) {
    return range;
  }

  if (rangeStart >= at && rangeEnd <= end) {
    return {
      start: {
        ...range.start,
        row: -1,
      },
      end: {
        ...range.end,
        row: -1,
      },
    };
  }

  if (rangeStart >= at && rangeEnd > end) {
    return {
      start: {
        ...range.start,
        row: at,
      },
      end: transformCellAdressByDeleteRows(range.end, at, rowCount),
    };
  }

  if (rangeStart < at && rangeEnd >= end) {
    return {
      start: range.start,
      end: {
        ...range.end,
        row: at - rowCount,
      },
    };
  }

  return range;
}

export function transformByDeleteRows(
  address: CellAddress,
  ast: Ast_Formula_Node,
  at: number,
  rowCount = 1,
): { ast: Ast_Formula_Node; address: CellAddress } {
  const newAddress = transformCellAdressByDeleteRows(address, at, rowCount);
  let newAst = ast;
  if (isValidCellAddress(newAddress)) {
    newAst = transformRoot(ast, {
      transformCellAdress(addr) {
        return transformCellAdressByDeleteRows(addr, at, rowCount);
      },
      transformCellRange(range) {
        return transformRangeByDeleteRows(range, at, rowCount);
      },
    });
  }
  return {
    ast: newAst,
    address: newAddress,
  };
}
