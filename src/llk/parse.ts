import data from '../data';
import utils from '../utils';
import type {
  AstTokenNode as AstTokenNodeType,
  AstErrorNode as AstErrorNodeType,
} from '../AstNode';
import type { Token } from '../parser';
import * as sm from './sm';
import * as Utils from './utils';
import type { Unit, PredictParam } from './sm';
import type { ParseError } from '../types';

const {
  AstSymbolNode,
  AstTokenNode,
  isZeroOrMoreSymbol,
  normalizeSymbol,
  isOptionalSymbol,
  defaultTransformAstNode,
  isAddAstNodeFlag,
  getAstRootNode,
  peekStack,
  pushRecoveryTokens,
  getOriginalSymbol,
  prepareLLParse,
  endLLParse,
  reduceLLAction,
  takeCareLLAction,
  takeCareLLError,
  checkLLEndError,
  getLabeledRhsForAddNodeFlag,
} = utils;

const { isSymbol } = Utils;

export interface RuleFlag {
  type: 'rule';
  ruleUnit: Unit;
  tokensLength: number;
  ruleIndex: number;
}

let {
  parser,
  lexer,
  productionEndFlag,
  productionSkipAstNodeSet,
  globalSymbolNodeId,
  astStack,
} = data;

type SymbolItem = string | number | RuleFlag | Function;

var symbolStack = data.symbolStack as SymbolItem[];

const {
  predictProductionIndexLLK,
  predictProductionIndexNextLLK,
  findExpectedTokenFromStateMachine,
} = sm;

