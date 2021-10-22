import type {
  ICS_B_ProcedureCall_Node,
  ECS_ProcedureCall_Node,
} from '../../parser';
import type { Context } from '../Context';
import { VBObject, VBValue } from '../types';
import { evaluate, registerEvaluators } from './evaluators';

async function callSub(
  node: ICS_B_ProcedureCall_Node | ECS_ProcedureCall_Node,
  context: Context,
  tokenIndex: number,
) {
  const children = node.children;
  const token = children[tokenIndex];
  if (token.type !== 'token') {
    throw new Error('unexpected');
  }
  const subName = token.text;
  let args: (VBValue | VBObject)[] = [];
  for (const f of children) {
    if (f.type === 'symbol' && f.symbol === 'argsCall') {
      args = await evaluate(f, context);
    }
  }
  return await context.callSub(subName, args);
}

registerEvaluators({
  evaluate_subStmt() {
    return;
  },

  evaluate_functionStmt() {
    return;
  },

  async evaluate_iCS_B_ProcedureCall(node, context) {
    return callSub(node, context, 0);
  },

  async evaluate_eCS_ProcedureCall(node, context) {
    const children = node.children;
    if (children[1].type !== 'token') {
      throw new Error('unexpected');
    }
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
