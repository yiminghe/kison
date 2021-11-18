import type { AstNode, LiteralToken, AstVisitor } from '../../parser';
import type { Context } from '../Context';
import { Evaluators, VB_EMPTY, ExitResult } from '../types';
import { isSkipToken, warn, captalize } from '../utils';

export async function evaluate(ast: AstNode, context: Context): Promise<any> {
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

  const m1 = `evaluate${captalize(n1)}`;
  const m2 = `evaluate${captalize(n2)}`;

  const evaluators2 = evaluators as any;
  const fn: AstVisitor<'', Context> = evaluators2[m2] || evaluators2[m1];

  if (fn) {
    context.currentAstNode = ast;
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