function parse(input: string, options: any = {}) {
  prepareLLParse();

  let recoveryTokens: Token[] = [];
  const terminalNodes: AstTokenNodeType[] = [];

  let error: ParseError | undefined;

  var {
    productions,
    getProductionSymbol,
    getProductionRhs,
    getProductionLabel,
  } = parser;

  var {
    globalMatch = true,
    onErrorRecovery,
    lexerOptions = {},
    transformNode,
    startSymbol = getProductionSymbol(productions[0]),
  } = options;

  startSymbol = lexer.mapSymbol(startSymbol);

  if (transformNode !== false && !transformNode) {
    transformNode = defaultTransformAstNode;
  }

  lexer.options = lexerOptions;

  symbolStack = [startSymbol];

  lexer.resetInput(input);

  let token: Token | undefined = undefined;

  let next = null;

  let topSymbol: SymbolItem;

  let errorNode: AstErrorNodeType | undefined;

  function peekSymbolStack(n = 1) {
    let index = symbolStack.length - n;
    let currentSymbolItem = symbolStack[index];
    while (
      currentSymbolItem &&
      typeof currentSymbolItem === 'object' &&
      currentSymbolItem.type === 'rule'
    ) {
      index--;
      currentSymbolItem = symbolStack[index];
    }
    return symbolStack[index];
  }

  function popSymbolStack() {
    while (true) {
      const t = symbolStack.pop();
      if (!t || typeof t !== 'object' || t.type !== 'rule') {
        break;
      }
    }
    let l = symbolStack.length - 1;
    let current = symbolStack[l];
    while (current && typeof current === 'object' && current.type === 'rule') {
      symbolStack.pop();
      current = symbolStack[--l];
    }
  }

  let getExpected = function () {
    const s = topSymbol;
    if (typeof s === 'string' && !isSymbol(s)) {
      return [lexer.mapReverseSymbol(s)];
    }
    // get expected tokens from state machine
    return findExpectedTokenFromStateMachine(findSymbolIndex()).map((s) =>
      lexer.mapReverseSymbol(s),
    );
  };

  function makeRuleIndexFlag(ruleIndex: number, ruleUnit: Unit): RuleFlag {
    return {
      type: 'rule',
      ruleUnit,
      tokensLength: lexer.getTokensLength(),
      ruleIndex,
    };
  }

  function findSymbolIndex(): PredictParam {
    let i = -1;
    let top = symbolStack.length - 1;
    let ruleIndex = -1;
    while (top >= 0 && symbolStack[top] !== topSymbol) {
      top--;
    }
    let current = symbolStack[top];
    while (
      current &&
      (typeof current !== 'object' || current.type !== 'rule')
    ) {
      if (typeof current === 'string') {
        i++;
      }
      top--;
      current = symbolStack[top];
    }
    if (current && typeof current === 'object' && current.type === 'rule') {
      ruleIndex = current.ruleIndex;
    }
    return { childReverseIndex: i, ruleIndex, topSymbol };
  }

  let production;

  while (1) {
    topSymbol = peekSymbolStack();

    if (!topSymbol) {
      break;
    }

    topSymbol = reduceLLAction(topSymbol, popSymbolStack, peekSymbolStack);

    if (typeof topSymbol === 'string') {
      if (!token) {
        token = lexer.lex();
        pushRecoveryTokens(recoveryTokens, token);
      }

      const normalizedSymbol = normalizeSymbol(topSymbol);

      next = null;

      if (isSymbol(normalizedSymbol)) {
        next = predictProductionIndexLLK(globalMatch, findSymbolIndex());
      } else if (normalizedSymbol === token.t) {
        if (!isZeroOrMoreSymbol(topSymbol)) {
          popSymbolStack();
        }
        const terminalNode = new AstTokenNode(token);
        terminalNodes.push(terminalNode);
        const parent = peekStack(astStack);
        parent.addChild(terminalNode);
        token = lexer.lex();
        pushRecoveryTokens(recoveryTokens, token);
        continue;
      }

      if (next) {
        if (!isZeroOrMoreSymbol(topSymbol)) {
          popSymbolStack();
        }

        const { ruleIndex, unit } = next;

        production = productions[ruleIndex];

        if (productionSkipAstNodeSet?.has(ruleIndex)) {
          const  newRhs = getLabeledRhsForAddNodeFlag(production, [
            ...getProductionRhs(production),
            makeRuleIndexFlag(ruleIndex, unit),
          ]);
          symbolStack.push.apply(symbolStack, newRhs.reverse());
        } else {
          const newAst = new AstSymbolNode({
            internalRuleIndex: ruleIndex,
            id: ++globalSymbolNodeId,
            symbol: getOriginalSymbol(normalizeSymbol(topSymbol)),
            label: getOriginalSymbol(getProductionLabel(production)),
            children: [],
          });
          peekStack(astStack).addChild(newAst);
          astStack.push(newAst);
          const newRhs: SymbolItem[] = [
            ...getProductionRhs(production),
            makeRuleIndexFlag(ruleIndex, unit),
            productionEndFlag,
          ].reverse();
          symbolStack.push(...newRhs);
        }
      } else if (isZeroOrMoreSymbol(topSymbol) || isOptionalSymbol(topSymbol)) {
        popSymbolStack();
      } else {
        let breakToEnd;
        ({ error, errorNode, token, breakToEnd } = takeCareLLError(
          getExpected,
          onErrorRecovery,
          topSymbol,
          () => !!predictProductionIndexNextLLK(globalMatch, findSymbolIndex()),
          transformNode,
          recoveryTokens,
          {
            error,
            errorNode,
            token,
          },
        ));
        if (breakToEnd) {
          break;
        }
      }
    }

    topSymbol = takeCareLLAction(popSymbolStack, peekSymbolStack);

    if (!symbolStack.length) {
      break;
    }
  }

  ({ error, errorNode } = checkLLEndError(getExpected, {
    error,
    errorNode,
  }));

  const ast = getAstRootNode(astStack, transformNode);

  endLLParse();

  return {
    ast,
    tokens: lexer.tokens,
    recoveryTokens,
    errorNode,
    error,
    terminalNodes,
  };
}

export { parse, predictProductionIndexLLK, predictProductionIndexNextLLK };

export * from './utils';
export * from './bfsMatch';
export * from './matcher';
export * from './sm';
export * from './initLLK';
