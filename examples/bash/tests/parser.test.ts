import { prettyJson } from '../../../__tests__/utils';
import { parser } from '../src/';

describe('bash parser', () => {
  it('token correctly', () => {
    const code = `
    curl "https://api.test.com/" -u "some_username:some_password"
`.trim();
    const ret = parser.lex(code);
    expect(ret.tokens).toMatchInlineSnapshot(`
      Array [
        Object {
          "channel": undefined,
          "end": 4,
          "firstColumn": 1,
          "firstLine": 1,
          "lastColumn": 5,
          "lastLine": 1,
          "start": 0,
          "t": "WORD",
          "text": "curl",
          "token": "WORD",
        },
        Object {
          "channel": "HIDDEN",
          "end": 5,
          "firstColumn": 5,
          "firstLine": 1,
          "lastColumn": 6,
          "lastLine": 1,
          "start": 4,
          "t": "HIDDEN",
          "text": " ",
          "token": "HIDDEN",
        },
        Object {
          "channel": undefined,
          "end": 6,
          "firstColumn": 6,
          "firstLine": 1,
          "lastColumn": 7,
          "lastLine": 1,
          "start": 5,
          "t": "QUOTE",
          "text": "\\"",
          "token": "QUOTE",
        },
        Object {
          "channel": undefined,
          "end": 27,
          "firstColumn": 7,
          "firstLine": 1,
          "lastColumn": 28,
          "lastLine": 1,
          "start": 6,
          "t": "STRING_CONTENT",
          "text": "https://api.test.com/",
          "token": "STRING_CONTENT",
        },
        Object {
          "channel": undefined,
          "end": 28,
          "firstColumn": 28,
          "firstLine": 1,
          "lastColumn": 29,
          "lastLine": 1,
          "start": 27,
          "t": "QUOTE",
          "text": "\\"",
          "token": "QUOTE",
        },
        Object {
          "channel": "HIDDEN",
          "end": 29,
          "firstColumn": 29,
          "firstLine": 1,
          "lastColumn": 30,
          "lastLine": 1,
          "start": 28,
          "t": "HIDDEN",
          "text": " ",
          "token": "HIDDEN",
        },
        Object {
          "channel": undefined,
          "end": 31,
          "firstColumn": 30,
          "firstLine": 1,
          "lastColumn": 32,
          "lastLine": 1,
          "start": 29,
          "t": "WORD",
          "text": "-u",
          "token": "WORD",
        },
        Object {
          "channel": "HIDDEN",
          "end": 32,
          "firstColumn": 32,
          "firstLine": 1,
          "lastColumn": 33,
          "lastLine": 1,
          "start": 31,
          "t": "HIDDEN",
          "text": " ",
          "token": "HIDDEN",
        },
        Object {
          "channel": undefined,
          "end": 33,
          "firstColumn": 33,
          "firstLine": 1,
          "lastColumn": 34,
          "lastLine": 1,
          "start": 32,
          "t": "QUOTE",
          "text": "\\"",
          "token": "QUOTE",
        },
        Object {
          "channel": undefined,
          "end": 60,
          "firstColumn": 34,
          "firstLine": 1,
          "lastColumn": 61,
          "lastLine": 1,
          "start": 33,
          "t": "STRING_CONTENT",
          "text": "some_username:some_password",
          "token": "STRING_CONTENT",
        },
        Object {
          "channel": undefined,
          "end": 61,
          "firstColumn": 61,
          "firstLine": 1,
          "lastColumn": 62,
          "lastLine": 1,
          "start": 60,
          "t": "QUOTE",
          "text": "\\"",
          "token": "QUOTE",
        },
        Object {
          "end": 61,
          "firstColumn": 62,
          "firstLine": 1,
          "lastColumn": 62,
          "lastLine": 1,
          "start": 61,
          "t": "$EOF",
          "text": "",
          "token": "$EOF",
        },
      ]
    `);
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
