import type { IDENTIFIER_Node } from '../../parser';
import {
  VBInteger,
  VBString,
  VB_NOTHING,
  VB_NULL,
  Subscript,
  VBObject,
  ExitResult,
  VBValue,
} from '../types';
import { evaluate, registerEvaluators } from './evaluators';

registerEvaluators({
  evaluate_INTEGERLITERAL(node) {
    return new VBInteger(parseInt(node.text));
  },

  evaluate_STRINGLITERAL(node) {
    return new VBString(node.text);
  },

  evaluate_NOTHING() {
    return VB_NOTHING;
  },

  evaluate_NULL() {
    return VB_NULL;
  },

  async evaluate_iCS_S_VariableOrProcedureCall(node, context) {
    let subscripts: Subscript[] | undefined;

    for (const c of node.children) {
      if (c.type === 'symbol' && c.symbol === 'subscripts') {
        subscripts = await evaluate(c, context);
      }
    }

    const id = (node.children[0] as IDENTIFIER_Node).text;
    const scope = context.getCurrentScope();

    // a = r(1)
    if (
      !scope.hasVariable(id) &&
      subscripts &&
      subscripts.every((s) => s.one)
    ) {
      let args: (VBValue | VBObject)[] = [];
      for (const c of node.children) {
        if (c.type === 'symbol' && c.symbol === 'subscripts') {
          for (const cc of c.children) {
            if (cc.type === 'symbol' && cc.symbol === 'subscript_') {
              for (const ccc of cc.children) {
                if (ccc.type === 'symbol' && ccc.symbol === 'valueStmt') {
                  args.push(await evaluate(ccc, context));
                }
              }
            }
          }
        }
      }
      return await context.callSub(id, args);
    }

    let variable: VBObject = scope.getVariable(id);

    if (subscripts) {
      if (variable.value.type !== 'Array') {
        throw new Error('expect array or function or sub');
      }
      variable = variable.value.getElement(subscripts.map((s) => s.upper));
    }
    return variable;
  },
  evaluate_exitStmt(node) {
    return new ExitResult(node.children[0]);
  },
});
