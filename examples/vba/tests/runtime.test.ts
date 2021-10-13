import { Runtime, SubDef } from '../src/';

describe('vba parser', () => {
  it('parse correctly', () => {
    const sampleCode = `
sub test
MsgBox 1
MsgBox 2
end sub
`.trim();

    const ret: any[] = [];

    const MsgBoxSub: SubDef = {
      name: 'MsgBox',
      fn({ args }) {
        ret.push(args[0]?.value);
        return undefined;
      },
    };

    const runtime = new Runtime();
    runtime.registerSub(MsgBoxSub);
    runtime.run(sampleCode);
    runtime.callSub('test');

    expect(ret).toMatchInlineSnapshot(`
      Array [
        1,
        2,
      ]
    `);
  });
});
