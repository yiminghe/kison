module.exports = () => ({
  lexer: {
    rules: [
      {
        regexp: /^\s+/
      },
      {
        regexp: /^[0-9]+(\.[0-9]+)?\b/,
        token: "NUMBER"
      },
      {
        regexp: /^\+/,
        token: "+"
      },
      {
        regexp: /^-/,
        token: "-"
      },
      {
        regexp: /^\(/,
        token: "("
      },
      {
        regexp: /^\)/,
        token: ")"
      },
      {
        regexp: /^\*/,
        token: "*"
      },
      {
        regexp: /^\//,
        token: "/"
      },
      {
        regexp: /^\^/,
        token: "^"
      },
      {
        // force to match one for error message
        regexp: /^./,
        token: "ERROR_LA"
      }
    ]
  }
});
