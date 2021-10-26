import { run } from './utils';

describe('vba runtime', () => {
  it('run correctly', async () => {
    const code = `
sub test2 (ByVal msg As Integer, msg2 As Integer)
  MsgBox msg
  call MsgBox(msg2)
  msg = 11
  msg2 = 12
end sub

sub main
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
});
