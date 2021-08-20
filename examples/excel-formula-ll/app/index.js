import initMonaco from "../src/monaco-editor/formula.contribution.js";
import functionNames from "./functionNames.js";
import { getAst } from "../src/cachedParser.js";

require.config({
  paths: {
    vs: monacoBase
  }
});

require(["vs/editor/editor.main"], function() {
  initMonaco({ monaco, functionNames });

  const editorContainer = document.getElementById("monaco-editor");
  editorContainer.innerHTML = "";
  editorContainer.style.height = "200px";

  var editor = monaco.editor.create(editorContainer, {
    value: 'sum(A1:B2, 10, "OK", namedRange) + \n avg(A1:A3 \n\n\n\n\n\n',
    language: "lang-formula",
    theme: "lang-formula-theme",
    minimap: {
      enabled: false
    },
    autoClosingBrackets: true,
    lineNumbers: true,
    folding: false
  });

  document.getElementById("fix").addEventListener(
    "click",
    () => {
      let fixed = false;
      const value = editor
        .getModel()
        .getValue()
        .trim();
      const { recoveryTokens } = getAst(value, {
        onErrorRecovery({ errorNode }, { action }) {
          if (action === "add") {
            let token = ")";
            const {
              parent: { symbol },
              error: { expected }
            } = errorNode;
            const hasToken = expected.indexOf(token) !== -1;
            if ((symbol === "arguments" || symbol === "function") && hasToken) {
              fixed = true;
              return {
                action,
                token,
                text: token
              };
            }
          }
        }
      });
      if (fixed) {
        const val = recoveryTokens
          .map(t => (t.token === "STRING" ? `"${t.text}"` : t.text))
          .join("");
        console.log("`" + value + "` will fixed to `" + val + "`");
        editor.getModel().setValue(val);
      }
    },
    false
  );

  document.getElementById("parse").addEventListener(
    "click",
    () => {
      const value = editor
        .getModel()
        .getValue()
        .trim();
      console.log(getAst(value));
    },
    false
  );

  document.getElementById("evaluate").addEventListener(
    "click",
    () => {
      console.log("TODO");
    },
    false
  );
});
