import { parser, SubBinding, VBArray } from '../src/index';
import type * as Manaco from 'monaco-editor';
import { runs2 } from '../tests/utils';

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
  debug.print c.m
  msgbox c.getM()
  c.setM(12)
  msgbox c.m
  c.x = 13
  msgbox c.x
  
  dim d as New js.Date
  debug.print d.date
  d.date = 10
  debug.print d.date
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

function getM
  getM=m
end function

sub setM(v)
  m=v
end sub

Property Get x()
  x = m
End Property

Property Let x(value)
  m = value
End Property
`.trim();

require(['vs/editor/editor.main'], () => {
  $('sub').value = 'main';
  const editorContainer = $('monaco-editor');
  Object.assign(editorContainer.style, { display: 'flex', height: '430px' });
  editorContainer.innerHTML = `
  <div  style="flex:1;flex-direction:column;display:flex;">
  <p>module m1: </p>
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
    let start = Date.now();
    const ret = { value, ret: parser.parse(value, {}) };
    console.log(ret.ret);
    if (ret.ret.error) {
      console.error(ret.ret.error.errorMessage);
    }
    console.log('parse duration: ' + (Date.now() - start));
    console.log('');
    return ret;
  }
  $('resetCode').addEventListener('click', () => {
    localStorage.clear();
    location.reload();
  });
  $('lex').addEventListener('click', () => {
    const value = getCurrentCode();
    console.log(parser.lex(value));
  });
  $('parse').addEventListener('click', () => {
    getCurrentAst();
  });

  $('stmt').addEventListener('click', () => {
    const { ret } = getCurrentAst();
    const { ast } = ret;
    const { children } = ast;
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'moduleBody') {
        for (const c2 of c.children[0].children[0].children) {
          if (c2.type === 'symbol' && c2.symbol === 'block') {
            console.log(c2.children[0].children[0].children);
          }
        }
      }
    }
  });

  const Debugger: SubBinding = {
    name: 'debugger',
    async value(args, context) {
      debugger;
    },
  };

  const LogSub: (name: string) => SubBinding = (name) => ({
    name,
    argumentsInfo: [
      {
        name: 'msg',
        paramArray: true,
      },
    ],
    async value(args) {
      const ret = [];
      const msgs = (await args.getValue('msg')) as unknown as VBArray;
      for (let i = 0; i <= msgs.jsUBound(); i++) {
        ret.push((await (await msgs.getElement([i])).getValue()).value);
      }
      console.log(`call ${name}:`, ret);
    },
  });

  let called = false;

  $('evaluate').addEventListener('click', async function evaluate() {
    try {
      const { classCode, moduleCode } = getAllCodes();
      let start = Date.now();
      await runs2(
        $('sub').value,
        [moduleCode],
        [
          {
            id: 'MyClass',
            name: 'MyClass',
            type: 'class',
            code: classCode,
          },
        ],
        (context) => {
          if (called) {
            return;
          }
          called = true;
          context.registerSubBinding(LogSub('msgbox'));
          context.registerSubBinding(LogSub('debug.print'));
          context.registerSubBinding(Debugger);
        },
        {
          reuseContext: true,
        },
      );
      console.log('');
      console.log('run duration: ' + (Date.now() - start));
    } catch (e: any) {
      console.error(e);
      console.error(e.message);
    }
  });
});
