import type { AstNode } from '../parser.js';

import type { All_Type, Context } from './types';

export function evaluate(
  ast: AstNode,
  context: Context = {
    getCellValues: () => [],
  },
): All_Type {
  let symbol = '',
    token = '',
    label = '';

  if (ast.type === 'symbol') {
    symbol = ast.symbol;
    label = ast.label;
  } else {
    token = ast.token;
  }

  const n1 = symbol || token;
  const n2 = label || n1;

  const m1 = `evaluate_${n1}`;
  const m2 = `evaluate_${n2}`;

  const fn = evaluators[m2] || evaluators[m1];

  if (fn) {
    return fn(ast, context);
  }

  let children;

  if (ast.type === 'symbol') {
    children = ast.children;
  }

  if (!children || children.length != 1) {
    console.error(ast);
    throw new Error('unrecognized node type:' + n1 || n2);
  }

  const child = children[0];

  return evaluate(child, context);
}

export const evaluators: Record<
  string,
  (node: AstNode, context: Context) => All_Type
> = {
  evaluate,
};
