import type {
  AstTokenNode,
  Ast_ImplicitCallStmt_InStmt_Node,
  Ast_ValueStmt_Node,
} from '../../parser';
import { VBPointer, VBAny } from '../types';
import { evaluate, registerEvaluators } from './evaluators';
import { collectAmbiguousIdentifiers } from '../collect/collectType';
import { throwVBRuntimeError } from '../data-structure/VBError';

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
    context.stashMemberInternal();
    const leftVariable: VBPointer = await evaluate(left, context);
    context.popMemberInternal();
    if (leftVariable.type !== 'Pointer') {
      throwVBRuntimeError(context, 'UNEXPECTED_ERROR', 'left side operator');
    }
    context.stashMemberInternal();
    const rightValue: VBAny = await evaluate(right, context);
    context.popMemberInternal();
    if (op.token === 'EQ') {
      await leftVariable.setValue(rightValue);
    }
  },

  async evaluateSetStmt(node, context) {
    let { children } = node;
    context.stashMemberInternal();
    const leftVariable: VBPointer = await evaluate(children[1], context);
    context.popMemberInternal();
    if (leftVariable.type !== 'Pointer') {
      throwVBRuntimeError(context, 'UNEXPECTED_ERROR', 'left side operator');
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
      context.stashMemberInternal();
      let rightValue: VBAny = await evaluate(c3.children[0], context);
      context.popMemberInternal();
      if (
        rightValue.type === 'Nothing' &&
        leftVariable.subType === 'Value' &&
        leftVariable.asType.isNew
      ) {
        rightValue = await context.createObject(leftVariable.asType.className!);
      }
      await leftVariable.setValue(rightValue);
    }
  },
});
