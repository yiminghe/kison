import type {
  ICS_B_ProcedureCall_Node,
  ArgsCall_Node,
  ECS_ProcedureCall_Node,
} from '../../parser';
import type { Context } from '../Context';
import { VBValue, VBVariable } from '../types';
import { evaluators, evaluate } from './evaluators';

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
  let args: (VBValue | VBVariable)[] = [];
  for (const f of children) {
    if (f.type === 'symbol' && f.symbol === 'argsCall') {
      args = await evaluate(f, context);
    }
  }
  return await context.callSub(subName, args);
}

Object.assign(evaluators, {
  evaluate_subStmt() {
    return;
  },

  async evaluate_iCS_B_ProcedureCall(
    node: ICS_B_ProcedureCall_Node,
    context: Context,
  ) {
    return callSub(node, context, 0);
  },

  async evaluate_eCS_ProcedureCall(
    node: ECS_ProcedureCall_Node,
    context: Context,
  ) {
    const children = node.children;
    if (children[1].type !== 'token') {
      throw new Error('unexpected');
    }
    return callSub(node, context, 1);
  },

  async evaluate_argsCall(node: ArgsCall_Node, context: Context) {
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
