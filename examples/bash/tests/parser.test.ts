import { prettyJson } from '../../../__tests__/utils';
import { parser } from '../src/';

describe('bash parser', () => {
  it('token correctly', () => {
    const code = `
    curl "https://api.test.com/" -u "some_username:some_password"
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

    expect(prettyJson(ret.ast)).toMatchSnapshot();
  });
});
