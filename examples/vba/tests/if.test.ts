import { run } from './utils';

describe('if', () => {
  let ret;
  it('if statement works', async () => {
    ret = await run(`
    sub main
    if 1>2 then msgbox 1 else msgbox 2
  end sub
         `);
    expect(ret).toEqual([2]);
  });

  it('if block works', async () => {
    ret = await run(`
    sub main
    if 2>10 then
      msgbox 1
    elseif 20>9 then
      msgbox 2
    else 
      msgbox 3  
    end if  
  end sub
         `);
    expect(ret).toEqual([2]);
    ret = await run(`
    sub main
    if 20>10 then
      msgbox 1
    elseif 20>9 then
      msgbox 2
    else 
      msgbox 3  
    end if  
  end sub
         `);
    expect(ret).toEqual([1]);

    ret = await run(`
    sub main
    if 2>10 then
      msgbox 1
    elseif 2>9 then
      msgbox 2
    else 
      msgbox 3  
    end if  
  end sub
         `);
    expect(ret).toEqual([3]);
  });
});
