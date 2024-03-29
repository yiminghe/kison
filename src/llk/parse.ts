import data from '../data';
import utils from '../utils';
import type {
  AstTokenNode as AstTokenNodeType,
  AstErrorNode as AstErrorNodeType,
} from '../AstNode';
import type { Token, ParserOptions } from '../parser';
import * as sm from './sm';
import * as Utils from './utils';
import type { Unit, PredictParam } from './sm';
import type { ParseError } from '../types';
import type { Matcher } from '../utils';
const {
  isProductionEndFlag,
  isAddAstNodeFlag,
  AstSymbolNode,
  AstTokenNode,
  isZeroOrMoreSymbol,
  normalizeSymbol,
  isOptionalSymbol,
  defaultTransformAstNode,
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
  hasMemoizedResult,
  useMemoizedResult,
  applyEdit,
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
  VIRTUAL_OPTIONAL_RULE_INDEX,
} = data;

type SymbolItem = string | number | RuleFlag | Function;

var symbolStack = data.symbolStack as SymbolItem[];

const {
  predictProductionIndexLLK,
  predictProductionIndexNextLLK,
  findExpectedTokenFromStateMachine,
} = sm;

function parse(input: string, options: ParserOptions = {}) {
  prepareLLParse();

  let recoveryTokens: Token[] = [];
  const terminalNodes: AstTokenNodeType[] = [];

  let error: ParseError | undefined;

  let matcher: Matcher | undefined;

  if (options.incremental) {
    matcher = {
      incremental: {
        table: [],
        start: -1,
        end: -1,
        len: -1,
        ...options.incremental,
      },
      pos: 0,
      maxExaminedPos: -1,
    };
  }

  var {
    getProductionIsWrap,
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
    parseTree = true,
    startSymbol = getProductionSymbol(productions[0]),
  } = options;

  startSymbol = lexer.mapSymbol(startSymbol);

  if (transformNode !== false && !transformNode) {
    transformNode = defaultTransformAstNode as any;
  }

  lexer.options = lexerOptions;

  symbolStack = [startSymbol];

  lexer.resetInput(input);

  let token: Token | undefined = undefined;

  let next: null | { ruleIndex: number; unit?: sm.Unit } = {
    ruleIndex: 0,
  };

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

  function nextToken() {
    if (matcher && token) {
      matcher.maxExaminedPos = Math.max(matcher.maxExaminedPos, matcher.pos);
      matcher.pos = token.end;
    }
    token = lexer.lex();
  }

  function checkMatcher() {
    if (next && matcher) {
      const { ruleIndex } = next;
      if (hasMemoizedResult(matcher, ruleIndex)) {
        const ret = useMemoizedResult(matcher, ruleIndex)!;
        lexer.setEnd(matcher.pos);
        nextToken();
        peekStack(astStack).addChild(ret);
        astStack.push(ret);
        if (!isZeroOrMoreSymbol(topSymbol)) {
          popSymbolStack();
        }
        return true;
      }
    }
  }

  while (1) {
    topSymbol = peekSymbolStack();

    if (!topSymbol) {
      break;
    }

    if (checkMatcher()) {
      continue;
    }

    topSymbol = reduceLLAction(
      matcher,
      parseTree,
      topSymbol,
      popSymbolStack,
      peekSymbolStack,
    );

    if (typeof topSymbol === 'string') {
      if (!token) {
        nextToken();
        pushRecoveryTokens(recoveryTokens, token!);
      }

      const normalizedSymbol = normalizeSymbol(topSymbol);

      next = null;

      if (isSymbol(normalizedSymbol)) {
        next = predictProductionIndexLLK(globalMatch, findSymbolIndex());
      } else if (normalizedSymbol === token!.t || normalizedSymbol === `$ANY`) {
        if (!isZeroOrMoreSymbol(topSymbol)) {
          popSymbolStack();
        }
        const terminalNode = new AstTokenNode(token!);
        terminalNodes.push(terminalNode);
        const parent = peekStack(astStack);
        parent.addChild(terminalNode);
        nextToken();
        pushRecoveryTokens(recoveryTokens, token!);
        continue;
      } else if (isZeroOrMoreSymbol(topSymbol) || isOptionalSymbol(topSymbol)) {
        next = {
          ruleIndex: VIRTUAL_OPTIONAL_RULE_INDEX,
        };
      }

      if (checkMatcher()) {
        continue;
      }

      if (next && next.unit) {
        if (!isZeroOrMoreSymbol(topSymbol)) {
          popSymbolStack();
        }

        const { ruleIndex, unit } = next;

        production = productions[ruleIndex];

        if (productionSkipAstNodeSet?.has(ruleIndex)) {
          const newRhs = getLabeledRhsForAddNodeFlag(production, [
            ...getProductionRhs(production),
            makeRuleIndexFlag(ruleIndex, unit),
          ]);
          symbolStack.push.apply(symbolStack, newRhs.reverse());
        } else {
          const label = getOriginalSymbol(getProductionLabel(production));
          const isWrap = getProductionIsWrap(production);

          if (parseTree) {
            const newAst = new AstSymbolNode({
              internalRuleIndex: ruleIndex,
              id: ++globalSymbolNodeId,
              maxExaminedPos: matcher?.maxExaminedPos || -1,
              symbol: getOriginalSymbol(normalizeSymbol(topSymbol)),
              label,
              isWrap,
              children: [],
            });
            newAst.start = token!.end;
            if (matcher) {
              matcher.maxExaminedPos = -1;
            }
            peekStack(astStack).addChild(newAst);
            astStack.push(newAst);
          }

          const newRhs: SymbolItem[] = [
            ...getProductionRhs(production),
            makeRuleIndexFlag(ruleIndex, unit),
            productionEndFlag,
          ].reverse();
          symbolStack.push(...newRhs);
        }
      } else if (
        next &&
        (isZeroOrMoreSymbol(topSymbol) || isOptionalSymbol(topSymbol))
      ) {
        popSymbolStack();
      } else {
        let breakToEnd;
        ({ error, errorNode, token, breakToEnd } = takeCareLLError(
          parseTree,
          getExpected,
          onErrorRecovery,
          topSymbol,
          () => !!predictProductionIndexNextLLK(globalMatch, findSymbolIndex()),
          transformNode as any,
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

  ({ error, errorNode } = checkLLEndError(parseTree, getExpected, {
    error,
    errorNode,
  }));

  const ast = parseTree ? getAstRootNode(astStack, transformNode as any) : null;

  endLLParse();

  return {
    ast,
    applyEdit(start: number, end: number, len: number) {
      applyEdit(matcher!, start, end, len);
      return { ...matcher!.incremental, start, end, len };
    },
    incremental: matcher?.incremental,
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
