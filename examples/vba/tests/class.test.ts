import { runs } from './utils';

describe('array', () => {
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

    const ret = await runs(
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
});
