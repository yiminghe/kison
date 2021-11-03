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
