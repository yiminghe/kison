import type { AstNode, AstVisitor } from '../parser';
import { captalize } from '../utils';
import type { All_Type } from '../common/types';
import type { Serializers } from './types';

export function serialize(ast: AstNode): string {
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

  const m1 = `serialize${captalize(n1)}`;
  const m2 = `serialize${captalize(n2)}`;

  const serializers2 = serializers as any;
  const fn: AstVisitor<'', void> = serializers2[m2] || serializers2[m1];

  if (fn) {
    return fn(ast);
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

  return serialize(child);
}

export const serializers: Serializers = {
  serialize,
};

export function registerSerializers(others: Serializers) {
  Object.assign(serializers, others);
}
