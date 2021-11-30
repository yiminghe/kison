import { run } from './utils';

describe('error handling', () => {
  let ret;
  it('on error goto works', async () => {
    ret = await run(
      `
      Sub main()
      On Error GoTo eh
      debug.print 1
      'Error 1
      Done:
          Exit Sub
      eh:
          debug.print "catch error:" , Err.Description, err.stack
      End Sub
    `,
    );
    expect(ret).toMatchInlineSnapshot(`
      Array [
        1,
      ]
    `);

    ret = await run(
      `
      Sub main()
      On Error GoTo eh
      debug.print 10
      Error 1
      Done:
          Exit Sub
      eh:
          debug.print "catch error:" , Err.Description , Err.Number, err.stack
      End Sub
    `,
    );
    expect(ret).toMatchInlineSnapshot(`
      Array [
        10,
        "catch error:",
        "internal error",
        1,
        "internal error
      at main (m1:4)
      at TOP (m1:1)",
      ]
    `);
  });

  it('on only catch error once', async () => {
    let error: any = {};
    try {
      await run(
        `
        Sub main()
        On Error GoTo eh
        Debug.Print 10
        Error 1
  Done:
            Exit Sub
  eh:
      Debug.Print "catch error:", Err.Description, Err.Number, err.stack
      Error 1
  End Sub
  
  `,
      );
    } catch (e) {
      error = e;
    }

    expect(error.message).toMatchInlineSnapshot(
      `"internal error at main (m1:9)"`,
    );
  });

  it('error bubble works', async () => {
    ret = await run(
      `
      Sub test()
      Error 1
End Sub

Sub main()
    on error goto eh
    test
    debug.print 10
    eh:
    debug.print err.number, err.stack
End Sub
    `,
    );
    expect(ret).toMatchInlineSnapshot(`
      Array [
        1,
        "internal error
      at test (m1:2)
      at main (m1:7)
      at TOP (m1:1)",
      ]
    `);
  });

  it('error stop bubble works', async () => {
    ret = await run(
      `
      Sub test()
      on error goto eh
      Error 1
      eh:
      debug.print 11
End Sub

Sub main()
    on error goto eh
    test
    debug.print 10
    exit sub
    eh:
    debug.print err.number, err.stack
End Sub
    `,
    );
    expect(ret).toMatchInlineSnapshot(`
      Array [
        11,
        10,
      ]
    `);
  });

  it('error reset works', async () => {
    ret = await run(
      `
      Sub Main()

      On Error Goto eh
      
     error 1
  continue:
      Debug.Print Err.Number, err.stack
  
  done:
      Exit Sub
  eh:
      Debug.Print Err.Number, err.stack
      On Error Goto -1 ' reset the error
      Goto continue ' return to the code
  End Sub
    `,
    );
    expect(ret).toMatchInlineSnapshot(`
      Array [
        1,
        "internal error
      at main (m1:5)
      at TOP (m1:1)",
        0,
        "",
      ]
    `);
  });

  it('error clear will clear error num', async () => {
    ret = await run(
      `
      Sub Main()

      On Error Goto eh
      
     error 1
  continue:
      Debug.Print Err.Number, err.stack
  
  done:
      Exit Sub
  eh:
      Debug.Print Err.Number, err.stack
      Err.clear
      Goto continue ' return to the code
  End Sub
    `,
    );
    expect(ret).toMatchInlineSnapshot(`
      Array [
        1,
        "internal error
      at main (m1:5)
      at TOP (m1:1)",
        0,
        "internal error
      at main (m1:5)
      at TOP (m1:1)",
      ]
    `);
  });

  it('error clear will not reset error', async () => {
    let error: any = {};
    try {
      await run(
        `
      Sub Main()

      On Error Goto eh
      
     error 1
  continue:
      error 2
  
  done:
      Exit Sub
  eh:
      Debug.Print Err.Number, err.stack
      Err.clear
      Goto continue ' return to the code
  End Sub
    `,
      );
    } catch (e) {
      error = e;
    }

    expect(error.vbErrorNumber).toBe(2);
  });

  it('error raise works', async () => {
    ret = await run(
      `
      Sub Main()

      On Error Goto eh
       
      Err.raise 1,"2","3"
    
      eh:
        Debug.Print Err.Number, Err.source, Err.description, err.stack
    End Sub
    `,
    );
    expect(ret).toMatchInlineSnapshot(`
      Array [
        1,
        "2",
        "internal error",
        "internal error
      at main (m1:5)
      at TOP (m1:1)",
      ]
    `);
  });

  it('error raise only has number', async () => {
    ret = await run(
      `
      Sub Main()

      On Error Goto eh
       
      Err.raise 1000
    
      eh:
        Debug.Print Err.Number, Err.source, Err.description, err.stack
    End Sub
    `,
    );
    expect(ret).toMatchInlineSnapshot(`
      Array [
        1000,
        "",
        "",
        "
      at main (m1:5)
      at TOP (m1:1)",
      ]
    `);
  });

  it('error raise must has number', async () => {
    ret = await run(
      `
      Sub Main()

      On Error Goto eh
       
      Err.raise
    
      eh:
        Debug.Print Err.Number, Err.source, Err.description, err.stack
    End Sub
    `,
    );
    expect(ret).toMatchInlineSnapshot(`
      Array [
        6,
        "",
        "no optional argument: number",
        "no optional argument: number
      at main (m1:5)
      at TOP (m1:1)",
      ]
    `);
  });
});
