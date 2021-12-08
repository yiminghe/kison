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
          
      'IDENTIFIER', 'IMP', 'XOR', 'WITHEVENTS', 'WITH', 'WHILE', 'WEND', 'VARIANT', 'UNTIL', 'TYPEOF', 'TRUE', 'TO', 'THEN', 'SUB', 'STRING', 'STOP', 'STEP', 'STATIC', 'SINGLE', 'SET', 'SELECT', 'RETURN', 'RESUME', 'RESET', 'REDIM', 'RAISEEVENT', 'PUBLIC', 'PTRSAFE', 'PROPERTY_SET', 'PROPERTY_LET', 'PROPERTY_GET', 'PRIVATE', 'PRESERVE', 'PARAMARRAY', 'OR', 'OPTION_PRIVATE_MODULE', 'OPTION_COMPARE', 'OPTION_EXPLICIT', 'OPTION_BASE', 'OPTIONAL', 'ON', 'ON_LOCAL_ERROR', 'ON_ERROR', 'NULL', 'NOTHING', 'NOT', 'NEW', 'NEXT', 'MOD', 'MACRO_END_IF', 'MACRO_ELSE', 'MACRO_ELSEIF', 'MACRO_IF', 'MACRO_CONST', 'LSET', 'LIKE', 'LIB', 'LET', 'LEN', 'LOOP', 'LONG', 'INTEGER', 'IS', 'ISNOT', 'IN', 'IMPLEMENTS', 'IF', 'GOTO', 'GOSUB', 'GLOBAL', 'GET', 'FUNCTION', 'FOR', 'FRIEND', 'FALSE', 'EXIT_SUB', 'EXIT_PROPERTY', 'EXIT_FUNCTION', 'EXIT_FOR', 'EXIT_DO', 'EVENT', 'ERASE', 'EQV', 'ENUM', 'END', 'END_WITH', 'END_TYPE', 'END_SUB', 'END_SELECT', 'END_PROPERTY', 'END_IF', 'END_FUNCTION', 'END_ENUM', 'ELSEIF', 'ELSE', 'EACH', 'DOUBLE', 'DO', 'DIM', 'DEFVAR', 'DEFSTR', 'DEFSNG', 'DEFOBJ', 'DEFLNG', 'DEFINT', 'DEFCUR', 'DEFDEC', 'DEFDBL', 'DEFDATE', 'DEFBYTE', 'DEFBOOL', 'DECLARE', 'DATE', 'CONST', 'CASE', 'CALL', 'BYTE', 'BYREF', 'BYVAL', 'BOOLEAN', 'BEGIN', 'AS', 'ATTRIBUTE', 'AND', 'ALIAS', 'SPACE_DOT' expected.
      current token: 'SUB'."
    `);

    expect(prettyJson(ret.ast)).toMatchSnapshot();
  });
});
