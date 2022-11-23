import { createCurlCompletionItemProvider } from './createCurlCompletionItemProvider';
// import createCurlSignatureHelpProvider from './createCurlSignatureHelpProvider';
import { createCurlHoverProvider } from './createCurlHoverProvider';
import observe from './observe';
import { createCurlTokensProvider } from './createCurlTokensProvider';
import { langId } from './utils';

import type * as Monaco from 'monaco-editor';

let setupLanguaged = false;

interface InitOptions {
  monaco: typeof Monaco;
}

// https://tomassetti.me/writing-a-browser-based-editor-using-monaco-and-antlr/
export function initMonaco({ monaco }: InitOptions) {
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
          token: 'FUNCTION',
          foreground: '#008080',
        },
        {
          token: 'NAME',
          foreground: '001188',
        },
        {
          token: 'STRING',
          foreground: 'A31515',
        },
      ].map((t) => {
        t.token = t.token + '.curl';
        return t;
      }),
    });

    languages.onLanguage(langId, () => {
      languages.setLanguageConfiguration(langId, {
        autoClosingPairs: [
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

      languages.setTokensProvider(langId, createCurlTokensProvider());

      languages.registerCompletionItemProvider(
        langId,
        createCurlCompletionItemProvider(monaco),
      );

      // languages.registerSignatureHelpProvider(
      //   langId,
      //   createCurlSignatureHelpProvider(),
      // );

      languages.registerHoverProvider(langId, createCurlHoverProvider());

      observe(monaco);
    });

    languages.register({
      id: langId,
    });

    setupLanguaged = true;
  }
}
