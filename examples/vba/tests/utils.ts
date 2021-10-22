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
  context.run(sampleCode);
  await context.callSub('test');
  return ret;
}
