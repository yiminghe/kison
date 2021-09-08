// @ts-check
import { getFunctionInfoFromPosition } from "../languageService.js";
import { getAst } from "../cachedParser.js";

export default function createFormulaHoverProvider() {
  return {
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
        contents: [{ value }]
      };
    }
  };
}
