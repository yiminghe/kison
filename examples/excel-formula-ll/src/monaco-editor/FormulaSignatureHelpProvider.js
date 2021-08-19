import { getAst } from "./utils.js";
import { getFunctionInfoFromPosition } from "../languages.js";

export default class FormulaSignatureHelpProvider {
  constructor() {
    this.signatureHelpTriggerCharacters = ["(", ","];
    this.signatureHelpRetrieveCharacters = [")"];
  }

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
}
