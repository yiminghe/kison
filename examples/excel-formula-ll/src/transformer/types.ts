import { CellAddress } from '../common/types';
import type { AstVisitors } from '../parser';

export type Context = {
  transformCellAdress: (address: CellAddress) => CellAddress;
};

export type Transformers = AstVisitors<'transform', Context, void, void>;
