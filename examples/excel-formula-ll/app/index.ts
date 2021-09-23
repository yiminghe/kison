
import { initMonaco, cachedParser, evaluate } from '../src/index';
import functionNames from './functionNames';
import { getCellData, getCellValuesByRange } from './getCellData';
import type * as Manaco from 'monaco-editor';

const { getAst } = cachedParser;

// console.log(evaluators);

declare var require: any;
declare var monacoBase: string;
declare var monaco: typeof Manaco;

require.config({
  paths: {
    vs: monacoBase,
  },
});

const $ = (v: string) => document.getElementById(v)!;


// @ts-ignore
$('cells').value = $('cells')
  // @ts-ignore
  .value.trim()
  .replace(/\n\s+/g, '\n');
$('cells').style.height = '200px';
$('cells').style.width = '500px';
$('cells').style.display = 'block';


require(['vs/editor/editor.main'], () => {
  initMonaco({
    monaco,
    getNames({ kind, table }) {
      if (kind === 'function') {
        return functionNames;
      }
      return [`${table}_column_1`, `${table}_column_2`];
    },
  });

  const editorContainer = $('monaco-editor');
  editorContainer.innerHTML = '';
  editorContainer.style.height = '100px';

  let editor = monaco.editor.create(editorContainer, {
    value: 'sum(A1:B2, 10, "OK", namedRange) + \n avg(A1:A3 \n',
    language: 'lang-formula',
    theme: 'lang-formula-theme',
    minimap: {
      enabled: false,
    },
    autoClosingBrackets: 'always',
    lineNumbers: 'on',
    folding: false,
  });

  $('fix').addEventListener('click', () => {
    let fixed = false;
    const value = editor.getModel()!.getValue().trim();
    const { recoveryTokens } = getAst(value, {
      onErrorRecovery({ errorNode }, { action }) {
        if (action === 'add') {
          let token = ')';
          const {
            parent: { symbol },
            error: { expected },
          } = errorNode;
          const hasToken = expected.indexOf(token) !== -1;
          if ((symbol === 'arguments' || symbol === 'function') && hasToken) {
            fixed = true;
            return {
              action,
              token,
              text: token,
            };
          }
        }
      },
    });
    if (fixed) {
      const val = recoveryTokens
        .map((t) => (t.token === 'STRING' ? `"${t.text}"` : t.text))
        .join('');
      console.log('`' + value + '` will fixed to `' + val + '`');
      editor.getModel()!.setValue(val);
    }
  });

  function getCurrentAst() {
    const value = editor.getModel()!.getValue().trim();
    return { value, ret: getAst(value, {}) };
  }

  $('parse').addEventListener('click', () => {
    console.log(getCurrentAst().ret);
  });

  $('evaluateData').addEventListener('click', () => {
    editor.getModel()!.setValue(`sum(1,2,A1:B2,{5;4}+{1,2})`);
  });

  $('evaluate').addEventListener('click', () => {
    const {
      ret: { ast, error },
      value,
    } = getCurrentAst();
    if (error) {
      console.error('syntax error:', error);
    } else {
      // @ts-ignore
      const cells = getCellData($('cells').value);
      console.log('cells data: ', cells);
      const calValue = evaluate(ast, {
        getCellValues(reference) {
          return getCellValuesByRange(cells, reference.value);
        },
      });
      console.log(value, ' = ', calValue);
    }
  });
});
