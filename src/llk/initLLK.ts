import data from '../data';
let { parser, productionsBySymbol } = data;

function initLLK() {
  const { productions } = parser;
  for (let i = 0; i < productions.length; i++) {
    const p = productions[i];
    const symbol = parser.getProductionSymbol(p);
    productionsBySymbol[symbol] = productionsBySymbol[symbol] || {
      ruleIndexes: [],
    };
    productionsBySymbol[symbol][i] = p;
    (productionsBySymbol[symbol] as any).ruleIndexes.push(i);
  }
}

export { initLLK };
