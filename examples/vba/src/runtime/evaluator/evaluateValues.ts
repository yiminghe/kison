import type { AstTokenNode, IDENTIFIER_Node } from '../../parser';
import type { Runtime } from '../runtime';
import { VBInteger } from '../types';
import { evaluators } from './evaluators';

Object.assign(evaluators, {
  evaluate_INTEGERLITERAL(node: AstTokenNode) {
    return new VBInteger(parseInt(node.text));
  },

  evaluate_IDENTIFIER(node: IDENTIFIER_Node, runtime: Runtime) {
    const scope = runtime.getCurrentScope();
    const value = scope.getVariable(node.text);
    return value;
  }
});
