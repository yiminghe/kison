module.exports = {
  productions: [
    {
      symbol: 'exp',
      rhs: ['primaryExpression'],
    },

    {
      symbol: 'exp',
      rhs: ['exp', '^', 'exp'],
      action() {
        return {
          v: Math.pow(this.$1.v, this.$3.v),
          l: this.$1,
          r: this.$3,
          op: '^',
        };
      },
    },
    {
      symbol: 'exp',
      rhs: ['exp', '-', 'exp'],
      action() {
        return { v: this.$1.v - this.$3.v, l: this.$1, r: this.$3, op: '-' };
      },
    },
    {
      symbol: 'exp',
      rhs: ['exp', '*', 'exp'],
      action() {
        return { v: this.$1.v * this.$3.v, l: this.$1, r: this.$3, op: '*' };
      },
    },
    {
      symbol: 'exp',
      rhs: ['exp', '/', 'exp'],
      action() {
        return { v: this.$1.v / this.$3.v, l: this.$1, r: this.$3, op: '/' };
      },
    },
    {
      symbol: 'exp',
      precedence: 'UMINUS',
      rhs: ['-', 'exp'],
      action() {
        return { v: -this.$2.v, op: 'UMINUS' };
      },
    },
    {
      symbol: 'exp',
      rhs: ['exp', '+', 'exp'],
      action() {
        return { v: this.$1.v + this.$3.v, l: this.$1, r: this.$3, op: '+' };
      },
    },
    {
      symbol: 'primaryExpression',
      rhs: ['(', 'exp', ')'],
      action() {
        return this.$2;
      },
    },
    {
      symbol: 'primaryExpression',
      rhs: ['NUMBER'],
      action() {
        return { v: Number(this.$1) };
      },
    },
  ],

  operators: [
    ['left', '+', '-'],
    ['left', '*', '/'],
    ['right', '^'],
    ['right', 'UMINUS'],
  ],

  lexer: {
    rules: [
      {
        regexp: /^\s+/,
        token: '$HIDDEN',
      },
      {
        regexp: /^[0-9]+(\.[0-9]+)?\b/,
        token: 'NUMBER',
      },
    ],
  },
};
