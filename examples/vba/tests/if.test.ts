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

  it('nested if statement works', async () => {
    ret = await run(`
    sub main
    if 2>1 then if 2>3 then msgbox 1 else msgbox 2
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

  it('select case works', async () => {
    const t = (n: number) => `
    sub main
    dim marks as Integer
    dim sClass as Integer
  
    marks = ${n}
  
     Select Case marks
          Case 85 To 100
              sClass = 1
          Case 75 To 84
              sClass = 2
          Case 55 To 74
              sClass = 3
          Case 40 To 54
              sClass = 4
          Case Else
              ' For all other marks
              sClass = 5
          End Select
  
          msgbox sClass
    end sub
    `;
    ret = await run(t(100));
    expect(ret).toEqual([1]);
    ret = await run(t(80));
    expect(ret).toEqual([2]);
    ret = await run(t(60));
    expect(ret).toEqual([3]);
    ret = await run(t(50));
    expect(ret).toEqual([4]);
    ret = await run(t(-1));
    expect(ret).toEqual([5]);
  });
});
