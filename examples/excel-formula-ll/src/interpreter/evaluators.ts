import { makeArray, makeError } from '../functions/utils';
import type { AstNode, AstVisitor } from '../parser';
import { captalize, isValidCellAddress, isValidCellRange } from '../utils';
import type { All_Type, All_Value_Type } from '../common/types';
import type { Context, Evaluators } from './types';
import { isSingleCellRange } from './utils';
import { EMPTY_VALUE, REF_ERROR } from '../common/constants';

export function evaluate(ast: AstNode, context: Context): All_Type {
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

  const m1 = `evaluate${captalize(n1)}`;
  const m2 = `evaluate${captalize(n2)}`;

  const evaluators2 = evaluators as any;
  const fn: AstVisitor<'', Context> = evaluators2[m2] || evaluators2[m1];

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

export const evaluators: Evaluators = {
  evaluate,
};

export function evaluateRoot(ast: AstNode, context: Context): All_Value_Type {
  const ret = evaluate(ast, context);
  const { dependencyGraph, address } = context;
  if (ret.type === 'reference') {
    const range = ret.value;
    if (range.length !== 1 || !isValidCellRange(range[0])) {
      return makeError('', REF_ERROR);
    }
    const r = range[0];
    if (isSingleCellRange(r)) {
      return dependencyGraph.getCellValue(r.start);
    }

    const value = dependencyGraph.getCellArrayFromRange(r);
    if (!address) {
      return makeArray(value);
    }
    // TODO implicit intersection
    return value[0]?.[0] ?? EMPTY_VALUE;
  }
  if (ret.type === 'array' && address) {
    return ret.value[0]?.[0] ?? EMPTY_VALUE;
  }
  return ret;
}

export function registerEvaluators(others: Evaluators) {
  Object.assign(evaluators, others);
}
