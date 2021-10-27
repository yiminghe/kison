import type { AstNode, LiteralToken } from '../../parser';
import type { Context } from '../Context';
import { Evaluators, AstVisitor, VB_EMPTY, ExitResult } from '../types';
import { isSkipToken, warn } from '../utils';

export async function evaluate(ast: AstNode, context: Context): Promise<any> {
  let symbol = '';
  let token: LiteralToken = '' as LiteralToken;

  if (ast.type === 'symbol') {
    symbol = ast.symbol;
  } else {
    token = ast.token;
    if (isSkipToken(token)) {
      return;
    }
  }

  const n1 = symbol || token;

  const m1 = `evaluate_${n1}`;

  const evaluators2 = evaluators as any;
  const fn: AstVisitor = evaluators2[m1];

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
    warn('evaluator unrecognized node type:' + n1);
    return;
  }

  let ret;
  for (const c of children) {
    ret = evaluate(c, context);
    if (ret && (ret as Promise<any>).then) {
      ret = await ret;
    }
    if (ret && (ret as ExitResult).type === 'Exit') {
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
