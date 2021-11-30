import { evaluate, registerEvaluators } from './evaluators';
import { collect_type_ } from '../collect/collectType';

registerEvaluators({
  async evaluateWithStmt({ children }, context) {
    const c1 = children[1];
    let parent;
    if (c1.type === 'token' && c1.token === 'NEW') {
      const { className } = collect_type_(children[2] as any, context);
      parent = await context.createObject(className!);
    } else {
      parent = await evaluate(c1, context);
    }
    context.withStack.push(parent);
    try {
      for (const c of children) {
        if (c.type === 'symbol' && c.symbol === 'block') {
          await evaluate(c, context);
        }
      }
    } finally {
      context.withStack.pop();
    }
  },
});
