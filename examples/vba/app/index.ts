import { parser } from '../src/index';
import type * as Manaco from 'monaco-editor';

declare var require: any;
declare var monacoBase: string;
declare var monaco: typeof Manaco;

require.config({
  paths: {
    vs: monacoBase,
  },
});

const $ = (v: string) => document.getElementById(v)!;

const sampleCode = `
sub test
MsgBox 1
end sub
`.trim();

require(['vs/editor/editor.main'], () => {
  const editorContainer = $('monaco-editor');
  editorContainer.innerHTML = '';
  editorContainer.style.height = '100px';

  let editor = monaco.editor.create(editorContainer, {
    model: null,
  });

  var oldModel = editor.getModel();
  var newModel = monaco.editor.createModel(sampleCode, 'vb');
  editor.setModel(newModel);
  if (oldModel) {
    oldModel.dispose();
  }

  function getCurrentAst() {
    const value = editor.getModel()!.getValue().trim();
    return { value, ret: parser.parse(value, {}) };
  }

  $('parse').addEventListener('click', () => {
    console.log(getCurrentAst().ret);
  });

  $('evaluate').addEventListener('click', () => {
    const {
      ret: { ast, error },
      value,
    } = getCurrentAst();
    if (error) {
      console.error('syntax error:', error);
    } else {
      console.log('TODO!');
    }
  });
});
