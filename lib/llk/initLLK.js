// @ts-check

const { parser, productionsBySymbol } = require('../data');

function initLLK() {
  const { productions } = parser;
  for (let i = 0; i < productions.length; i++) {
    const p = productions[i];
    const symbol = parser.getProductionSymbol(p);
    productionsBySymbol[symbol] = productionsBySymbol[symbol] || {
      ruleIndexes: [],
    };
    productionsBySymbol[symbol][i] = p;
    productionsBySymbol[symbol].ruleIndexes.push(i);
  }
}

function isSymbol(s) {
  return !!productionsBySymbol[s];
}

module.exports = {
  initLLK,
  isSymbol,
};
