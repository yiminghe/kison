// @ts-check
const { isSymbol } = require('./symbolMap');

const { stateMachine, parser } = require('../data');

const createTokenMatcher = (token) => () => {
  const currentToken = parser.lexer.getCurrentToken();
  return currentToken.t === token ? { count: 1 } : false;
};

module.exports = {
  createTokenMatcher,
  isSymbol,
};
