import type { AstNode } from '../../parser';
import type { Context } from '../Context';
import { Evaluators, AstVisitor, VB_EMPTY } from '../types';
import { warn } from '../utils';

export async function evaluate(ast: AstNode, context: Context): Promise<any> {
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

  const evaluators2 = evaluators as any;
  const fn: AstVisitor = evaluators2[m2] || evaluators2[m1];

  if (fn) {
    let ret = fn(ast, context);
    if (ret && ret.then) {
      ret = await ret;
    }
    return ret || VB_EMPTY;
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
    ret = evaluate(c, context);
    if (ret && (ret as Promise<any>).then) {
      ret = await ret;
    }
    if (ret && ret.type === 'Exit') {
      return ret;
    }
  }
  return ret || VB_EMPTY;
}

export function registerEvaluators(others: Evaluators) {
  Object.assign(evaluators, others);
}

export const evaluators: Evaluators = {
  evaluate,
};
