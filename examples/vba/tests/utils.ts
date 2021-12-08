import {
  Context,
  SubBinding,
  ClassBinding,
  VariableBinding,
  CallOptions,
  VBArray,
} from '../src/index';
import type { VBFile } from '../src/runtime/types';

function upperFirst(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const vbModal: VariableBinding = {
  name: 'vbModal',
  value: Context.createInteger(1),
};

const JSDateBinding: ClassBinding = {
  name: 'js.Date',
  async value() {
    const d: any = new Date();
    return {
      async get(name) {
        const v = d[`get${upperFirst(name)}`]();
        if (typeof v === 'string') {
          return Context.createString(v);
        } else if (typeof v === 'number') {
          return Context.createInteger(v);
        }
        throw new Error('only allow string/number return type');
      },
      async set(name, value) {
        let v = value.value;
        d[`set${upperFirst(name)}`](v);
      },
    };
  },
};

const ExcelRange: ClassBinding = {
  name: 'excel.Range',
  async value() {
    const d = [Context.createInteger(1), Context.createInteger(2)];
    return {
      async get(name) {
        throw new Error('only allow index access');
      },
      async set(name, value) {
        throw new Error('only allow index access');
      },
      async getElement(indexes) {
        const index: number = parseInt(indexes[0] + '', 10);
        return d[index];
      },
      async setElement(indexes, value) {
        const index: number = parseInt(indexes[0] + '', 10);
        if (value.type === 'integer') d[index] = value;
      },
    };
  },
};

const createRange: SubBinding = {
  name: 'createRange',
  async value(args, context) {
    return context.createObject('excel.Range');
  },
};
type ContextCallback = (context: Context) => void;

export async function run(moduleCode: string, callback?: ContextCallback) {
  return runs([moduleCode], [], callback);
}

export async function runs(
  moduleCodes: string[],
  classCode: (VBFile & { code: string })[] = [],
  callback?: ContextCallback,
) {
  const ret: any[] = [];
  const MsgBoxSub: SubBinding = {
    name: 'MsgBox',
    argumentsInfo: [
      {
        name: 'msg',
      },
    ],
    async value(args) {
      ret.push((await args.getValue('msg'))?.value);
    },
  };

  await runs2(
    'main',
    moduleCodes,
    classCode,
    (context) => {
      context.registerSubBinding(MsgBoxSub);
      context.registerSubBinding({
        name: 'debug.print',
        argumentsInfo: [
          {
            name: 'msgs',
            paramArray: true,
          },
        ],
        async value(args, context) {
          const msgs = (await args.getValue('msgs')) as unknown as VBArray;
          for (let i = 0; i <= msgs.jsUBound(); i++) {
            ret.push((await (await msgs.getElement([i])).getValue()).value);
          }
          return Context.createInteger(1);
        },
      });
      if (callback) {
        callback(context);
      }
    },
    {
      logError: false,
    },
  );

  return ret;
}

function bindCommon(context: Context) {
  context.registerSubBinding(createRange);

  context.registerClassBinding(JSDateBinding);
  context.registerClassBinding(ExcelRange);

  context.registerVariableBinding(vbModal);
  context.registerVariableBinding({
    ...vbModal,
    name: 'VBA.FormShowConstants.' + vbModal.name,
  });
  return context;
}

const globalContext = new Context();
bindCommon(globalContext);

export async function runs2(
  mainSub: string,
  moduleCodes: string[],
  classCode: (VBFile & { code: string })[] = [],
  callback: (context: Context) => void = () => {},
  options: CallOptions & { reuseContext?: boolean } = {},
) {
  let id = 0;

  const context = options.reuseContext
    ? globalContext
    : bindCommon(new Context());

  await callback(context);
  const files: VBFile[] = [];
  for (const m of moduleCodes) {
    const name = 'm' + ++id;
    files.push({
      id: name,
      name: name,
      type: 'module',
    });
  }
  let i = 0;
  for (const m of moduleCodes) {
    await context.load(m.trimStart(), files[i++]);
  }

  for (const c of classCode) {
    await context.load(c.code.trimStart(), c);
  }

  await context.callSub(mainSub, {
    ...options,
    file: files[0],
  });
}
