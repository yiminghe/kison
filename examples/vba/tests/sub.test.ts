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
msgbox 2
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
});
