module.exports = () => ({
  productions: [
    {
      symbol: "expressions",
      rhs: ["AddExp"]
    },
    {
      symbol: "AddExp",
      rhs: ["MulExp", "AddExp1"]
    },
    {
      symbol: "AddExp1",
      rhs: ["add", "MulExp", "AddExp1"]
    },
    {
      symbol: "AddExp1",
      rhs: []
    },
    {
      symbol: "MulExp",
      rhs: ["Exp", "MulExp1"]
    },
    {
      symbol: "MulExp1",
      rhs: ["mul", "Exp", "MulExp1"]
    },
    {
      symbol: "MulExp1",
      rhs: []
    },
    {
      symbol: "Exp",
      rhs: ["NUMBER"]
    },
    {
      symbol: "Exp",
      rhs: ["(", "NUMBER", ")"]
    },
    {
      symbol: "add",
      rhs: ["+"]
    },
    {
      symbol: "add",
      rhs: ["-"]
    },
    {
      symbol: "mul",
      rhs: ["*"]
    },
    {
      symbol: "mul",
      rhs: ["/"]
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
