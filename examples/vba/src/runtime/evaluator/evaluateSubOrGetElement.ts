import type {
  Ast_ICS_B_ProcedureCall_Node,
  Ast_ECS_ProcedureCall_Node,
  Ast_ECS_MemberProcedureCall_Node,
  Ast_ICS_B_MemberProcedureCall_Node,
} from '../../parser';
import { collectAmbiguousIdentifier } from '../collect/collectType';
import type { Context } from '../Context';
import { VBPointer, VBValue, VB_EMPTY, VB_MISSING_ARGUMENT } from '../types';
import { evaluate, registerEvaluators } from './evaluators';
import {
  buildArgs,
  buildIndexes,
  callSubOrGetElementWithIndexesAndArgs,
} from './common';
import { throwVBError } from '../errorCodes';

async function callSub(
  node: Ast_ICS_B_ProcedureCall_Node | Ast_ECS_ProcedureCall_Node,
  context: Context,
  tokenIndex: number,
) {
  const { children } = node;
  const token = children[tokenIndex];
  if (token.type !== 'symbol' || token.symbol !== 'ambiguousIdentifier') {
    throwVBError('SYNTAX_ERROR');
  }
  const subName = token.children[0].text;
  let args: (VBValue | VBPointer)[] | undefined = await buildArgs(
    node,
    context,
  );
  return await context.callSubInternal(subName, args);
}

async function callMemberSub(
  node: Ast_ICS_B_MemberProcedureCall_Node | Ast_ECS_MemberProcedureCall_Node,
  context: Context,
) {
  const { children } = node;

  let subName = '';

  let parent: VBPointer | VBValue | undefined;

  for (const c of children) {
    if (c.type === 'symbol' && c.symbol === 'implicitCallStmt_InStmt') {
      parent = await evaluate(c, context);
    } else if (c.type === 'symbol' && c.symbol === 'ambiguousIdentifier') {
      subName = c.children[0].text;
    }
  }

  if (!parent) {
    throwVBError('UNEXPECTED_ERROR', 'member access');
  }

  const argsCall = await buildArgs(node, context);

  const indexes = await buildIndexes(node, context);

  if (argsCall) {
    indexes.unshift(argsCall);
  }

  return callSubOrGetElementWithIndexesAndArgs(
    parent,
    subName,
    indexes,
    context,
  );
}

registerEvaluators({
  evaluateSubStmt() {
    return;
  },

  'evaluate.'() {},

  evaluateFunctionStmt() {
    return;
  },

  async evaluateICS_B_MemberProcedureCall(node, context) {
    return callMemberSub(node, context);
  },

  async evaluateECS_MemberProcedureCall(node, context) {
    return callMemberSub(node, context);
  },

  async evaluateICS_B_ProcedureCall(node, context) {
    return callSub(node, context, 0);
  },

  async evaluateECS_ProcedureCall(node, context) {
    return callSub(node, context, 1);
  },

  async evaluateArgsCall(node, context) {
    const args = [];
    const { children } = node;
    let lastArg = VB_MISSING_ARGUMENT;
    for (const c of children) {
      if (c.type === 'token' && c.text === ',') {
        args.push(lastArg);
        lastArg = VB_MISSING_ARGUMENT;
        continue;
      }
      context.stashMemberInternal();
      lastArg = await evaluate(c, context);
      context.popMemberInternal();
    }
    if (children.length) {
      args.push(lastArg);
    }
    return args;
  },

  async evaluateICS_S_MembersCall(node, context) {
    const { children } = node;

    if (children[0].symbol !== 'iCS_S_MemberCall') {
      const parent: VBPointer | VBValue | undefined = (context.parentMember =
        await evaluate(children[0], context));
      if (
        !parent ||
        (parent.type === 'Pointer' &&
          (await parent.getValue()).type === 'Empty') ||
        parent.type === 'Empty'
      ) {
        throwVBError('UNEXPECTED_ERROR', 'member access');
      }
    }

    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'iCS_S_MemberCall') {
        context.parentMember = await evaluate(c, context);
      }
    }

    let parent = context.parentMember;

    context.parentMember = undefined;

    const indexes = await buildIndexes(node, context);

    let v;
    if (parent && indexes.length) {
      v = await callSubOrGetElementWithIndexesAndArgs(
        parent,
        '',
        indexes,
        context,
      );
    } else {
      v = parent;
    }

    return v;
  },

  async evaluateICS_S_ProcedureOrArrayCall(node, context) {
    const args = await buildArgs(node, context);
    const indexes = await buildIndexes(node, context);
    if (args) {
      indexes.unshift(args);
    }
    return callSubOrGetElementWithIndexesAndArgs(
      context.parentMember,
      collectAmbiguousIdentifier(node, true)!,
      indexes,
      context,
    );
  },

  async evaluateICS_S_VariableOrProcedureCall({ children }, context) {
    const subName = children[0].children[0].text;
    const indexes = await buildIndexes({ children }, context);
    if (indexes.length || context.parentMember) {
      return callSubOrGetElementWithIndexesAndArgs(
        context.parentMember,
        subName,
        indexes,
        context,
      );
    } else {
      // variable
      return await context.getCurrentScopeInternal().getVariable(subName);
    }
  },
});
