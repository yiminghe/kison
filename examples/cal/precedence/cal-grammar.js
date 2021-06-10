const lexerConfig = require("../../common/cal-lexer");

module.exports = () => ({
  productions: [
    {
      symbol: "Exp",
      rhs: ["primaryExpression"]
    },
    {
      symbol: "Exp",
      rhs: ["Exp", "+", "Exp"],
      action() {
        return { v: this.$1.v + this.$3.v, l: this.$1, r: this.$3, op: "+" };
      }
    },
    {
      symbol: "Exp",
      rhs: ["Exp", "^", "Exp"],
      action() {
        return {
          v: Math.pow(this.$1.v, this.$3.v),
          l: this.$1,
          r: this.$3,
          op: "^"
        };
      }
    },
    {
      symbol: "Exp",
      rhs: ["Exp", "-", "Exp"],
      action() {
        return { v: this.$1.v - this.$3.v, l: this.$1, r: this.$3, op: "-" };
      }
    },
    {
      symbol: "Exp",
      rhs: ["Exp", "*", "Exp"],
      action() {
        return { v: this.$1.v * this.$3.v, l: this.$1, r: this.$3, op: "*" };
      }
    },
    {
      symbol: "Exp",
      rhs: ["Exp", "/", "Exp"],
      action() {
        return { v: this.$1.v / this.$3.v, l: this.$1, r: this.$3, op: "/" };
      }
    },
    {
      symbol: "primaryExpression",
      rhs: ["(", "Exp", ")"],
      action() {
        return { v: this.$2, op: "()" };
      }
    },
    {
      symbol: "primaryExpression",
      rhs: ["NUMBER"],
      action() {
        return { v: Number(this.$1) };
      }
    }
  ],

  operators: [["+", "-"], ["*", "/"], ["^"]],

  rightOperators: ["^"],

  ...lexerConfig()
});
