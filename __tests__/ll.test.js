var Kison = require("../lib");
var LLGrammar = Kison.LLGrammar;

describe("ll", () => {
  it("find follows works", () => {
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
});
