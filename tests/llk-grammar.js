module.exports = () => ({
  productions: [
    {
      symbol: 'exp',
      rhs: ['NUMBER', 'post*'],
      label: 'binary-exp',
    },

    {
      symbol: 'post',
      skipAstNode: true,
      rhs: ['+', 'NUMBER'],
    },
  ],

  // operators: [
  //   ['left', '+', '-'],
  //   ['left', '*', '/'],
  //   ['right', '^'],
  //   ['right', 'UMINUS'],
  // ],

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
