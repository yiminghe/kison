import type { AstNode, AstVisitor } from '../parser';
import { captalize } from '../utils';
import type { CollectContext, Collectors } from './types';
import { resolveCell, resolveNamedExpression } from '../interpreter/utils';
import { CellRange } from '../common/types';

export function collect(ast: AstNode, context: CollectContext) {
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

  const m1 = `collect${captalize(n1)}`;
  const m2 = `collect${captalize(n2)}`;

  const collect2 = collectors as any;
  const fn: AstVisitor<'', CollectContext> = collect2[m2] || collect2[m1];

  if (fn) {
    return fn(ast, context);
  }

  let children;

  if (ast.type === 'symbol') {
    children = ast.children;
  }

  if (children) {
    for (const child of children) {
      collect(child, context);
    }
  }
}

export const collectors: Collectors = {
  collect,

  collectRangeReference(node, context) {
    const { children } = node;
    const range: CellRange = {} as any;
    collect(children[0], {
      addDep(dep) {
        range.start = dep.value[0].start;
      },
    });
    collect(children[2], {
      addDep(dep) {
        range.end = dep.value[0].start;
      },
    });
    context.addDep({
      type: 'reference',
      value: [range],
    });
  },

  collectCELL(node, context) {
    const dep = resolveCell(node.text);
    context.addDep(dep);
  },
  collectNAME(node, context) {
    const dep = resolveNamedExpression(node.text);
    if (dep.type === 'reference') {
      context.addDep(dep);
    }
  },
};

export function registerEvaluators(others: Collectors) {
  Object.assign(collectors, others);
}
