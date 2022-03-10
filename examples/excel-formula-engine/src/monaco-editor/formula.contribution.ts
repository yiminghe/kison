import createFormulaTokensProvider from './createFormulaTokensProvider';
import createFormulaCompletionItemProvider from './createFormulaCompletionItemProvider';
import createFormulaSignatureHelpProvider from './createFormulaSignatureHelpProvider';
import createFormulaHoverProvider from './createFormulaHoverProvider';
import { langId } from './utils';
import observe from './observe';
import type * as Monaco from 'monaco-editor';

let setupLanguaged = false;

interface InitOptions {
  monaco: typeof Monaco;
  getNames: (arg: { kind: string; table?: string }) => string[];
}

// https://tomassetti.me/writing-a-browser-based-editor-using-monaco-and-antlr/
export default function init({ monaco, getNames }: InitOptions) {
  if (!setupLanguaged) {
    const { editor, languages } = monaco;

    let themeName = langId + '-theme';

    editor.defineTheme(themeName, {
      base: 'vs',
      inherit: false,
      colors: {},
      rules: [
        {
          token: '$UNKNOWN',
          foreground: '#ff0000',
        },
        {
          token: 'REF_UNION_OPERATOR',
          foreground: '#808080',
        },
        {
          token: 'FUNCTION',
          foreground: '0000FF',
        },
        {
          token: 'TABLE_ITEM_SPECIFIER',
          foreground: '0451A5',
        },
        {
          token: 'TABLE_COLUMN_SPECIFIER',
          foreground: '4864AA',
        },
        {
          token: 'TABLE_NAME',
          foreground: 'AF00DB',
        },
        {
          token: 'NAME',
          foreground: '001188',
        },
        {
          token: 'NUMBER',
          foreground: '098658',
        },
        {
          token: 'STRING',
          foreground: 'A31515',
        },
      ].map((t) => {
        t.token = t.token + '.formula';
        return t;
      }),
    });

    languages.onLanguage(langId, () => {
      languages.setLanguageConfiguration(langId, {
        brackets: [
          ['{', '}'],
          ['[', ']'],
          ['(', ')'],
        ],
        autoClosingPairs: [
          {
            open: '{',
            close: '}',
          },
          {
            open: '[',
            close: ']',
          },
          {
            open: '(',
            close: ')',
          },
          {
            open: '"',
            close: '"',
            notIn: ['string'],
          },
          {
            open: "'",
            close: "'",
            notIn: ['string'],
          },
        ],
      });

      languages.setTokensProvider(langId, createFormulaTokensProvider());

      languages.registerCompletionItemProvider(
        langId,
        createFormulaCompletionItemProvider(monaco, getNames),
      );

      languages.registerSignatureHelpProvider(
        langId,
        createFormulaSignatureHelpProvider(),
      );

      languages.registerHoverProvider(langId, createFormulaHoverProvider());

      observe(monaco);
    });

    languages.register({
      id: langId,
    });

    setupLanguaged = true;
  }
}
