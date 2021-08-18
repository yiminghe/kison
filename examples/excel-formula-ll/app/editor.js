import initMonacoEditor from "../src/monaco-editor/formula.contribution.js";

require.config({
  paths: {
    vs: monacoBase
  }
});

require(["vs/editor/editor.main"], function() {
  let langId = "lang-formula";
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
        token: "CELL",
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

  var editor = monaco.editor.create(document.getElementById("monaco-editor"), {
    value: ['IF(C7 < E7, MIN(ABS(E7 - C7), D7, 0), "OK")'].join("\n"),
    language: langId,
    theme: themeName,
    minimap: {
      enabled: false
    },
    autoClosingBrackets: true,
    lineNumbers: false,
    folding: false
  });

  initMonacoEditor(monaco, editor);
});
