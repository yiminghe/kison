import { runs, run } from './utils';

describe('class', () => {
  let ret;

  it('Class_Initialize works', async () => {
    const classCode = `
public m as Integer

sub Class_Initialize
 m = 2
end sub 
    `;

    const moduleCode = `
sub main
dim c as new MyClass
msgbox c.m
end sub    
    `;

    ret = await runs(
      [moduleCode],
      [
        {
          code: classCode,
          name: 'MyClass',
          id: '1',
          type: 'class',
        },
      ],
    );

    expect(ret).toMatchInlineSnapshot(`
      Array [
        2,
      ]
    `);
  });

  it('support bind class', async () => {
    const currentDate = new Date().getDate();
    ret = await run(`
    sub main
    dim d as New js.Date
    msgbox d.date
    d.date=10
    msgbox d.date
  end sub
         `);
    expect(ret).toEqual([currentDate, 10]);
  });

  it('set works', async () => {
    const currentDate = new Date().getDate();
    ret = await run(`
    sub main
    dim d as js.Date
    set d = new js.Date
    msgbox d.date
    d.date=10
    msgbox d.date
  end sub
         `);
    expect(ret).toEqual([currentDate, 10]);
  });
});
