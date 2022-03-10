import { getFunctionInfoFromPosition } from '../languageService';
import { getAst } from '../cachedParser';
import type { languages } from 'monaco-editor';

export default function createFormulaHoverProvider(): languages.HoverProvider {
  return {
    provideHover(model, position) {
      let value = '';
      const ast = getAst(model.getValue());
      const info = getFunctionInfoFromPosition(ast, position);
      if (info.functionName) {
        value = `function: ${info.functionName}`;
      }
      if (info.argumentIndex) {
        value += `, argument index: ${info.argumentIndex}`;
      }
      return {
        contents: [{ value }],
      };
    },
  };
}
