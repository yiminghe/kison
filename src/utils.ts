// @ts-ignore
import util from 'modulex-util';
import * as AstNodes from './AstNode';
import type {
  AstSymbolNode as AstSymbolNodeType,
  AstNode as AstNodeType,
  AstErrorNode as AstErrorNodeType,
} from './AstNode';
import data from './data';
import type { ParserOptions, Token } from './parser';
import type { ParseError, Rhs, TransformNode } from './types';
import type { ProductionRule } from './Grammar';
import { symbolUtils } from './options';
const { AstTokenNode, AstErrorNode, BaseAstNode, AstSymbolNode } = AstNodes;

var {
  productionAddAstNodeFlag,
  productionEndFlag,
  lexer,
  Lexer,
  parser,
  START_TAG,
  symbolStack,
  astStack,
  globalSymbolNodeId,
} = data;

var doubleReg = /"/g;
var single = /'/g;

const globalUtils = {
  BaseAstNode,

  AstSymbolNode,

  AstTokenNode,

  AstErrorNode,

  getLabeledRhsForAddNodeFlag(production: ProductionRule, extraRhs?: any[]) {
    let rhs = extraRhs || parser.getProductionRhs(production);
    const label = parser.getProductionLabel(production);
    if (label) {
      let newRhs: any[] = [];
      for (const r of rhs) {
        if (isAddAstNodeFlag(r)) {
          newRhs.push(() => {
            astStack[astStack.length - 1].label = getOriginalSymbol(label);
          });
        }
        newRhs.push(r);
      }
      rhs = newRhs;
    } else if (!extraRhs) {
      rhs = [...rhs];
    }
    return rhs;
  },

  checkLLEndError(
    parseTree: boolean,
    getExpected: () => string[],
    ret: {
      error: ParseError | undefined;
      errorNode: AstErrorNodeType | undefined;
    },
  ) {
    const { EOF_TOKEN } = Lexer.STATIC;
    if (!ret.error && lexer.getCurrentToken().token !== EOF_TOKEN) {
      // reduction done but still has input
      if (!symbolStack.length) {
        getExpected = () => [EOF_TOKEN];
        lexer.lex();
      }
      const token = lexer.getCurrentToken();
      ret.error = {
        ...getParseError(getExpected, token),
        expected: getExpected(),
        symbol: peekStack(astStack)?.symbol,
        token,
      };
      ret.errorNode = closeAstWhenError(parseTree, ret.error, astStack);
    }
    return ret;
  },

  takeCareLLError(
    parseTree: boolean,
    getExpected: () => string[],
    onErrorRecovery: any,
    topSymbol: any,
    shouldDelete: (tokens: {
      nextToken: Token;
      currentToken: Token;
    }) => boolean,
    transformNode: TransformNode | undefined | false,
    recoveryTokens: Token[],
    ret: {
      breakToEnd?: boolean;
      token: Token | undefined;
      error: ParseError | undefined;
      errorNode: AstErrorNodeType | undefined;
    },
  ) {
    const expected = getExpected();
    const recommendedAction: { action?: string } = {};
    const currentToken = lexer.getCurrentToken();
    const nextToken = lexer.peekTokens()[0];
    // should delete
    if (
      currentToken.token === '$UNKNOWN' ||
      expected.indexOf(nextToken.token) !== -1
    ) {
      recommendedAction.action = 'del';
    } else if (expected.length) {
      recommendedAction.action = 'add';
    }
    const token = currentToken;
    ret.error = {
      recovery: false,
      ...getParseError(() => expected, token),
      expected,
      symbol: peekStack(astStack).symbol,
      token,
    };
    if (onErrorRecovery) {
      const localErrorNode = new AstErrorNode({
        error: ret.error,
        ...ret.error.token,
      });
      if (parseTree) {
        peekStack(astStack).addChild(localErrorNode);
      }
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
        ret.errorNode = closeAstWhenError(parseTree, ret.error, astStack);
        ret.breakToEnd = true;
        return ret;
      }

      if (action === 'del') {
        ret.error.recovery = true;
        const deleteToken = recoveryTokens.pop()!;
        deleteToken.recovery = 'del';
        ret.token = undefined;
      } else if (action === 'add') {
        ret.error.recovery = true;
        ret.token = {
          ...ret.token!,
          token: recovery.token,
          text: recovery.text,
          t: lexer.mapSymbol(recovery.token),
          recovery: 'add',
        };
        lexer.pushToken(ret.token);
        pushRecoveryTokens(recoveryTokens, ret.token);
      }
    } else {
      ret.errorNode = closeAstWhenError(parseTree, ret.error, astStack);
      ret.breakToEnd = true;
    }
    return ret;
  },

  takeCareLLAction<T>(popSymbolStack: Function, peekSymbolStack: () => T) {
    let topSymbol = peekSymbolStack();

    while (topSymbol && typeof topSymbol === 'function') {
      topSymbol.call(parser);
      popSymbolStack();
      topSymbol = peekSymbolStack();
    }

    return topSymbol;
  },

  reduceLLAction<T>(
    matcher: Matcher | undefined,
    parseTree: boolean,
    topSymbol: T,
    popSymbolStack: Function,
    peekSymbolStack: () => T,
  ) {
    while (isProductionEndFlag(topSymbol) || isAddAstNodeFlag(topSymbol)) {
      if (parseTree) {
        let ast = astStack.pop()!;
        const ret = ast.done();
        ast = ret.component;
        const needAction = ret.action;
        if (matcher) {
          memoizeResult(matcher, ast.start, ast.internalRuleIndex, ast);
          matcher.maxExaminedPos = Math.max(
            matcher.maxExaminedPos,
            ast.maxExaminedPos,
          );
        }
        if (needAction) {
          const ruleIndex = ast.internalRuleIndex;
          const production = parser.productions[ruleIndex];
          const action = parser.getProductionAction(production);
          if (action) {
            action.call(parser);
          }
        }
        if (isAddAstNodeFlag(topSymbol)) {
          const stackTop = peekStack(astStack);
          const wrap = new AstSymbolNode({
            id: ++globalSymbolNodeId,
            isWrap: true,
            symbol: ast.symbol,
            label: ast.label,
            maxExaminedPos: ast.maxExaminedPos,
            children: [ast],
            internalRuleIndex: ast.internalRuleIndex,
          });
          wrap.start = ast.start;
          wrap.copy(ast);
          stackTop.children.pop();
          stackTop.addChild(wrap);
          astStack.push(wrap);
        }
      }
      popSymbolStack();
      topSymbol = peekSymbolStack();
      if (!topSymbol) {
        break;
      }
    }
    return topSymbol;
  },

  prepareLLParse() {
    globalSymbolNodeId = 0;
    parser.userData = {};
    symbolStack = [];
    astStack = [
      new AstSymbolNode({
        id: 0,
        maxExaminedPos: -1,
        symbol: '',
        children: [],
      }),
    ];
  },

  endLLParse() {
    globalSymbolNodeId = 0;
    parser.userData = {};
    symbolStack = [];
    astStack = [];
  },

  filterRhs(rhs: Rhs): string[] {
    const ret: string[] = [];
    for (const r of rhs) {
      if (typeof r === 'string') {
        ret.push(r);
      }
    }
    return ret;
  },

  isExtraAstNode(ast: AstSymbolNodeType) {
    return ast.children && !ast.children.length;
  },

  peekStack<T>(stack: T[], n: number = 1) {
    return stack[stack.length - n];
  },

  getOriginalSymbol(s: string) {
    let uncompressed = lexer.mapReverseSymbol(s);
    // return uncompressed;
    return parser.prioritySymbolMap[uncompressed] || uncompressed;
  },

  closeAstWhenError(
    parseTree: boolean,
    error: ParseError,
    astStack: AstNodeType[],
  ) {
    const errorNode = new AstErrorNode({
      error,
      ...error.token,
    });
    if (parseTree) {
      const top = peekStack(astStack);
      if (top.type === 'symbol') {
        top.addChild(errorNode);
      }
      while (astStack.length > 1) {
        const ast = astStack.pop();
        if (ast && ast.type === 'symbol' && isExtraAstNode(ast)) {
          const topAst = peekStack(astStack);
          if (topAst.type === 'symbol') {
            topAst.children.pop();
            topAst.addChildren(ast.children);
          }
        }
      }
    }
    return errorNode;
  },

  pushRecoveryTokens(recoveryTokens: Token[], token: Token) {
    const { EOF_TOKEN } = Lexer.STATIC;
    let eof;
    if (recoveryTokens[recoveryTokens.length - 1]?.token === EOF_TOKEN) {
      eof = recoveryTokens.pop();
    }
    recoveryTokens.push(token);
    if (eof && token.token !== EOF_TOKEN) {
      recoveryTokens.push(eof);
    }
  },

  getParseError(
    getExpected: () => string[],
    nextToken: Token = lexer.getCurrentToken(),
  ) {
    const expected = getExpected();
    const tips = [];
    if (expected.length) {
      tips.push("'" + expected.join("', '") + "' expected.");
    }
    tips.push("current token: '" + nextToken.token + "'.");
    const tip = tips.join('\n');
    return {
      errorMessage: [
        'syntax error at line ' +
          nextToken.firstLine +
          ':\n' +
          lexer.showDebugInfo(nextToken),
        ...tips,
      ].join('\n'),
      tip,
    };
  },

  cleanAst(
    ast: AstSymbolNodeType,
    transformNode: TransformNode | undefined | false,
  ): AstSymbolNodeType {
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
            defaultTransformNode: defaultTransformAstNode,
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
        cleanAst(ast.parent, transformNode);
      } else {
        for (const c of children) {
          if (c.type === 'symbol') {
            cleanAst(c, transformNode);
          }
        }
      }
    }
    return ast;
  },

  getAstRootNode(
    astStack: AstNodeType[],
    transformNode: TransformNode | undefined | false,
    raw?: boolean,
  ) {
    let ast: AstNodeType | undefined = astStack[0];
    if (!ast) {
      return ast;
    }
    if (ast.type !== 'symbol') {
      return ast;
    }
    ast = ast?.children?.[0];
    if (ast && ast.type === 'symbol' && ast.symbol === START_TAG) {
      ast = ast?.children?.[0];
    }
    if (ast) {
      ast.parent = undefined;
    }
    if (raw) {
      return ast;
    }
    if (ast && ast.type === 'token') {
      return ast;
    }
    return ast && cleanAst(ast, transformNode);
  },

  defaultTransformAstNode({ node, parent }: Parameters<TransformNode>[0]) {
    if (node.type === 'token' || node.symbol !== parent.symbol) {
      return node;
    }
    if (node.label || parent.label) {
      if (node.label !== parent.label) {
        return node;
      }
    }
    if (parent.children.length === 1) {
      return node.children;
    }
    return node;
  },

  isAddAstNodeFlag(t: any) {
    return t === productionAddAstNodeFlag;
  },

  isProductionEndFlag(t: any) {
    return t === productionEndFlag;
  },

  hasMemoizedResult(match: Matcher, ruleIndex: number) {
    var col = match.incremental.table[match.pos];
    return col && col.memo.has(ruleIndex);
  },
  memoizeResult(
    match: Matcher,
    pos: number,
    ruleIndex: number,
    ast: AstSymbolNodeType | null,
  ) {
    var col = match.incremental.table[pos];
    if (!col) {
      col = match.incremental.table[pos] = {
        memo: new Map(),
        maxExaminedLength: -1,
      };
    }
    var examinedLength = match.maxExaminedPos - pos + 1;
    if (ast) {
      col.memo.set(ruleIndex, {
        ast,
        matchLength: match.pos - pos,
        examinedLength,
      });
    } else {
      col.memo.set(ruleIndex, {
        ast: null,
        examinedLength,
      });
    }
    col.maxExaminedLength = Math.max(col.maxExaminedLength, examinedLength);
  },
  fixMemoPosition(node: AstNodeType, end: number, diff: number) {
    if (node.start >= end) {
      node.start += diff;
      node.end += diff;
    }
    if (node.type === 'symbol') {
      for (const c of node.children) {
        fixMemoPosition(c, end, diff);
      }
    }
  },
  useMemoizedResult(match: Matcher, ruleIndex: number) {
    var col = match.incremental.table[match.pos];
    var result = col.memo.get(ruleIndex)!;
    match.maxExaminedPos = Math.max(
      match.maxExaminedPos,
      match.pos + result.examinedLength - 1,
    );
    if (result.ast) {
      const { start, end, len } = match.incremental;
      if (start !== -1) {
        const diff = len - (end - start);
        if (diff) {
          fixMemoPosition(result.ast, end, diff);
        }
      }
      match.pos += result.matchLength!;
    }
    return result.ast;
  },
  applyEdit(match: Matcher, startPos: number, endPos: number, rLength: number) {
    const { table } = match.incremental;
    match.incremental.table = [
      ...table.slice(0, startPos),
      ...new Array(rLength).fill(null),
      ...table.slice(endPos),
    ];
    for (var pos = 0; pos < startPos; pos++) {
      var col = table[pos];
      if (col && pos + col.maxExaminedLength > startPos) {
        var newMax = 0;
        for (var [ruleIndex, entry] of col.memo.entries()) {
          var { examinedLength } = entry;
          if (pos + examinedLength > startPos) {
            col.memo.delete(ruleIndex);
          } else if (examinedLength > newMax) {
            newMax = examinedLength;
          }
        }
        col.maxExaminedLength = newMax;
      }
    }
  },

  ...symbolUtils,
};

