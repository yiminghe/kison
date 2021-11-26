import { Context } from '../src';
import { run } from './utils';

describe('sub', () => {
  it('exit sub works', async () => {
    const code = `
sub main
msgbox vbModal
test2
msgbox 4
end sub

sub test2
call debug.print(2)
exit sub
debug.print 3
end sub
    `;
    const ret: any[] = await run(code);
    expect(ret).toMatchInlineSnapshot(`
      Array [
        1,
        2,
        4,
      ]
    `);
  });

  it('end works', async () => {
    const code = `
sub main
msgbox 0
test2
msgbox 3
end sub

sub test2
msgbox VBA.FormShowConstants.vbModal
end
msgbox 2
end sub
    `;
    const ret: any[] = await run(code);
    expect(ret).toMatchInlineSnapshot(`
      Array [
        0,
        1,
      ]
    `);
  });

  it('optional Parameters works for basic type', async () => {
    const ret = await run(`
    ' https://excelmacromastery.com/
Sub Multi(marks As Integer _
            , Optional count As Integer = 1 _
            , Optional amount As Integer = 2 _
            , Optional version As Integer = 3)
    msgbox marks
    msgbox count
    msgbox amount
    msgbox version
    
End Sub

Sub main()

    ' marks and count
    Multi 6, 5
    
    ' marks and amount
    Multi 6, , 89
    
    ' marks and version
    Multi 6, , , 7
    
    ' marks,count and version
    Multi 6, 10 , , 8

End Sub
    `);

    expect(ret).toEqual([
      // calll
      6, 5, 2, 3,
      // calll
      6, 1, 89, 3,
      // calll
      6, 1, 2, 7,
      // calll
      6, 10, 2, 8,
    ]);
  });

  it('optional parameter works for variant type', async () => {
    const ret = await run(`
Sub main()
    ' Prints "Parameter not missing"
    CalcValues 6
    
    ' Prints "Parameter missing"   
    CalcValues
End Sub

Sub CalcValues(Optional x)
    ' Check for the parameter
    msgbox IsMissing(x)
End Sub    
    `);

    expect(ret).toEqual([false, true]);
  });

  it('paramarray works', async () => {
    const ret = await run(`
     Sub Procedure_Five(ByVal iConstant As Integer, _
      ParamArray aArgumentsArray() As Variant)

Dim vArg As Variant
vArg = aArgumentsArray(0)(1)
Debug.Print vArg

End Sub

 Sub main()
dim a(1) as Integer
a(0)=1
a(1)=2
Call Procedure_Five(100, a)
End Sub
        `);

    expect(ret).toEqual([2]);
  });

  it('paramarray can be optional', async () => {
    const ret = await run(`
 Sub Procedure_Five(ByVal iConstant As Integer, _
  ParamArray aArgumentsArray() As Variant)

Debug.Print iConstant, UBound(aArgumentsArray), LBound(aArgumentsArray)

End Sub

 Sub main()

Call Procedure_Five(100)

End Sub
`);
    expect(ret).toEqual([100, -1, 0]);
  });

  it('support named arguments', async () => {
    let context: Context = null!;
    const ret = await run(
      `
    Sub test(x As Integer, Optional y As Integer = 10, Optional z As Integer = 20)
    Debug.Print x, y, z
    End Sub

    private sub test2
    Debug.Print 10
    end sub
    
    Sub main()
    test 1, y:=2
    End Sub    
    `,
      (c) => (context = c),
    );
    expect(ret).toEqual([1, 2, 20]);
    expect(context.getPublicModuleSubs()).toEqual(['test', 'main']);
  });

  it('goto works', async () => {
    let ret = await run(
      `
      sub main 
      msgbox 1 
      goto done
      done: msgbox 2
      msgbox 3
      end sub 
    `,
    );
    expect(ret).toEqual([1, 2, 3]);
  });
});
