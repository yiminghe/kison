import type { AstTokenNode, IDENTIFIER_Node } from '../../parser';
import type { Context } from '../Context';
import { VBInteger, VBString, VBVariable, VB_NOTHING, VB_NULL } from '../types';
import { evaluators } from './evaluators';

Object.assign(evaluators, {
  evaluate_INTEGERLITERAL(node: AstTokenNode) {
    return new VBInteger(parseInt(node.text));
  },

  evaluate_STRINGLITERAL(node: AstTokenNode) {
    return new VBString(node.text);
  },

  evaluate_IDENTIFIER(node: IDENTIFIER_Node, context: Context): VBVariable {
    const scope = context.getCurrentScope();
    const name = node.text;
    return new VBVariable(name, scope);
  },

  evaluate_NOTHING() {
    return VB_NOTHING;
  },

  evaluate_NULL() {
    return VB_NULL;
  },
});
