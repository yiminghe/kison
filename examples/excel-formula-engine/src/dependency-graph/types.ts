import type { AstVisitors, Ast_Formula_Node } from '../parser';
import type {
  Ref_Type,
  CellAddress,
  CellRange,
  CellValue,
} from '../common/types';
import type { FormulaNode, RangeNode } from './dataStructure';

export interface CollectContext {
  addDep: (ref: Ref_Type) => void;
}

export type Collectors = AstVisitors<'collect', CollectContext, void>;

export type FormulaTransform = (node: FormulaNode) => {
  ast: Ast_Formula_Node;
  address: CellAddress;
};
export type RangeTransform = (node: RangeNode) => CellRange;

export interface ChangedCell {
  type: 'update';
  address: CellAddress;
  before: CellValue;
  after: CellValue;
}
