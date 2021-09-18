module.exports = () => ({
  productions: [
    {
      symbol: 'exp',
      rhs: ['exp', '+', 'exp'],
      label: 'binary-exp',
    },
    {
      symbol: 'exp',
      rhs: ['exp', '-', 'exp'],
      label: 'binary-exp',
    },
    {
      symbol: 'exp',
      rhs: ['exp', '*', 'exp'],
      label: 'binary-exp',
    },
    {
      symbol: 'exp',
      rhs: ['exp', '/', 'exp'],
      label: 'binary-exp',
    },
    {
      symbol: 'exp',
      rhs: ['exp', '^', 'exp'],
      label: 'binary-exp',
    },
    {
      symbol: 'exp',
      rhs: ['-', 'exp'],
      precedence: 'UMINUS',
    },
    {
      symbol: 'exp',
      rhs: ['NUMBER'],
    },
    {
      symbol: 'exp',
      rhs: ['(', 'exp', ')'],
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
});
