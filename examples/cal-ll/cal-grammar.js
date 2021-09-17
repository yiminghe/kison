const lexerConfig = require('../common/cal-lexer');

function s(astProcessor, lexer) {
  astProcessor.pushStack(lexer.text);
}

function c(astProcessor) {
  astProcessor.createOpNode();
}

module.exports = () => ({
  productions: [
    {
      symbol: 'exp',
      rhs: ['exp', '+', s, 'exp', c],
      label: 'add-exp',
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
      rhs: ['exp', '^', s, 'exp', c],
    },
    {
      symbol: 'exp',
      rhs: [
        '-',
        'exp',
        astProcessor => {
          astProcessor.createUnaryNode('-');
        },
      ],
      precedence: 'UMINUS',
    },
    {
      symbol: 'exp',
      rhs: [
        'NUMBER',
        function(astProcessor, lexer) {
          astProcessor.pushStack(Number(lexer.text));
        },
      ],
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

  ...lexerConfig(),
});
