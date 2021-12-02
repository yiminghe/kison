import type { Context } from '../Context';
import type { AstNode, AstSymbolNode } from '../../parser';
import { getVBValue } from './common';
import { evaluate, registerEvaluators } from './evaluators';

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
});
