import { AstNode, AstSymbolNode } from '../../parserLLK';
import type { Context } from '../Context';
import {
  VBClass,
  BinderValue,
  VBNamespaceBinder,
  VBObject,
  VBValue,
  ExitResult,
} from '../types';
import { evaluate } from './evaluators';
import { transformToIndexType } from '../utils';

export async function buildArgs({ children }: AstSymbolNode, context: Context) {
  let args: (VBValue | VBObject)[] | undefined;
  for (let i = 0; i < children.length; i++) {
    const f = children[i];
    if (f.type === 'token' && f.token === 'LPAREN') {
      let n = children[i + 1];
      if (n && n.type === 'token' && n.token === 'RPAREN') {
        args = [];
      }
    } else if (f.type === 'symbol' && f.symbol === 'argsCall') {
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
  parent: VBValue | VBObject | VBNamespaceBinder | undefined,
  subName: string,
  indexes: (VBObject | VBValue)[][],
  context: Context,
) {
  const scope = context.getCurrentScope();

  function getElements(
    obj: VBObject | VBValue | VBNamespaceBinder | BinderValue,
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

  if (parent) {
    let v:
      | VBObject
      | VBValue
      | VBNamespaceBinder
      | BinderValue
      | ExitResult
      | undefined;
    if (subName) {
      if (parent.type === 'Namespace') {
        v = parent.get(subName);
      } else {
        const value = getVBValue(parent);
        if (value.type === 'Class') {
          v = value.get(subName);
        }
      }
      if (!v) {
        throw new Error('unexpected member access!');
      }
    } else {
      v = parent;
    }
    if (indexes.length) {
      if (v.type === 'SubBinder') {
        v = await context.callSubBinder(v, indexes[0]);
        indexes.shift();
      }
      if (v?.type === 'Exit') {
        return v;
      }
      return getElements(v, indexes);
    } else {
      return v;
    }
  }

  if (scope.hasVariable(subName)) {
    const variable = scope.getVariable(subName);
    if (variable.type === 'Namespace') {
      return variable;
    }
    return getElements(variable, indexes);
  } else {
    const args = indexes[0] || [];
    const value = await context.callSubInternal(subName, args);
    return getElements(value, indexes.slice(1));
  }
}
export function getVBValue(v: VBObject | VBValue): VBObject | VBValue;
export function getVBValue(
  v: VBObject | VBValue | undefined,
): VBObject | VBValue | undefined {
  if (!v) {
    return v;
  }
  if (v.type === 'Object') {
    return v.value;
  }
  return v;
}
