import { evaluators } from "./evaluators.js";

Object.assign(evaluators, {
  evaluate_NUMBER(node) {
    return {
      type: 'number',
      value: Number(node.text),
    }
  },
  evaluate_STRING(node) {
    return {
      type: 'string',
      value: node.text,
    }
  },

  evaluate_array(node) {
    return evaluators.evaluate(node.children[1]);
  },

  [`evaluate_array-list`](node) {
    const { children } = node;
    const ret = [];
    for (const c of children) {
      if (c.token === 'ARRAY_SEPARATOR') {
        continue;
      }
      ret.push(evaluators.evaluate(c));
    }
    return {
      type: 'array',
      value: ret,
    };
  }
});
