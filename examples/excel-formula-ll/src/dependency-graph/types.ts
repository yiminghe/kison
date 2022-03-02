import type { AstVisitors } from '../parser';
import type { Ref_Type } from '../common/types';

export interface CollectContext {
  addDep: (ref: Ref_Type) => void;
}

export type Collectors = AstVisitors<'collect', CollectContext, void>;
