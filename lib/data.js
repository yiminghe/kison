// @ts-check

const gened = {
  START_TAG: '$START',
  smUnitBySymbol: {},
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
