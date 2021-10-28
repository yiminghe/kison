import {
  Context,
  SubBinder,
  VariableBinder,
  VBObject,
  VBInteger,
} from '../src/';
import { VBFile } from '../src/runtime/types';

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
    async value(context) {
      ret.push(context.getCurrentScope().getVariable('msg')?.value.value);
      return undefined;
    },
  };

  const vbModal: VariableBinder = {
    name: 'vbModal',
    value: new VBInteger(1),
  };

  const context = new Context();
  context.registerSubBinder(MsgBoxSub);
  context.registerSubBinder({
    ...MsgBoxSub,
    name: 'console.log',
  });

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
