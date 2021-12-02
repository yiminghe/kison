import { run } from './utils';

describe('if', () => {
  let ret;
  it('do while works', async () => {
    ret = await run(`
    sub main
   dim i as Integer
   do while i<>3
   msgbox i
   i += 1
   loop
  end sub
         `);
    expect(ret).toEqual([0, 1, 2]);
  });

  it('while works', async () => {
    ret = await run(`
    sub main
   dim i as Integer
   while i<>3
   msgbox i
   i += 1
   wend
  end sub
         `);
    expect(ret).toEqual([0, 1, 2]);
  });

  it('while exit do works', async () => {
    ret = await run(`
    sub main
   dim i as Integer
   while i<>3
   msgbox i
   i += 1
   exit do
   wend
  end sub
         `);
    expect(ret).toEqual([0]);
  });

  it('do until works', async () => {
    ret = await run(`
    sub main
   dim i as Integer
   do until i=3
   msgbox i
   i += 1
   loop
  end sub
         `);
    expect(ret).toEqual([0, 1, 2]);
  });
});
