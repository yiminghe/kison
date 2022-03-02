import type { AstVisitors } from '../parser';

export type Serializers = AstVisitors<'serialize', void, void, string>;
