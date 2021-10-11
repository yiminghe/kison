// @ts-check

const gened = {
  productionSkipAstNodeSet: undefined,
  symbolStack: [{}],
  productionsBySymbol: {},
  cachedStateMatchMap: undefined,
  productionAddAstNodeFlag: 1,
  productionEndFlag: 2,
};

module.exports = Object.assign({
  gened,
  Lexer: {},
  lexer: {},
  parser: {},
}, gened);
