import { runs, run } from './utils';

describe('class', () => {
  it('inter module works', async () => {
    const ret = await runs([
      `
      private x as Integer
      sub main
      x = 2
      test2
      test
      end sub

      private sub test2
      msgbox x
      end sub
      `,
      `
    private x as Integer

    private sub test2
    msgbox x
    end sub

    public sub test
    x=1
    test2
    end sub
    `,
    ]);

    expect(ret).toEqual([2, 1]);
  });

  it('can not call private sub', async () => {
    let error: any = {};
    try {
      await runs([
        `
    sub main
    test2
    end sub
    `,
        `
  private sub test2
  end sub
  `,
      ]);
    } catch (e) {
      error = e;
    }

    expect(error.message).toMatchInlineSnapshot(
      `"can not find sub: test2 at main (m1:2)"`,
    );
  });

  it('can not call private class member', async () => {
    let error: any = {};
    try {
      await runs(
        [
          `
    sub main
    dim a as new MyClass
    msgbox a.x
    end sub
    `,
        ],
        [
          {
            type: 'class',
            id: 'myclass',
            name: 'myclass',
            code: `
        dim x as Integer
        `,
          },
        ],
      );
    } catch (e) {
      error = e;
    }

    expect(error.message).toMatchInlineSnapshot(
      `"can not access non-public member at main (m1:3)"`,
    );
  });

  it('can not call private function', async () => {
    let error: any = {};
    try {
      await runs(
        [
          `
    sub main
    dim a as new MyClass
    msgbox a.x()
    end sub
    `,
        ],
        [
          {
            type: 'class',
            id: 'myclass',
            name: 'myclass',
            code: `
        private function x()
        x=1
        end function
        `,
          },
        ],
      );
    } catch (e) {
      error = e;
    }

    expect(error.message).toMatchInlineSnapshot(
      `"can not access non-public method at main (m1:3)"`,
    );
  });

  it('can not call private property get', async () => {
    let error: any = {};
    const classes: any = [
      {
        type: 'class',
        id: 'myclass',
        name: 'myclass',
        code: `
      public m as Integer
      private property get x()
      x=m
      end property
      property set x(v)
      m=v
      end property
      `,
      },
    ];

    const ret = await runs(
      [
        `
    sub main
    dim a as new MyClass
    a.x=1
    msgbox a.m
    end sub
    `,
      ],
      classes,
    );
    expect(ret).toEqual([1]);

    try {
      await runs(
        [
          `
     sub main
     dim a as new MyClass
     msgbox a.x
     end sub
     `,
        ],
        classes,
      );
    } catch (e) {
      error = e;
    }

    expect(error.message).toMatchInlineSnapshot(
      `"can not access non-public property at main (m1:3)"`,
    );
  });

  it('can not call private property set', async () => {
    let error: any = {};
    const classes: any = [
      {
        type: 'class',
        id: 'myclass',
        name: 'myclass',
        code: `
      dim m as Integer
      sub class_initialize
      m=1
      end sub
       property get x()
      x=m
      end property
      private property set x(v)
      m=v
      end property
      `,
      },
    ];

    const ret = await runs(
      [
        `
    sub main
    dim a as new MyClass
    msgbox a.x
    end sub
    `,
      ],
      classes,
    );
    expect(ret).toEqual([1]);

    try {
      await runs(
        [
          `
     sub main
     dim a as new MyClass
    a.x=10
     end sub
     `,
        ],
        classes,
      );
    } catch (e) {
      error = e;
    }

    expect(error.message).toMatchInlineSnapshot(
      `"can not access non-public property at main (m1:3)"`,
    );
  });
});
