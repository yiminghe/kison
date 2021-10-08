// @ts-check

const { AstNode } = require('./AstNode');
const {
  parser,
  productionAddAstNodeFlag,
  productionEndFlag,
  productionSkipAstNodeSet,
  symbolMap,
  stateMachine,
  Lexer,
  stateUnitsMap,
} = require('../data');
const { isSymbol } = require('./symbolMap');
const {
  predictProductionIndexLLK,
  predictProductionIndexNextLLK,
} = require('./sm');
const bfsMatch = require('./bfsMatch');
const symbolMapCls = require('./symbolMap');
const matcher = require('./matcher');
const sm = require('./sm');
const {
  isZeroOrMoreSymbol,
  normalizeSymbol,
  isOptionalSymbol,
  findExpectedTokenFromStateMachine,
} = sm;
const State = require('./state');

function isAddAstNodeFlag(t) {
  return t === productionAddAstNodeFlag;
}

function isProductionEndFlag(t) {
  return t === productionEndFlag;
}

function parse(input, options) {
  const recoveryTokens = [];
  const terminalNodes = [];

  function isExtraSymbol(ast) {
    return ast.children && !ast.children.length;
  }

  function peekStack(stack, n) {
    n = n || 1;
    return stack[stack.length - n];
  }

  function getOriginalSymbol(s) {
    let uncompressed = lexer.mapReverseSymbol(s);
    return prioritySymbolMap[uncompressed] || uncompressed;
  }

  options = options || {};
  let error;
  var { onErrorRecovery, onAction, lexerOptions = {}, transformNode } = options;

  function checkLabel(node, parent) {
    if (node.label || parent.label) {
      if (node.label === parent.label) {
        return node.children;
      }
      return node;
    }
    return node.children;
  }

  function defaultTransformNode({ node, parent }) {
    if (node.token || node.error || node.symbol !== parent.symbol) {
      return node;
    }
    if (parent.children.length === 1) {
      // do not check label
      // replace label!
      parent.label = node.label;
      return node.children;
    }
    if (node.children.length > 1) {
      return node;
    }
    // drill down to token
    if (node.children[0]?.token) {
      // do not check label
      // parent.label = node.label;
      return node.children;
    }
    return checkLabel(node, parent);
  }

  if (transformNode !== false && !transformNode) {
    transformNode = defaultTransformNode;
  }

  var {
    lexer,
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

  function getError() {
    const expected = getExpected();
    const tips = [];
    if (expected.length) {
      tips.push("'" + expected.join("', '") + "' expected.");
    }
    tips.push("current token: '" + lexer.getCurrentToken().token + "'.");
    const tip = tips.join('\n');
    return {
      errorMessage: [
        'syntax error at line ' +
          lexer.lineNumber +
          ':\n' +
          lexer.showDebugInfo(),
        ...tips,
      ].join('\n'),
      tip,
    };
  }

  function cleanAst(ast) {
    if (!transformNode) {
      return ast;
    }
    if (ast.children) {
      let children;
      let childrenChanged;
      while (true) {
        let changed = false;
        let index = 0;
        children = [];
        for (const c of ast.children) {
          const node = transformNode({
            node: c,
            index,
            parent: ast,
            defaultTransformNode,
          });
          if (Array.isArray(node)) {
            children.push(...node);
          } else if (node) {
            children.push(node);
          }
          changed = changed || node !== c;
          index++;
        }
        if (!changed) {
          break;
        } else {
          ast.setChildren(children);
          childrenChanged = true;
        }
      }
      if (childrenChanged && ast.parent) {
        cleanAst(ast.parent);
      } else {
        for (const c of children) {
          cleanAst(c);
        }
      }
    }
    return ast;
  }

  function getAst(raw) {
    let ast = astStack[0];
    ast = ast?.children?.[0];
    ast = ast?.children?.[0];
    if (ast) {
      ast.parent = null;
    }
    if (raw) {
      return ast;
    }
    return ast && cleanAst(ast);
  }

  let topSymbol;

  let errorNode;

  function popSymbolStack() {
    symbolStack.pop();
  }

  let getExpected = function () {
    const s = topSymbol;
    if (!isSymbol(s)) {
      return [lexer.mapReverseSymbol(s)];
    }
    // get expected tokens from state machine
    if (next !== -1) {
      return findExpectedTokenFromStateMachine(
        stateMachine[getProductionSymbol(productions[next])][next].start,
      );
    }
    return [];
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
        recoveryTokens.push(token);
      }
      if (topSymbol === token.t) {
        symbolStack.pop();
        const terminalNode = new AstNode(token);
        terminalNode.type = 'token';
        terminalNodes.push(terminalNode);
        const parent = peekStack(astStack);
        parent.addChild(terminalNode);
        token = null;
        continue;
      }
      next = predictProductionIndexLLK(topSymbol);
      if (next !== -1) {
        if (!isZeroOrMoreSymbol(topSymbol)) {
          popSymbolStack();
        }

        production = productions[next];

        if (productionSkipAstNodeSet.has(next)) {
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production).concat().reverse(),
          );
        } else {
          const newAst = new AstNode({
            type: 'symbol',
            symbol: getOriginalSymbol(normalizeSymbol(topSymbol)),
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
      } else if (isZeroOrMoreSymbol(topSymbol) || isOptionalSymbol(topSymbol)) {
        popSymbolStack();
      } else {
        error = {
          recovery: false,
          ...getError(),
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
            predictProductionIndexNextLLK(topSymbol) === -1
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
                parseTree: getAst(true),
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
            recoveryTokens.pop();
            token = null;
          } else if (action === 'add') {
            error.recovery = true;
            token = {
              ...token,
              token: recovery.token,
              text: recovery.text,
              t: lexer.mapSymbol(recovery.token),
            };
            recoveryTokens.push(token);
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
          token: lexer.toJSON(),
          action: topSymbol,
          parseTree: getAst(true),
        });
      }
      popSymbolStack();
      topSymbol = peekStack(symbolStack);
    }

    if (!symbolStack.length) {
      break;
    }
  }

  if (!error && lexer.getCurrentToken().token !== Lexer.STATIC.EOF_TOKEN) {
    // reduction done but still has input
    if (!symbolStack.length) {
      getExpected = () => [Lexer.STATIC.EOF_TOKEN];
    }
    error = {
      ...getError(),
      expected: getExpected(),
      symbol: peekStack(astStack)?.symbol,
      lexer: lexer.toJSON(),
    };
    closeAstWhenError();
  }

  const ast = getAst();

  return {
    ast,
    tokens: lexer.tokens,
    recoveryTokens,
    errorNode,
    error,
    terminalNodes,
  };
}

module.exports = Object.assign(
  {
    AstNode,
    stateUnitsMap,
    symbolMap,
    stateMachine,
    parse,
    isAddAstNodeFlag,
    isProductionEndFlag,
    productionAddAstNodeFlag,
    productionEndFlag,
    predictProductionIndexLLK,
    predictProductionIndexNextLLK,
  },
  bfsMatch,
  symbolMapCls,
  matcher,
  sm,
  State,
);
