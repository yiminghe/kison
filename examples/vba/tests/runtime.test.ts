import { Context, SubBinder } from '../src/';

describe('vba parser', () => {
  it('parse correctly', async () => {
    const sampleCode = `
    sub test2 (ByVal msg As Integer, msg2 As Integer)
    MsgBox msg
    call MsgBox(msg2)
    msg = 11
    msg2 = 12
  end sub
  
  sub test
    dim m1 as Integer
    dim m2 as Integer
    m1 = 10
    test2 m1, m2
    test2 1, 2
    MsgBox m1
    MsgBox m2
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
      async fn(context) {
        ret.push(context.getCurrentScope().getVariable('msg')?.value.value);
        return undefined;
      },
    };

    const context = new Context();
    context.registerSubBinder(MsgBoxSub);
    context.run(sampleCode);
    await context.callSub('test');

    expect(ret).toMatchInlineSnapshot(`
Array [
  10,
  0,
  1,
  2,
  10,
  12,
]
`);
  });
});
