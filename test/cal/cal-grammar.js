module.exports = {
  productions: [
    {
      symbol: "expressions",
      rhs: ["e"]
    },

    {
      symbol: "e",
      rhs: ["e", "-", "e"],
      action() {
        return this.$1 - this.$3;
      }
    },
    {
      symbol: "e",
      rhs: ["e", "+", "e"],
      action() {
        return this.$1 + this.$3;
      }
    },
    {
      symbol: "e",
      rhs: ["NUMBER"],
      action() {
        return Number(this.$1);
      }
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
        // force to match one for error message
        regexp: /^./,
        token: "ERROR_LA"
      }
    ]
  }
};
