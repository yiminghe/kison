const lexerConfig = require('../../common/cal-lexer');

function s() {
  this.astProcessor?.pushStack(this.lexer.getLastToken().text);
}

function c() {
  this.astProcessor?.createOpNode();
}

module.exports = () => ({
  productions: [
    {
      symbol: 'exp',
      rhs: ['(', 'exp', ')'],
    },
    {
      symbol: 'exp',
      rhs: ['exp', '+', s, 'exp', c],
    },
    {
      symbol: 'exp',
      rhs: ['exp', '-', s, 'exp', c],
    },
    {
      symbol: 'exp',
      rhs: ['exp', '*', s, 'exp', c],
    },
    {
      symbol: 'exp',
      rhs: ['exp', '/', s, 'exp', c],
    },
    {
      symbol: 'exp',
      rhs: [
        '-',
        'exp',
        () => {
          this.astProcessor?.createUnaryNode('-');
        },
      ],
      precedence: 'UMINUS',
    },
    {
      symbol: 'exp',
      rhs: ['exp', '^', s, 'exp', c],
    },

    {
      symbol: 'exp',
      rhs: [
        'NUMBER',
        function () {
          this.astProcessor?.pushStack(Number(this.lexer.getLastToken().text));
        },
      ],
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
