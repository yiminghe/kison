// @ts-check

const data = require('../data');

let { productionsBySymbol } = data;

function isSymbol(s) {
  return !!productionsBySymbol[s];
}

module.exports = {
  isSymbol,
  // setStateCacheMatch,
  // getStateCacheMatch,
  // clearStateMatchCache,
};
