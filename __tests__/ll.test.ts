import LLGrammar from '../src/ll/LLGrammar';
// @ts-ignore
import AstProcessor from '../examples/cal-ll/action/AstProcessor';
// @ts-ignore
import calGrammar from '../examples/cal-ll/action/cal-grammar';
import { prettyJson, run } from './utils';
import type Parser from '../src/parser';
import { AstErrorNode } from '../src/parser';

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
  it('ok', () => {});

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
            token: 'HIDDEN',
            channel: 'HIDDEN',
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
    expect(prettyJson(ret.ast)).toMatchSnapshot();
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

    expect(prettyJson(grammar.productionInstances.map((p) => p.toString())))
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

    expect(prettyJson(grammar.productionInstances.map((p) => p + '')))
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
    const ast = parser.parse('1+2+3', { onAction() {} }).ast;
    expect(prettyJson(ast)).toMatchSnapshot();
  });

  it('ast works', () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const ast = parser.parse('1+2*3', { onAction() {} }).ast;
    expect(prettyJson(ast)).toMatchSnapshot();
  });

  it('ast works', () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const ast = parser.parse('1+2*4-5^2^3', { onAction() {} }).ast;
    expect(prettyJson(ast)).toMatchSnapshot();
  });

  it('error detection works', () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const { ast, errorNode } = parser.parse('1+2*', { onAction() {} });
    expect(prettyJson(ast)).toMatchSnapshot();
    expect(prettyJson(errorNode)).toMatchInlineSnapshot(`
      "{
        'start': 4,
        'end': 4,
        'firstLine': 1,
        'lastLine': 1,
        'firstColumn': 5,
        'lastColumn': 5,
        'token': '$EOF',
        'type': 'token',
        'text': '',
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
            't': '$EOF',
            'text': '',
            'firstLine': 1,
            'firstColumn': 5,
            'lastLine': 1,
            'lastColumn': 5,
            'token': '$EOF',
            'start': 4,
            'end': 4
          }
        }
      }"
    `);
  });

  it('onAction works', () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = run(code);
    const astProcessor = new AstProcessor();
    parser.astProcessor = astProcessor;
    parser.parse('1 + 2*3-2^1^3');
    parser.astProcessor = null;
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
    let errorCalled: AstErrorNode | null = null;
    const parser: typeof Parser = run(code);
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
            "t": "/",
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
        "lastColumn": 4,
        "lastLine": 1,
        "start": 2,
        "text": "/",
        "token": "/",
        "type": "token",
      }
    `);
  });

  it('add error recovery works', () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    let errorCalled: AstErrorNode | null = null;
    const parser: typeof Parser = run(code);
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
    expect(prettyJson(ast)).toMatchSnapshot();
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
          't': '$EOF',
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
            "t": "$EOF",
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
        "lastColumn": 3,
        "lastLine": 1,
        "start": 2,
        "text": "",
        "token": "$EOF",
        "type": "token",
      }
    `);
  });
});
