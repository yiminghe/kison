import { functions } from '../functions/index';

import { makeError, NAME_ERROR } from '../functions/utils';

import type { FunctionSmt_Node, Exp_Node } from '../parser';

import { evaluators, evaluate } from './evaluators';

import type { Context, All_Type } from './types';

Object.assign(evaluators, {
  evaluate_functionExp(node: FunctionSmt_Node, context: Context) {
    const { children } = node;
    const fnName = children[0].text.toLowerCase();
    const fnDef = functions.get(fnName);
    if (!fnDef) {
      return makeError(`unimplemented function: ${fnName}`, NAME_ERROR);
    }

    let argsChildren = children[2].children || [];
    let argsNode: Array<Exp_Node | null> = [];
    let currentArg: Exp_Node | null = null;

    for (const a of argsChildren) {
      if (a.type === 'token' && a.token === 'ARGUMENT_SEPARATOR') {
        argsNode.push(currentArg);
        currentArg = null;
      } else if (a.type == 'symbol') {
        currentArg = a;
      }
    }

    argsNode.push(currentArg);

    const argsLength = argsNode.length;

    if (fnDef.argumentLength) {
      if (argsLength !== fnDef.argumentLength) {
        return makeError('unmatched argument length: ' + fnDef.argumentLength);
      }
    }

    if (fnDef.minArgumentLength) {
      if (argsLength < fnDef.minArgumentLength) {
        return makeError(
          'unmatched min argument length: ' + fnDef.minArgumentLength,
        );
      }
    }

    if (fnDef.maxArgumentLength) {
      if (argsLength < fnDef.maxArgumentLength) {
        return makeError(
          'unmatched max argument length: ' + fnDef.maxArgumentLength,
        );
      }
    }

    let argsValue: (All_Type | null)[] = [];

    for (let i = 0; i < argsNode.length; i++) {
      const argNode = argsNode[i];

      const argValue = argNode && evaluate(argNode, context);

      if (fnDef.interceptArgument) {
        const v = fnDef.interceptArgument(
          {
            value: argValue,
            index: i,
          },
          argsNode,
        );
        if (v !== undefined) {
          return v.value;
        }
      }

      argsValue.push(argValue);

      if (argValue?.type == 'error' && !fnDef.allowErrorArgument) {
        return argValue;
      }
    }

    return fnDef.fn(argsValue, context);
  },
});
