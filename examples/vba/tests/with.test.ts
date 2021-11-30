import { Context } from '../src';
import { runs, run } from './utils';

describe('with', () => {
  let ret: any[];

  it('with works', async () => {
    const classCode = `
    public m1 as Integer
    public m2 as Integer
    public m3 as MyClass
    sub init
      set m3 = new MyClass
    end sub 
        `;

    const moduleCode = `
    sub main
    dim c as new MyClass
    c.init
    msgbox c.m1
    msgbox c.m2
    msgbox c.m3.m1
    msgbox c.m3.m2
    with c
      .m1 = 1
      .m2 = 2
      with .m3
        .m1 = 3
        .m2 = 4
      end with  
    end with
    msgbox c.m1
    msgbox c.m2
    msgbox c.m3.m1
    msgbox c.m3.m2
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

    expect(ret).toEqual([0, 0, 0, 0, 1, 2, 3, 4]);
  });

  it('can not cross sub', async () => {
    const classCode = `
    public m1 as Integer
    public m2 as Integer
    public m3 as MyClass
    sub init
      set m3 = new MyClass
    end sub 
        `;

    const moduleCode = `
        sub main
        dim c as new MyClass
        with c
           test
        end with
        end sub
    
          sub test
            msgbox .m1
          end sub
        `;
    let error: any = {};
    try {
      await runs(
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
    } catch (e) {
      error = e;
    }

    expect(error.message).toMatchInlineSnapshot(
      `"invalid reference at test (m1:9)"`,
    );
  });
});
