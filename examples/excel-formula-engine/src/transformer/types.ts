import { CellAddress, CellRange } from '../common/types';
import type { AstVisitors } from '../parser';

export type Context = {
  transformCellAdress: (address: CellAddress) => CellAddress;
  transformCellRange: (range: CellRange) => CellRange;
};

export type Transformers = AstVisitors<'transform', Context, void, void>;
