import Kison from "../lib";
import AstProcessor from "../examples/cal-ll/AstProcessor";
import calGrammar from "../examples/cal-ll/cal-grammar";
import { prettyJson } from "./utils";

var LLGrammar = Kison.LLGrammar;

function getGrammar() {
  var grammar = new LLGrammar({
    productions: [
      {
        symbol: "E",
        rhs: ["T", "E_"]
      },
      {
        symbol: "E_",
        rhs: ["+", "T", "E_"]
      },
      {
        symbol: "E_",
        rhs: []
      },
      {
        symbol: "T",
        rhs: ["F", "T_"]
      },
      {
        symbol: "T_",
        rhs: ["*", "F", "T_"]
      },
      {
        symbol: "T_",
        rhs: []
      },
      {
        symbol: "F",
        rhs: ["(", "E", ")"]
      },
      {
        symbol: "F",
        rhs: ["id"]
      }
    ],
    lexer: {
      rules: [
        {
          regexp: /^\+/,
          token: "+"
        },
        {
          regexp: /^\*/,
          token: "*"
        },
        {
          regexp: /^\(/,
          token: "("
        },
        {
          regexp: /^\)/,
          token: ")"
        },
        {
          regexp: /^\*/,
          token: "*"
        },
        {
          regexp: /^\w+/,
          token: "id"
        }
      ]
    }
  });

  grammar.build();
  return grammar;
}

