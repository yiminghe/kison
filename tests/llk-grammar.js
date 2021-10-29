module.exports={
  productions: [
    {
      symbol: 'program',
      rhs: ['exp+', 'exp2+'],
    },
    {
      symbol: 'exp',
      rhs: ['1'],
    },
    {
      symbol: 'exp2',
      rhs: ['1'],
    },
  ],
  lexer: {
    rules: [
      {
        regexp: /^\s+/,
        token: '$HIDDEN',
      },
    ],
  },
}