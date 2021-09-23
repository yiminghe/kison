module.exports = () => ({
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
