module.exports = () => ({
  lexer: {
    rules: [
      {
        regexp: /^\s+/,
        token: 'HIDDEN',
        channel: 'HIDDEN',
      },
      {
        regexp: /^[0-9]+(\.[0-9]+)?\b/,
        token: 'NUMBER',
      },
    ],
  },
});
