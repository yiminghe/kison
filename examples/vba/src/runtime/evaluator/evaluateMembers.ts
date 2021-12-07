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

registerEvaluators({
  async evaluateICS_S_MembersCall(node, context) {
    const { children } = node;
    let parentMember: VBAny | undefined = await evaluate(children[0], context);
    if (
      !parentMember ||
      (parentMember.type === 'Pointer' &&
        (await parentMember.getValue()).type === 'Empty') ||
      parentMember.type === 'Empty'
    ) {
      throwVBRuntimeError(context, 'INVALIDE_REF');
    }
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'iCS_S_MemberCall') {
        parentMember = await evaluate(c, context, {
          parentMember,
        });
      }
    }
    const indexes = await buildIndexes(node, context);
    let v;
    if (parentMember && indexes.length) {
      v = await callSubOrGetElementWithIndexesAndArgs(
        parentMember,
        '',
        indexes,
        context,
      );
    } else {
      v = parentMember;
    }
    return v;
  },

  async evaluateICS_S_MemberCall({ children }, context, params = {}) {
    if (!params.parentMember) {
      throwVBRuntimeError(context, 'INVALIDE_REF');
    }
    return evaluate(children[1], context, params);
  },

  async evaluateICS_S_SpaceMemberCall({ children }, context, params = {}) {
    if (!last(context.withStack)) {
      throwVBRuntimeError(context, 'INVALIDE_REF');
    }
    return evaluate(children[1], context, {
      parentMember: last(context.withStack),
    });
  },
});
