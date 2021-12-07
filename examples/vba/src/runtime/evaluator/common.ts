import type { AstNode, AstSymbolNode } from '../../parser';
import type { Context } from '../Context';
import { NamespaceValue, VBNamespace, VBAny, VBValue } from '../types';
import { evaluate } from './evaluators';
import { transformToIndexType } from '../utils';
import { throwVBRuntimeError } from '../data-structure/VBError';
import { VBArguments } from '../data-structure/VBArguments';

export async function buildArgs({ children }: AstSymbolNode, context: Context) {
  let args: VBArguments | undefined;
  for (let i = 0; i < children.length; i++) {
    const f = children[i];
    if (f.type === 'token' && f.token === 'LPAREN') {
      let n = children[i + 1];
      if (n && n.type === 'token' && n.token === 'RPAREN') {
        args = new VBArguments(context);
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
  let args: VBAny[][] = [];
  for (const f of children) {
    if (f.type === 'symbol' && f.symbol === 'indexes') {
      args.push(await evaluate(f, context));
    }
  }
  return args;
}

export async function callSubOrGetElementWithIndexesAndArgs(
  parent: VBAny | VBNamespace | undefined,
  subName: string,
  indexes: VBAny[][],
  context: Context,
  args?: VBArguments,
) {
  const scope = context.getCurrentScopeInternal();

  async function getElements(
    obj: VBAny | VBNamespace | NamespaceValue,
    indexes: VBAny[][],
  ) {
    let ret = obj;
    for (const i of indexes) {
      const valueIndex = await transformToIndexType(context, i);
      const value = ret.type === 'Pointer' ? await ret.getValue() : ret;
      if (
        value &&
        (value.type === 'Array' ||
          (value.type === 'Class' && value.subType === 'bind'))
      ) {
        ret = await value.getElement(valueIndex);
      } else {
        throwVBRuntimeError(context, 'UNEXPECTED_ERROR', 'index access');
      }
    }
    return ret;
  }

  if (parent) {
    let v: VBAny | VBNamespace | NamespaceValue | undefined;
    if (subName) {
      if (parent.type === 'Namespace') {
        v = parent.get(subName);
      } else {
        const value = await getVBValue(parent);
        if (value.type === 'Class') {
          v = await value.get(subName);
          if (!v) {
            if (!indexes.length && !args) {
              args = new VBArguments(context);
            }
            if (args) {
              v = await value.callSub(subName, args);
            } else {
              v = await value.callSub(
                subName,
                new VBArguments(context, indexes[0]),
              );
              indexes.shift();
            }
          }
        }
      }
      if (!v) {
        throwVBRuntimeError(context, 'UNEXPECTED_ERROR', 'member access');
      }
    } else {
      v = parent;
    }
    if (indexes.length || args) {
      if (v.type === 'SubBinding') {
        if (args) {
          v = await context.callSubBindingInternal(v, args);
        } else {
          v = await context.callSubBindingInternal(
            v,
            new VBArguments(context, indexes[0]),
          );
          indexes.shift();
        }
      }
      return getElements(v, indexes);
    } else if (v.type === 'SubBinding') {
      return await context.callSubBindingInternal(v);
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
    let value;
    if (args) {
      value = await context.callSubInternal(subName, args);
    } else {
      value = await context.callSubInternal(
        subName,
        new VBArguments(context, indexes[0]),
      );
      indexes.shift();
    }
    return getElements(value, indexes);
  }
}
export async function getVBValue(v: VBAny): Promise<VBValue>;
export async function getVBValue(
  v: VBAny | undefined,
): Promise<VBValue | undefined> {
  if (!v) {
    return v;
  }
  while (v && v.type === 'Pointer') {
    v = await v.getValue();
  }
  return v;
}

export function createNumber(v: any, context: Context) {
  if (typeof v !== 'number') {
    throwVBRuntimeError(context, 'TYPE_MISMATCH');
  }
  if ((v | 0) !== v) {
    return context.createDouble(v);
  }
  return context.createInteger(v);
}

export async function plusValue(context: Context, left: VBAny, right: VBAny) {
  const leftV = await getVBValue(left);
  const rightV = await getVBValue(right);
  // @ts-ignore
  const v = leftV.value + rightV.value;
  return createNumber(v, context);
}

export async function minusValue(context: Context, left: VBAny, right: VBAny) {
  const leftV = await getVBValue(left);
  const rightV = await getVBValue(right);
  // @ts-ignore
  const v = leftV.value - rightV.value;
  return createNumber(v, context);
}
