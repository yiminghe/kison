import { run } from './utils';

describe('variable', () => {
  it('support module level variable', async () => {
    const ret: any[] = await run(`
dim x as integer

sub main
  msgbox x
  x = 1
  msgbox x
  test
end sub

sub test
  msgbox x
end sub
    `);
    expect(ret).toMatchInlineSnapshot(`
      Array [
        0,
        1,
        1,
      ]
    `);
  });

  it('support static variable', async () => {
    const ret: any[] = await run(`
sub main
test
test
end sub

sub test
  static x as integer
  msgbox x
  x=1
  msgbox x
end sub
    `);
    expect(ret).toMatchInlineSnapshot(`
      Array [
        0,
        1,
        1,
        1,
      ]
    `);
  });
});
