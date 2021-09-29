import { getTableNameByPosition, getTokenByPosition } from '../languageService';
import { getAst } from '../cachedParser';
import type { languages } from 'monaco-editor';
import type * as Monaco from 'monaco-editor';

const tableItems = [
  ['@', 'current row'],
  ['#All', 'all table data,headers,totals'],
  ['#Data', 'table data'],
  ['#Headers', 'table headers'],
  ['#Totals', 'table totals'],
];

export default function createFormulaCompletionItemProvider(
  monaco: typeof Monaco,
  getNames: (arg: { kind: string; table?: string }) => string[],
): languages.CompletionItemProvider {
  return {
    triggerCharacters: ['[', '@'],
    provideCompletionItems(model, position, context) {
      let kind = 'function';
      const parserRet = getAst(model.getValue());
      const { terminalNodes } = parserRet;
      const suggestions: languages.CompletionItem[] = [];
      const t = getTokenByPosition(terminalNodes, position);

      if (t && t.token === 'STRING') {
        return { suggestions };
      }

      let table;

      var word = model.getWordUntilPosition(position);
      let data;

      if (
        context.triggerCharacter === '[' ||
        context.triggerCharacter === '@'
      ) {
        table = getTableNameByPosition(terminalNodes, position);
        if (table) {
          kind = 'table column';
          data = getNames({
            table,
            kind,
          });
        } else {
          return;
        }
      }

      data = data || getNames({ kind });

      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      if (context.triggerCharacter === '[') {
        for (const item of tableItems) {
          suggestions.push({
            label: item[0],
            kind: monaco.languages.CompletionItemKind.Field,
            detail: item[1],
            documentation: `docs: ${item[1]}`,
            insertText: item[0],
            range,
          });
        }
      }

      for (const fnName of data) {
        suggestions.push({
          label: fnName,
          kind: monaco.languages.CompletionItemKind[
            table ? 'Field' : 'Function'
          ],
          detail: `${kind}: ${fnName}`,
          documentation: `docs: ${kind}: ${fnName}`,
          insertText: fnName,
          range,
        });
      }

      return { suggestions };
    },
  };
}
