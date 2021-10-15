import LLGrammar from '../lib/ll/LLGrammar';
import AstProcessor from '../examples/cal-ll/AstProcessor';
import calGrammar from '../examples/cal-ll/cal-grammar';
import { prettyJson, run } from './utils';

function getGrammar() {
  var grammar = new LLGrammar({
    productions: [
      {
        symbol: 'E',
        rhs: ['T', 'E_'],
      },
      {
        symbol: 'E_',
        rhs: ['+', 'T', 'E_'],
      },
      {
        symbol: 'E_',
        rhs: [],
      },
      {
        symbol: 'T',
        rhs: ['F', 'T_'],
      },
      {
        symbol: 'T_',
        rhs: ['*', 'F', 'T_'],
      },
      {
        symbol: 'T_',
        rhs: [],
      },
      {
        symbol: 'F',
        rhs: ['(', 'E', ')'],
      },
      {
        symbol: 'F',
        rhs: ['id'],
      },
    ],
    lexer: {
      rules: [
        {
          regexp: /^\+/,
          token: '+',
        },
        {
          regexp: /^\*/,
          token: '*',
        },
        {
          regexp: /^\(/,
          token: '(',
        },
        {
          regexp: /^\)/,
          token: ')',
        },
        {
          regexp: /^\*/,
          token: '*',
        },
        {
          regexp: /^\w+/,
          token: 'id',
        },
      ],
    },
  });

  grammar.build();
  return grammar;
}

