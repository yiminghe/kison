// @ts-check
export function evaluate(ast, context) {
  const { symbol, token } = ast;

  const n = symbol || token;

  const m = `evaluate_${n}`;

  if (evaluators[m]) {
    return evaluators[m](ast, context);
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
