import { prettyJson } from '../../../__tests__/utils';
import parser from '../src/parserLLK';

describe('vba parser', () => {
  it('parse correctly', () => {
    const code = `
sub test
MsgBox 1
end sub
`;
    const ret = parser.parse(code);

    expect(ret.error?.errorMessage).toMatchInlineSnapshot(`undefined`);

    expect(prettyJson(ret.ast)).toMatchSnapshot();
  });

  it('parse comment and line continuation correctly', () => {
    const code = `
sub test
' x _
sdfasdf
rem xxxx _
yyy

x = _
1

end sub
`;
    const ret = parser.parse(code);

    expect(ret.error?.errorMessage).toMatchInlineSnapshot(`undefined`);

    expect(prettyJson(ret.ast)).toMatchSnapshot();
  });
});
