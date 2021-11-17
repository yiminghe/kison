import { run } from './utils';

describe('excel.range', () => {
  let ret;
  it('getElement works', async () => {
    ret = await run(`
    sub main
    dim d as Object
    set d = createRange()
    msgbox d(0)
    msgbox d(1)
    d(0) = 10
    msgbox d(0)
    msgbox d(1)
  end sub
         `);
    expect(ret).toEqual([1, 2, 10, 2]);
  });
});
