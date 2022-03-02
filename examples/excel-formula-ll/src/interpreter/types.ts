import type { DependencyGraph } from '../dependency-graph/DependencyGraph';
import type { AstVisitors } from '../parser';
import type { RawCellAddress, All_Type } from '../common/types';

export interface Context {
  dependencyGraph: DependencyGraph;
  address?: RawCellAddress;
}

export type Evaluators = AstVisitors<'evaluate', Context, All_Type>;
