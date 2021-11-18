import type {
  Ast_ICS_B_ProcedureCall_Node,
  Ast_ECS_ProcedureCall_Node,
} from '../../parser';
import {
  collectAmbiguousIdentifier,
  collectIndexesNode,
} from '../collect/collectType';
import {
  Ast_ECS_MemberProcedureCall_Node,
  Ast_ICS_B_MemberProcedureCall_Node,
} from '../../parserLLK';
import type { Context } from '../Context';
import {
  VBObject,
  VBValue,
  BinderValue,
  SubBinder,
  VB_EMPTY,
  ClassBinder,
  VBNamespaceBinder,
} from '../types';
import { evaluate, registerEvaluators } from './evaluators';
import {
  buildArgs,
  buildIndexes,
  callSubOrGetElementWithIndexesAndArgs,
  checkIndexesInterger,
} from './common';

async function callSub(
  node: Ast_ICS_B_ProcedureCall_Node | Ast_ECS_ProcedureCall_Node,
  context: Context,
  tokenIndex: number,
) {
  const { children } = node;
  const token = children[tokenIndex];
  if (token.type !== 'symbol' || token.symbol !== 'ambiguousIdentifier') {
    throw new Error('unexpected');
  }
  const subName = token.children[0].text;
  let args: (VBValue | VBObject)[] = await buildArgs(node, context);
  return await context.callSubInternal(subName, args);
}

async function callMemberSub(
  node: Ast_ICS_B_MemberProcedureCall_Node | Ast_ECS_MemberProcedureCall_Node,
  context: Context,
  callerIndex: number,
) {
  const { children } = node;
  let v: VBObject | VBValue | VBNamespaceBinder | SubBinder | undefined;
  const callerNode = children[callerIndex];
  if (
    callerNode.type === 'symbol' &&
    callerNode.symbol === 'implicitCallStmt_InStmt'
  ) {
    v = await evaluate(callerNode, context);
  }
  if (!v) {
    throw new Error('TODO with!');
  }

  const indexes: (VBValue | VBObject)[] = (
    await buildIndexes(node, context)
  )[0];
  let args: (VBValue | VBObject)[] = await buildArgs(node, context);

  const id = collectAmbiguousIdentifier(node, true)!;
  let subOrArray: undefined | BinderValue;

  if (v.type === 'Object' && v.value.type === 'Class') {
    return v.value.callSub(id, args);
  }
  if (v.type === 'Class') {
    return v.callSub(id, args);
  }

  if (v.type === 'Namespace') {
    subOrArray = v.get(id);
  }

  if (subOrArray) {
    if (subOrArray.type === 'SubBinder') {
      return context.callSubBinder(subOrArray, args.length ? args : indexes);
    } else if (
      subOrArray.type === 'Object' &&
      subOrArray.value.type === 'Array'
    ) {
      const numberIndexes = checkIndexesInterger(indexes);
      if (!numberIndexes.length) {
        throw new Error('unexpected array access!');
      }
      return subOrArray.value.getElement(numberIndexes);
    }
  }

  throw new Error('invalid member access!');
}

registerEvaluators({
  evaluateSubStmt() {
    return;
  },

  evaluateFunctionStmt() {
    return;
  },

  async evaluateICS_B_MemberProcedureCall(node, context) {
    return callMemberSub(node, context, 0);
  },

  async evaluateECS_MemberProcedureCall(node, context) {
    return callMemberSub(node, context, 1);
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
    let lastArg = undefined;
    for (const c of children) {
      if (c.type === 'token' && c.text === ',') {
        args.push(lastArg);
        lastArg = undefined;
        continue;
      }
      lastArg = await evaluate(c, context);
    }
    if (children.length) {
      args.push(lastArg);
    }
    return args;
  },

  async evaluateICS_S_MembersCall({ children }, context) {
    const valueNodes = [];

    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'iCS_S_VariableOrProcedureCall') {
        valueNodes.push(c);
      } else if (c.type === 'symbol' && c.symbol === 'iCS_S_MemberCall') {
        for (const c2 of c.children) {
          if (
            c2.type === 'symbol' &&
            c2.symbol === 'iCS_S_VariableOrProcedureCall'
          ) {
            valueNodes.push(c);
          }
        }
      }
    }

    let v:
      | VBObject
      | VBValue
      | SubBinder
      | ClassBinder
      | VBNamespaceBinder
      | undefined = await evaluate(valueNodes[0], context);

    for (let i = 1; i < valueNodes.length; i++) {
      if (!v) {
        throw new Error('unexpected member access!');
      }
      const valueNode = valueNodes[i];
      const indexesNode = collectIndexesNode(valueNode);
      const id = collectAmbiguousIdentifier(valueNode)!;
      if (v.type === 'Object' && v.value.type === 'Class') {
        v = v.value.get(id);
      } else if (v.type === 'Namespace' || v.type === 'Class') {
        v = v.get(id);
      } else {
        throw new Error('unexpected member access!');
      }
      if (indexesNode && v) {
        const indexesValues = (
          await buildIndexes({ children: [indexesNode] }, context)
        )[0];
        if (v.type === 'Object' && v.value.type === 'Array') {
          const indexes = checkIndexesInterger(indexesValues);
          v = v.value.getElement(indexes);
        } else if (v.type === 'SubBinder') {
          const ret = await context.callSubBinder(v, indexesValues);
          if (ret?.type === 'Exit') {
            return ret;
          }
          v = ret;
        }
      }
    }

    return v || VB_EMPTY;
  },

  async evaluateICS_S_ProcedureOrArrayCall(node, context) {
    const args = await buildArgs(node, context);
    const indexes = await buildIndexes(node, context);
    if (args) {
      indexes.unshift(args);
    }
    return callSubOrGetElementWithIndexesAndArgs(
      collectAmbiguousIdentifier(node, true)!,
      indexes,
      context,
    );
  },

  async evaluateICS_S_VariableOrProcedureCall({ children }, context) {
    const subName = children[0].children[0].text;
    const indexes = await buildIndexes({ children }, context);
    if (indexes.length) {
      return callSubOrGetElementWithIndexesAndArgs(subName, indexes, context);
    } else {
      // variable
      return context.getCurrentScope().getVariable(subName);
    }
  },
});
