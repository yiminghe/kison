import FormulaTokensProvider from "./FormulaTokensProvider.js";

const langId = "lang-formula";

function setupLanguage(monaco) {
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
}

let setupLanguaged = false;

export default function init(monaco, editor) {
  if (!setupLanguaged) {
    monaco.languages.onLanguage(langId, () => {
      return setupLanguage(monaco);
    });
    monaco.languages.register({
      id: langId
    });
    setupLanguaged = true;
  }
}
