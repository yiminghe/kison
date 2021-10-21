import type {
  AstTokenNode,
  IDENTIFIER_Node,
  ICS_S_VariableOrProcedureCall_Node,
} from '../../parser';
import type { Context } from '../Context';
import {
  VBInteger,
  VBString,
  VB_NOTHING,
  VB_NULL,
  Subscript,
  VBObject,
} from '../types';
import { evaluators, evaluate } from './evaluators';

Object.assign(evaluators, {
  evaluate_INTEGERLITERAL(node: AstTokenNode) {
    return new VBInteger(parseInt(node.text));
  },

  evaluate_STRINGLITERAL(node: AstTokenNode) {
    return new VBString(node.text);
  },

  evaluate_IDENTIFIER(node: IDENTIFIER_Node, context: Context): VBObject {
    const scope = context.getCurrentScope();
    const name = node.text;
    return scope.getVariable(name);
  },

  evaluate_NOTHING() {
    return VB_NOTHING;
  },

  evaluate_NULL() {
    return VB_NULL;
  },

  async evaluate_iCS_S_VariableOrProcedureCall(
    node: ICS_S_VariableOrProcedureCall_Node,
    context: Context,
  ) {
    let variable: VBObject = evaluators.evaluate_IDENTIFIER(
      node.children[0],
      context,
    );
    let subscripts: Subscript[] | undefined;
    for (const c of node.children) {
      if (c.type === 'symbol' && c.symbol === 'subscripts') {
        subscripts = await evaluate(c, context);
      }
    }
    if (subscripts) {
      if (variable.value.type !== 'Array') {
        throw new Error('expect array');
      }
      variable = variable.value.getElement(subscripts.map((s) => s.upper));
    }
    return variable;
  },
});
