// @ts-nocheck

import { Context, SubBinding } from '../pkg/';

const sampleCode = `
sub main
MsgBox 1
MsgBox 2
end sub
`.trim();

const MsgBoxSub: SubBinding = {
  name: 'MsgBox',
  argumentsInfo: [
    {
      name: 'msg',
    },
  ],
  async value(args) {
    console.log((await args.getValue('msg'))?.value);
  },
};

async function main() {
  const context = new Context();
  context.registerSubBinding(MsgBoxSub);
  await context.load(sampleCode);
  await context.callSub('main');
}

main();
