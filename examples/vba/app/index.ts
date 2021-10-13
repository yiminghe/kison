import { parser, Runtime, SubDef } from '../src/index';
import type * as Manaco from 'monaco-editor';

declare var require: any;
declare var monacoBase: string;
declare var monaco: typeof Manaco;

require.config({
  paths: {
    vs: monacoBase,
  },
});

const $ = (v: string): any => document.getElementById(v)!;

const sampleCode = `
sub test
MsgBox 1
MsgBox 2
end sub
`.trim();

require(['vs/editor/editor.main'], () => {
  $('sub').value = 'test';
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

  function getCurrentCode() {
    return editor.getModel()!.getValue().trim();
  }

  function getCurrentAst() {
    const value = getCurrentCode();
    return { value, ret: parser.parse(value, {}) };
  }

  $('parse').addEventListener('click', () => {
    console.log(getCurrentAst().ret);
  });

  const MsgBoxSub: SubDef = {
    name: 'MsgBox',
    fn({ args }) {
      alert(args[0]?.value);
      return undefined;
    },
  };

  $('evaluate').addEventListener('click', () => {
    try {
      const runtime = new Runtime();
      runtime.registerSub(MsgBoxSub);
      runtime.run(getCurrentCode());
      runtime.callSub('test');
    } catch (e: any) {
      console.error(e);
    }
  });
});