describe('ll', () => {
  it('support parse from startSymbol', () => {
    var grammar = new LLGrammar({
      productions: [
        {
          symbol: 'program',
          rhs: ['s1', 's2'],
        },
        {
          symbol: 's1',
          rhs: ['3'],
        },
        {
          symbol: 's2',
          rhs: ['exp2+'],
        },
        {
          symbol: 's2',
          rhs: ['5'],
        },
        {
          symbol: 'exp2',
          rhs: ['1'],
        },
      ],
      lexer: {
        rules: [
          {
            regexp: /^\s+/,
            token: '$HIDDEN',
          },
        ],
      },
    });
    var code = grammar.genCode();
    var parser = run(code);
    var ret = parser.parse('1 1 1 1', {
      startSymbol: 's2',
    });
    expect(ret.error).toBeFalsy();
    expect(prettyJson(ret.ast)).toMatchInlineSnapshot(`
"{
  'symbol': 's2',
  'type': 'symbol',
  'ruleIndex': 5,
  'children': [
    {
      'symbol': 'exp2',
      'type': 'symbol',
      'ruleIndex': 7,
      'children': [
        {
          'type': 'token',
          'text': '1',
          'token': '1',
          'start': 0,
          'end': 1,
          'firstLine': 1,
          'lastLine': 1,
          'firstColumn': 1,
          'lastColumn': 2
        }
      ],
      'start': 0,
      'end': 1,
      'firstLine': 1,
      'lastLine': 1,
      'firstColumn': 1,
      'lastColumn': 2
    },
    {
      'symbol': 'exp2',
      'type': 'symbol',
      'ruleIndex': 7,
      'children': [
        {
          'type': 'token',
          'text': '1',
          'token': '1',
          'start': 2,
          'end': 3,
          'firstLine': 1,
          'lastLine': 1,
          'firstColumn': 3,
          'lastColumn': 4
        }
      ],
      'start': 2,
      'end': 3,
      'firstLine': 1,
      'lastLine': 1,
      'firstColumn': 3,
      'lastColumn': 4
    },
    {
      'symbol': 'exp2',
      'type': 'symbol',
      'ruleIndex': 7,
      'children': [
        {
          'type': 'token',
          'text': '1',
          'token': '1',
          'start': 4,
          'end': 5,
          'firstLine': 1,
          'lastLine': 1,
          'firstColumn': 5,
          'lastColumn': 6
        }
      ],
      'start': 4,
      'end': 5,
      'firstLine': 1,
      'lastLine': 1,
      'firstColumn': 5,
      'lastColumn': 6
    },
    {
      'symbol': 'exp2',
      'type': 'symbol',
      'ruleIndex': 7,
      'children': [
        {
          'type': 'token',
          'text': '1',
          'token': '1',
          'start': 6,
          'end': 7,
          'firstLine': 1,
          'lastLine': 1,
          'firstColumn': 7,
          'lastColumn': 8
        }
      ],
      'start': 6,
      'end': 7,
      'firstLine': 1,
      'lastLine': 1,
      'firstColumn': 7,
      'lastColumn': 8
    }
  ],
  'start': 0,
  'firstLine': 1,
  'firstColumn': 1
}"
`);
  });

  it('eliminate left recursive works', () => {
    var grammar = new LLGrammar({
      productions: [
        {
          symbol: 'S',
          rhs: ['A'],
        },
        {
          symbol: 'B',
          rhs: ['d'],
        },
        {
          symbol: 'A',
          rhs: ['a', 'B'],
        },
        {
          symbol: 'A',
          rhs: ['A', 'c', 'b'],
        },
      ],
      lexer: {
        rules: [
          {
            regexp: /^a/,
            token: 'a',
          },
          {
            regexp: /^b/,
            token: 'b',
          },
          {
            regexp: /^c/,
            token: 'c',
          },
          {
            regexp: /^d/,
            token: 'd',
          },
        ],
      },
    });

    grammar.build();

    expect(prettyJson(grammar.productions.map((p) => p.toString())))
      .toMatchInlineSnapshot(`
      "[
        '$START => S ',
        'S => A ',
        'B => d ',
        '(A)1_ => c b (A)1_ ',
        'A => a B (A)1_ ',
        '(A)1_ => '
      ]"
    `);
  });

  it('extract common prefix works', () => {
    var grammar = new LLGrammar({
      productions: [
        {
          symbol: 'S',
          rhs: ['b'],
        },
        {
          symbol: 'S',
          rhs: ['a', 'A'],
        },
        {
          symbol: 'S',
          rhs: ['a', 'B'],
        },
        {
          symbol: 'S',
          rhs: ['a', 'C'],
        },
      ],
      lexer: {
        rules: [
          {
            regexp: /^a/,
            token: 'a',
          },
          {
            regexp: /^b/,
            token: 'b',
          },
        ],
      },
    });

    grammar.build();

    expect(prettyJson(grammar.productions.map((p) => p + '')))
      .toMatchInlineSnapshot(`
      "[
        '$START => S ',
        'S => b ',
        '_1(S) => C ',
        '_1(S) => B ',
        '_1(S) => A ',
        'S => a _1(S) '
      ]"
    `);
  });

  it('find follows works', () => {
    const grammar = getGrammar();

    expect(grammar.findFollows('E')).toMatchInlineSnapshot(`
      Object {
        "$EOF": 1,
        ")": 1,
      }
    `);

    expect(grammar.findFollows('E_')).toMatchInlineSnapshot(`
      Object {
        "$EOF": 1,
        ")": 1,
      }
    `);

    expect(grammar.findFollows('T')).toMatchInlineSnapshot(`
      Object {
        "$EOF": 1,
        ")": 1,
        "+": 1,
      }
    `);

    expect(grammar.findFollows('T_')).toMatchInlineSnapshot(`
      Object {
        "$EOF": 1,
        ")": 1,
        "+": 1,
      }
    `);

    expect(grammar.findFollows('F')).toMatchInlineSnapshot(`
      Object {
        "$EOF": 1,
        ")": 1,
        "*": 1,
        "+": 1,
      }
    `);
  });

  it('buildTable ok', () => {
    const grammar = getGrammar();

    const table = grammar.visualizeTable();

    expect(table).toMatchInlineSnapshot(`
      "-: $START ( => $START -> E
      -: $START id => $START -> E
      E ( => E -> T, E_
      E id => E -> T, E_
      E_ + => E_ -> +, T, E_
      -: E_ $EOF => E_ -> EMPTY
      -: E_ ) => E_ -> EMPTY
      T ( => T -> F, T_
      T id => T -> F, T_
      T_ * => T_ -> *, F, T_
      -: T_ + => T_ -> EMPTY
      -: T_ $EOF => T_ -> EMPTY
      -: T_ ) => T_ -> EMPTY
      F ( => F -> (, E, )
      F id => F -> id"
    `);
  });
  it('ast works', () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const ast = parser.parse('1+2+3').ast;
    expect(prettyJson(ast)).toMatchInlineSnapshot(`
      "{
        'symbol': 'exp',
        'type': 'symbol',
        'children': [
          {
            'symbol': 'exp',
            'type': 'symbol',
            'children': [
              {
                'type': 'token',
                'text': '1',
                'token': 'NUMBER',
                'start': 0,
                'end': 1,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 1,
                'lastColumn': 2
              },
              {
                'type': 'token',
                'text': '+',
                'token': '+',
                'start': 1,
                'end': 2,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 2,
                'lastColumn': 3
              },
              {
                'type': 'token',
                'text': '2',
                'token': 'NUMBER',
                'start': 2,
                'end': 3,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 3,
                'lastColumn': 4
              }
            ],
            'start': 0,
            'end': 3,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 4
          },
          {
            'type': 'token',
            'text': '+',
            'token': '+',
            'start': 3,
            'end': 4,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 4,
            'lastColumn': 5
          },
          {
            'type': 'token',
            'text': '3',
            'token': 'NUMBER',
            'start': 4,
            'end': 5,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 5,
            'lastColumn': 6
          }
        ],
        'end': 5,
        'lastLine': 1,
        'lastColumn': 6
      }"
    `);
  });

  it('ast works', () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const ast = parser.parse('1+2*3').ast;
    expect(prettyJson(ast)).toMatchInlineSnapshot(`
      "{
        'symbol': 'exp',
        'type': 'symbol',
        'children': [
          {
            'type': 'token',
            'text': '1',
            'token': 'NUMBER',
            'start': 0,
            'end': 1,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 2
          },
          {
            'type': 'token',
            'text': '+',
            'token': '+',
            'start': 1,
            'end': 2,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 2,
            'lastColumn': 3
          },
          {
            'symbol': 'exp',
            'type': 'symbol',
            'children': [
              {
                'type': 'token',
                'text': '2',
                'token': 'NUMBER',
                'start': 2,
                'end': 3,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 3,
                'lastColumn': 4
              },
              {
                'type': 'token',
                'text': '*',
                'token': '*',
                'start': 3,
                'end': 4,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 4,
                'lastColumn': 5
              },
              {
                'type': 'token',
                'text': '3',
                'token': 'NUMBER',
                'start': 4,
                'end': 5,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 5,
                'lastColumn': 6
              }
            ],
            'start': 2,
            'end': 5,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 3,
            'lastColumn': 6
          }
        ],
        'start': 0,
        'firstLine': 1,
        'firstColumn': 1
      }"
    `);
  });

  it('ast works', () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const ast = parser.parse('1+2*4-5^2^3').ast;
    expect(prettyJson(ast)).toMatchInlineSnapshot(`
      "{
        'symbol': 'exp',
        'type': 'symbol',
        'children': [
          {
            'symbol': 'exp',
            'type': 'symbol',
            'children': [
              {
                'type': 'token',
                'text': '1',
                'token': 'NUMBER',
                'start': 0,
                'end': 1,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 1,
                'lastColumn': 2
              },
              {
                'type': 'token',
                'text': '+',
                'token': '+',
                'start': 1,
                'end': 2,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 2,
                'lastColumn': 3
              },
              {
                'symbol': 'exp',
                'type': 'symbol',
                'children': [
                  {
                    'type': 'token',
                    'text': '2',
                    'token': 'NUMBER',
                    'start': 2,
                    'end': 3,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 3,
                    'lastColumn': 4
                  },
                  {
                    'type': 'token',
                    'text': '*',
                    'token': '*',
                    'start': 3,
                    'end': 4,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 4,
                    'lastColumn': 5
                  },
                  {
                    'type': 'token',
                    'text': '4',
                    'token': 'NUMBER',
                    'start': 4,
                    'end': 5,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 5,
                    'lastColumn': 6
                  }
                ],
                'start': 2,
                'end': 5,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 3,
                'lastColumn': 6
              }
            ],
            'start': 0,
            'firstLine': 1,
            'firstColumn': 1
          },
          {
            'type': 'token',
            'text': '-',
            'token': '-',
            'start': 5,
            'end': 6,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 6,
            'lastColumn': 7
          },
          {
            'symbol': 'exp',
            'type': 'symbol',
            'ruleIndex': 13,
            'children': [
              {
                'type': 'token',
                'text': '5',
                'token': 'NUMBER',
                'start': 6,
                'end': 7,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 7,
                'lastColumn': 8
              },
              {
                'type': 'token',
                'text': '^',
                'token': '^',
                'start': 7,
                'end': 8,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 8,
                'lastColumn': 9
              },
              {
                'symbol': 'exp',
                'type': 'symbol',
                'ruleIndex': 13,
                'children': [
                  {
                    'type': 'token',
                    'text': '2',
                    'token': 'NUMBER',
                    'start': 8,
                    'end': 9,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 9,
                    'lastColumn': 10
                  },
                  {
                    'type': 'token',
                    'text': '^',
                    'token': '^',
                    'start': 9,
                    'end': 10,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 10,
                    'lastColumn': 11
                  },
                  {
                    'type': 'token',
                    'text': '3',
                    'token': 'NUMBER',
                    'start': 10,
                    'end': 11,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 11,
                    'lastColumn': 12
                  }
                ],
                'start': 8,
                'end': 11,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 9,
                'lastColumn': 12
              }
            ],
            'start': 6,
            'firstLine': 1,
            'firstColumn': 7
          }
        ]
      }"
    `);
  });

  it('error detection works', () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const { ast, errorNode } = parser.parse('1+2*');
    expect(prettyJson(ast)).toMatchInlineSnapshot(`
      "{
        'symbol': 'exp',
        'type': 'symbol',
        'children': [
          {
            'type': 'token',
            'text': '1',
            'token': 'NUMBER',
            'start': 0,
            'end': 1,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 2
          },
          {
            'type': 'token',
            'text': '+',
            'token': '+',
            'start': 1,
            'end': 2,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 2,
            'lastColumn': 3
          },
          {
            'symbol': 'exp',
            'type': 'symbol',
            'children': [
              {
                'type': 'token',
                'text': '2',
                'token': 'NUMBER',
                'start': 2,
                'end': 3,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 3,
                'lastColumn': 4
              },
              {
                'type': 'token',
                'text': '*',
                'token': '*',
                'start': 3,
                'end': 4,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 4,
                'lastColumn': 5
              },
              {
                'type': 'token',
                'error': {
                  'recovery': false,
                  'errorMessage': 'syntax error at line 1:\\\\n1+2*\\\\n----^\\\\n'(', 'NUMBER', '-' expected.\\\\ncurrent token: '$EOF'.',
                  'tip': ''(', 'NUMBER', '-' expected.\\\\ncurrent token: '$EOF'.',
                  'expected': [
                    '(',
                    'NUMBER',
                    '-'
                  ],
                  'symbol': 'exp',
                  'lexer': {
                    'text': '',
                    'firstLine': 1,
                    'firstColumn': 5,
                    'lastLine': 1,
                    'lastColumn': 5,
                    'token': '$EOF',
                    'start': 4,
                    'end': 4
                  }
                },
                'text': '',
                'firstLine': 1,
                'firstColumn': 5,
                'lastLine': 1,
                'lastColumn': 5,
                'token': '$EOF',
                'start': 4,
                'end': 4
              }
            ],
            'start': 2,
            'end': 4,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 3,
            'lastColumn': 5
          }
        ],
        'start': 0,
        'end': 4,
        'firstLine': 1,
        'lastLine': 1,
        'firstColumn': 1,
        'lastColumn': 5
      }"
    `);
    expect(prettyJson(errorNode)).toMatchInlineSnapshot(`
      "{
        'type': 'token',
        'error': {
          'recovery': false,
          'errorMessage': 'syntax error at line 1:\\\\n1+2*\\\\n----^\\\\n'(', 'NUMBER', '-' expected.\\\\ncurrent token: '$EOF'.',
          'tip': ''(', 'NUMBER', '-' expected.\\\\ncurrent token: '$EOF'.',
          'expected': [
            '(',
            'NUMBER',
            '-'
          ],
          'symbol': 'exp',
          'lexer': {
            'text': '',
            'firstLine': 1,
            'firstColumn': 5,
            'lastLine': 1,
            'lastColumn': 5,
            'token': '$EOF',
            'start': 4,
            'end': 4
          }
        },
        'text': '',
        'firstLine': 1,
        'firstColumn': 5,
        'lastLine': 1,
        'lastColumn': 5,
        'token': '$EOF',
        'start': 4,
        'end': 4
      }"
    `);
  });

  it('onAction works', () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const astProcessor = new AstProcessor();
    parser.parse('1 + 2*3-2^1^3', {
      onAction({ action, token }) {
        action(astProcessor, token);
      },
    });
    expect(astProcessor.stack).toMatchInlineSnapshot(`
      Array [
        Object {
          "left": Object {
            "left": 0,
            "op": " ",
            "right": Object {
              "left": 2,
              "op": "*",
              "right": 3,
              "v": 6,
            },
            "v": undefined,
          },
          "op": "-",
          "right": Object {
            "left": 2,
            "op": "^",
            "right": Object {
              "left": 1,
              "op": "^",
              "right": 3,
              "v": 1,
            },
            "v": 2,
          },
          "v": NaN,
        },
      ]
    `);
  });

  it('del error recovery works', () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    let errorCalled = 0;
    const parser = run(code);
    parser.parse('1+/2', {
      onErrorRecovery({ errorNode }, { action }) {
        errorCalled = errorNode;
        expect(action).toBe('del');
        return { action };
      },
    });
    expect(errorCalled).toMatchInlineSnapshot(`
      Object {
        "end": 3,
        "error": Object {
          "errorMessage": "syntax error at line 1:
      1+/2
      --^
      '(', 'NUMBER', '-' expected.
      current token: '/'.",
          "expected": Array [
            "(",
            "NUMBER",
            "-",
          ],
          "lexer": Object {
            "end": 3,
            "firstColumn": 3,
            "firstLine": 1,
            "lastColumn": 4,
            "lastLine": 1,
            "start": 2,
            "text": "/",
            "token": "/",
          },
          "recovery": true,
          "symbol": "exp",
          "tip": "'(', 'NUMBER', '-' expected.
      current token: '/'.",
        },
        "firstColumn": 3,
        "firstLine": 1,
        "label": undefined,
        "lastColumn": 4,
        "lastLine": 1,
        "start": 2,
        "symbol": undefined,
        "text": "/",
        "token": "/",
        "type": "token",
      }
    `);
  });

  it('add error recovery works', () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    let errorCalled = 0;
    const parser = run(code);
    const { ast, error, errorNode } = parser.parse('1+', {
      onErrorRecovery({ errorNode }, { action }) {
        errorCalled = errorNode;
        if (
          action === 'add' &&
          errorNode.error.expected.indexOf('NUMBER') !== -1
        ) {
          return {
            action,
            token: 'NUMBER',
            text: '0',
          };
        }
      },
    });
    expect(errorNode).toMatchInlineSnapshot(`undefined`);
    expect(prettyJson(ast)).toMatchInlineSnapshot(`
      "{
        'symbol': 'exp',
        'type': 'symbol',
        'children': [
          {
            'type': 'token',
            'text': '1',
            'token': 'NUMBER',
            'start': 0,
            'end': 1,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 2
          },
          {
            'type': 'token',
            'text': '+',
            'token': '+',
            'start': 1,
            'end': 2,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 2,
            'lastColumn': 3
          },
          {
            'type': 'token',
            'text': '0',
            'token': 'NUMBER',
            'start': 2,
            'end': 2,
            'firstLine': 1,
            'firstColumn': 3,
            'lastLine': 1,
            'lastColumn': 3,
            'recovery': 'add'
          }
        ],
        'start': 0,
        'end': 2,
        'firstLine': 1,
        'lastLine': 1,
        'firstColumn': 1,
        'lastColumn': 3
      }"
    `);
    expect(prettyJson(error)).toMatchInlineSnapshot(`
      "{
        'recovery': true,
        'errorMessage': 'syntax error at line 1:\\\\n1+\\\\n--^\\\\n'(', 'NUMBER', '-' expected.\\\\ncurrent token: '$EOF'.',
        'tip': ''(', 'NUMBER', '-' expected.\\\\ncurrent token: '$EOF'.',
        'expected': [
          '(',
          'NUMBER',
          '-'
        ],
        'symbol': 'exp',
        'lexer': {
          'text': '',
          'firstLine': 1,
          'firstColumn': 3,
          'lastLine': 1,
          'lastColumn': 3,
          'token': '$EOF',
          'start': 2,
          'end': 2
        }
      }"
    `);
    expect(errorCalled).toMatchInlineSnapshot(`
      Object {
        "end": 2,
        "error": Object {
          "errorMessage": "syntax error at line 1:
      1+
      --^
      '(', 'NUMBER', '-' expected.
      current token: '$EOF'.",
          "expected": Array [
            "(",
            "NUMBER",
            "-",
          ],
          "lexer": Object {
            "end": 2,
            "firstColumn": 3,
            "firstLine": 1,
            "lastColumn": 3,
            "lastLine": 1,
            "start": 2,
            "text": "",
            "token": "$EOF",
          },
          "recovery": true,
          "symbol": "exp",
          "tip": "'(', 'NUMBER', '-' expected.
      current token: '$EOF'.",
        },
        "firstColumn": 3,
        "firstLine": 1,
        "label": undefined,
        "lastColumn": 3,
        "lastLine": 1,
        "start": 2,
        "symbol": undefined,
        "text": "",
        "token": "$EOF",
        "type": "token",
      }
    `);
  });
});
