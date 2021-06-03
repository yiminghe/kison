module.exports = () => ({
  productions: [
    {
      symbol: "Exp",
      rhs: ["AddExp"]
    },
    {
      symbol: "AddExp",
      rhs: ["MulExp", "AddExp1"]
    },
    {
      symbol: "AddExp1",
      rhs: [
        "+",
        function(astProcessor) {
          astProcessor.pushStack(lexer.text);
        },
        "MulExp",
        function(astProcessor) {
          astProcessor.createOpNode("+");
        },
        "AddExp1"
      ]
    },
    {
      symbol: "AddExp1",
      rhs: []
    },
    {
      symbol: "MulExp",
      rhs: ["PrimExp", "MulExp1"]
    },
    {
      symbol: "MulExp1",
      rhs: [
        "*",
        function(astProcessor) {
          astProcessor.pushStack(lexer.text);
        },
        "PrimExp",
        function(astProcessor) {
          astProcessor.createOpNode("*");
        },
        "MulExp1"
      ]
    },
    {
      symbol: "MulExp1",
      rhs: []
    },
    {
      symbol: "PrimExp",
      rhs: [
        "NUMBER",
        function(astProcessor, lexer) {
          astProcessor.pushStack(Number(lexer.text));
        }
      ]
    },
    {
      symbol: "PrimExp",
      rhs: ["(", "AddExp", ")"]
    }
  ],

  lexer: {
    rules: [
      {
        regexp: /^\s+/
      },
      {
        regexp: /^[0-9]+(\.[0-9]+)?\b/,
        token: "NUMBER"
      },
      {
        regexp: /^\+/,
        token: "+"
      },
      {
        regexp: /^-/,
        token: "-"
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
        regexp: /^\//,
        token: "/"
      },
      {
        // force to match one for error message
        regexp: /^./,
        token: "ERROR_LA"
      }
    ]
  }
});
