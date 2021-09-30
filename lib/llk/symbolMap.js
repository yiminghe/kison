// @ts-check

const { symbolMap, parser } = require('../data');

function buildSymbolMap() {
  for (const p of parser.productions) {
    symbolMap[parser.getProductionSymbol(p)] = true;
  }
}

function isSymbol(s) {
  return !!symbolMap[s];
}

module.exports = {
  buildSymbolMap,
  isSymbol,
};
