import Kison from "../lib";
import AstProcessor from "./AstProcessor";
import calGrammar from "../test/cal-ll/cal-grammar";

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
    debugger;
    const astProcessor = new AstProcessor();
    parser.parse("1+2*3", {
      onAction({ action, lexer }) {
        action(astProcessor, lexer);
      }
    });
    expect(astProcessor.stack).toMatchInlineSnapshot(`
Array [
  Object {
    "left": 1,
    "right": Object {
      "left": 2,
      "right": 3,
      "type": "*",
    },
    "type": "+",
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
