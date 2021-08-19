import { getFunctionInfoFromPosition } from "../languages.js";
import { getAst } from "./utils.js";

export default class FormulaHoverProvider {
  provideHover(model, position) {
    let value = "";
    const ast = getAst(model.getValue());
    const info = getFunctionInfoFromPosition(ast, position);
    if (info.functionName) {
      value = `function: ${info.functionName}`;
    }
    if (info.argumentIndex) {
      value += `, argument index: ${info.argumentIndex}`;
    }
    return {
      contents: [
        // { value: '**函数**' },
        { value }
      ]
    };
  }
}
