import { getAst } from "../cachedParser.js";
import { getFunctionInfoFromPosition } from "../languageService.js";

export default function createFormulaSignatureHelpProvider() {
  return {
    provideSignatureHelp(model, position) {
      const ast = getAst(model.getValue());
      const info = getFunctionInfoFromPosition(ast, position);

      if (!info.argumentIndex) {
        return;
      }

      const ret = {
        activeSignature: 0,
        activeParameter: info.argumentIndex - 1,
        signatures: []
      };

      const signature = {
        label: `${info.functionName}(`,
        documentation: `${info.functionName} documentation`,
        parameters: []
      };

      [1, 2, 3, 4].forEach(p => {
        const label = `argument ${p} label`;
        const parameter = {
          label: label,
          documentation: `argument ${p} documentation`
        };
        signature.label += label;
        signature.parameters.push(parameter);
        signature.label += ", ";
      });

      signature.label += ")";
      ret.signatures.push(signature);

      return {
        value: ret,
        dispose() {}
      };
    }
  };
}
