import { getVBValue } from './common';
import { evaluate, registerEvaluators } from './evaluators';
import { isVBIteraterable, VBInteger, VBPointer } from '../types';

const one = new VBInteger(1);

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
        await evaluate(block, context);
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

    if (isVBIteraterable(value)) {
      const iterator = value.vbIterator();
      let ret;
      do {
        ret = await iterator.next();
        await id.setValue(ret.value);
        if (!ret.done && block) {
          await evaluate(block, context);
        }
      } while (ret && !ret.done);
    }
  },
});
