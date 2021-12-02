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
  VBDouble,
} from '../types';
import { createNumber, getVBValue } from './common';
import { evaluate, registerEvaluators } from './evaluators';
import type { Context } from '../Context';
import { getIdentifierName } from '../utils';

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

  evaluateAmbiguousIdentifier(node, context) {
    return context
      .getCurrentScopeInternal()
      .getVariable(getIdentifierName(node));
  },

  evaluateINTEGERLITERAL(node) {
    return new VBInteger(parseInt(node.text));
  },

  evaluateDOUBLELITERAL(node) {
    return new VBDouble(parseFloat(node.text));
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

  async evaluateAtomExpression({ children }, context) {
    return evaluate(children[1], context);
  },

  async evaluatePrefixExpression({ children }, context) {
    const operator = children[0];
    const v: VBValue = await getVBValue(await evaluate(children[1], context));
    switch (operator.token) {
      case 'NOT': {
        return context.createBoolean(!v.value);
      }
      case 'MINUS': {
        const n = -(v.value as any);
        return createNumber(n, context);
      }
      case 'PLUS': {
        const n = +(v.value as any);
        return createNumber(n, context);
      }
    }
  },

  async evaluateBinaryExpression({ children }, context) {
    const operator = children[1];
    const leftV = await evaluate(children[0], context);
    const left: VBValue = await getVBValue(leftV);
    const right: VBValue = await getVBValue(
      await evaluate(children[2], context),
    );
    switch (operator.token) {
      case 'PLUS': {
        // @ts-ignore
        const v = left.value + right.value;
        return createNumber(v, context);
      }
      case 'MULT': {
        // @ts-ignore
        const v = left.value * right.value;
        return createNumber(v, context);
      }
      case 'MINUS': {
        // @ts-ignore
        const v = left.value - right.value;
        return createNumber(v, context);
      }
      case 'DIV': {
        // @ts-ignore
        const v = left.value / right.value;
        return createNumber(v, context);
      }
      case 'IDIV': {
        // @ts-ignore
        const v = (left.value / right.value) | 0;
        return createNumber(v, context);
      }
      case 'MOD': {
        // @ts-ignore
        const v = left.value % right.value;
        return createNumber(v, context);
      }
      case 'POW': {
        // @ts-ignore
        const v = Math.pow(left.value, right.value);
        return createNumber(v, context);
      }
      case 'AMPERSAND': {
        // @ts-ignore
        const v = String(left.value) + String(right.value);
        return context.createString(v);
      }
      case 'OR': {
        const returnBoolean =
          left.type === 'boolean' && right.type === 'boolean';
        const v = (left.value || (0 as any)) | (right.value || (0 as any));
        return returnBoolean
          ? context.createBoolean(v > 0)
          : context.createInteger(v);
      }
      case 'AND': {
        const returnBoolean =
          left.type === 'boolean' && right.type === 'boolean';
        const v = (left.value || (0 as any)) & (right.value || (0 as any));
        return returnBoolean
          ? context.createBoolean(v > 0)
          : context.createInteger(v);
      }
      case 'XOR': {
        const returnBoolean =
          left.type === 'boolean' && right.type === 'boolean';
        const v = (left.value || (0 as any)) ^ (right.value || (0 as any));
        return returnBoolean
          ? context.createBoolean(v > 0)
          : context.createInteger(v);
      }
      case 'GEQ': {
        // @ts-ignore
        return context.createBoolean(left.value >= right.value);
      }
      case 'GT': {
        // @ts-ignore
        return context.createBoolean(left.value > right.value);
      }
      case 'LT': {
        // @ts-ignore
        return context.createBoolean(left.value < right.value);
      }
      case 'LEQ': {
        // @ts-ignore
        return context.createBoolean(left.value <= right.value);
      }
      case 'EQ':
      case 'IS': {
        // @ts-ignore
        return context.createBoolean(left.value === right.value);
      }
      case 'NEQ':
      case 'ISNOT': {
        // @ts-ignore
        return context.createBoolean(left.value !== right.value);
      }
    }
  },
});
