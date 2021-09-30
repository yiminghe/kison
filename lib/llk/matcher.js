// @ts-check

const { bfsMatch } = require('./bfsMatch');
const { isSymbol } = require('./symbolMap');

const { stateMachine, parser } = require('../data');

const createMatchSymbolToken = (token) => {
  const fn = isSymbol(token)
    ? () => {
        const symbolSm = stateMachine[token];
        for (const key of Object.keys(symbolSm)) {
          const m = symbolSm[key] && bfsMatch(symbolSm[key].start);
          if (m) {
            return m;
          }
        }
        for (const key of Object.keys(symbolSm)) {
          if (!symbolSm[key]) {
            return true;
          }
        }
        return false;
      }
    : () => {
        const currentToken = parser.lexer.getCurrentToken();
        return currentToken.t === token ? { count: 1 } : false;
      };
  if (!isSymbol(token)) {
    fn['token'] = token;
  } else {
    fn['symbol'] = token;
  }
  return fn;
};

module.exports = {
  createMatchSymbolToken,
  isSymbol,
};
