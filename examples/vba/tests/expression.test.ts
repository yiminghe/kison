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
});
