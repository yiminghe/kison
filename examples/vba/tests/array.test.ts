import { run } from './utils';

describe('array', () => {
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
