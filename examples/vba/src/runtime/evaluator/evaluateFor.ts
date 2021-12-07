import { getVBValue } from './common';
import { evaluate, registerEvaluators } from './evaluators';
import { isVBIterable, VBInteger, VBPointer, ExitToken } from '../types';

const one = new VBInteger(1);

function checkBreak(e: unknown) {
  const exitNode = e as ExitToken;
  if (exitNode && exitNode.type === 'Exit' && exitNode.subType === 'EXIT_FOR') {
  } else {
    throw e;
  }
}

registerEvaluators({
  async evaluateForNextStmt({ children }, context) {
    const id: VBPointer = await evaluate(children[1], context);
    const values = [];
    let block;
    for (const c of children) {
      if (c.type === 'symbol') {
        if (c.symbol === 'valueStmt') {
          values.push(await getVBValue(await evaluate(c, context)));
        } else if (c.symbol === 'block') {
          block = c;
        }
      }
    }
    const [from, to, step = one] = values as any;

    await id.setValue(from);

    while (from.value <= to.value) {
      if (block) {
        try {
          await evaluate(block, context);
        } catch (e) {
          checkBreak(e);
          break;
        }
      }
      from.value += step.value;
      await id.setValue(from);
    }
  },

  async evaluateForEachStmt({ children }, context) {
    const id: VBPointer = await evaluate(children[2], context);
    let value;
    let block;
    for (const c of children) {
      if (c.type === 'symbol') {
        if (c.symbol === 'valueStmt') {
          value = await getVBValue(await evaluate(c, context));
        } else if (c.symbol === 'block') {
          block = c;
        }
      }
    }

    if (isVBIterable(value)) {
      const iterator = value.vbIterator();
      let ret;
      do {
        ret = await iterator.next();
        await id.setValue(ret.value);
        if (!ret.done && block) {
          try {
            await evaluate(block, context);
          } catch (e) {
            checkBreak(e);
            break;
          }
        }
      } while (ret && !ret.done);
    }
  },
});
