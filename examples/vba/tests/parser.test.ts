import { prettyJson } from '../../../__tests__/utils';
import { parser } from '../src/';

describe('vba parser', () => {
  it('parse correctly', () => {
    const code = `
sub main
MsgBox 1
end sub
`;
    const ret = parser.parse(code);

    expect(ret.error?.errorMessage).toMatchInlineSnapshot(`undefined`);

    expect(prettyJson(ret.ast)).toMatchSnapshot();
  });

  it('parse comment and line continuation correctly', () => {
    const code = `
sub main
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

  it('report error when extra ;', () => {
    const code = `
    sub main
    msgbox 1
    msgbox 2;
    msgbox 3
    end sub
    `;
    const ret = parser.parse(code);

    expect(ret.error?.errorMessage).toMatchInlineSnapshot(`
      "syntax error at line 4:

          sub main
          msgbox 1
          msgbox 2;
      ------------^
          msgbox 3
          end sub
          
      'COLON', 'REMCOMMENT', 'COMMENT', 'NEWLINE', 'LPAREN', ',', 'EQ', 'NEQ', 'LT', 'GT', 'LEQ', 'GEQ', 'ISNOT', 'IS', 'AND', 'OR', 'XOR', 'AMPERSAND', 'MINUS', 'PLUS', 'MOD', 'IDIV', 'DIV', 'MULT', 'POW' expected.
      current token: '$UNKNOWN'."
    `);

    expect(prettyJson(ret.ast)).toMatchSnapshot();
  });

  it('report error when missing end sub', () => {
    const code = `
    sub main
    msgbox 1
    msgbox 2
    msgbox 3

    sub test
    msgbox 4
    end sub
    `;
    const ret = parser.parse(code);

    expect(ret.error?.errorMessage).toMatchInlineSnapshot(`
      "syntax error at line 7:

          sub main
          msgbox 1
          msgbox 2
          msgbox 3

          sub test
      ----^
          msgbox 4
          end sub
          
      'END_SUB' expected.
      current token: 'SUB'."
    `);

    expect(prettyJson(ret.ast)).toMatchSnapshot();
  });
});
