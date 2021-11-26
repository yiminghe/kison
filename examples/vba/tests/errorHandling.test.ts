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
          debug.print "catch error:" , Err.Description
      End Sub
    `,
    );
    expect(ret).toEqual([1]);

    ret = await run(
      `
      Sub main()
      On Error GoTo eh
      debug.print 10
      Error 1
      Done:
          Exit Sub
      eh:
          debug.print "catch error:" , Err.Description , Err.Number
      End Sub
    `,
    );
    expect(ret).toEqual([10, 'catch error:', 'internal error', 1]);
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
      Debug.Print "catch error:", Err.Description, Err.Number
      Error 1
  End Sub
  
  `,
      );
    } catch (e) {
      error = e;
    }

    expect(error.message).toEqual('internal error (line 9 at file m1)');
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
    debug.print err.number
End Sub
    `,
    );
    expect(ret).toEqual([1]);
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
    debug.print err.number
End Sub
    `,
    );
    expect(ret).toEqual([11, 10]);
  });

  it('error reset works', async () => {
    ret = await run(
      `
      Sub Main()

      On Error Goto eh
      
     error 1
  continue:
      Debug.Print Err.Number
  
  done:
      Exit Sub
  eh:
      Debug.Print Err.Number
      On Error Goto -1 ' reset the error
      Goto continue ' return to the code
  End Sub
    `,
    );
    expect(ret).toEqual([1, 0]);
  });

  it('error clear will clear error num', async () => {
    ret = await run(
      `
      Sub Main()

      On Error Goto eh
      
     error 1
  continue:
      Debug.Print Err.Number
  
  done:
      Exit Sub
  eh:
      Debug.Print Err.Number
      Err.clear
      Goto continue ' return to the code
  End Sub
    `,
    );
    expect(ret).toEqual([1, 0]);
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
      Debug.Print Err.Number
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
        Debug.Print Err.Number, Err.source, Err.description
    End Sub
    `,
    );
    expect(ret).toEqual([1, '2', '3']);
  });

  it('error raise only has number', async () => {
    ret = await run(
      `
      Sub Main()

      On Error Goto eh
       
      Err.raise 1000
    
      eh:
        Debug.Print Err.Number, Err.source, Err.description
    End Sub
    `,
    );
    expect(ret).toEqual([1000, '', '']);
  });

  it('error raise must has number', async () => {
    ret = await run(
      `
      Sub Main()

      On Error Goto eh
       
      Err.raise
    
      eh:
        Debug.Print Err.Number, Err.source, Err.description
    End Sub
    `,
    );
    expect(ret).toEqual([6, '', 'no optional argument: number']);
  });
});
