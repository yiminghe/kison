export const evaluators = {
  evaluate(ast, context) {

    const { symbol, token } = ast;

    const n = symbol || token;

    const m = `evaluate_${n}`;

    if (evaluators[m]) {
      return evaluators[m](ast, context);
    }

    if (!ast.children || ast.children.length != 1) {
      throw new Error('unrecognized node type:' + n);
    }

    const child = ast.children[0];

    return evaluators.evaluate(child, context);
  }
};
