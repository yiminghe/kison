import { initMonaco, cachedParser, toJSON } from '../src/index';
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

const codeKey = 'curl-code';

require(['vs/editor/editor.main'], () => {
  function getEditorValue() {
    const v = editor.getModel()!.getValue();
    localStorage.setItem(codeKey, v);
    return v;
  }

  initMonaco({
    monaco,
  });

  const editorContainer = $('monaco-editor');
  editorContainer.innerHTML = '';
  editorContainer.style.height = '300px';

  let editor = monaco.editor.create(editorContainer, {
    value:
      localStorage.getItem(codeKey) ||
      `curl --data 'y=2' "www.tao\\
      .com" \\
       --data "x=1"`,
    language: 'lang-curl',
    theme: 'lang-curl-theme',
    minimap: {
      enabled: false,
    },
    autoClosingBrackets: 'always',
    lineNumbers: 'on',
    folding: false,
  });

  function getCurrentAst() {
    const value = getEditorValue();
    return { value, ret: getAst(value, {}) };
  }

  $('parse').addEventListener('click', () => {
    const ret = getCurrentAst().ret;
    if (ret.error) {
      console.log(ret.error.errorMessage);
    }
    console.log(ret);
  });

  $('toJSON').addEventListener('click', () => {
    const value = getEditorValue();
    console.log(toJSON(value));
  });
});
