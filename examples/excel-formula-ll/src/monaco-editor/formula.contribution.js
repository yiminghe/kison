import FormulaTokensProvider from "./FormulaTokensProvider.js";
import FormulaCompletionItemProvider from "./FormulaCompletionItemProvider.js";
import FormulaSignatureHelpProvider from "./FormulaSignatureHelpProvider.js";
import FormulaHoverProvider from "./FormulaHoverProvider.js";
import { langId } from "./utils.js";
import InspectModel from "./InspectModel.js";

let setupLanguaged = false;

export default function init({ monaco, editor, functionNames }) {
  if (!setupLanguaged) {
    let themeName = langId + "-theme";

    monaco.editor.defineTheme(themeName, {
      base: "vs",
      inherit: false,
      rules: [
        {
          token: "FUNCTION",
          foreground: "0000FF"
        },
        {
          token: "NAME",
          foreground: "001188"
        },
        {
          token: "NUMBER",
          foreground: "09885A"
        },
        {
          token: "STRING",
          foreground: "A31515"
        }
      ]
    });

    monaco.languages.onLanguage(langId, () => {
      monaco.languages.setLanguageConfiguration(langId, {
        brackets: [
          ["{", "}"],
          ["[", "]"],
          ["(", ")"]
        ],
        autoClosingPairs: [
          {
            open: "{",
            close: "}"
          },
          {
            open: "[",
            close: "]"
          },
          {
            open: "(",
            close: ")"
          },
          {
            open: '"',
            close: '"',
            notIn: ["string"]
          },
          {
            open: "'",
            close: "'",
            notIn: ["string"]
          }
        ]
      });

      monaco.languages.setTokensProvider(langId, new FormulaTokensProvider());
      monaco.languages.registerCompletionItemProvider(
        langId,
        new FormulaCompletionItemProvider(functionNames)
      );
      monaco.languages.registerSignatureHelpProvider(
        langId,
        new FormulaSignatureHelpProvider()
      );
      monaco.languages.registerHoverProvider(
        langId,
        new FormulaHoverProvider()
      );

      new InspectModel(monaco);
    });
    monaco.languages.register({
      id: langId
    });
    setupLanguaged = true;
  }
}
