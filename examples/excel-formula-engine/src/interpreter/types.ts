import type { DependencyGraph } from '../dependency-graph/DependencyGraph';
import type { AstVisitors } from '../parser';
import type { CellAddress, All_Value_Type } from '../common/types';

export interface Context {
  dependencyGraph: DependencyGraph;
  address?: CellAddress;
}

export type Evaluators = AstVisitors<'evaluate', Context, All_Value_Type>;
