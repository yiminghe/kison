import type {
  Ast_ICS_B_ProcedureCall_Node,
  Ast_ECS_ProcedureCall_Node,
  Ast_ECS_MemberProcedureCall_Node,
  Ast_ICS_B_MemberProcedureCall_Node,
} from '../../parser';
import { collectAmbiguousIdentifier } from '../collect/collectType';
import type { Context } from '../Context';
import {
  VBAny,
  VB_EXIT_SUB,
  VB_MISSING_ARGUMENT,
  VBClass,
  SubBinding,
} from '../types';
import { evaluate, registerEvaluators } from './evaluators';
import {
  buildArgs,
  buildIndexes,
  callSubOrGetElementWithIndexesAndArgs,
} from './common';
import { throwVBRuntimeError } from '../data-structure/VBError';
import {
  IndexedArg,
  NamedArg,
  VBArguments,
} from '../data-structure/VBArguments';
import { getIdentifierName, last } from '../utils';

async function callSub(
  node: Ast_ICS_B_ProcedureCall_Node | Ast_ECS_ProcedureCall_Node,
  context: Context,
  tokenIndex: number,
) {
  const { children } = node;
  const token = children[tokenIndex];
  if (token.type !== 'symbol' || token.symbol !== 'ambiguousIdentifier') {
    throwVBRuntimeError(context, 'SYNTAX_ERROR');
  }
  const subName = token.children[0].text;
  let args: VBArguments | undefined = await buildArgs(node, context);
  return await context.callSubInternal(subName, args);
}

async function callMemberSub(
  node: Ast_ICS_B_MemberProcedureCall_Node | Ast_ECS_MemberProcedureCall_Node,
  context: Context,
) {
  const { children } = node;

  let subName = '';

  let parent: VBAny | undefined;

  for (const c of children) {
    if (c.type === 'symbol' && c.symbol === 'implicitCallStmt_InStmt') {
      parent = await evaluate(c, context);
    } else if (c.type === 'symbol' && c.symbol === 'ambiguousIdentifier') {
      subName = c.children[0].text;
    }
  }

  if (!parent) {
    parent = last(context.withStack);
  }

  if (!parent) {
    throwVBRuntimeError(context, 'INVALIDE_REF');
  }

  const argsCall = await buildArgs(node, context);

  const indexes = await buildIndexes(node, context);

  return callSubOrGetElementWithIndexesAndArgs(
    parent,
    subName,
    indexes,
    context,
    argsCall,
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

  async evaluateGoToStmt(node, context) {
    const label = getIdentifierName(node.children[1]);
    const sub = context.getCurrentScopeInternal().sub;
    if (sub.type !== 'SubBinding') {
      await sub.gotoLineLabel(label);
      throw VB_EXIT_SUB;
    }
  },

  evaluateLineLabel() {},

  evaluateOnErrorStmt({ children }, context) {
    const c = children[3];
    if (c && c.type === 'token' && c.text === '1') {
      context.getCurrentScopeInternal().error = undefined;
    }
  },

  async evaluateICS_B_MemberProcedureCall(node, context) {
    const v = await callMemberSub(node, context);
    return v;
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
    const args = new VBArguments(context);
    const { children } = node;
    const missingArg: IndexedArg | NamedArg = {
      type: 'indexed',
      value: VB_MISSING_ARGUMENT,
    };
    let lastArg: IndexedArg | NamedArg = missingArg;
    for (const c of children) {
      if (c.type === 'token' && c.text === ',') {
        args.addArg(lastArg);
        lastArg = missingArg;
        continue;
      }
      lastArg = await evaluate(c, context);
    }
    if (children.length) {
      args.addArg(lastArg);
    }
    return args;
  },

  async evaluateArgCall(node, context) {
    const valueStmt = node.children[0];
    const values = valueStmt.children;
    const v2 = values[1];
    if (v2 && v2.type === 'token' && v2.token === 'ASSIGN') {
      const value = await evaluate(values[2]!, context);
      const nameNode = values[0];
      if (
        nameNode.type !== 'symbol' ||
        nameNode.symbol !== 'ambiguousIdentifier'
      ) {
        throwVBRuntimeError(context, 'SYNTAX_ERROR');
      }
      const name = nameNode.children[0].text;
      return {
        name,
        type: 'named',
        value,
      } as NamedArg;
    } else {
      return {
        type: 'indexed',
        value: await evaluate(valueStmt, context),
      } as IndexedArg;
    }
  },

  async evaluateICS_S_ProcedureOrArrayCall(node, context, params = {}) {
    const args = await buildArgs(node, context);
    const indexes = await buildIndexes(node, context);
    return callSubOrGetElementWithIndexesAndArgs(
      params.parentMember,
      collectAmbiguousIdentifier(node, true)!,
      indexes,
      context,
      args,
    );
  },

  async evaluateICS_S_VariableOrProcedureCall(
    { children },
    context,
    params = {},
  ) {
    const subName = children[0].children[0].text;
    const indexes = await buildIndexes({ children }, context);
    if (indexes.length || params.parentMember) {
      return callSubOrGetElementWithIndexesAndArgs(
        params.parentMember,
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
