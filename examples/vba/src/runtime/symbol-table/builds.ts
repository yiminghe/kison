import type { AstNode } from '../../parser';
import type { Context } from '../Context';
import { warn } from '../utils';

export function build(ast: AstNode, context: Context): any {
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

  const m1 = `build_${n1}`;
  const m2 = `build_${n2}`;

  const fn = builds[m2] || builds[m1];

  if (fn) {
    return fn(ast, context);
  }

  let children;

  if (ast.type === 'symbol') {
    children = ast.children;
  } else {
    warn('unrecognized node type:' + n1 || n2);
    return;
  }

  let ret;
  for (const c of children) {
    ret = build(c, context);
  }
  return ret;
}

export const builds: Record<string, (node: AstNode, context: Context) => void> =
  {
    build,
  };
