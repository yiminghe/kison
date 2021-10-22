import type { IDENTIFIER_Node } from '../../parser';
import {
  VBInteger,
  VBString,
  VB_NOTHING,
  VB_NULL,
  Subscript,
  VBObject,
  ExitResult,
} from '../types';
import { evaluators, evaluate, registerEvaluators } from './evaluators';

registerEvaluators({
  evaluate_INTEGERLITERAL(node) {
    return new VBInteger(parseInt(node.text));
  },

  evaluate_STRINGLITERAL(node) {
    return new VBString(node.text);
  },

  evaluate_IDENTIFIER(node, context): VBObject {
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

  async evaluate_iCS_S_VariableOrProcedureCall(node, context) {
    let variable: VBObject = evaluators.evaluate_IDENTIFIER!(
      node.children[0] as IDENTIFIER_Node,
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

  evaluate_exitStmt(node) {
    return new ExitResult(node.children[0]);
  },
});
