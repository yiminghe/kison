import type { AstNode, AstVisitor } from '../parser';
import { captalize } from '../utils';
import type { Context, Transformers } from './types';
import produce from 'immer';
import { Ast_Formula_Node } from '../parser';

// //@ts-ignore
// const { produce } = immer;

export function transform(ast: AstNode, context: Context): void {
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

  const m1 = `transform${captalize(n1)}`;
  const m2 = `transform${captalize(n2)}`;

  const transformers2 = transformers as any;
  const fn: AstVisitor<'', Context, void> =
    transformers2[m2] || transformers2[m1];

  if (fn) {
    return fn(ast, context);
  }

  if (ast.type === 'symbol') {
    for (const c of ast.children) {
      transform(c, context);
    }
  }
}

export const transformers: Transformers = {
  transform,
};

export function transformRoot(root: Ast_Formula_Node, context: Context) {
  return produce(root, (draftRoot: Ast_Formula_Node) => {
    transform(draftRoot as any, context);
  });
}

export function registerTransformers(others: Transformers) {
  Object.assign(transformers, others);
}
