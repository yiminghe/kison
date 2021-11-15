import Lexer from '../src/Lexer';

describe('lexer', () => {
  it('more works', () => {
    const lexer = new Lexer({
      rules: [
        {
          token: 'OPEN',
          regexp: /"/,
          more: true,
          action(this: Lexer) {
            this.pushState('str');
          },
        },
        {
          token: 'STRING',
          regexp: /"/,
          state: ['str'],
          action(this: Lexer) {
            this.popState();
          },
        },
        {
          token: 'TEXT',
          regexp: /./,
          state: ['str'],
          more: true,
        },
      ],
    });

    lexer.resetInput('"12"3');

    let token = lexer.lex();

    expect(token).toMatchInlineSnapshot(`
      Object {
        "channel": undefined,
        "end": 4,
        "firstColumn": 1,
        "firstLine": 1,
        "lastColumn": 5,
        "lastLine": 1,
        "start": 0,
        "t": "STRING",
        "text": "\\"12\\"",
        "token": "STRING",
      }
    `);

    token = lexer.lex();

    expect(token).toMatchInlineSnapshot(`
      Object {
        "channel": undefined,
        "end": 5,
        "firstColumn": 5,
        "firstLine": 1,
        "lastColumn": 6,
        "lastLine": 1,
        "start": 4,
        "t": "$UNKNOWN",
        "text": "3",
        "token": "$UNKNOWN",
      }
    `);
  });

  it('predict works', () => {
    const lexer = new Lexer({
      rules: [
        {
          regexp: /\s+/,
        },
        {
          token: 'ENUM',
          regexp: /\w+/,
          predict(match: any[]) {
            return match[0].toLowerCase() === 'enum';
          },
        },
        {
          token: 'ID',
          regexp: /\w+/,
        },
      ],
    });

    lexer.resetInput('enum id');
    expect(lexer.lex()).toMatchInlineSnapshot(`
      Object {
        "channel": undefined,
        "end": 4,
        "firstColumn": 1,
        "firstLine": 1,
        "lastColumn": 5,
        "lastLine": 1,
        "start": 0,
        "t": "ENUM",
        "text": "enum",
        "token": "ENUM",
      }
    `);
    expect(lexer.lex()).toMatchInlineSnapshot(`
      Object {
        "channel": undefined,
        "end": 7,
        "firstColumn": 6,
        "firstLine": 1,
        "lastColumn": 8,
        "lastLine": 1,
        "start": 5,
        "t": "ID",
        "text": "id",
        "token": "ID",
      }
    `);
    expect(lexer.lex()).toMatchInlineSnapshot(`
      Object {
        "end": 7,
        "firstColumn": 8,
        "firstLine": 1,
        "lastColumn": 8,
        "lastLine": 1,
        "start": 7,
        "t": "$EOF",
        "text": "",
        "token": "$EOF",
      }
    `);
  });
});
