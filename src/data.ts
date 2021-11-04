import { ProductionRule } from './Grammar';
import type Lexer from './Lexer';
import type { SymbolStateUnit } from './llk/sm';
import { Rhs } from './types';
import type { AstSymbolNode } from './AstNode';

const gened = {
  VIRTUAL_OPTIONAL_RULE_INDEX: -100 as number,
  START_TAG: '$START' as string,
  smUnitBySymbol: {} as Record<string, SymbolStateUnit>,
  productionSkipAstNodeSet: undefined as Set<number> | undefined,
  symbolStack: [{}] as any[],
  astStack: [] as AstSymbolNode[],
  productionsBySymbol: {} as Record<
    string,
    {
      productions: ProductionRule[];
      ruleIndexes: number[];
    }
  >,
  productionAddAstNodeFlag: 1,
  productionEndFlag: 2,
  globalSymbolNodeId: 0,
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
