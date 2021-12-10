import { VBAny } from '../types';
import { evaluate, registerEvaluators } from './evaluators';
import { buildIndexes, callSubOrGetElementWithIndexesAndArgs } from './common';
import { throwVBRuntimeError } from '../data-structure/VBError';
import { last } from '../utils';

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
    for (const c of children.slice(1)) {
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
      // with xx
      // no space
      // msgbox(.xx)
      //
      if (!last(context.withStack)) {
        throwVBRuntimeError(context, 'INVALIDE_REF');
      }
      params = {
        ...params,
        parentMember: last(context.withStack),
      };
    }
    return evaluate(children[1], context, params);
  },

  async evaluateICS_S_SpaceMemberCall({ children }, context) {
    if (!last(context.withStack)) {
      throwVBRuntimeError(context, 'INVALIDE_REF');
    }
    return evaluate(children[1], context, {
      parentMember: last(context.withStack),
    });
  },
});
