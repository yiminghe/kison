import type { AstNode, AstSymbolNode } from './AstNode';
import type { Token } from './parser';

export type Rh = string | Function | number;

export type Rhs = Rh[];

export type TransformNode = (arg: {
  index: number;
  node: AstNode;
  parent: AstSymbolNode;
  defaultTransformNode: TransformNode;
}) => AstNode | AstNode[] | null;

export interface ParseError {
  errorMessage: string;
  expected: string[];
  lexer: Token;
  recovery?: Boolean;
  symbol: AstSymbolNode['symbol'];
  tip: string;
}
