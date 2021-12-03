import { run } from './utils';

describe('date', () => {
  let ret: any;
  const dateString = '2012/02/02';
  const val = +new Date(dateString);

  it('date literal works', async () => {
    ret = await run(`
    sub main
dim i as date
i = #${dateString}#
debug.print i
  end sub
    `);
    expect(ret).toEqual([val]);
  });

  it('date string works', async () => {
    ret = await run(`
    sub main
dim i as date
i = "${dateString}"
debug.print i
  end sub
    `);
    expect(ret).toEqual([val]);
  });
});
