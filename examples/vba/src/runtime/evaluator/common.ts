import { AstNode, AstSymbolNode } from '../../parserLLK';
import type { Context } from '../Context';
import { VBObject, VBValue } from '../types';
import { evaluate } from './evaluators';
import { transformToIndexType } from '../utils';

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
  let args: (VBValue | VBObject)[][] = [];
  for (const f of children) {
    if (f.type === 'symbol' && f.symbol === 'indexes') {
      args.push(await evaluate(f, context));
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

export async function callSubOrGetElementWithIndexesAndArgs(
  subName: string,
  indexes: (VBObject | VBValue)[][],
  context: Context,
) {
  const scope = context.getCurrentScope();

  function getElements(
    obj: VBObject | VBValue,
    indexes: (VBObject | VBValue)[][],
  ) {
    let ret = obj;
    for (const i of indexes) {
      const valueIndex = transformToIndexType(i);
      const value = ret.type === 'Object' ? ret.value : ret;
      if (
        value &&
        (value.type === 'Array' ||
          (value.type === 'Class' && value.subType === 'bind'))
      ) {
        ret = value.getElement(valueIndex);
      } else {
        throw new Error('unexpected index access!');
      }
    }
    return ret;
  }

  if (scope.hasVariable(subName)) {
    const variable = scope.getVariable(subName);
    if (variable.type === 'Namespace') {
      return variable;
    }
    return getElements(variable, indexes);
  } else {
    const args = indexes[0] || [];
    const value = await context.callSub(subName, args);
    return getElements(value, indexes.slice(1));
  }
}
