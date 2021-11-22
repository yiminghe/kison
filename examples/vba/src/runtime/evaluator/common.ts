import type { AstNode, AstSymbolNode } from '../../parser';
import type { Context } from '../Context';
import { NamespaceValue, VBNamespace, VBPointer, VBValue } from '../types';
import { evaluate } from './evaluators';
import { transformToIndexType } from '../utils';

export async function buildArgs({ children }: AstSymbolNode, context: Context) {
  let args: (VBValue | VBPointer)[] | undefined;
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
  let args: (VBValue | VBPointer)[][] = [];
  for (const f of children) {
    if (f.type === 'symbol' && f.symbol === 'indexes') {
      args.push(await evaluate(f, context));
    }
  }
  return args;
}

export async function callSubOrGetElementWithIndexesAndArgs(
  parent: VBValue | VBPointer | VBNamespace | undefined,
  subName: string,
  indexes: (VBPointer | VBValue)[][],
  context: Context,
) {
  const scope = context.getCurrentScopeInternal();

  async function getElements(
    obj: VBPointer | VBValue | VBNamespace | NamespaceValue,
    indexes: (VBPointer | VBValue)[][],
  ) {
    let ret = obj;
    for (const i of indexes) {
      const valueIndex = await transformToIndexType(i);
      const value = ret.type === 'Pointer' ? await ret.getValue() : ret;
      if (
        value &&
        (value.type === 'Array' ||
          (value.type === 'Class' && value.subType === 'bind'))
      ) {
        ret = await value.getElement(valueIndex);
      } else {
        throw new Error('unexpected index access!');
      }
    }
    return ret;
  }

  if (parent) {
    let v: VBPointer | VBValue | VBNamespace | NamespaceValue | undefined;
    if (subName) {
      if (parent.type === 'Namespace') {
        v = parent.get(subName);
      } else {
        const value = await getVBValue(parent);
        if (value.type === 'Class') {
          v = await value.get(subName);
          if (!v) {
            if (!indexes.length) {
              throw new Error('unexpected class function call!');
            }
            v = await value.callSub(subName, indexes[0]);
            indexes.shift();
          }
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
        v = await context.callSubBinderInternal(v, indexes[0]);
        indexes.shift();
      }
      return getElements(v, indexes);
    } else {
      return v;
    }
  }

  const isVariable = await scope.hasVariable(subName);
  if (isVariable) {
    const variable = await scope.getVariable(subName);
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
export async function getVBValue(
  v: VBPointer | VBValue,
): Promise<VBPointer | VBValue>;
export async function getVBValue(
  v: VBPointer | VBValue | undefined,
): Promise<VBPointer | VBValue | undefined> {
  if (!v) {
    return v;
  }
  if (v.type === 'Pointer') {
    return v.getValue();
  }
  return v;
}
