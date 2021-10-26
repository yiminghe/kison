import { run } from './utils';

describe('function', () => {
  it('return works', async () => {
    const code = `
    sub main
    dim a as Integer
    a = r(1)
    msgbox a
    a = r2(a)
    msgbox a
    end sub

    function r (b as Integer)
    msgbox b
    r = b
    end function

    sub r2 (b as Integer)
    msgbox b
    r2 = b
    end sub
    `;
    const ret: any[] = await run(code);
    expect(ret).toMatchInlineSnapshot(`
Array [
  1,
  1,
  1,
  undefined,
]
`);
  });
});