const utils = {
  globalUtils,

  ...globalUtils,

  eachRhs(rhs: Rhs, fn: (r: string, index: number) => void) {
    rhs.forEach((r, index) => {
      if (typeof r !== 'string') {
        return;
      }
      fn(r, index);
    });
  },

  regexEscape(input: string) {
    return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  },

  assertSymbolString(symbol: any): asserts symbol is string {
    if (typeof symbol !== 'string') {
      throw new Error('invalid symbol:' + JSON.stringify(symbol, null, 2));
    }
  },

  toFunctionString(fn: Function, name?: string) {
    const str = fn.toString();
    if (str.match(/^function\s+\(/)) {
      return str.replace(/^function\s+\(/, `function ${name || fn.name}(`);
    }
    return 'function ' + str;
  },

  escapeString(str: string, quote?: string) {
    var regexp = single;
    if (quote === '"') {
      regexp = doubleReg;
    } else {
      quote = "'";
    }
    return str
      .replace(/\\/g, '\\\\')
      .replace(/\r/g, '\\r')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t')
      .replace(regexp, '\\' + quote);
  },

  getAstNodeClassName(str: string) {
    return 'Ast_' + util.ucfirst(util.camelCase(str)) + '_Node';
  },

  serializeObject(
    obj: any,
    stringify?: Function,
    parent?: any,
  ): string | false {
    var r;

    if (
      stringify &&
      typeof stringify === 'function' &&
      (r = stringify(obj, parent)) === false
    ) {
      return false;
    }

    if (typeof r === 'string') {
      return r;
    }

    if (r !== undefined) {
      obj = r;
    }

    var ret = [];

    if (typeof obj === 'string') {
      return "'" + utils.escapeString(obj) + "'";
    } else if (typeof obj === 'number') {
      return obj + '';
    } else if (util.isRegExp(obj)) {
      return (
        '/' +
        obj.source +
        '/' +
        (obj.global ? 'g' : '') +
        (obj.ignoreCase ? 'i' : '') +
        (obj.multiline ? 'm' : '')
      );
    } else if (Array.isArray(obj)) {
      ret.push('[');
      var sub = [];
      for (const v of obj) {
        var t = utils.serializeObject(v, stringify, obj);
        if (t !== false) {
          sub.push(t);
        }
      }
      ret.push(sub.join(', '));
      ret.push(']');
      return ret.join('');
    } else if (typeof obj === 'object') {
      ret = [];
      ret[0] = '{';
      var start = 1;
      for (var i of Object.keys(obj)) {
        var v = obj[i];
        var t = utils.serializeObject(v, stringify, obj);
        if (t === false) {
          continue;
        }
        /*jshint quotmark:false*/
        var key = "'" + utils.escapeString(i) + "'";
        ret.push((start ? '' : ',') + key + ': ' + t);
        start = 0;
      }
      ret.push('}');
      return ret.join('\n');
    } else if (typeof obj === 'function') {
      const fnStr = String(obj).trim();
      if (fnStr.match(/^class\s+/)) {
        return fnStr;
      }
      //x=>({})
      if (fnStr.match(/^[\w\d]+\s*=>/)) {
        return fnStr;
      }
      var tag = /^[^(]+/;
      if (fnStr.match(tag)) {
        return fnStr.replace(tag, 'function');
      }
      return fnStr;
    } else {
      return obj + '';
    }
  },
};
export interface MemoTableItem {
  memo: Map<
    number,
    {
      ast: AstSymbolNodeType | null;
      matchLength?: number;
      examinedLength: number;
    }
  >;
  maxExaminedLength: number;
}
export interface Matcher {
  incremental: Required<Required<ParserOptions>['incremental']>;
  pos: number;
  maxExaminedPos: number;
}

const {
  cleanAst,
  defaultTransformAstNode,
  peekStack,
  isExtraAstNode,
  isProductionEndFlag,
  isAddAstNodeFlag,
  getParseError,
  getAstRootNode,
  closeAstWhenError,
  getOriginalSymbol,
  pushRecoveryTokens,
  memoizeResult,
  fixMemoPosition,
} = utils;

for (const k of Object.keys(util)) {
  // @ts-ignore
  if (!utils[k]) {
    // @ts-ignore
    utils[k] = util[k];
  }
}

export default utils;
