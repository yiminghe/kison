// @ts-check
const { isSymbol } = require('./initLLK');

const { lexer } = require('../data');

const createTokenMatcher = (token) => {
  const fn = () => {
    const currentToken = lexer.getCurrentToken();
    return currentToken.t === token ? { count: 1 } : false;
  };
  fn.token = token;
  return fn;
};

module.exports = {
  createTokenMatcher,
  isSymbol,
};
