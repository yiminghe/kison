// @ts-check

const { parser, productionsBySymbol, rootSmUnit } = require('../data');
const { buildRhsSM } = require('./sm');
const { filterRhs } = require('../utils');

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
  const production = productions[0];

  // @ts-ignore
  rootSmUnit = {};

  Object.assign(rootSmUnit, {
    unit: buildRhsSM(
      parser.getProductionSymbol(production),
      filterRhs(parser.getProductionRhs(production)),
      0,
    ),
    ruleIndex: 0,
  });
}

module.exports = {
  initLLK,
};
