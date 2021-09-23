// @ts-check
import { getAst } from '../cachedParser';
import { getFunctionInfoFromPosition } from '../languageService';
import type { languages } from 'monaco-editor';

const signatureHelpTriggerCharacters = ['(', ','];
const signatureHelpRetriggerCharacters = [')'];

export default function createFormulaSignatureHelpProvider(): languages.SignatureHelpProvider {
  return {
    signatureHelpTriggerCharacters,

    signatureHelpRetriggerCharacters,

    provideSignatureHelp(model, position) {
      const ast = getAst(model.getValue());
      const info = getFunctionInfoFromPosition(ast, position);

      if (!info.argumentIndex) {
        return;
      }

      const signatureHelp: languages.SignatureHelp = {
        activeSignature: 0,
        activeParameter: info.argumentIndex - 1,
        signatures: [],
      };

      const signature: languages.SignatureInformation = {
        label: `${info.functionName}(`,
        documentation: `${info.functionName} documentation`,
        parameters: [],
      };

      const parameterLength = Math.max(2, info.argumentIndex);

      for (let i = 1; i <= parameterLength + 1; i++) {
        let label = `argument${i}`;
        const parameter: languages.ParameterInformation = {
          label,
          documentation: `argument${i} documentation`,
        };
        signature.label += label;
        signature.parameters.push(parameter);
        signature.label += ', ';
      }

      signature.label += '...';
      signature.parameters.push({
        label: '...',
      });
      signature.label += ')';
      signatureHelp.signatures.push(signature);

      return {
        value: signatureHelp,
        dispose() {},
      };
    },
  };
}
