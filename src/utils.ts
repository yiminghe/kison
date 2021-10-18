// @ts-ignore
import util from 'modulex-util';
import * as AstNodes from './AstNode';
import type {
  AstSymbolNode as AstSymbolNodeType,
  AstNode as AstNodeType,
} from './AstNode';
import data from './data';
import type { ParseError, Token } from './parser';
import type { Rhs, TransformNode } from './types';

const { AstTokenNode, AstErrorNode, BaseAstNode, AstSymbolNode } = AstNodes;

var {
  productionAddAstNodeFlag,
  productionEndFlag,
  lexer,
  Lexer,
  parser,
  START_TAG,
} = data;

var doubleReg = /"/g;
var single = /'/g;

const globalUtils = {
  BaseAstNode,

  AstSymbolNode,

  AstTokenNode,

  AstErrorNode,

  filterRhs(rhs: Rhs): string[] {
    return rhs.filter((r) => typeof r === 'string') as string[];
  },

  isExtraAstNode(ast: AstSymbolNodeType) {
    return ast.children && !ast.children.length;
  },

  peekStack<T>(stack: T[], n: number = 1) {
    return stack[stack.length - n];
  },

  getOriginalSymbol(s: string) {
    let uncompressed = lexer.mapReverseSymbol(s);
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

  checkProductionLabelIsSame(
    node: AstSymbolNodeType,
    parent: AstSymbolNodeType,
  ) {
    if (node.label || parent.label) {
      if (node.label === parent.label) {
        return node.children;
      }
      return node;
    }
    return node.children;
  },

  defaultTransformAstNode({ node, parent }: Parameters<TransformNode>[0]) {
    if (node.type === 'token' || node.symbol !== parent.symbol) {
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
    if (node.children[0]?.type === 'token') {
      // do not check label
      // parent.label = node.label;
      return node.children;
    }
    return checkProductionLabelIsSame(node, parent);
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

const {
  isOptionalSymbol,
  checkProductionLabelIsSame,
  cleanAst,
  defaultTransformAstNode,
  isZeroOrMoreSymbol,
  isOneOrMoreSymbol,
  peekStack,
  isExtraAstNode,
} = utils;

for (const k of Object.keys(util)) {
  // @ts-ignore
  if (!utils[k]) {
    // @ts-ignore
    utils[k] = util[k];
  }
}

export default utils;
