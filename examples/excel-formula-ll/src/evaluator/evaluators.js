// @ts-check
export function evaluate(ast, context) {
  const { symbol, token, label } = ast;

  const n1 = symbol || token;
  const n2 = label || n1;

  const m1 = `evaluate_${n1}`;
  const m2 = `evaluate_${n2}`;

  const fn = evaluators[m1] || evaluators[m2];

  if (fn) {
    return fn(ast, context);
  }

  let { children } = ast;

  if (!children || children.length != 1) {
    console.error(ast);
    throw new Error('unrecognized node type:' + n);
  }

  const child = children[0];

  return evaluate(child, context);
}

export const evaluators = {
  evaluate,
};
