const startGroup = `'('`;
const endGroup = `')'`;
const alternative = `'|'`;

module.exports = () => ({
  productions: [
    {
      symbol: 'program',
      rhs: ['statements'],
    },
    {
      symbol: 'statements',
      rhs: [startGroup, 'exp', 'NEW_LINE', endGroup + '+'],
    },
    {
      symbol: 'exp',
      rhs: [
        'exp',
        '+',
        'exp',
        alternative,
        'exp',
        '-',
        'exp',
        alternative,
        'exp',
        '*',
        'exp',
        alternative,
        'exp',
        '/',
        'exp',
        alternative,
        'exp',
        '^',
        'exp',
      ],
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
      label: 'singleExp',
      rhs: ['NUMBER'],
    },
    {
      symbol: 'exp',
      label: 'groupExp',
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
        regexp: /^\n+/,
        token: 'NEW_LINE',
      },
      {
        regexp: /^\u0020+/,
      },
      {
        regexp: /^[0-9]+(\.[0-9]+)?\b/,
        token: 'NUMBER',
      },
    ],
  },
});
