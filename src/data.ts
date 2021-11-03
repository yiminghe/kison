import { ProductionRule } from './Grammar';
import type Lexer from './Lexer';
import type { SymbolStateUnit } from './llk/sm';
import { Rhs } from './types';

const gened: {
  VIRTUAL_OPTIONAL_RULE_INDEX: number;
  START_TAG: string;
  smUnitBySymbol: Record<string, SymbolStateUnit>;
  productionSkipAstNodeSet: Set<number> | undefined;
  symbolStack: any[];
  productionsBySymbol: Record<
    string,
    {
      productions: ProductionRule[];
      ruleIndexes: number[];
    }
  >;
  productionAddAstNodeFlag: 1;
  productionEndFlag: 2;
} = {
  VIRTUAL_OPTIONAL_RULE_INDEX: -100,
  START_TAG: '$START',
  smUnitBySymbol: {},
  productionSkipAstNodeSet: undefined,
  symbolStack: [{}],
  productionsBySymbol: {},
  productionAddAstNodeFlag: 1,
  productionEndFlag: 2,
};

export default {
  gened,
  Lexer: {} as typeof Lexer,
  lexer: {} as Lexer,
  productionRuleIndexMap: {} as Record<number, number>,
  parser: {} as {
    userData: any;
    table: any;
    prioritySymbolMap: Record<string, string>;
    getProductionRhs: (p: ProductionRule) => Rhs;
    getProductionSymbol: (p: ProductionRule) => string;
    getProductionLabel: (p: ProductionRule) => string;
    getProductionAction: (p: ProductionRule) => Function | undefined;
    getProductionPredict: (p: ProductionRule) => Function | undefined;
    productions: ProductionRule[];
  },
  ...gened,
};
