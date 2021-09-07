export function evaluate(ast, context) {
  const { symbol, token } = ast;

  const n = symbol || token;

  const m = `evaluate_${n}`;

  if (evaluators[m]) {
    return evaluators[m](ast, context);
  }

  let { children } = ast;
  if (
    children &&
    children.length === 3 &&
    children[0].token === "(" &&
    children[2].token === ")"
  ) {
    children = [children[1]];
  }

  if (!children || children.length != 1) {
    console.log(ast);
    throw new Error("unrecognized node type:" + n);
  }

  const child = children[0];

  return evaluate(child, context);
}

export const evaluators = {
  evaluate
};
