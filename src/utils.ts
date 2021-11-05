// @ts-ignore
import util from 'modulex-util';
import * as AstNodes from './AstNode';
import type {
  AstSymbolNode as AstSymbolNodeType,
  AstNode as AstNodeType,
  AstErrorNode as AstErrorNodeType,
} from './AstNode';
import data from './data';
import type { Token } from './parser';
import type { ParseError, Rhs, TransformNode } from './types';
import type { ProductionRule } from './Grammar';

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
      ret.error = {
        ...getParseError(getExpected),
        expected: getExpected(),
        symbol: peekStack(astStack)?.symbol,
        lexer: lexer.toJSON(),
      };
      ret.errorNode = closeAstWhenError(ret.error, astStack);
    }
    return ret;
  },

  takeCareLLError(
    getExpected: () => string[],
    onErrorRecovery: any,
    topSymbol: any,
    shouldDelete: (nextToken: Token) => boolean,
    transformNode: TransformNode,
    recoveryTokens: Token[],
    ret: {
      breakToEnd?: boolean;
      token: Token | undefined;
      error: ParseError | undefined;
      errorNode: AstErrorNodeType | undefined;
    },
  ) {
    ret.error = {
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
      if (topSymbol === nextToken.t || shouldDelete(nextToken)) {
        recommendedAction.action = 'del';
      } else if (ret.error.expected.length) {
        recommendedAction.action = 'add';
      }

      const localErrorNode = new AstErrorNode({
        error: ret.error,
        ...ret.error.lexer,
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
        ret.errorNode = closeAstWhenError(ret.error, astStack);
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
      ret.errorNode = closeAstWhenError(ret.error, astStack);
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
    topSymbol: T,
    popSymbolStack: Function,
    peekSymbolStack: () => T,
  ) {
    while (isProductionEndFlag(topSymbol) || isAddAstNodeFlag(topSymbol)) {
      let ast = astStack.pop()!;
      const needAction = ast.done();

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
          children: [ast],
          internalRuleIndex: ast.internalRuleIndex,
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
    return topSymbol;
  },

  prepareLLParse() {
    globalSymbolNodeId = 0;
    parser.userData = {};
    symbolStack = [];
    astStack = [
      new AstSymbolNode({
        id: 0,
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

  closeAstWhenError(error: ParseError, astStack: AstNodeType[]) {
    const errorNode = new AstErrorNode({
      error,
      ...error.lexer,
    });
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

  getParseError(getExpected: () => string[]) {
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
  },

  cleanAst(
    ast: AstSymbolNodeType,
    transformNode: TransformNode,
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
    transformNode: TransformNode,
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

  isZeroOrMoreSymbol(s: any) {
    return (
      typeof s === 'string' && s !== '*?' && s.length > 1 && !!s.match(/\*\??$/)
    );
  },

  isOneOrMoreSymbol(s: any) {
    return (
      typeof s === 'string' && s !== '+?' && s.length > 1 && !!s.match(/\+\??$/)
    );
  },

  isLazySymbol(s: any) {
    const match = typeof s === 'string' && s.match(/(\*|\+|\?)\?$/);
    return match && s.length !== 2;
  },

  isOptionalSymbol(s: any) {
    return typeof s === 'string' && s.length > 1 && !!s.match(/\??\?/);
  },

  normalizeSymbol(s: any): string {
    const ret =
      isOptionalSymbol(s) || isZeroOrMoreSymbol(s) || isOneOrMoreSymbol(s)
        ? s.replace(/(\*|\+|\?)?\??$/, '')
        : s;
    // ??
    return ret || (s && s.slice(0, -1));
  },
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
    return util.ucfirst(util.camelCase(str)) + '_Node';
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
        obj.source.replace(/\\\\/g, '\\') +
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

const {
  isOptionalSymbol,
  cleanAst,
  defaultTransformAstNode,
  isZeroOrMoreSymbol,
  isOneOrMoreSymbol,
  peekStack,
  isExtraAstNode,
  isProductionEndFlag,
  isAddAstNodeFlag,
  getParseError,
  getAstRootNode,
  closeAstWhenError,
  getOriginalSymbol,
  pushRecoveryTokens,
} = utils;

for (const k of Object.keys(util)) {
  // @ts-ignore
  if (!utils[k]) {
    // @ts-ignore
    utils[k] = util[k];
  }
}

export default utils;
