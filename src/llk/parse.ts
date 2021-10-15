import data from '../data';
import utils from '../utils';
import type { AstTokenNode as AstTokenNodeType } from '../AstNode';

const { AstSymbolNode, AstTokenNode } = utils;

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
import * as sm from './sm';
import * as Utils from './utils';
import type { ParseError, Token } from '../parser';

const { isSymbol } = Utils;

interface RuleFlag {
  type: 'rule';
  ruleUnit: Unit;
  tokensLength: number;
  ruleIndex: number;
}

let {
  symbolStack,
  parser,
  lexer,
  productionEndFlag,
  productionSkipAstNodeSet,
  Lexer,
} = data;

const {
  predictProductionIndexLLK,
  predictProductionIndexNextLLK,
  findExpectedTokenFromStateMachine,
} = sm;

import type { Unit, PredictParam } from './sm';

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

  const astStack = [
    new AstSymbolNode({
      children: [],
    }),
  ];

  lexer.resetInput(input);

  let token: Token | undefined = undefined;

  let next = null;

  let topSymbol: RuleFlag | number | string;

  let errorNode;

  function peekSymbolStack(n = 1) {
    let index = symbolStack.length - n;
    while (
      index !== -1 &&
      symbolStack[index] &&
      symbolStack[index].type === 'rule'
    ) {
      index--;
    }
    return symbolStack[index];
  }

  function popSymbolStack() {
    while (true) {
      const t = symbolStack.pop();
      if (!t || t.type !== 'rule') {
        break;
      }
    }
    while (symbolStack[symbolStack.length - 1]?.type === 'rule') {
      symbolStack.pop();
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

  function makeRuleIndexFlag(ruleIndex: number, ruleUnit: Unit) {
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
    while (top !== -1 && symbolStack[top] && symbolStack[top].type !== 'rule') {
      if (typeof symbolStack[top] === 'string') {
        i++;
      }
      top--;
    }
    if (symbolStack[top] && symbolStack[top].type === 'rule') {
      ruleIndex = symbolStack[top].ruleIndex;
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
      if (topSymbol === token.t) {
        popSymbolStack();
        const terminalNode = new AstTokenNode(token);
        terminalNodes.push(terminalNode);
        const parent = peekStack(astStack);
        parent.addChild(terminalNode);
        token = lexer.lex();
        pushRecoveryTokens(recoveryTokens, token);
        continue;
      }

      next = predictProductionIndexLLK(findSymbolIndex());
      if (next) {
        if (!isZeroOrMoreSymbol(topSymbol)) {
          popSymbolStack();
        }

        const { ruleIndex, unit } = next;

        production = productions[ruleIndex];

        if (productionSkipAstNodeSet?.has(ruleIndex)) {
          symbolStack.push(
            ...(getProductionRhs(production) as any[])
              .concat(makeRuleIndexFlag(ruleIndex, unit))
              .reverse(),
          );
        } else {
          const newAst = new AstSymbolNode({
            ruleIndex,
            symbol: getOriginalSymbol(normalizeSymbol(topSymbol)),
            label: getOriginalSymbol(getProductionLabel(production)),
            children: [],
          });
          peekStack(astStack).addChild(newAst);
          astStack.push(newAst);
          symbolStack.push(
            ...(getProductionRhs(production) as any[])
              .concat([makeRuleIndexFlag(ruleIndex, unit), productionEndFlag])
              .reverse(),
          );
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

          const localErrorNode = new AstTokenNode({
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
