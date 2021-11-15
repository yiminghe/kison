import type {
  AstTokenNode,
  Ast_ImplicitCallStmt_InStmt_Node,
  Ast_ValueStmt_Node,
} from '../../parser';
import { VBObject, VBValue } from '../types';
import { evaluate, registerEvaluators } from './evaluators';

registerEvaluators({
  async evaluateLetStmt(node, context) {
    let { children } = node;
    let index = 0;
    let c: any = children[0];
    if (c.type === 'token') {
      ++index;
      c = children[index];
    }
    const left: Ast_ImplicitCallStmt_InStmt_Node = c;
    const op = children[++index] as AstTokenNode;
    const right = children[++index] as Ast_ValueStmt_Node;
    const leftVariable: VBObject = await evaluate(left, context);
    if (leftVariable.type !== 'Object') {
      throw new Error('unexpect let left side operator!');
    }
    const rightValue: VBValue | VBObject = await evaluate(right, context);
    if (op.token === 'EQ') {
      leftVariable.setValue(rightValue);
    }
  },
});
