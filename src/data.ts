import { ProductionRule } from './Grammar';
import type Lexer from './Lexer';
import type { SymbolStateUnit } from './llk/sm';
import { Rhs } from './types';

const gened: {
  START_TAG: string;
  smUnitBySymbol: Record<string, SymbolStateUnit>;
  productionSkipAstNodeSet: Set<number> | undefined;
  symbolStack: any[];
  productionsBySymbol: Record<string, ProductionRule[]>;
  productionAddAstNodeFlag: 1;
  productionEndFlag: 2;
} = {
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
  parser: {} as {
    table: any;
    prioritySymbolMap: Record<string, string>;
    getProductionRhs: (p: ProductionRule) => Rhs;
    getProductionSymbol: (p: ProductionRule) => string;
    getProductionLabel: (p: ProductionRule) => string;
    getProductionAction: (p: ProductionRule) => Function | undefined;
    productions: ProductionRule[];
  },
  ...gened,
};