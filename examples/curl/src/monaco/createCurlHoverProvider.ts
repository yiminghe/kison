import { getTokenByPosition } from './languageService';
import { getAst } from './cachedParser';
import type { languages } from 'monaco-editor';
import { _curlLongOpts as curlLongOpts, curlShortOpts } from '../opts';

export function createCurlHoverProvider(): languages.HoverProvider {
  return {
    provideHover(model, position) {
      const ast = getAst(model.getValue());
      const { token, first } = getTokenByPosition(ast.terminalNodes, position);
      let contents: { value: string }[] = [];
      if (token) {
        if (first) {
          contents.push({
            value: 'curl',
          });
        } else {
          const long = token.text.startsWith('--');
          const short = token.text.startsWith('-');
          const text = token.text.replace(/^--?/, '');
          if (long && curlLongOpts[text]) {
            contents.push({
              value: `${text}: ${curlLongOpts[text].type}`,
            });
          } else if (short && curlShortOpts[text]) {
            const longOpt = curlLongOpts[curlShortOpts[text]];
            if (longOpt) {
              contents.push({
                value: `${longOpt.name}: ${longOpt.type}`,
              });
            }
          }
        }
      }
      return {
        contents,
      };
    },
  };
}
