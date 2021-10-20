import type {
  ICS_B_ProcedureCall_Node,
  ArgsCall_Node,
  ECS_ProcedureCall_Node,
} from '../../parser';
import type { Runtime } from '../runtime';
import { VBType } from '../types';
import { evaluators, evaluate } from './evaluators';

async function callSub(
  node: ICS_B_ProcedureCall_Node | ECS_ProcedureCall_Node,
  runtime: Runtime,
  tokenIndex: number,
) {
  const children = node.children;
  const token = children[tokenIndex];
  if (token.type !== 'token') {
    throw new Error('unexpected');
  }
  const subName = token.text;
  let args: VBType[] = [];
  for (const f of children) {
    if (f.type === 'symbol' && f.symbol === 'argsCall') {
      args = await evaluate(f, runtime);
    }
  }
  return await runtime.callSub(subName, args);
}

Object.assign(evaluators, {
  evaluate_subStmt() {
    return;
  },

  async evaluate_iCS_B_ProcedureCall(
    node: ICS_B_ProcedureCall_Node,
    runtime: Runtime,
  ) {
    return callSub(node, runtime, 0);
  },

  async evaluate_eCS_ProcedureCall(
    node: ECS_ProcedureCall_Node,
    runtime: Runtime,
  ) {
    const children = node.children;
    if (children[1].type !== 'token') {
      throw new Error('unexpected');
    }
    return callSub(node, runtime, 1);
  },

  async evaluate_argsCall(node: ArgsCall_Node, runtime: Runtime) {
    const args = [];
    const { children } = node;
    let lastArg = undefined;
    for (const c of children) {
      if (c.type === 'token' && c.text === ',') {
        args.push(lastArg);
        lastArg = undefined;
        continue;
      }
      lastArg = await evaluate(c, runtime);
    }
    if (children.length) {
      args.push(lastArg);
    }
    return args;
  },
});
