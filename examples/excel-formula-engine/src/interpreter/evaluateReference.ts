import { evaluate, registerEvaluators } from './evaluators';
import {
  expandReference,
  intersectReference,
  resolveCell,
  resolveNamedExpression,
  unionReference,
} from './utils';

registerEvaluators({
  evaluateRangeReference(node, context) {
    const { children } = node;
    const left = evaluate(children[0], context);
    if (left.type === 'error') {
      return left;
    }
    if (children[2]) {
      const right = evaluate(children[2], context);
      if (right.type === 'error') {
        return right;
      }
      if (left.type === 'reference' && right.type === 'reference') {
        return expandReference(left, right);
      }
    }
    return left;
  },

  evaluateUnionReference(node, context) {
    const { children } = node;
    const left = evaluate(children[0], context);
    if (left.type === 'error') {
      return left;
    }
    if (children[2]) {
      const right = evaluate(children[2], context);
      if (right.type === 'error') {
        return right;
      }
      if (left.type === 'reference' && right.type === 'reference') {
        return unionReference(left, right);
      }
    }
    return left;
  },

  evaluateIntersectionReference(node, context) {
    const { children } = node;
    const left = evaluate(children[0], context);
    if (left.type === 'error') {
      return left;
    }
    if (!children[1]) {
      return left;
    }
    const right = evaluate(children[1], context);
    if (right.type === 'error') {
      return right;
    }
    if (left.type === 'reference' && right.type === 'reference') {
      return intersectReference(left, right);
    }
    return left;
  },

  evaluateCELL(node) {
    return resolveCell(node.text);
  },

  evaluateNAME(node) {
    // TODO name resolution
    // only colum
    return resolveNamedExpression(node.text);
  },
});
