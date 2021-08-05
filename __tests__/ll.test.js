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
  it("eliminate left recursive works", () => {
    var grammar = new LLGrammar({
      productions: [
        {
          symbol: "S",
          rhs: ["A"]
        },
        {
          symbol: "B",
          rhs: ["d"]
        },
        {
          symbol: "A",
          rhs: ["a", "B"]
        },
        {
          symbol: "A",
          rhs: ["A", "c", "b"]
        }
      ],
      lexer: {
        rules: [
          {
            regexp: /^a/,
            token: "a"
          },
          {
            regexp: /^b/,
            token: "b"
          },
          {
            regexp: /^c/,
            token: "c"
          },
          {
            regexp: /^d/,
            token: "d"
          }
        ]
      }
    });

    grammar.build();

    expect(prettyJson(grammar.productions.map(p => p.toString())))
      .toMatchInlineSnapshot(`
      "[
        'S => A ',
        'B => d ',
        '(A)1_ => c b (A)1_ ',
        'A => a B (A)1_ ',
        '(A)1_ => '
      ]"
    `);
  });

  it("extract common prefix works", () => {
    var grammar = new LLGrammar({
      productions: [
        {
          symbol: "S",
          rhs: ["b"]
        },
        {
          symbol: "S",
          rhs: ["a", "A"]
        },
        {
          symbol: "S",
          rhs: ["a", "B"]
        },
        {
          symbol: "S",
          rhs: ["a", "C"]
        }
      ],
      lexer: {
        rules: [
          {
            regexp: /^a/,
            token: "a"
          },
          {
            regexp: /^b/,
            token: "b"
          }
        ]
      }
    });

    grammar.build();

    expect(prettyJson(grammar.productions.map(p => p + "")))
      .toMatchInlineSnapshot(`
      "[
        'S => b ',
        '_1(S) => C ',
        '_1(S) => B ',
        '_1(S) => A ',
        'S => a _1(S) '
      ]"
    `);
  });

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
      "-: E ( => E -> T, E_
      -: E id => E -> T, E_
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
  it("ast works", () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = Function.call(null, code + "\n return parser;")();
    const ast = parser.parse("1+2+3").ast;
    expect(prettyJson(ast)).toMatchInlineSnapshot(`
      "{
        'symbol': 'exp',
        'children': [
          {
            'symbol': 'add',
            'children': [
              {
                'symbol': 'add',
                'children': [
                  {
                    'symbol': 'expo',
                    'label': 'single-exp',
                    'children': [
                      {
                        'symbol': 'atom',
                        'children': [
                          {
                            'text': '1',
                            'token': 'NUMBER',
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
                    'symbol': 'expo',
                    'children': [
                      {
                        'symbol': 'atom',
                        'children': [
                          {
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
                        'start': 2,
                        'end': 3,
                        'firstLine': 1,
                        'lastLine': 1,
                        'firstColumn': 3,
                        'lastColumn': 4
                      }
                    ],
                    'label': 'single-exp',
                    'start': 2,
                    'end': 3,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 3,
                    'lastColumn': 4
                  }
                ],
                'label': 'single-exp',
                'start': 0,
                'end': 3,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 1,
                'lastColumn': 4
              },
              {
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
                'symbol': 'expo',
                'children': [
                  {
                    'symbol': 'atom',
                    'children': [
                      {
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
                    'start': 4,
                    'end': 5,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 5,
                    'lastColumn': 6
                  }
                ],
                'label': 'single-exp',
                'start': 4,
                'end': 5,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 5,
                'lastColumn': 6
              }
            ],
            'label': 'single-exp',
            'start': 0,
            'end': 5,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 6
          }
        ],
        'start': 0,
        'end': 5,
        'firstLine': 1,
        'lastLine': 1,
        'firstColumn': 1,
        'lastColumn': 6
      }"
    `);
  });

  it("ast works", () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = Function.call(null, code + "\n return parser;")();
    const ast = parser.parse("1+2*3").ast;
    expect(prettyJson(ast)).toMatchInlineSnapshot(`
      "{
        'symbol': 'exp',
        'children': [
          {
            'symbol': 'add',
            'children': [
              {
                'symbol': 'expo',
                'label': 'single-exp',
                'children': [
                  {
                    'symbol': 'atom',
                    'children': [
                      {
                        'text': '1',
                        'token': 'NUMBER',
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
                'symbol': 'mul',
                'children': [
                  {
                    'symbol': 'expo',
                    'label': 'single-exp',
                    'children': [
                      {
                        'symbol': 'atom',
                        'children': [
                          {
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
                    'symbol': 'expo',
                    'label': 'single-exp',
                    'children': [
                      {
                        'symbol': 'atom',
                        'children': [
                          {
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
                  }
                ],
                'label': 'single-exp',
                'start': 2,
                'end': 5,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 3,
                'lastColumn': 6
              }
            ],
            'label': 'single-exp',
            'start': 0,
            'end': 5,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 6
          }
        ],
        'start': 0,
        'end': 5,
        'firstLine': 1,
        'lastLine': 1,
        'firstColumn': 1,
        'lastColumn': 6
      }"
    `);
  });

  it("ast works", () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = Function.call(null, code + "\n return parser;")();
    const ast = parser.parse("1+2*4-5^2^3").ast;
    expect(prettyJson(ast)).toMatchInlineSnapshot(`
      "{
        'symbol': 'exp',
        'children': [
          {
            'symbol': 'add',
            'children': [
              {
                'symbol': 'add',
                'children': [
                  {
                    'symbol': 'expo',
                    'label': 'single-exp',
                    'children': [
                      {
                        'symbol': 'atom',
                        'children': [
                          {
                            'text': '1',
                            'token': 'NUMBER',
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
                    'symbol': 'mul',
                    'children': [
                      {
                        'symbol': 'expo',
                        'label': 'single-exp',
                        'children': [
                          {
                            'symbol': 'atom',
                            'children': [
                              {
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
                        'symbol': 'expo',
                        'label': 'single-exp',
                        'children': [
                          {
                            'symbol': 'atom',
                            'children': [
                              {
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
                      }
                    ],
                    'label': 'single-exp',
                    'start': 2,
                    'end': 5,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 3,
                    'lastColumn': 6
                  }
                ],
                'label': 'single-exp',
                'start': 0,
                'end': 5,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 1,
                'lastColumn': 6
              },
              {
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
                'symbol': 'expo',
                'children': [
                  {
                    'symbol': 'atom',
                    'children': [
                      {
                        'text': '5',
                        'token': 'NUMBER',
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
                  },
                  {
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
                    'symbol': 'expo',
                    'label': 'single-exp',
                    'children': [
                      {
                        'symbol': 'atom',
                        'children': [
                          {
                            'text': '2',
                            'token': 'NUMBER',
                            'start': 8,
                            'end': 9,
                            'firstLine': 1,
                            'lastLine': 1,
                            'firstColumn': 9,
                            'lastColumn': 10
                          }
                        ],
                        'start': 8,
                        'end': 9,
                        'firstLine': 1,
                        'lastLine': 1,
                        'firstColumn': 9,
                        'lastColumn': 10
                      },
                      {
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
                        'symbol': 'expo',
                        'label': 'single-exp',
                        'children': [
                          {
                            'symbol': 'atom',
                            'children': [
                              {
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
                            'start': 10,
                            'end': 11,
                            'firstLine': 1,
                            'lastLine': 1,
                            'firstColumn': 11,
                            'lastColumn': 12
                          }
                        ],
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
                'label': 'single-exp',
                'start': 6,
                'end': 11,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 7,
                'lastColumn': 12
              }
            ],
            'label': 'single-exp',
            'start': 0,
            'end': 11,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 12
          }
        ],
        'start': 0,
        'end': 11,
        'firstLine': 1,
        'lastLine': 1,
        'firstColumn': 1,
        'lastColumn': 12
      }"
    `);
  });

  it("error detection works", () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = Function.call(null, code + "\n return parser;")();
    const { ast, errorNode } = parser.parse("1+2*");
    expect(prettyJson(ast)).toMatchInlineSnapshot(`
      "{
        'symbol': 'exp',
        'children': [
          {
            'symbol': 'add',
            'children': [
              {
                'symbol': 'expo',
                'label': 'single-exp',
                'children': [
                  {
                    'symbol': 'atom',
                    'children': [
                      {
                        'text': '1',
                        'token': 'NUMBER',
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
                'symbol': 'mul',
                'children': [
                  {
                    'symbol': 'expo',
                    'label': 'single-exp',
                    'children': [
                      {
                        'symbol': 'atom',
                        'children': [
                          {
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
                    'error': {
                      'errorMessage': 'syntax error at line 1:\\\\n1+2*\\\\n----^\\\\nexpect NUMBER, (\\\\ncurrent token is $EOF',
                      'expected': [
                        'NUMBER',
                        '('
                      ],
                      'symbol': 'expo',
                      'lexer': {
                        't': '$EOF',
                        'token': '$EOF',
                        'start': 4,
                        'end': 4,
                        'firstLine': 1,
                        'firstColumn': 5,
                        'lastLine': 1,
                        'lastColumn': 5
                      }
                    },
                    'token': '$EOF',
                    'start': 4,
                    'end': 4,
                    'firstLine': 1,
                    'firstColumn': 5,
                    'lastLine': 1,
                    'lastColumn': 5
                  }
                ],
                'label': 'single-exp',
                'start': 2,
                'end': 4,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 3,
                'lastColumn': 5
              }
            ],
            'label': 'single-exp',
            'start': 0,
            'end': 4,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
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
        'error': {
          'errorMessage': 'syntax error at line 1:\\\\n1+2*\\\\n----^\\\\nexpect NUMBER, (\\\\ncurrent token is $EOF',
          'expected': [
            'NUMBER',
            '('
          ],
          'symbol': 'expo',
          'lexer': {
            't': '$EOF',
            'token': '$EOF',
            'start': 4,
            'end': 4,
            'firstLine': 1,
            'firstColumn': 5,
            'lastLine': 1,
            'lastColumn': 5
          }
        },
        'token': '$EOF',
        'start': 4,
        'end': 4,
        'firstLine': 1,
        'firstColumn': 5,
        'lastLine': 1,
        'lastColumn': 5
      }"
    `);
  });

  it("onAction works", () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    const parser = Function.call(null, code + "\n return parser;")();
    const astProcessor = new AstProcessor();
    parser.parse("1 + 2*3-2^1^3", {
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

  it("del error recovery works", () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    let errorCalled = 0;
    const parser = Function.call(null, code + "\n return parser;")();
    parser.parse("1+/2", {
      onErrorRecovery({ errorNode }, { action }) {
        errorCalled = errorNode;
        expect(action).toBe("del");
        return { action };
      }
    });
    expect(errorCalled).toMatchInlineSnapshot(`
      Object {
        "end": 3,
        "error": Object {
          "errorMessage": "syntax error at line 1:
      1+/2
      --^
      expect NUMBER, (
      current token is /",
          "expected": Array [
            "NUMBER",
            "(",
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
          "symbol": "mul",
        },
        "firstColumn": 3,
        "firstLine": 1,
        "lastColumn": 4,
        "lastLine": 1,
        "start": 2,
        "text": "/",
        "token": "/",
      }
    `);
  });

  it("add error recovery works", () => {
    var grammar = new LLGrammar(calGrammar());
    const code = grammar.genCode();
    let errorCalled = 0;
    const parser = Function.call(null, code + "\n return parser;")();
    const { ast, error, errorNode } = parser.parse("1+", {
      onErrorRecovery({ errorNode }, { action }) {
        errorCalled = errorNode;
        if (action === "add" && errorNode.error.expected[0] === "NUMBER") {
          return {
            action,
            token: "NUMBER",
            text: "0"
          };
        }
      }
    });
    expect(errorNode).toMatchInlineSnapshot(`undefined`);
    expect(prettyJson(ast)).toMatchInlineSnapshot(`
      "{
        'symbol': 'exp',
        'children': [
          {
            'symbol': 'add',
            'children': [
              {
                'symbol': 'expo',
                'label': 'single-exp',
                'children': [
                  {
                    'symbol': 'atom',
                    'children': [
                      {
                        'text': '1',
                        'token': 'NUMBER',
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
                'symbol': 'expo',
                'children': [
                  {
                    'symbol': 'atom',
                    'children': [
                      {
                        'token': 'NUMBER',
                        'start': 2,
                        'end': 2,
                        'firstLine': 1,
                        'firstColumn': 3,
                        'lastLine': 1,
                        'lastColumn': 3,
                        'text': '0'
                      }
                    ],
                    'start': 2,
                    'end': 2,
                    'firstLine': 1,
                    'lastLine': 1,
                    'firstColumn': 3,
                    'lastColumn': 3
                  }
                ],
                'label': 'single-exp',
                'start': 2,
                'end': 2,
                'firstLine': 1,
                'lastLine': 1,
                'firstColumn': 3,
                'lastColumn': 3
              }
            ],
            'label': 'single-exp',
            'start': 0,
            'end': 2,
            'firstLine': 1,
            'lastLine': 1,
            'firstColumn': 1,
            'lastColumn': 3
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
        'errorMessage': 'syntax error at line 1:\\\\n1+\\\\n--^\\\\nexpect NUMBER, (\\\\ncurrent token is $EOF',
        'expected': [
          'NUMBER',
          '('
        ],
        'symbol': 'mul',
        'lexer': {
          't': '$EOF',
          'token': '$EOF',
          'start': 2,
          'end': 2,
          'firstLine': 1,
          'firstColumn': 3,
          'lastLine': 1,
          'lastColumn': 3
        },
        'recovery': true
      }"
    `);
    expect(errorCalled).toMatchInlineSnapshot(`
      Object {
        "end": 2,
        "error": Object {
          "errorMessage": "syntax error at line 1:
      1+
      --^
      expect NUMBER, (
      current token is $EOF",
          "expected": Array [
            "NUMBER",
            "(",
          ],
          "lexer": Object {
            "end": 2,
            "firstColumn": 3,
            "firstLine": 1,
            "lastColumn": 3,
            "lastLine": 1,
            "start": 2,
            "t": "$EOF",
            "token": "$EOF",
          },
          "recovery": true,
          "symbol": "mul",
        },
        "firstColumn": 3,
        "firstLine": 1,
        "lastColumn": 3,
        "lastLine": 1,
        "start": 2,
        "token": "$EOF",
      }
    `);
  });
});
