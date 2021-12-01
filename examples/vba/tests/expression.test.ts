import { run } from './utils';

describe('expression', () => {
  let ret;
  it('+ * works', async () => {
    ret = await run(`
    sub main
    dim a as Integer
    a = 1 + 5 * 2  
    ''
    debug.print a
    end sub    
    `);

    expect(ret).toEqual([11]);
  });

  xit('logic works', async () => {
    ret = await run(`
    sub main
    Dim x, y As Boolean
    x = Not 23 > 14
    y = Not 23 > 67
    debug.print x,y
    end sub    
    `);

    expect(ret).toEqual([0, 1]);
  });
});
