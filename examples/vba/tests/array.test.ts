import { run } from './utils';

describe('array', () => {
  it('array works', async () => {
    const code = `
sub main
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

  it('multi dimension works', async () => {
    let code = `
sub main
  dim m(1 to 2, 3 to 4) as Integer
  m(1,3)=1
  m(1,4)=2
  MsgBox m(1,3)
  MsgBox m(1,4)
end sub   
  `;
    let ret: any[] = await run(code);
    expect(ret).toMatchInlineSnapshot(`
      Array [
        1,
        2,
      ]
    `);

    code = `
sub main
  dim m(1 to 2, 3 to 4) as Integer
  m(1,3)=1
  m(1,4)=2
  MsgBox m(1,5)
end sub   
  `;

    let error: any;

    try {
      await run(code);
    } catch (e) {
      error = e;
    }

    expect(() => {
      throw error;
    }).toThrowErrorMatchingInlineSnapshot(`"unexpected array access!"`);
  });
});
