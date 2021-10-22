import { parser, Context } from '../src/index';
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
sub test2 (ByVal msg As Integer, msg2 As Integer)
  MsgBox msg
  call MsgBox(msg2)
  msg = 11
  msg2 = 12
end sub

sub main
  dim m1 as Integer
  dim m2 as Integer
  m1 = 10
  test2 m1, m2
  test2 1, 2
  MsgBox m1
  MsgBox m2
end sub
`.trim();

require(['vs/editor/editor.main'], () => {
  $('sub').value = 'main';
  const editorContainer = $('monaco-editor');
  editorContainer.innerHTML = '';
  editorContainer.style.height = '400px';

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
  $('lex').addEventListener('click', () => {
    const value = getCurrentCode();
    console.log(parser.lex(value));
  });
  $('parse').addEventListener('click', () => {
    const { ret } = getCurrentAst();
    console.log(ret);
    if (ret.error) {
      console.error(ret.error.errorMessage);
    }
  });

  // function wait(ms: number) {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, ms);
  //   });
  // }

  const MsgBoxSub = {
    name: 'MsgBox',
    argumentsInfo: [
      {
        name: 'msg',
      },
    ],
    async fn(context: Context) {
      console.log(
        'Call MsgBox: ',
        context.getCurrentScope().getVariable('msg')?.value.value,
      );
      return undefined;
    },
  };

  $('evaluate').addEventListener('click', () => {
    try {
      const context = new Context();
      context.registerSubBinder(MsgBoxSub);
      context.run(getCurrentCode());
      context.callSub($('sub').value);
    } catch (e: any) {
      console.error(e);
    }
  });
});
