import type {
  ICS_B_ProcedureCall_Node,
  ArgsCall_Node,
  SubStmt_Node,
} from '../../parser';
import type { Runtime } from '../runtime';

import { evaluators, evaluate } from './evaluators';

Object.assign(evaluators, {
  evaluate_subStmt(node: SubStmt_Node, runtime: Runtime) {
    let id;
    for (const c of node.children) {
      if (!id) {
        if (c.type === 'token' && c.token === 'IDENTIFIER') {
          id = c.text;
          runtime.registerSubDeclare(id, node);
          return;
        }
      }
    }
  },

  evaluate_iCS_B_ProcedureCall(
    node: ICS_B_ProcedureCall_Node,
    runtime: Runtime,
  ) {
    const children = node.children;
    if (children[0].type !== 'token') {
      throw new Error('unexpected');
    }
    const subName = children[0].text;
    let args = [];
    for (const f of children) {
      if (f.type === 'symbol' && f.symbol === 'argsCall') {
        args = evaluate(f, runtime);
      }
    }
    return runtime.callSub(subName, args);
  },

  evaluate_argsCall(node: ArgsCall_Node, runtime: Runtime) {
    const args = [];
    const { children } = node;
    let lastArg = undefined;
    for (const c of children) {
      if (c.type === 'token' && c.text === ',') {
        args.push(lastArg);
        lastArg = undefined;
        continue;
      }
      lastArg = evaluate(c, runtime);
    }
    if (children.length) {
      args.push(lastArg);
    }
    return args;
  },
});
