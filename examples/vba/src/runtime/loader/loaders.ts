import type { AstNode, LiteralToken, AstVisitor } from '../../parser';
import type { Context } from '../Context';
import { Loaders } from '../types';
import { isSkipToken, warn, captalize } from '../utils';

export async function load(ast: AstNode, context: Context): Promise<any> {
  let symbol = '';
  let token: LiteralToken = '' as LiteralToken;
  let label = '';

  if (ast.type === 'symbol') {
    symbol = ast.symbol;
    label = ast.label;
  } else {
    token = ast.token;
    if (isSkipToken(token)) {
      return;
    }
  }

  const n1 = symbol || token;
  const n2 = label || n1;

  const m1 = `load${captalize(n1)}`;
  const m2 = `load${captalize(n2)}`;

  const loaders2 = loaders as any;
  const fn: AstVisitor<'', Context> = loaders2[m2] || loaders2[m1];

  if (fn) {
    context.currentAstNode = ast;
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
