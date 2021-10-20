import type { ICS_B_ProcedureCall_Node, ArgsCall_Node } from '../../parser';
import type { Runtime } from '../runtime';
import { VBType } from '../types';
import { evaluators, evaluate } from './evaluators';

Object.assign(evaluators, {
  evaluate_subStmt() {
    return;
  },

  async evaluate_iCS_B_ProcedureCall(
    node: ICS_B_ProcedureCall_Node,
    runtime: Runtime,
  ) {
    const children = node.children;
    if (children[0].type !== 'token') {
      throw new Error('unexpected');
    }
    const subName = children[0].text;
    let args: VBType[] = [];
    for (const f of children) {
      if (f.type === 'symbol' && f.symbol === 'argsCall') {
        args = await evaluate(f, runtime);
      }
    }
    return await runtime.callSub(subName, args);
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
