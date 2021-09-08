// @ts-check
import { getAst } from "../cachedParser.js";
import { getFunctionInfoFromPosition } from "../languageService.js";

const signatureHelpTriggerCharacters = ["(", ","];
const signatureHelpRetrieveCharacters = [")"];

export default function createFormulaSignatureHelpProvider() {
  return {
    signatureHelpTriggerCharacters,

    signatureHelpRetrieveCharacters,

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

      const parameterLength = Math.max(2, info.argumentIndex);

      for (let i = 1; i <= parameterLength + 1; i++) {
        let label = `argument${i}`;
        const parameter = {
          label,
          documentation: `argument${i} documentation`
        };
        signature.label += label;
        signature.parameters.push(parameter);
        signature.label += ", ";
      }

      signature.label += "...";
      signature.parameters.push({
        label: "..."
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
