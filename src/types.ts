import type { AstNode, AstSymbolNode } from './AstNode';

export type Rh = string | Function | number;

export type Rhs = Rh[];

export type TransformNode = (arg: {
  index: number;
  node: AstNode;
  parent: AstSymbolNode;
  defaultTransformNode: TransformNode;
}) => AstNode | AstNode[] | null;
