import { getTokenByPosition } from './languageService';
import { getAst } from './cachedParser';
import type { languages } from 'monaco-editor';
import type * as Monaco from 'monaco-editor';
import { _curlLongOpts as curlLongOpts, curlShortOpts } from '../opts';

let s: any = [];

function insert(name: string, type: string) {
  return name + (type === 'string' ? ' "$0" ' : ' ');
}

function getS() {
  if (s.length) {
    return s;
  }
  let map: any = {};
  for (const c of Object.keys(curlLongOpts)) {
    const n = curlLongOpts[c]?.name;
    if (!n || map[n]) {
      continue;
    }
    map[n] = 1;
    const type = curlLongOpts[c]?.type || 'unknown';
    const name = '--' + n;
    s.push({
      label: name,
      detail: `${n}: ${type}`,
      documentation: `${n}: ${type}`,

      insertText: insert(name, type),
    });
  }

  for (const c of Object.keys(curlShortOpts)) {
    const longName = curlLongOpts[curlShortOpts[c]]?.name || c;
    const type = curlLongOpts[curlShortOpts[c]]?.type || 'unknown';
    const name = '-' + c;
    s.push({
      label: name,
      detail: `${longName}: ${type}`,
      documentation: `${longName}: ${type}`,
      insertText: insert(name, type),
    });
  }
  return s;
}

export function createCurlCompletionItemProvider(
  monaco: typeof Monaco,
): languages.CompletionItemProvider {
  return {
    triggerCharacters: ['-'],
    provideCompletionItems(model, position) {
      const parserRet = getAst(model.getValue());
      const { terminalNodes } = parserRet;
      const suggestions: languages.CompletionItem[] = [];
      const { token, first } = getTokenByPosition(terminalNodes, position);

      if (token && token.token === 'WORD') {
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: token.firstColumn,
          endColumn: token.lastColumn,
        };
        if (first) {
          suggestions.push({
            label: 'curl',
            kind: monaco.languages.CompletionItemKind['Function'],
            detail: `curl`,
            documentation: `curl`,
            insertText: 'curl',
            range,
          });
        } else if (token.text.startsWith('-')) {
          for (const item of getS()) {
            suggestions.push({
              ...item,
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              kind: monaco.languages.CompletionItemKind['Field'],
              range,
            });
          }
        }
      }

      return { suggestions };
    },
  };
}
