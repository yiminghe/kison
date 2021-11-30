import {
  VBInteger,
  VBString,
  VB_NOTHING,
  VB_NULL,
  VBAny,
  VB_FALSE,
  VB_TRUE,
  getExitToken,
} from '../types';
import { evaluate, registerEvaluators } from './evaluators';

registerEvaluators({
  async evaluateIndexes(node, context) {
    let ret: VBAny[] = [];
    const { children } = node;
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'valueStmt') {
        ret.push(await evaluate(c, context));
      }
    }
    return ret;
  },

  evaluateINTEGERLITERAL(node) {
    return new VBInteger(parseInt(node.text));
  },

  evaluateSTRINGLITERAL(node) {
    return new VBString(node.text.slice(1, -1));
  },

  evaluateNOTHING() {
    return VB_NOTHING;
  },

  evaluateTRUE() {
    return VB_TRUE;
  },
  evaluateFALSE() {
    return VB_FALSE;
  },

  evaluateNULL() {
    return VB_NULL;
  },

  evaluateExitStmt(node) {
    throw getExitToken(node);
  },
});
