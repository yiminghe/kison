// @ts-check

const gened = {
  rootSmUnit: undefined,
  productionSkipAstNodeSet: undefined,
  symbolStack: [{}],
  productionsBySymbol: {},
  cachedStateMatchMap: undefined,
  productionAddAstNodeFlag: 1,
  productionEndFlag: 2,
};

module.exports = {
  gened,
  Lexer: {},
  lexer: {},
  parser: {},
  ...gened,
};
