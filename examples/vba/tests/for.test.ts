import { run } from './utils';

describe('for', () => {
  let ret;
  it('for  works', async () => {
    ret = await run(`
    sub main
dim i
for i=0 to 2
debug.print i
next
end sub
    `);
    expect(ret).toEqual([0, 1, 2]);
  });

  it('exit for works', async () => {
    ret = await run(`
    sub main
dim i
for i=0 to 2
debug.print i
if i=1 then exit for
next
end sub
    `);
    expect(ret).toEqual([0, 1]);
  });

  it('for step works', async () => {
    ret = await run(`
    sub main
dim i
for i=0 to 10 step 5
debug.print i
next
end sub
    `);
    expect(ret).toEqual([0, 5, 10]);
  });

  it('for each works', async () => {
    ret = await run(`
    Sub main()
    Dim a As Variant
    Dim i
    a = Array(0, 1, 2)
    For Each i In a
      Debug.Print i
    Next
    End Sub
    `);
    expect(ret).toEqual([0, 1, 2]);
  });

  it('for each exit works', async () => {
    ret = await run(`
    Sub main()
    Dim a As Variant
    Dim i
    a = Array(0, 1, 2)
    For Each i In a
      Debug.Print i
      if i=1 then exit for
    Next
    End Sub
    `);
    expect(ret).toEqual([0, 1]);
  });
});
