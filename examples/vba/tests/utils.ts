import {
  Context,
  SubBinder,
  ClassBinder,
  VariableBinder,
  CallOptions,
  VBArray,
} from '../src/index';
import type { VBFile } from '../src/runtime/types';

function upperFirst(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const vbModal: VariableBinder = {
  name: 'vbModal',
  value: Context.createInteger(1),
};

const JSDateBinder: ClassBinder = {
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

const ExcelRange: ClassBinder = {
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
        if (value.type === 'Integer') d[index] = value;
      },
    };
  },
};

const createRange: SubBinder = {
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
  const MsgBoxSub: SubBinder = {
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
      context.registerSubBinder(MsgBoxSub);
      context.registerSubBinder({
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
  context.registerSubBinder(createRange);

  context.registerClassBinder(JSDateBinder);
  context.registerClassBinder(ExcelRange);

  context.registerVariableBinder(vbModal);
  context.registerVariableBinder({
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

  if (options.reuseContext) {
    context.reset();
  }

  await callback(context);

  for (const m of moduleCodes) {
    const name = 'm' + ++id;
    await context.load(m.trim(), {
      id: name,
      name: name,
      type: 'module',
    });
  }

  for (const c of classCode) {
    await context.load(c.code.trim(), c);
  }

  await context.callSub(mainSub, options);
}
