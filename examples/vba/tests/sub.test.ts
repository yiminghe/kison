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

  it('optional Parameters works', async () => {
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
});
