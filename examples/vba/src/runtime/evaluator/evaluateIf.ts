import type { Context } from '../Context';
import type { AstNode, AstSymbolNode } from '../../parser';
import { getVBValue } from './common';
import { evaluate, registerEvaluators, evaluators } from './evaluators';

function findConditonAndBlock(children: AstNode[]) {
  let block: AstSymbolNode | undefined = undefined;
  let condition: AstSymbolNode | undefined = undefined;
  for (const c of children) {
    if (c.type == 'symbol') {
      if (c.symbol === 'block') {
        block = c;
      } else if (c.symbol === 'valueStmt') {
        condition = c;
      }
    }
  }
  return {
    condition,
    block,
  };
}

async function getConditionBoolean(condition: AstNode, context: Context) {
  const c = await getVBValue(await evaluate(condition, context));
  return !!c.value;
}

registerEvaluators({
  async evaluateInlineIfThenElse({ children }, context) {
    const blocks = [];
    let condition: AstSymbolNode = null!;
    for (const c of children) {
      if (c.type == 'symbol') {
        if (c.symbol === 'blockStmt') {
          blocks.push(c);
        } else if (c.symbol === 'valueStmt') {
          condition = c;
        }
      }
    }
    if (await getConditionBoolean(condition, context)) {
      return evaluate(blocks[0], context);
    } else if (blocks[1]) {
      return evaluate(blocks[1], context);
    }
  },

  async evaluateBlockIfThenElse({ children }, context) {
    for (const c of children) {
      if (c.type === 'symbol') {
        const { condition, block } = findConditonAndBlock(c.children);
        if (!condition || (await getConditionBoolean(condition, context))) {
          if (block) {
            return evaluate(block, context);
          } else {
            return;
          }
        }
      }
    }
  },

  async evaluateSelectCaseStmt({ children }, context) {
    const selectValue = await getVBValue(await evaluate(children[2], context));
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'sC_Case') {
        const caseValue = await getVBValue(
          await evaluate(c, context, {
            selectValue,
          }),
        );
        if (caseValue && caseValue.value) {
          return;
        }
      }
    }
  },

  async evaluateSC_Case({ children }, context, params) {
    const condValue = await getVBValue(
      await evaluate(children[1], context, params),
    );
    if (condValue && condValue.value && children[3]) {
      await evaluate(children[3], context);
    }
    return condValue;
  },

  evaluateCaseCondElse(_, context) {
    return context.createBoolean(true);
  },

  async evaluateCaseCondSelection({ children }, context, params) {
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'sC_Selection') {
        const cond = await getVBValue(await evaluate(c, context, params));
        if (cond && cond.value) {
          return cond;
        }
      }
    }
  },

  async evaluateCaseCondIs({ children }, context, params) {
    const c = [params?.selectValue, children[1].children[0], children[2]];
    return evaluators.evaluateBinaryExpression!(
      { children: c } as any,
      context,
    );
  },

  async evaluateCaseCondTo({ children }, context, params) {
    const v: any = params?.selectValue?.value;
    const c1: any = (await getVBValue(await evaluate(children[0], context)))
      .value;
    const c2: any = (await getVBValue(await evaluate(children[2], context)))
      .value;
    return context.createBoolean(v >= c1 && v <= c2);
  },

  async evaluateCaseCondValue({ children }, context, params) {
    const v = params?.selectValue;
    const c1 = await getVBValue(await evaluate(children[0], context));
    return context.createBoolean(
      !!v && v.type === c1.type && v.value === c1.value,
    );
  },
});
