import data from '../data';
import utils from '../utils';
import type {
  AstTokenNode as AstTokenNodeType,
  AstSymbolNode as AstSymbolNodeType,
  AstErrorNode as AstErrorNodeType,
} from '../AstNode';
import type { Token } from '../parser';
import * as sm from './sm';
import * as Utils from './utils';
import type { Unit, PredictParam } from './sm';
import type { ParseError } from '../types';
const { AstSymbolNode, AstTokenNode, AstErrorNode } = utils;

const {
  isZeroOrMoreSymbol,
  normalizeSymbol,
  isOptionalSymbol,
  defaultTransformAstNode,
  isAddAstNodeFlag,
  isProductionEndFlag,
  getParseError,
  getAstRootNode,
  peekStack,
  pushRecoveryTokens,
  closeAstWhenError,
  getOriginalSymbol,
} = utils;

const { isSymbol } = Utils;

export interface RuleFlag {
  type: 'rule';
  ruleUnit: Unit;
  tokensLength: number;
  ruleIndex: number;
}

let { parser, lexer, productionEndFlag, productionSkipAstNodeSet, Lexer } =
  data;

type SymbolItem = string | number | RuleFlag | Function;

var symbolStack = data.symbolStack as SymbolItem[];

const {
  predictProductionIndexLLK,
  predictProductionIndexNextLLK,
  findExpectedTokenFromStateMachine,
} = sm;

function parse(input: string, options: any) {
  let recoveryTokens: Token[] = [];

  const terminalNodes: AstTokenNodeType[] = [];

  options = options || {};

  let error: ParseError | undefined;

  var {
    productions,
    getProductionSymbol,
    getProductionRhs,
    getProductionLabel,
  } = parser;

  var {
    onErrorRecovery,
    onAction,
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

  const astStack: AstSymbolNodeType[] = [
    new AstSymbolNode({
      children: [],
    }),
  ];

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

  const { EOF_TOKEN } = Lexer.STATIC;

  while (1) {
    topSymbol = peekSymbolStack();

    if (!topSymbol) {
      break;
    }

    while (isProductionEndFlag(topSymbol) || isAddAstNodeFlag(topSymbol)) {
      let ast = astStack.pop()!;
      if (isAddAstNodeFlag(topSymbol)) {
        const stackTop = peekStack(astStack);
        const wrap = new AstSymbolNode({
          symbol: ast.symbol,
          children: [ast],
          label: ast.label,
          ruleIndex: ast.ruleIndex,
        });
        stackTop.children.pop();
        stackTop.addChild(wrap);
        astStack.push(wrap);
      } else {
        ast.refreshChildren();
      }
      popSymbolStack();
      topSymbol = peekSymbolStack();
      if (!topSymbol) {
        break;
      }
    }

    if (typeof topSymbol === 'string') {
      if (!token) {
        token = lexer.lex();
        pushRecoveryTokens(recoveryTokens, token);
      }

      const normalizedSymbol = normalizeSymbol(topSymbol);

      next = null;

      if (isSymbol(normalizedSymbol)) {
        next = predictProductionIndexLLK(findSymbolIndex());
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
          const newRhs: SymbolItem[] = [
            ...getProductionRhs(production),
            makeRuleIndexFlag(ruleIndex, unit),
          ].reverse();
          symbolStack.push(...newRhs);
        } else {
          const newAst = new AstSymbolNode({
            ruleIndex,
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
        error = {
          recovery: false,
          ...getParseError(getExpected),
          expected: getExpected(),
          symbol: peekStack(astStack).symbol,
          lexer: lexer.toJSON(),
        };
        if (onErrorRecovery) {
          const recommendedAction: { action?: string } = {};
          lexer.stash();
          const nextToken = lexer.lex();
          lexer.stashPop();
          // should delete
          if (
            topSymbol === nextToken.t ||
            predictProductionIndexNextLLK(findSymbolIndex())
          ) {
            recommendedAction.action = 'del';
          } else if (error.expected.length) {
            recommendedAction.action = 'add';
          }

          const localErrorNode = new AstErrorNode({
            error,
            ...error.lexer,
          });
          peekStack(astStack).addChild(localErrorNode);

          const recovery =
            onErrorRecovery(
              {
                errorNode: localErrorNode,
                parseTree: getAstRootNode(astStack, transformNode, true),
              },
              recommendedAction,
            ) || {};

          const { action } = recovery;

          peekStack(astStack).children.pop();

          if (!action) {
            errorNode = closeAstWhenError(error, astStack);
            break;
          }

          if (action === 'del') {
            error.recovery = true;
            const deleteToken = recoveryTokens.pop()!;
            deleteToken.recovery = 'del';
            token = undefined;
          } else if (action === 'add') {
            error.recovery = true;
            token = {
              ...token,
              token: recovery.token,
              text: recovery.text,
              t: lexer.mapSymbol(recovery.token),
              recovery: 'add',
            };
            lexer.pushToken(token);
            pushRecoveryTokens(recoveryTokens, token);
          }
        } else {
          errorNode = closeAstWhenError(error, astStack);
          break;
        }
      }
    }

    topSymbol = peekSymbolStack();

    while (topSymbol && typeof topSymbol === 'function') {
      if (onAction) {
        onAction({
          token: lexer.getLastToken(),
          action: topSymbol,
          parseTree: getAstRootNode(astStack, transformNode, true),
        });
      }
      popSymbolStack();
      topSymbol = peekSymbolStack();
    }

    if (!symbolStack.length) {
      break;
    }
  }

  if (!error && lexer.getCurrentToken().token !== EOF_TOKEN) {
    // reduction done but still has input
    if (!symbolStack.length) {
      getExpected = () => [EOF_TOKEN];
    }
    error = {
      ...getParseError(getExpected),
      expected: getExpected(),
      symbol: peekStack(astStack)?.symbol,
      lexer: lexer.toJSON(),
    };
    errorNode = closeAstWhenError(error, astStack);
  }

  const ast = getAstRootNode(astStack, transformNode);

  symbolStack = [];

  // clearStateMatchCache();

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
