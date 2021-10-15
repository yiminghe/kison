// @ts-check

const { AstNode } = require('../AstNode');
const data = require('../data');
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
} = require('../utils');
const bfsMatch = require('./bfsMatch');
const matcher = require('./matcher');
const sm = require('./sm');
const Utils = require('./utils');
const initLLK = require('./initLLK');

const { isSymbol } = Utils;

let {
  symbolStack,
  parser,
  productionEndFlag,
  productionSkipAstNodeSet,
  Lexer,
} = data;

// const { clearStateMatchCache } = Utils;

const {
  predictProductionIndexLLK,
  predictProductionIndexNextLLK,
  State,
  findExpectedTokenFromStateMachine,
} = sm;

function parse(input, options) {
  // clearStateMatchCache();

  let recoveryTokens = [];

  const terminalNodes = [];

  options = options || {};

  let error;

  var {
    lexer,
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
    new AstNode({
      children: [],
    }),
  ];

  lexer.resetInput(input);

  let token;

  let next = null;

  let topSymbol;

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
    if (!isSymbol(s)) {
      return [lexer.mapReverseSymbol(s)];
    }
    // get expected tokens from state machine
    return findExpectedTokenFromStateMachine(findSymbolIndex()).map((s) =>
      lexer.mapReverseSymbol(s),
    );
  };

  function makeRuleIndexFlag(ruleIndex, ruleUnit) {
    return {
      type: 'rule',
      ruleUnit,
      tokensLength: lexer.getTokensLength(),
      ruleIndex,
    };
  }

  function findSymbolIndex() {
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
      let ast = astStack.pop();
      if (isAddAstNodeFlag(topSymbol)) {
        const stackTop = peekStack(astStack);
        const wrap = new AstNode({
          type: 'symbol',
          symbol: ast.symbol,
          children: [ast],
          label: ast.label,
        });
        stackTop.children.pop();
        stackTop.addChild(wrap);
        astStack.push(wrap);
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
        const terminalNode = new AstNode(token);
        terminalNode.type = 'token';
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
            ...getProductionRhs(production)
              .concat(makeRuleIndexFlag(ruleIndex, unit))
              .reverse(),
          );
        } else {
          const newAst = new AstNode({
            type: 'symbol',
            ruleIndex,
            symbol: getOriginalSymbol(normalizeSymbol(topSymbol)),
            label: getOriginalSymbol(getProductionLabel(production)),
            children: [],
          });
          peekStack(astStack).addChild(newAst);
          astStack.push(newAst);
          symbolStack.push(
            ...getProductionRhs(production)
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
          const recommendedAction = {};
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

          const localErrorNode = new AstNode({
            error,
            type: 'token',
            ...error.lexer,
          });
          peekStack(astStack).addChild(localErrorNode);

          const recovery =
            onErrorRecovery(
              {
                errorNode: localErrorNode,
                parseTree: getAstRootNode(astStack, getAstRootNode, true),
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
            const deleteToken = recoveryTokens.pop();
            deleteToken.recovery = 'del';
            token = null;
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

module.exports = {
  parse,
  predictProductionIndexLLK,
  predictProductionIndexNextLLK,
  ...Utils,
  ...bfsMatch,
  ...matcher,
  ...sm,
  ...State,
  ...initLLK,
};