describe("ll", () => {
  it("find follows works", () => {
    const grammar = getGrammar();

    expect(grammar.findFollows("E")).toMatchInlineSnapshot(`
      Object {
        "$EOF": 1,
        ")": 1,
      }
    `);

    expect(grammar.findFollows("E_")).toMatchInlineSnapshot(`
      Object {
        "$EOF": 1,
        ")": 1,
      }
    `);

    expect(grammar.findFollows("T")).toMatchInlineSnapshot(`
      Object {
        "$EOF": 1,
        ")": 1,
        "+": 1,
      }
    `);

    expect(grammar.findFollows("T_")).toMatchInlineSnapshot(`
      Object {
        "$EOF": 1,
        ")": 1,
        "+": 1,
      }
    `);

    expect(grammar.findFollows("F")).toMatchInlineSnapshot(`
      Object {
        "$EOF": 1,
        ")": 1,
        "*": 1,
        "+": 1,
      }
    `);
  });

  it("buildTable ok", () => {
    const grammar = getGrammar();

    const table = grammar.visualizeTable();

    expect(table).toMatchInlineSnapshot(`
      "E ( => E -> T, E_
      E id => E -> T, E_
      E_ + => E_ -> +, T, E_
      E_ $EOF => E_ -> EMPTY
      E_ ) => E_ -> EMPTY
      T ( => T -> F, T_
      T id => T -> F, T_
      T_ * => T_ -> *, F, T_
      T_ + => T_ -> EMPTY
      T_ $EOF => T_ -> EMPTY
      T_ ) => T_ -> EMPTY
      F ( => F -> (, E, )
      F id => F -> id"
    `);
  });

  it("ast works", () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = Function.call(null, code + "\n return parser;")();
    const ast = parser.parse("1+2*4-5^2^3").ast;
    expect(prettyJson(ast)).toMatchInlineSnapshot(`
"{
  'symbol': 'Exp',
  'children': [
    {
      'symbol': 'Exp+',
      'children': [
        {
          'symbol': 'Exp*',
          'children': [
            {
              'symbol': 'Exp^',
              'children': [
                {
                  'symbol': 'Exp$',
                  'children': [
                    {
                      'text': '1',
                      'firstLine': 1,
                      'firstColumn': 1,
                      'lastLine': 1,
                      'lastColumn': 2,
                      'token': 'NUMBER',
                      'start': 0,
                      'end': 1
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          'symbol': 'Exp+_',
          'children': [
            {
              'text': '+',
              'firstLine': 1,
              'firstColumn': 2,
              'lastLine': 1,
              'lastColumn': 3,
              'token': '+',
              'start': 1,
              'end': 2
            },
            {
              'symbol': 'Exp*',
              'children': [
                {
                  'symbol': 'Exp^',
                  'children': [
                    {
                      'symbol': 'Exp$',
                      'children': [
                        {
                          'text': '2',
                          'firstLine': 1,
                          'firstColumn': 3,
                          'lastLine': 1,
                          'lastColumn': 4,
                          'token': 'NUMBER',
                          'start': 2,
                          'end': 3
                        }
                      ]
                    }
                  ]
                },
                {
                  'symbol': 'Exp*_',
                  'children': [
                    {
                      'text': '*',
                      'firstLine': 1,
                      'firstColumn': 4,
                      'lastLine': 1,
                      'lastColumn': 5,
                      'token': '*',
                      'start': 3,
                      'end': 4
                    },
                    {
                      'symbol': 'Exp^',
                      'children': [
                        {
                          'symbol': 'Exp$',
                          'children': [
                            {
                              'text': '4',
                              'firstLine': 1,
                              'firstColumn': 5,
                              'lastLine': 1,
                              'lastColumn': 6,
                              'token': 'NUMBER',
                              'start': 4,
                              'end': 5
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              'symbol': 'Exp+_',
              'children': [
                {
                  'text': '-',
                  'firstLine': 1,
                  'firstColumn': 6,
                  'lastLine': 1,
                  'lastColumn': 7,
                  'token': '-',
                  'start': 5,
                  'end': 6
                },
                {
                  'symbol': 'Exp*',
                  'children': [
                    {
                      'symbol': 'Exp^',
                      'children': [
                        {
                          'symbol': 'Exp$',
                          'children': [
                            {
                              'text': '5',
                              'firstLine': 1,
                              'firstColumn': 7,
                              'lastLine': 1,
                              'lastColumn': 8,
                              'token': 'NUMBER',
                              'start': 6,
                              'end': 7
                            }
                          ]
                        },
                        {
                          'symbol': 'Exp^_',
                          'children': [
                            {
                              'text': '^',
                              'firstLine': 1,
                              'firstColumn': 8,
                              'lastLine': 1,
                              'lastColumn': 9,
                              'token': '^',
                              'start': 7,
                              'end': 8
                            },
                            {
                              'symbol': 'Exp^',
                              'children': [
                                {
                                  'symbol': 'Exp$',
                                  'children': [
                                    {
                                      'text': '2',
                                      'firstLine': 1,
                                      'firstColumn': 9,
                                      'lastLine': 1,
                                      'lastColumn': 10,
                                      'token': 'NUMBER',
                                      'start': 8,
                                      'end': 9
                                    }
                                  ]
                                },
                                {
                                  'symbol': 'Exp^_',
                                  'children': [
                                    {
                                      'text': '^',
                                      'firstLine': 1,
                                      'firstColumn': 10,
                                      'lastLine': 1,
                                      'lastColumn': 11,
                                      'token': '^',
                                      'start': 9,
                                      'end': 10
                                    },
                                    {
                                      'symbol': 'Exp^',
                                      'children': [
                                        {
                                          'symbol': 'Exp$',
                                          'children': [
                                            {
                                              'text': '3',
                                              'firstLine': 1,
                                              'firstColumn': 11,
                                              'lastLine': 1,
                                              'lastColumn': 12,
                                              'token': 'NUMBER',
                                              'start': 10,
                                              'end': 11
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}"
`);
  });

  it("error recovery works", () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = Function.call(null, code + "\n return parser;")();
    const { ast, error } = parser.parse("1+2*");
    expect(prettyJson(ast)).toMatchInlineSnapshot(`
"{
  'symbol': 'Exp',
  'children': [
    {
      'symbol': 'Exp+',
      'children': [
        {
          'symbol': 'Exp*',
          'children': [
            {
              'symbol': 'Exp^',
              'children': [
                {
                  'symbol': 'Exp$',
                  'children': [
                    {
                      'text': '1',
                      'firstLine': 1,
                      'firstColumn': 1,
                      'lastLine': 1,
                      'lastColumn': 2,
                      'token': 'NUMBER',
                      'start': 0,
                      'end': 1
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          'symbol': 'Exp+_',
          'children': [
            {
              'text': '+',
              'firstLine': 1,
              'firstColumn': 2,
              'lastLine': 1,
              'lastColumn': 3,
              'token': '+',
              'start': 1,
              'end': 2
            },
            {
              'symbol': 'Exp*',
              'children': [
                {
                  'symbol': 'Exp^',
                  'children': [
                    {
                      'symbol': 'Exp$',
                      'children': [
                        {
                          'text': '2',
                          'firstLine': 1,
                          'firstColumn': 3,
                          'lastLine': 1,
                          'lastColumn': 4,
                          'token': 'NUMBER',
                          'start': 2,
                          'end': 3
                        }
                      ]
                    }
                  ]
                },
                {
                  'symbol': 'Exp*_',
                  'children': [
                    {
                      'text': '*',
                      'firstLine': 1,
                      'firstColumn': 4,
                      'lastLine': 1,
                      'lastColumn': 5,
                      'token': '*',
                      'start': 3,
                      'end': 4
                    },
                    {
                      'error': {
                        'lexer': {
                          'text': '',
                          'firstLine': 1,
                          'firstColumn': 4,
                          'lastLine': 1,
                          'lastColumn': 5,
                          'token': '*',
                          'start': 3,
                          'end': 4
                        },
                        'errorMessage': 'syntax error at line 1:\\\\n1+2*\\\\n----^\\\\nexpect NUMBER, (',
                        'expected': [
                          'NUMBER',
                          '('
                        ],
                        'symbol': 'Exp^',
                        'token': null
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}"
`);
    expect(prettyJson(error)).toMatchInlineSnapshot(`
"{
  'lexer': {
    'text': '',
    'firstLine': 1,
    'firstColumn': 4,
    'lastLine': 1,
    'lastColumn': 5,
    'token': '*',
    'start': 3,
    'end': 4
  },
  'errorMessage': 'syntax error at line 1:\\\\n1+2*\\\\n----^\\\\nexpect NUMBER, (',
  'expected': [
    'NUMBER',
    '('
  ],
  'symbol': 'Exp^',
  'token': null
}"
`);
  });

  it("onAction works", () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = Function.call(null, code + "\n return parser;")();
    const astProcessor = new AstProcessor();
    parser.parse("1+2*3-2^1^3", {
      onAction({ action, lexer }) {
        action(astProcessor, lexer);
      }
    });
    expect(astProcessor.stack).toMatchInlineSnapshot(`
Array [
  Object {
    "left": Object {
      "left": 1,
      "op": "+",
      "right": Object {
        "left": 2,
        "op": "*",
        "right": 3,
        "v": 6,
      },
      "v": 7,
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
    "v": 5,
  },
]
`);
  });

  it("error recovery works", () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const terminals = [];
    let errorCalled = 0;
    const parser = Function.call(null, code + "\n return parser;")();
    parser.parse("1+/2", {
      onTerminal(token) {
        terminals.push(token);
      },
      onErrorRecovery({ token, top, lexer }) {
        errorCalled = lexer.showDebugInfo();
        return { action: "del" };
      }
    });
    expect(terminals).toMatchInlineSnapshot(`Array []`);
    expect(errorCalled).toMatchInlineSnapshot(`
      "1+/2
      --^"
    `);
  });
});
