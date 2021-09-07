import { functions } from "../functions/index.js";
import { makeError } from "../functions/utils.js";
import { evaluators } from "./evaluators.js";

Object.assign(evaluators, {
  evaluate_function(node, context) {
    const { children } = node;
    const fnName = children[0].text.toLowerCase();
    const fnDef = functions.get(fnName);
    if (!fnDef) {
      return makeError(`unimplemented function: ${fnName}`);
    }

    const argsNode = children[2].children || [];
    const argsLength = argsNode.length;
    if (fnDef.argumentLength) {
      if (argsLength !== fnDef.argumentLength) {
        return makeError("unmatched argument length: " + fnDef.argumentLength);
      }
    }

    if (fnDef.minArgumentLength) {
      if (argsLength < fnDef.minArgumentLength) {
        return makeError(
          "unmatched min argument length: " + fnDef.minArgumentLength
        );
      }
    }

    if (fnDef.maxArgumentLength) {
      if (argsLength < fnDef.maxArgumentLength) {
        return makeError(
          "unmatched max argument length: " + fnDef.maxArgumentLength
        );
      }
    }

    let argsValue = [];

    for (let i = 0; i < argsNode.length; i++) {
      const argNode = argsNode[i];
      if (argNode.token === "ARGUMENT_SEPARATOR") {
        continue;
      }
      const argValue = evaluators.evaluate(argNode, context);

      if (fnDef.interceptArgument) {
        const v = fnDef.interceptArgument(
          {
            value: argValue,
            index: i
          },
          argsNode
        );
        if (v) {
          return v;
        }
      }

      argsValue.push(argValue);

      if (argValue.type == "error" && !fnDef.allowErrorArgument) {
        return argValue;
      }
    }

    return fnDef.fn(argsValue, context);
  }
});
