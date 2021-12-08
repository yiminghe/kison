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

function trimLine(s: string) {
  let start = 0;
  let end = s.length - 1;
  while (s[start] === ' ') {
    start++;
  }
  while (s[end] === ' ') {
    end--;
  }
  return s.slice(start, end + 1);
}

const moduleDefaultCode = `
sub test2 (ByVal msg As Integer, msg2 As Integer)
  debug.print msg
  call debug.print(msg2)
  msg = 11
  msg2 = 12
end sub

sub main
  dim m1 as Integer
  dim m2 as Integer
  m1 = 10
  test2 m1, m2
  test2 1, 2
  debug.print m1
  debug.print m2

  dim c as New MyClass
  debug.print c.m
  debug.print c.getM()
  c.setM(12)
  debug.print c.m
  c.x = 13
  debug.print c.x
  
  dim d as New js.Date
  debug.print d.date
  d.date = 10
  debug.print d.date

  msgbox "done"
end sub
`.trimStart();

const classDefaultCode = `
public m as Integer

sub Class_Initialize
debug.print VBA.FormShowConstants.vbModal
debug.print vbModal
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
`.trimStart();

const version = '2';

if (
  !localStorage.getItem('codeVersion') ||
  localStorage.getItem('codeVersion') !== version
) {
  localStorage.setItem('classCode', classDefaultCode);
  localStorage.setItem('moduleCode', moduleDefaultCode);
  localStorage.setItem('codeVersion', version);
}

const moduleSampleCode = localStorage.getItem('moduleCode')!;
const classSampleCode = localStorage.getItem('classCode')!;

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
    const code = editor.getModel()!.getValue().trimStart();
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
      if (name === 'debug.print') {
        console.log(ret.length > 1 ? ret : ret[0]);
      } else if (name === 'msgbox') {
        alert(ret.join(','));
      }
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
          context.registerSubBinding(LogSub('debug.print'));
          context.registerSubBinding(LogSub('msgbox'));
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
      alert(e.message);
    }
  });
});
