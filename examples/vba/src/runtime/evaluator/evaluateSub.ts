import type {
  ICS_B_ProcedureCall_Node,
  ECS_ProcedureCall_Node,
} from '../../parser';
import { AstNode, AstSymbolNode } from '../../parserLLK';
import { collect_IDENTIFIER } from '../collect/collectType';
import type { Context } from '../Context';
import { VBObject, VBValue } from '../types';
import { evaluate, registerEvaluators } from './evaluators';

async function buildArgs({ children }: AstSymbolNode, context: Context) {
  let args: (VBValue | VBObject)[] = [];
  for (const f of children) {
    if (f.type === 'symbol' && f.symbol === 'argsCall') {
      args = await evaluate(f, context);
    }
  }
  return args;
}

async function callSub(
  node: ICS_B_ProcedureCall_Node | ECS_ProcedureCall_Node,
  context: Context,
  tokenIndex: number,
) {
  const { children } = node;
  const token = children[tokenIndex];
  if (token.type !== 'token') {
    throw new Error('unexpected');
  }
  const subName = token.text;
  let args: (VBValue | VBObject)[] = await buildArgs(node, context);
  return await context.callSub(subName, args);
}

registerEvaluators({
  evaluate_subStmt() {
    return;
  },

  evaluate_functionStmt() {
    return;
  },

  async evaluate_iCS_B_MemberProcedureCall(node, context) {
    const { children } = node;
    let v: VBObject | undefined;
    if (
      children[0].type === 'symbol' &&
      children[0].symbol === 'implicitCallStmt_InStmt'
    ) {
      v = await evaluate(children[0], context);
    }
    if (!v) {
      throw new Error('TODO with!');
    }
    let args: (VBValue | VBObject)[] = await buildArgs(node, context);
    const id = collect_IDENTIFIER(node, true)!;
    if (v.value.type === 'Class') {
      return v.value.callSub(id, args);
    } else if (v.value.type === 'Namespace') {
      const subBinder = v.value.get(id)?.value;
      if (!subBinder || subBinder.type !== 'subBinder') {
        throw new Error('can not find sub!');
      }
      return context.callSubBinder(subBinder, args);
    }
    throw new Error('invalid member access!');
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
