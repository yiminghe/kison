// @ts-check
var Utils = require('../utils');
const { AstNode,
  isProductionEndFlag,
  isAddAstNodeFlag,
} = Utils;

// placeholder
const {
  productionSkipAstNodeSet,
  productionEndFlag,
  parser,
  Lexer,
} = require('../data');

const { defaultTransformAstNode, getParseError, getAstRootNode } = require('../utils');

module.exports = function parse(input, options) {
  const recoveryTokens = [];
  const terminalNodes = [];

  const { EOF_TOKEN } = Lexer.STATIC;

  function isExtraSymbol(ast) {
    return ast.children && !ast.children.length;
  }

  function isSymbolName(s) {
    return !!table[s];
  }

  function peekStack(stack, n) {
    n = n || 1;
    return stack[stack.length - n];
  }

  function getTableVal(row, col) {
    return table[row] && table[row][col];
  }

  function getOriginalSymbol(s) {
    let uncompressed = lexer.mapReverseSymbol(s);
    return prioritySymbolMap[uncompressed] || uncompressed;
  }

  options = options || {};
  let error;
  var { onErrorRecovery, onAction, lexerOptions = {}, transformNode } = options;



  if (transformNode !== false && !transformNode) {
    transformNode = defaultTransformAstNode;
  }

  var {
    lexer,
    table,
    productions,
    prioritySymbolMap,
    getProductionSymbol,
    getProductionRhs,
    getProductionLabel,
  } = parser;

  lexer.options = lexerOptions;
  const startSymbol = getProductionSymbol(productions[0]);
  var symbolStack = [startSymbol];
  const astStack = [
    new AstNode({
      children: [],
    }),
  ];
  lexer.resetInput(input);
  let token;
  let next;


  let topSymbol;

  let errorNode;

  function popSymbolStack() {
    symbolStack.pop();
  }

  let getExpected = function () {
    const s = topSymbol;
    if (!isSymbolName(s)) {
      return [lexer.mapReverseSymbol(s)];
    }
    const ret = (table[s] && Object.keys(table[s])) || [];
    return ret.map((r) => lexer.mapReverseSymbol(r));
  };

  function closeAstWhenError() {
    errorNode = new AstNode({
      type: 'token',
      error,
      ...error.lexer,
    });
    peekStack(astStack).addChild(errorNode);
    while (astStack.length !== 1) {
      const ast = astStack.pop();
      if (ast.symbol && isExtraSymbol(ast)) {
        const topAst = peekStack(astStack);
        topAst.children.pop();
        topAst.addChildren(ast.children);
      }
    }
  }

  let production;

  function pushRecoveryTokens(token) {
    let eof;
    if (recoveryTokens[recoveryTokens.length - 1]?.token === EOF_TOKEN) {
      eof = recoveryTokens.pop();
    }
    recoveryTokens.push(token);
    if (eof && token.token !== EOF_TOKEN) {
      recoveryTokens.push(eof);
    }
  }

  while (1) {
    topSymbol = peekStack(symbolStack);

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
      topSymbol = peekStack(symbolStack);
      if (!topSymbol) {
        break;
      }
    }

    if (typeof topSymbol === 'string') {
      if (!token) {
        token = lexer.lex();
        pushRecoveryTokens(token);
      }
      if (topSymbol === token.t) {
        symbolStack.pop();
        const terminalNode = new AstNode(token);
        terminalNode.type = 'token';
        terminalNodes.push(terminalNode);
        const parent = peekStack(astStack);
        parent.addChild(terminalNode);
        token = lexer.lex();
        pushRecoveryTokens(token);
      } else if ((next = getTableVal(topSymbol, token.t)) !== undefined) {
        popSymbolStack();
        production = productions[next];

        if (productionSkipAstNodeSet?.has(next)) {
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production).concat().reverse(),
          );
        } else {
          const newAst = new AstNode({
            type: 'symbol',
            symbol: getOriginalSymbol(topSymbol),
            label: getOriginalSymbol(getProductionLabel(production)),
            children: [],
          });
          peekStack(astStack).addChild(newAst);
          astStack.push(newAst);
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production).concat(productionEndFlag).reverse(),
          );
        }
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
            getTableVal(topSymbol, nextToken.t) !== undefined
          ) {
            recommendedAction.action = 'del';
          } else if (error.expected.length) {
            recommendedAction.action = 'add';
          }

          const errorNode = new AstNode({
            error,
            type: 'token',
            ...error.lexer,
          });
          peekStack(astStack).addChild(errorNode);

          const recovery =
            onErrorRecovery(
              {
                errorNode,
                parseTree: getAstRootNode(astStack, transformNode, true),
              },
              recommendedAction,
            ) || {};

          const { action } = recovery;

          peekStack(astStack).children.pop();

          if (!action) {
            closeAstWhenError();
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
            pushRecoveryTokens(token);
          }
        } else {
          closeAstWhenError();
          break;
        }
      }
    }

    topSymbol = peekStack(symbolStack);

    while (topSymbol && typeof topSymbol === 'function') {
      if (onAction) {
        onAction({
          token: lexer.getLastToken(),
          action: topSymbol,
          parseTree: getAstRootNode(astStack,transformNode, true),
        });
      }
      popSymbolStack();
      topSymbol = peekStack(symbolStack);
    }

    if (!symbolStack.length) {
      break;
    }
  }

  if (!error && lexer.getCurrentToken().token !== EOF_TOKEN) {
    // reduction done but still has input
    if (!symbolStack.length) {
      getExpected = () => [EOF_TOKEN];
      lexer.lex();
    }
    error = {
      ...getParseError(getExpected),
      expected: getExpected(),
      symbol: peekStack(astStack)?.symbol,
      lexer: lexer.toJSON(),
    };
    closeAstWhenError();
  }

  const ast = getAstRootNode(astStack,transformNode);

  return {
    ast,
    tokens: lexer.tokens,
    recoveryTokens,
    errorNode,
    error,
    terminalNodes,
  };
};
