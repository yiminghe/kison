import { initMonaco, cachedParser, evaluate, evaluators } from "../src/index.js";
import functionNames from "./functionNames.js";

const { getAst } = cachedParser;

// console.log(evaluators);

require.config({
  paths: {
    vs: monacoBase
  }
});

const $=(v)=>document.getElementById(v);

require(["vs/editor/editor.main"], function () {
  initMonaco({
    monaco,
    getNames({ kind, table }) {
      if (kind === "function") {
        return functionNames;
      }
      return [`${table}_column_1`, `${table}_column_2`];
    }
  });

  const editorContainer = $("monaco-editor");
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

  $("fix").addEventListener(
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
  );

  function getCurrentAst() {
    const value = editor
      .getModel()
      .getValue()
      .trim();
    return { value, ret: getAst(value) };
  }

  $("parse").addEventListener(
    "click",
    () => {
      console.log(getCurrentAst().ret);
    },
  );

  $('evaluateData').addEventListener('click',()=>{
    editor.getModel().setValue(`sum(1,2,3,{5;4})`);
  });

  $("evaluate").addEventListener(
    "click",
    () => {
    
      const { ret: { ast, error }, value } = getCurrentAst();
      if (error) {
        console.error('syntax error:',error);
      } else {
        const calValue = evaluate(ast, {
          // TODO
          getCellValues(reference) {
            return [];
          }
        });
        console.log(value, ' = ', calValue);
      }
    },
  );
});
