import data from '../data';
let { parser, productionsBySymbol } = data;

function initLLK() {
  const { productions } = parser;
  for (let i = 0; i < productions.length; i++) {
    const p = productions[i];
    const symbol = parser.getProductionSymbol(p);
    const item = (productionsBySymbol[symbol] = productionsBySymbol[symbol] || {
      ruleIndexes: [],
      productions: [],
    });
    item.productions[i] = p;
    item.ruleIndexes.push(i);
  }
}

export { initLLK };
