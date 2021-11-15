import Utils from '../utils';
import { Table } from './LLGrammar';
import type { Token, ParserOptions } from '../parser';
import type { ParseError } from '../types';
import type {
  AstTokenNode as AstTokenNodeType,
  AstErrorNode as AstErrorNodeType,
} from '../AstNode';
import data from '../data';

let {
  lexer,
  productionSkipAstNodeSet,
  productionEndFlag,
  parser,
  astStack,
  globalSymbolNodeId,
} = data;

type SymbolItem = string | number | Function;

var symbolStack = data.symbolStack as SymbolItem[];

const {
  AstSymbolNode,
  AstTokenNode,
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
} = Utils;

export default function parse(input: string, options: ParserOptions) {
  prepareLLParse();

  const recoveryTokens: Token[] = [];
  const terminalNodes: AstTokenNodeType[] = [];

  function getTableVal(row: string, col: string) {
    return table[row] && table[row][col];
  }
  function isSymbolName(s: string | number) {
    return !!table[s];
  }

  options = options || {};
  let error: ParseError | undefined;
  var {
    onErrorRecovery,
    lexerOptions = {},
    transformNode,
    startSymbol,
    parseTree = true,
  } = options;

  if (transformNode !== false && !transformNode) {
    transformNode = defaultTransformAstNode as any;
  }

  var {
    getProductionIsWrap,
    getProductionSymbol,
    getProductionRhs,
    getProductionLabel,
    productions,
  } = parser;
  var table = parser.table as Table;

  lexer.options = lexerOptions;
  startSymbol = startSymbol || getProductionSymbol(productions[0]);
  symbolStack = [startSymbol];

  lexer.resetInput(input);
  let token;
  let next;

  let topSymbol: SymbolItem;

  let errorNode: AstErrorNodeType | undefined;

  function popSymbolStack() {
    symbolStack.pop();
  }

  let getExpected = function () {
    const s = topSymbol;
    if (typeof s !== 'string') {
      throw new Error('unexpected topSymbol:' + s);
    }
    if (!isSymbolName(s)) {
      return [lexer.mapReverseSymbol(s)];
    }
    const ret = (table[s] && Object.keys(table[s])) || [];
    return ret.map((r) => lexer.mapReverseSymbol(r));
  };

  function peekSymbolStack() {
    return peekStack(symbolStack);
  }

  let production;

  while (1) {
    topSymbol = peekStack(symbolStack);

    if (!topSymbol) {
      break;
    }

    topSymbol = reduceLLAction(parseTree, topSymbol, popSymbolStack, peekSymbolStack);

    if (typeof topSymbol === 'string') {
      if (!token) {
        token = lexer.lex();
        pushRecoveryTokens(recoveryTokens, token);
      }
      if (topSymbol === `$ANY` || topSymbol === token.t) {
        symbolStack.pop();
        if (parseTree) {
          const terminalNode = new AstTokenNode(token);
          terminalNode.type = 'token';
          terminalNodes.push(terminalNode);
          const parent = peekStack(astStack);
          parent.addChild(terminalNode);
        }
        token = lexer.lex();
        pushRecoveryTokens(recoveryTokens, token);
      } else if ((next = getTableVal(topSymbol, token.t)) !== undefined) {
        popSymbolStack();
        production = productions[next];

        if (productionSkipAstNodeSet?.has(next)) {
          const newRhs = getLabeledRhsForAddNodeFlag(production);
          symbolStack.push.apply(symbolStack, newRhs.reverse());
        } else {
          const label = getOriginalSymbol(getProductionLabel(production));
          const isWrap = getProductionIsWrap(production);
          if (parseTree) {
            const newAst = new AstSymbolNode({
              id: ++globalSymbolNodeId,
              internalRuleIndex: next,
              symbol: getOriginalSymbol(topSymbol),
              label,
              isWrap,
              children: [],
            });
            peekStack(astStack).addChild(newAst);
            astStack.push(newAst);
          }
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production).concat(productionEndFlag).reverse(),
          );
        }
      } else {
        let breakToEnd;
        ({ error, errorNode, token, breakToEnd } = takeCareLLError(
          parseTree,
          getExpected,
          onErrorRecovery,
          topSymbol,
          (nextToken) =>
            typeof topSymbol === 'string' &&
            getTableVal(topSymbol, nextToken.t) !== undefined,
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

  ({ error, errorNode } = checkLLEndError(
    parseTree,
    getExpected,
    {
      error,
      errorNode,
    }
  ));

  const ast = parseTree ? getAstRootNode(astStack, transformNode as any) : null;

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
