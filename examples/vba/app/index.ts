import {
  parser,
  Context,
  VariableBinder,
  VBInteger,
  SubBinder,
  VBObject,
} from '../src/index';
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

const moduleSampleCode =
  localStorage.getItem('moduleCode') ||
  `
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

  dim c as New MyClass
  console.log c.m
end sub
`.trim();

const classSampleCode =
  localStorage.getItem('classCode') ||
  `
public m as Integer

sub Class_Initialize
msgbox VBA.FormShowConstants.vbModal
msgbox vbModal
m = 2
end sub
`.trim();

require(['vs/editor/editor.main'], () => {
  $('sub').value = 'main';
  const editorContainer = $('monaco-editor');
  Object.assign(editorContainer.style, { display: 'flex', height: '430px' });
  editorContainer.innerHTML = `
  <div  style="flex:1;flex-direction:column;display:flex;">
  <p>module: </p>
  <div id='module-editor' style="flex:1">
  </div>
  </div>
  <div style="flex:1;flex-direction:column;display:flex;">
  <p>MyClass: </p>
  <div id='class-editor' style="flex:1">
  </div>
  </div>
  `;

  const moduleEditorNode = $('module-editor');
  const classEditorNode = $('class-editor');

  let classEditor = monaco.editor.create(classEditorNode, {
    model: null,
  });
  let moduleEditor = monaco.editor.create(moduleEditorNode, {
    model: null,
  });

  {
    var oldModel = moduleEditor.getModel();
    var newModel = monaco.editor.createModel(moduleSampleCode, 'vb');
    moduleEditor.setModel(newModel);
    if (oldModel) {
      oldModel.dispose();
    }
  }
  {
    var oldModel = classEditor.getModel();
    var newModel = monaco.editor.createModel(classSampleCode, 'vb');
    classEditor.setModel(newModel);
    if (oldModel) {
      oldModel.dispose();
    }
  }

  function getCurrentCode(
    editor: Manaco.editor.IStandaloneCodeEditor = moduleEditor,
    type: 'moduleCode' | 'classCode' = 'moduleCode',
  ) {
    const code = editor.getModel()!.getValue().trim();
    localStorage.setItem(type, code);
    return code;
  }

  function getAllCodes() {
    const moduleCode = getCurrentCode();
    const classCode = getCurrentCode(classEditor, 'classCode');
    return {
      classCode,
      moduleCode,
    };
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
    let start = Date.now();
    const { ret } = getCurrentAst();
    console.log(ret);
    if (ret.error) {
      console.error(ret.error.errorMessage);
    }
    console.log('parse duration: ' + (Date.now() - start));
    console.log('');
    console.log('');
  });

  // function wait(ms: number) {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, ms);
  //   });
  // }

  const MsgBoxSub: (name: string) => SubBinder = (name: string) => ({
    name,
    argumentsInfo: [
      {
        name: 'msg',
      },
      {
        name: 'msg2',
      },
    ],
    async value(context) {
      console.log(
        `Call ${name}: `,
        context.getCurrentScope().getVariable('msg')?.value.value,
        context.getCurrentScope().getVariable('msg2')?.value.value || '',
      );
      // await wait(100);
      return undefined;
    },
  });

  const vbModal: VariableBinder = {
    name: 'vbModal',
    value: new VBInteger(1),
  };

  $('evaluate').addEventListener('click', async () => {
    try {
      const context = new Context();

      context.registerSubBinder(MsgBoxSub('MsgBox'));
      context.registerSubBinder(MsgBoxSub('console.log'));

      context.registerVariableBinder(vbModal);
      context.registerVariableBinder({
        ...vbModal,
        name: 'VBA.FormShowConstants.' + vbModal.name,
      });

      const { classCode, moduleCode } = getAllCodes();
      let start = Date.now();
      await context.load(classCode, {
        id: 'MyClass',
        name: 'MyClass',
        type: 'class',
      });
      await context.load(moduleCode, {
        id: 'module',
        name: 'module',
        type: 'module',
      });
      console.log('parse duration: ' + (Date.now() - start));
      console.log('');
      console.log('');
      start = Date.now();
      await context.callSub($('sub').value);
      console.log('');
      console.log('');
      console.log('run duration: ' + (Date.now() - start));
    } catch (e: any) {
      console.error(e);
    }
  });
});
