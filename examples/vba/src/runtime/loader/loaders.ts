import type { AstNode } from '../../parser';
import type { Context } from '../Context';
import { Loaders, AstVisitor } from '../types';
import { warn } from '../utils';

export async function load(ast: AstNode, context: Context): Promise<any> {
  let symbol = '',
    token = '';

  if (ast.type === 'symbol') {
    symbol = ast.symbol;
  } else {
    token = ast.token;
    if (token === 'NEWLINE') {
      return;
    }
  }

  const n1 = symbol || token;
  const m1 = `load_${n1}`;

  const builders2 = loaders as any;

  const fn: AstVisitor = builders2[m1];

  if (fn) {
    let ret = fn(ast, context);
    if (ret && (ret as Promise<any>).then) {
      ret = await ret;
    }
    return ret;
  }

  let children;

  if (ast.type === 'symbol') {
    children = ast.children;
  } else {
    warn('loader unrecognized node type:' + n1);
    return;
  }

  let ret;
  for (const c of children) {
    ret = load(c, context);
    if (ret && (ret as Promise<any>).then) {
      ret = await ret;
    }
  }
  return ret;
}

export function registerLoaders(others: Loaders) {
  Object.assign(loaders, others);
}

export const loaders: Loaders = {
  load,
};
