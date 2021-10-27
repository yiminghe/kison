import { Context, SubBinder } from '../src/';
import { VBFile } from '../src/runtime/types';

export async function run(moduleCode: string) {
  const ret: any[] = [];

  const MsgBoxSub: SubBinder = {
    name: 'MsgBox',
    argumentsInfo: [
      {
        name: 'msg',
      },
    ],
    async fn(context) {
      ret.push(context.getCurrentScope().getVariable('msg')?.value.value);
      return undefined;
    },
  };

  const context = new Context();
  context.registerSubBinder(MsgBoxSub);
  await context.load(moduleCode.trim());
  await context.callSub('main');
  return ret;
}

export async function runs(
  moduleCodes: string[],
  classCode: (VBFile & { code: string })[],
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
    async fn(context) {
      ret.push(context.getCurrentScope().getVariable('msg')?.value.value);
      return undefined;
    },
  };

  const context = new Context();
  context.registerSubBinder(MsgBoxSub);

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
