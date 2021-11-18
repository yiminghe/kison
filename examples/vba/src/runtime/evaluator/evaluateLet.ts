import type {
  AstTokenNode,
  Ast_ImplicitCallStmt_InStmt_Node,
  Ast_ValueStmt_Node,
} from '../../parser';
import { VBObject, VBValue } from '../types';
import { evaluate, registerEvaluators } from './evaluators';
import { collectAmbiguousIdentifiers } from '../collect/collectType';

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
    context.stashMember();
    const leftVariable: VBObject = await evaluate(left, context);
    context.popMember();
    if (leftVariable.type !== 'Object') {
      throw new Error('unexpect let left side operator!');
    }
    context.stashMember();
    const rightValue: VBValue | VBObject = await evaluate(right, context);
    context.popMember();
    if (op.token === 'EQ') {
      await leftVariable.setValue(rightValue);
    }
  },

  async evaluateSetStmt(node, context) {
    let { children } = node;
    context.stashMember();
    const leftVariable: VBObject = await evaluate(children[1], context);
    context.popMember();
    if (leftVariable.type !== 'Object') {
      throw new Error('unexpect let left side operator!');
    }
    const c3 = children[3];
    if (c3.children[0].type === 'token' && c3.children[0].token === 'NEW') {
      const classChild = c3.children[1];
      if (classChild) {
        const classTypes = collectAmbiguousIdentifiers(classChild);
        const rightValue = await context.createObject(classTypes.join('.'));
        await leftVariable.setValue(rightValue);
      }
    } else {
      context.stashMember();
      const rightValue = await evaluate(c3.children[0], context);
      context.popMember();
      await leftVariable.setValue(rightValue);
    }
  },
});
