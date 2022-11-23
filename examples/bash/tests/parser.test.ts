import { prettyJson } from '../../../__tests__/utils';
import { Ast_Command_Node, Ast_String_Node, parser } from '../src/';

describe('bash parser', () => {
  it('token correctly', () => {
    const code = `
    curl "https://api.test.com/" -u "some_username:some_password"
`.trim();
    const ret = parser.lex(code);
    expect(ret.tokens).toMatchSnapshot();
  });

  it('token new line', () => {
    const code = `
    curl "x\\
    z" \\
     -u "a:b"
`.trim();
    const ret = parser.lex(code);
    expect(ret.tokens).toMatchSnapshot();
  });

  it('parse correctly', () => {
    const code = `
    curl "https://api.test.com/" -u "some_username:some_password"
`.trim();
    const ret = parser.parse(code);

    expect(ret.error?.errorMessage).toMatchInlineSnapshot(`undefined`);

    expect(ret.ast).toMatchSnapshot();
  });

  it('parse new line', () => {
    const code = `
    curl "x\\
z" \\
     -u "a:b"
`.trim();
    const ret = parser.parse(code);

    expect(ret.error?.errorMessage).toMatchInlineSnapshot(`undefined`);

    expect(ret.ast).toMatchSnapshot();

    const c = (ret.ast.children[0] as Ast_Command_Node).children[1]
      .children[0] as Ast_String_Node;
    expect(c.children[1].text).toBe('x\\\nz');
  });

  it('parse multiple line', () => {
    const code = `
    curl 'www.taobao.com'
    curl 'www.baidu.com'
    `;

    const ret = parser.parse(code);

    expect(ret.error?.errorMessage).toMatchInlineSnapshot(`undefined`);

    expect(ret.ast).toMatchSnapshot();
  });
});
