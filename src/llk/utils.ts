// @ts-check

import data from '../data';

let { productionsBySymbol } = data;

function isSymbol(s: string) {
  return !!productionsBySymbol[s];
}

export { isSymbol };
