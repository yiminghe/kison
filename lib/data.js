// @ts-check

const gened = {
  rootSmUnit: undefined,
  productionSkipAstNodeSet: undefined,
  symbolStack: [{}],
  productionsBySymbol: {},
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
