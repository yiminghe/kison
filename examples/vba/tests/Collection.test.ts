import { run, runs } from './utils';

describe('Collection', () => {
  let ret;
  it('simple  works', async () => {
    ret = await run(`
    sub main
    Dim coll As New Collection
    dim i as integer
    ' Add item - VBA looks after resizing
    coll.Add "Apple"
    coll.Add "Pear"

    ' remove item - VBA looks after resizing
    coll.Remove 1
    debug.print coll.count
    for i=1 to coll.count
    debug.print coll(i)
    next
end sub
    `);
    expect(ret).toEqual([1, 'Pear']);
  });

  it('before works', async () => {
    ret = await run(`
    sub main
    Dim collFruit As New Collection
    dim i as integer
    collFruit.Add "Apple"
    collFruit.Add "Pear"
    ' Add lemon before first item
    collFruit.Add "Lemon", Before:=1
    for i=1 to collFruit.count
    debug.print collFruit(i)
    next
    dim f
    for each f in collFruit
    debug.print f
    next
end sub
    `);
    expect(ret).toEqual(['Lemon', 'Apple', 'Pear', 'Lemon', 'Apple', 'Pear']);
  });

  it('after works', async () => {
    ret = await run(`
    sub main
    Dim collFruit As New Collection
    dim i as integer
    collFruit.Add "Apple"
    collFruit.Add "Pear"
    ' Add lemon after first item
    collFruit.Add "Lemon", After:=1
    for i=1 to collFruit.count
    debug.print collFruit(i)
    next
end sub
    `);
    expect(ret).toEqual(['Apple', 'Lemon', 'Pear']);
  });

  it('item works', async () => {
    ret = await run(`
    sub main
    Dim coll As New Collection

    coll.Add 1
    coll.Add 2
    Debug.Print coll(1)
    Debug.Print coll(2)
    Debug.Print coll.item(2)
end sub
    `);
    expect(ret).toEqual([1, 2, 2]);
  });

  it('readonly', async () => {
    let err: any = {};
    try {
      await run(`
    sub main
    Dim coll As New Collection

    coll.Add "Apple"

    ' This line causes an ERRROR
    coll(1) = "Pear"
end sub
    `);
    } catch (e) {
      err = e;
    }

    expect(err.message).toMatchInlineSnapshot(`"read only at main (m1:7)"`);
  });

  it('can change object', async () => {
    const classCode = `
    public fruit as string
        `;

    ret = await runs(
      [
        `
    sub main
    Dim coll As New Collection
    Dim o As New MyClass
    
    ' set value of fruit member of the class
    o.fruit = "Apple"
    
    ' Add object to collection
    coll.Add o
    
    ' Prints Apple
    Debug.Print coll(1).fruit
    
    ' Change the fruit part of class1 object
    coll(1).fruit = "Pear"
    
    ' Prints pear
    Debug.Print coll(1).fruit
end sub
    `,
      ],
      [
        {
          code: classCode,
          name: 'MyClass',
          id: '1',
          type: 'class',
        },
      ],
    );
    expect(ret).toEqual(['Apple', 'Pear']);
  });

  it('can use key', async () => {
    ret = await run(`
    sub main
    Dim collMark As New Collection

    collMark.Add Item:=1, Key:="Bill"
    collMark.Add 2, "Hank"
    collMark.Add 3, "Laura"
    collMark.Add 4, "Betty"

    ' Print Betty's marks
    Debug.Print collMark("Betty")

    ' Print Bill's marks
    Debug.Print collMark("Bill")
    
    dim i as integer
    for i=1 to collMark.count
    debug.print collMark(i)
    next
end sub
    `);
    expect(ret).toEqual([4, 1, 1, 2, 3, 4]);
  });

  it('isObject works', async () => {
    ret = await run(`
    Function Exists(coll As Collection, key As String) As Boolean

    On Error Goto EH

    IsObject (coll.Item(key))
    
    Exists = True
EH:
End Function

    sub main
    Dim coll As New Collection
    coll.Add Item:=5, key:="Apple"
    coll.Add Item:=8, key:="Pear"
    
    ' Prints true
    Debug.Print Exists(coll, "Apple")
    ' Prints false
    Debug.Print Exists(coll, "Orange")
    ' Prints true
    Debug.Print Exists(coll, "Pear")
end sub
    `);
    expect(ret).toEqual([true, false, true]);
  });

  it('passing sub works', async () => {
    ret = await run(`
    Sub main()

    ' Create collection
    Dim coll As New Collection

    ' Add items
    coll.Add "Apple"
    coll.Add "Orange"

    ' Pass to sub
    PrintColl coll

End Sub

' Sub takes collection as argument
Sub PrintColl(ByRef coll As Collection)

    Dim item As Variant
    For Each item In coll
        Debug.Print item
    Next

End Sub
    `);
    expect(ret).toEqual(['Apple', 'Orange']);
  });

  it('by val vs by ref', async () => {
    ret = await run(`
    Sub main()

    ' Create collection
    Dim coll As New Collection

    ' Add items
    coll.Add 1
    coll.Add 2

    PassByVal coll
    debug.print coll.count

    PassByRef coll
    debug.print coll.count    
End Sub

Sub PassByRef(ByRef coll As Collection)
    Set coll = Nothing
End Sub

' Will NOT empty original collection
Sub PassByVal(ByVal coll As Collection)
    Set coll = Nothing
End Sub
    `);
    expect(ret).toEqual([2, 0]);
  });

  it('support return', async () => {
    ret = await run(`
    ' https://excelmacromastery.com/
    Sub main()
        ' NOTE: We do not use New keyword here to create the collection.
        ' The collection is created in the CreateCollection function.
        Dim coll As Collection
    
        ' receive coll from the CreateCollection function
        Set coll = CreateCollection()
    
        ' do something with coll here

        debug.print coll.count
    
    End Sub
    
    Function CreateCollection() As Collection
    
        Dim coll As New Collection
    
        coll.Add "Plum"
        coll.Add "Pear"
    
        ' Return collection
        Set CreateCollection = coll
    
    End Function
    `);
    expect(ret).toEqual([2]);
  });
});
