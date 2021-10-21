import { Context, SubBinder } from '../src/';

async function run(sampleCode: string) {
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

describe('vba runtime', () => {
  it('run correctly', async () => {
    const code = `
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

    const ret: any[] = await run(code);

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

  it('array works', async () => {
    const code = `
sub test
  dim m(1) as Integer
  m(0)=1
  test2 m(0), m(1)
  MsgBox m(0)
  MsgBox m(1)
end sub

sub test2(byVal a as Integer, b as Integer)
  a=3
  b=2
end sub
    `;
    const ret: any[] = await run(code);
    expect(ret).toMatchInlineSnapshot(`
Array [
  1,
  2,
]
`);
  });
});
