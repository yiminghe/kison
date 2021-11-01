import type {
  ICS_B_ProcedureCall_Node,
  ECS_ProcedureCall_Node,
} from '../../parser';
import {
  AstSymbolNode,
  ECS_MemberProcedureCall_Node,
  ICS_B_MemberProcedureCall_Node,
} from '../../parserLLK';
import { collectAmbiguousIdentifier } from '../collect/collectType';
import type { Context } from '../Context';
import { VBObject, VBValue } from '../types';
import { evaluate, registerEvaluators } from './evaluators';
import { buildArgs, buildIndexes, checkIndexesInterger } from './common';

async function callSub(
  node: ICS_B_ProcedureCall_Node | ECS_ProcedureCall_Node,
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
  return await context.callSub(subName, args);
}

async function callMemberSub(
  node: ICS_B_MemberProcedureCall_Node | ECS_MemberProcedureCall_Node,
  context: Context,
  callerIndex: number,
) {
  const { children } = node;
  let v: VBObject | VBValue | undefined;
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
  //const hasIndexes=children.findIndex(v=>v.type==='symbol'&&v.symbol==='indexes');
  const indexes: (VBValue | VBObject)[] = await buildIndexes(node, context);
  let args: (VBValue | VBObject)[] = await buildArgs(node, context);

  const id = collectAmbiguousIdentifier(node, true)!;
  let subOrArray;

  if (v.type === 'Object' && v.value.type === 'Class') {
    return v.value.callSub(id, args);
  }
  if (v.type === 'Class') {
    return v.callSub(id, args);
  }

  if (v.type === 'Object' && v.value.type === 'Namespace') {
    subOrArray = v.value.get(id)?.value;
  } else if (v.type === 'Namespace') {
    subOrArray = v.get(id)?.value;
  }

  if (subOrArray) {
    if (subOrArray.type === 'subBinder') {
      return context.callSubBinder(subOrArray, args.length ? args : indexes);
    } else if (subOrArray.type === 'Array') {
      const numberIndexes = checkIndexesInterger(indexes);
      if (!numberIndexes.length) {
        throw new Error('unexpected array access!');
      }
      return subOrArray.getElement(numberIndexes);
    }
  }

  throw new Error('invalid member access!');
}

registerEvaluators({
  evaluate_subStmt() {
    return;
  },

  evaluate_functionStmt() {
    return;
  },

  async evaluate_iCS_B_MemberProcedureCall(node, context) {
    return callMemberSub(node, context, 0);
  },

  async evaluate_eCS_MemberProcedureCall(node, context) {
    return callMemberSub(node, context, 1);
  },

  async evaluate_iCS_B_ProcedureCall(node, context) {
    return callSub(node, context, 0);
  },

  async evaluate_eCS_ProcedureCall(node, context) {
    return callSub(node, context, 1);
  },

  async evaluate_argsCall(node, context) {
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
});
