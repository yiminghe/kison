import {
  Context,
  SubBinder,
  ClassBinder,
  VBString,
  VariableBinder,
  VBInteger,
} from '../src/';
import { VBFile } from '../src/runtime/types';

function upperFirst(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const vbModal: VariableBinder = {
  name: 'vbModal',
  value: new VBInteger(1),
};

const JSDateBinder: ClassBinder = {
  name: 'js.Date',
  async value() {
    const d: any = new Date();
    return {
      get(name) {
        const v = d[`get${upperFirst(name)}`]();
        if (typeof v === 'string') {
          return new VBString(v);
        } else if (typeof v === 'number') {
          return new VBInteger(v);
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

export async function run(moduleCode: string) {
  return runs([moduleCode]);
}

export async function runs(
  moduleCodes: string[],
  classCode: (VBFile & { code: string })[] = [],
) {
  const ret: any[] = [];
  let id = 0;

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

  const context = new Context();
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
      return new VBInteger(1);
    },
  });

  context.registerClassBinder(JSDateBinder);

  context.registerVariableBinder(vbModal);
  context.registerVariableBinder({
    ...vbModal,
    name: 'VBA.FormShowConstants.' + vbModal.name,
  });

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

  await context.callSub('main');
  return ret;
}
