// @ts-check
export function evaluate(ast, context) {
  const { symbol, token, label } = ast;

  const n1 = symbol || token;
  const n2 = label || n1;

  const m1 = `evaluate_${n1}`;
  const m2 = `evaluate_${n2}`;

  const fn = evaluators[m2] || evaluators[m1];

  if (fn) {
    return fn(ast, context);
  }

  let { children } = ast;

  if (!children || children.length != 1) {
    console.error(ast);
    throw new Error('unrecognized node type:' + n1 || n2);
  }

  const child = children[0];

  return evaluate(child, context);
}

export const evaluators = {
  evaluate,
};
