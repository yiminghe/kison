import { Runtime, SubBinder } from '../src/';

describe('vba parser', () => {
  it('parse correctly', async () => {
    const sampleCode = `
sub test
MsgBox 1
MsgBox 2
end sub
`.trim();

    const ret: any[] = [];

    const MsgBoxSub: SubBinder = {
      name: 'MsgBox',
      argumentsInfo: [
        {
          name: 'msg',
        },
      ],
      async fn(runtime) {
        ret.push(runtime.getCurrentScope().getVariable('msg')?.value.value);
        return undefined;
      },
    };

    const runtime = new Runtime();
    runtime.registerSubBinder(MsgBoxSub);
    runtime.run(sampleCode);
    await runtime.callSub('test');

    expect(ret).toMatchInlineSnapshot(`
      Array [
        1,
        2,
      ]
    `);
  });
});
