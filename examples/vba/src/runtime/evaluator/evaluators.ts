import type { AstNode } from '../../parser';
import type { Runtime } from '../runtime';
import { VB_EMPTY } from '../types';

export async function evaluate(ast: AstNode, runtime: Runtime): Promise<any> {
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
    return await fn(ast, runtime);
  }

  let children;

  if (ast.type === 'symbol') {
    children = ast.children;
  }

  if (!children) {
    console.error(ast);
    throw new Error('unrecognized node type:' + n1 || n2);
  }

  let ret;
  for (const c of children) {
    ret = await evaluate(c, runtime);
  }
  return ret || VB_EMPTY;
}

export const evaluators: Record<
  string,
  (node: AstNode, context: Runtime) => any
> = {
  evaluate,
};
