import {
  Context,
  SubBinder,
  ClassBinder,
  VariableBinder,
  CallOptions,
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
      get(name) {
        const v = d[`get${upperFirst(name)}`]();
        if (typeof v === 'string') {
          return Context.createString(v);
        } else if (typeof v === 'number') {
          return Context.createInteger(v);
        }
        throw new Error('only allow string/number return type');
      },
      set(name, value) {
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
      get(name) {
        throw new Error('only allow index access');
      },
      set(name, value) {
        throw new Error('only allow index access');
      },
      getElement(indexes) {
        const index: number = parseInt(indexes[0] + '', 10);
        return d[index];
      },
      setElement(indexes, value) {
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

export async function run(moduleCode: string) {
  return runs([moduleCode]);
}

export async function runs(
  moduleCodes: string[],
  classCode: (VBFile & { code: string })[] = [],
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
      ret.push(args.msg?.value.value);
      return undefined;
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
            name: 'msg',
          },
        ],
        async value(args) {
          ret.push(args.msg?.value.value);
          return Context.createInteger(1);
        },
      });
    },
    {
      logError: false,
    },
  );

  return ret;
}

export async function runs2(
  mainSub: string,
  moduleCodes: string[],
  classCode: (VBFile & { code: string })[] = [],
  callback: (context: Context) => void = () => {},
  options: CallOptions,
) {
  let id = 0;

  const context = new Context();

  context.registerSubBinder(createRange);

  context.registerClassBinder(JSDateBinder);
  context.registerClassBinder(ExcelRange);

  context.registerVariableBinder(vbModal);
  context.registerVariableBinder({
    ...vbModal,
    name: 'VBA.FormShowConstants.' + vbModal.name,
  });

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

  await context.callSub(mainSub, [], options);
}
