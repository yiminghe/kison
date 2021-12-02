import { getVBValue } from './common';
import { evaluate, registerEvaluators } from './evaluators';
import { isVBIteraterable, VBInteger, VBPointer, ExitToken } from '../types';
import { AstNode, Ast_Block_Node } from '../../parser';
import type { Context } from '../Context';

function checkBreak(e: unknown) {
  const exitNode = e as ExitToken;
  if (exitNode && exitNode.type === 'Exit' && exitNode.subType === 'EXIT_DO') {
  } else {
    throw e;
  }
}

async function getCondition2(context: Context, isWhile: Boolean, c: AstNode) {
  const v = await getVBValue(await evaluate(c, context));
  const vv = !!v && v.value;
  return isWhile ? vv : !vv;
}

registerEvaluators({
  async evaluateWhileWendStmt({ children }, context) {
    function getCondition() {
      return getCondition2(context, true, children[1]);
    }
    const block: Ast_Block_Node = children[3];
    while (await getCondition()) {
      try {
        await evaluate(block, context);
      } catch (e) {
        checkBreak(e);
        break;
      }
    }
  },
  async evaluateDoLoopStmt({ children }, context) {
    const beforeBlock: AstNode[] = [];
    const afterBlock: AstNode[] = [];
    let block;
    let condition = beforeBlock;
    for (const c of children) {
      if (c.type === 'token') {
        if (c.token === 'LOOP') {
          condition = afterBlock;
        } else if (c.token === 'WHILE' || c.token === 'UNTIL') {
          condition.push(c);
        }
      } else {
        if (c.symbol === 'valueStmt') {
          condition.push(c);
        } else if (c.symbol === 'block') {
          block = c;
        }
      }
    }

    if (!block) {
      return;
    }

    condition = beforeBlock.length ? beforeBlock : afterBlock;

    const isWhile =
      condition[0] &&
      condition[0].type === 'token' &&
      condition[0].token === 'WHILE';

    function getCondition() {
      return getCondition2(context, isWhile, condition[1]);
    }

    if (beforeBlock.length) {
      while (await getCondition()) {
        try {
          await evaluate(block, context);
        } catch (e) {
          checkBreak(e);
          break;
        }
      }
    } else if (afterBlock.length) {
      do {
        try {
          await evaluate(block, context);
        } catch (e) {
          checkBreak(e);
          break;
        }
      } while (await getCondition());
    } else {
      while (1) {
        try {
          await evaluate(block, context);
        } catch (e) {
          checkBreak(e);
          break;
        }
      }
    }
  },
});
