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
c.m = 3
msgbox c.m
set c = nothing
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

    expect(ret).toEqual([2, 3, 2]);
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

  it('sub and property works', async () => {
    const moduleCode = `
    sub main
    dim c as New MyClass
    msgbox c.getM()
    c.setM(10)
    msgbox c.getM()
    msgbox c.x
    c.x=11
    msgbox c.x
    debug.print c.x,c.x
    c.print
  end sub  
    `;

    const classCode = `
    public m as Integer

    function getM
      getM=m
    end function
    
    sub setM(v)
      m=v
    end sub

    sub print
    debug.print "class print"
    end sub
    
    Property Get x()
      x = m
    End Property
    
    Property Let x(value)
      m = value
    End Property  
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

    expect(ret).toEqual([0, 10, 10, 11, 11, 11, 'class print']);
  });
});
