import { Context, SubBinder } from '../src/';

export async function run(sampleCode: string) {
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
  await context.load(sampleCode.trim());
  await context.callSub('main');
  return ret;
}
