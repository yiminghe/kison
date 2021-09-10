const lexerConfig = require("../common/cal-lexer");

module.exports = {
  productions: [
    {
      symbol: "expression",
      rhs: ["AddtiveExpression"]
    },
    {
      symbol: "AddtiveExpression",
      rhs: ["multiplicativeExpression"]
    },
    {
      symbol: "AddtiveExpression",
      rhs: ["AddtiveExpression", "+", "multiplicativeExpression"],
      action() {
        return this.$1 + this.$3;
      }
    },
    {
      symbol: "AddtiveExpression",
      rhs: ["AddtiveExpression", "-", "multiplicativeExpression"],
      action() {
        return this.$1 - this.$3;
      }
    },
    {
      symbol: "multiplicativeExpression",
      rhs: ["exponentExpression"]
    },
    {
      symbol: "multiplicativeExpression",
      rhs: ["multiplicativeExpression", "*", "primaryExpression"],
      action() {
        return this.$1 * this.$3;
      }
    },
    {
      symbol: "multiplicativeExpression",
      rhs: ["multiplicativeExpression", "/", "primaryExpression"],
      action() {
        return this.$1 / this.$3;
      }
    },
    {
      symbol: "exponentExpression",
      rhs: ["primaryExpression", "^", "exponentExpression"],
      action() {
        return this.$1 ** this.$3;
      }
    },
    {
      symbol: "exponentExpression",
      rhs: ["primaryExpression"]
    },
    {
      symbol: "primaryExpression",
      rhs: ["(", "expression", ")"],
      action() {
        return this.$2;
      }
    },
    {
      symbol: "primaryExpression",
      rhs: ["NUMBER"],
      action() {
        return Number(this.$1);
      }
    }
  ],

  ...lexerConfig()
};
