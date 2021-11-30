import { throwVBRuntimeError } from '../data-structure/VBError';
import {
  VBInteger,
  VBString,
  VB_NOTHING,
  VB_NULL,
  VBAny,
  VB_FALSE,
  VB_TRUE,
  getExitToken,
  VBValue,
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

  async evaluateValueStmt({ children }, context) {
    if (children.length === 1) {
      return evaluate(children[0], context);
    }
    if (children.length === 3) {
      if (
        children[0].type === 'token' &&
        children[0].token === 'LPAREN' &&
        children[2].type === 'token' &&
        children[2].token === 'RPAREN'
      ) {
        return evaluate(children[1], context);
      }
      const operator = children[1];

      function createNumber(v: any) {
        if (typeof v !== 'number') {
          throwVBRuntimeError(context, 'TYPE_MISMATCH');
        }
        if ((v | 0) !== v) {
          return context.createDouble(v);
        }
        return context.createInteger(v);
      }

      if (operator.type === 'token') {
        const left: VBValue = await evaluate(children[0], context);
        const right: VBValue = await evaluate(children[2], context);
        switch (operator.token) {
          case 'PLUS': {
            // @ts-ignore
            const v = left.value + right.value;
            return createNumber(v);
          }
          case 'MULT': {
            // @ts-ignore
            const v = left.value * right.value;
            return createNumber(v);
          }
        }
      }
    }
  },
});
