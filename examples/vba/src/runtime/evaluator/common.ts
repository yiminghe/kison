import type {
  ICS_B_ProcedureCall_Node,
  ECS_ProcedureCall_Node,
} from '../../parser';
import {
  AstNode,
  AstSymbolNode,
  ECS_MemberProcedureCall_Node,
  ICS_B_MemberProcedureCall_Node,
} from '../../parserLLK';
import { collectAmbiguousIdentifier } from '../collect/collectType';
import type { Context } from '../Context';
import { VBObject, VBValue } from '../types';
import { evaluate, registerEvaluators } from './evaluators';

export async function buildArgs({ children }: AstSymbolNode, context: Context) {
  let args: (VBValue | VBObject)[] = [];
  for (const f of children) {
    if (f.type === 'symbol' && f.symbol === 'argsCall') {
      args = await evaluate(f, context);
    }
  }
  return args;
}

export async function buildIndexes(
  { children }: { children: AstNode[] },
  context: Context,
) {
  let args: (VBValue | VBObject)[] = [];
  for (const f of children) {
    if (f.type === 'symbol' && f.symbol === 'indexes') {
      args = await evaluate(f, context);
    }
  }
  return args;
}

export function checkIndexesInterger(indexes: (VBObject | VBValue)[]) {
  const ret: number[] = [];
  for (const i of indexes) {
    let v: VBValue;
    if (i.type === 'Object') {
      v = i.value;
    } else {
      v = i;
    }
    if (v.type !== 'Integer') {
      return [];
    }
    ret.push(v.value);
  }
  return ret;
}
