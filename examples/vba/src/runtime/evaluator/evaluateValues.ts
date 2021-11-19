import {
  VBInteger,
  VBString,
  VB_NOTHING,
  VB_NULL,
  VBValue,
  VBObject,
} from '../types';
import { evaluate, registerEvaluators } from './evaluators';

registerEvaluators({
  async evaluateIndexes(node, context) {
    let ret: (VBValue | VBObject)[] = [];
    const { children } = node;
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'valueStmt') {
        context.stashMemberInternal();
        ret.push(await evaluate(c, context));
        context.popMemberInternal();
      }
    }
    return ret;
  },

  evaluateINTEGERLITERAL(node) {
    return new VBInteger(parseInt(node.text));
  },

  evaluateSTRINGLITERAL(node) {
    return new VBString(node.text);
  },

  evaluateNOTHING() {
    return VB_NOTHING;
  },

  evaluateNULL() {
    return VB_NULL;
  },

  evaluateExitStmt(node) {
    const exit=node.children[0];
    throw exit;
  },
});
