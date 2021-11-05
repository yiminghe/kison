const lexerConfig = require('../../common/cal-lexer');

module.exports = () => ({
  productions: [
    {
      symbol: 'exp',
      rhs: ['exp', '+', 'exp'],
      label: 'binaryExp',
    },

    {
      symbol: 'exp',
      rhs: ['exp', '*', 'exp'],
      label: 'binaryExp',
    },

    {
      symbol: 'exp',
      rhs: ['-', 'exp'],
      label: 'prefixExp',
      precedence: 'UMINUS',
    },
    {
      symbol: 'exp',
      rhs: ['NUMBER'],
      label: 'singleExp',
    },
  ],

  operators: [
    ['left', '+', '-'],
    ['left', '*', '/'],
    ['right', '^'],
    ['right', 'UMINUS'],
  ],

  ...lexerConfig(),
});
