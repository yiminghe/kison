// @ts-check
import { Token } from '../parser';
import Production from '../Production';
import Utils from '../utils';
import { Table } from './LLGrammar';
const { AstSymbolNode, AstTokenNode, isProductionEndFlag, isAddAstNodeFlag } =
  Utils;

const data = require('../data');

let {
  lexer,
  productionSkipAstNodeSet,
  productionEndFlag,
  parser,
  Lexer,
  symbolStack,
} = data;

const {
  defaultTransformAstNode,
  getParseError,
  getAstRootNode,
  peekStack,
  pushRecoveryTokens,
  getOriginalSymbol,
  closeAstWhenError,
} = require('../utils');

export default function parse(input: string, options: any) {
  const recoveryTokens: Token[] = [];
  const terminalNodes = [];

  const { EOF_TOKEN } = Lexer.STATIC;

  function getTableVal(row: string, col: string) {
    return table[row] && table[row][col];
  }
  function isSymbolName(s: string | number) {
    return !!table[s];
  }

  options = options || {};
  let error;
  var {
    onErrorRecovery,
    onAction,
    lexerOptions = {},
    transformNode,
    startSymbol,
  } = options;

  if (transformNode !== false && !transformNode) {
    transformNode = defaultTransformAstNode;
  }

  var { getProductionSymbol, getProductionRhs, getProductionLabel } = parser;

  var productions = parser.productions as Production[];
  var table = parser.table as Table;

  lexer.options = lexerOptions;
  startSymbol = startSymbol || getProductionSymbol(productions[0]);
  symbolStack = [startSymbol];

  const astStack = [
    new AstSymbolNode({
      children: [],
    }),
  ];
  lexer.resetInput(input);
  let token;
  let next;

  let topSymbol: string | number;

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

  let production;

  while (1) {
    topSymbol = peekStack(symbolStack);

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
        });
        stackTop.children.pop();
        stackTop.addChild(wrap);
        astStack.push(wrap);
      } else {
        ast.refreshChildren();
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
        pushRecoveryTokens(recoveryTokens, token);
      }
      if (topSymbol === token.t) {
        symbolStack.pop();
        const terminalNode = new AstTokenNode(token);
        terminalNode.type = 'token';
        terminalNodes.push(terminalNode);
        const parent = peekStack(astStack);
        parent.addChild(terminalNode);
        token = lexer.lex();
        pushRecoveryTokens(recoveryTokens, token);
      } else if ((next = getTableVal(topSymbol, token.t)) !== undefined) {
        popSymbolStack();
        production = productions[next];

        if (productionSkipAstNodeSet?.has(next)) {
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production).concat().reverse(),
          );
        } else {
          const newAst = new AstSymbolNode({
            ruleIndex: next,
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
          const recommendedAction: { action?: string } = {};
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
            const deleteToken = recoveryTokens.pop();
            if (deleteToken) deleteToken.recovery = 'del';
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

    topSymbol = peekStack(symbolStack);

    while (topSymbol && typeof topSymbol === 'function') {
      if (onAction) {
        onAction({
          token: lexer.getLastToken(),
          action: topSymbol,
          parseTree: getAstRootNode(astStack, transformNode, true),
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
    errorNode = closeAstWhenError(error, astStack);
  }

  const ast = getAstRootNode(astStack, transformNode);

  symbolStack = [];

  return {
    ast,
    tokens: lexer.tokens,
    recoveryTokens,
    errorNode,
    error,
    terminalNodes,
  };
}
