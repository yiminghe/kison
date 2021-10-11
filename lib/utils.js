// @ts-check

var util = require('modulex-util');

const { AstNode } = require('./AstNode');
const { productionAddAstNodeFlag, productionEndFlag, lexer } = require('./data');

var doubleReg = /"/g;
var single = /'/g;

const globalUtils = {
  AstNode,

  filterRhs(rhs) {
    return rhs.filter((r) => typeof r === 'string');
  },

  getParseError(getExpected) {
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

  cleanAst(ast, transformNode) {
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
        cleanAst(ast.parent,transformNode);
      } else {
        for (const c of children) {
          cleanAst(c,transformNode);
        }
      }
    }
    return ast;
  },

  getAstRootNode(astStack,transformNode, raw) {
    let ast = astStack[0];
    ast = ast?.children?.[0];
    ast = ast?.children?.[0];
    if (ast) {
      ast.parent = null;
    }
    if (raw) {
      return ast;
    }
    return ast && cleanAst(ast,transformNode);
  },

  checkProductionLabelIsSame(node, parent) {
    if (node.label || parent.label) {
      if (node.label === parent.label) {
        return node.children;
      }
      return node;
    }
    return node.children;
  },

  defaultTransformAstNode({ node, parent }) {
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
    return checkProductionLabelIsSame(node, parent);
  },

  isAddAstNodeFlag(t) {
    return t === productionAddAstNodeFlag;
  },

  isProductionEndFlag(t) {
    return t === productionEndFlag;
  },
  isOneOrMoreSymbol(s) {
    return typeof s === 'string' && s.length > 1 && s.endsWith('+');
  },

  isOptionalSymbol(s) {
    return typeof s === 'string' && s.length > 1 && s.endsWith('?');
  },

  normalizeSymbol(s) {
    return isOptionalSymbol(s) || isZeroOrMoreSymbol(s) || isOneOrMoreSymbol(s)
      ? s.slice(0, -1)
      : s;
  },

  isZeroOrMoreSymbol(s) {
    return typeof s === 'string' && s.length > 1 && s.endsWith('*');
  },
};

const utils = (module.exports = Object.assign({}, util, globalUtils, {
  mix(to, from) {
    for (var f in from) {
      to[f] = from[f];
    }
  },

  isArray(obj) {
    return '[object Array]' === Object.prototype.toString.call(obj);
  },

  inArray(item, arr) {
    for (var i = 0, l = arr.length; i < l; i++) {
      if (arr[i] === item) {
        return true;
      }
    }
    return false;
  },

  each(object, fn, context) {
    if (object) {
      var key,
        val,
        length,
        i = 0;

      context = context || null;

      if (!isArray(object)) {
        for (key in object) {
          // can not use hasOwnProperty
          if (fn.call(context, object[key], key, object) === false) {
            break;
          }
        }
      } else {
        length = object.length;
        for (val = object[0]; i < length; val = object[++i]) {
          if (fn.call(context, val, i, object) === false) {
            break;
          }
        }
      }
    }
  },
  eachRhs(rhs, fn) {
    utils.each(rhs, (r, index) => {
      if (typeof r !== 'string') {
        return;
      }
      fn(r, index);
    });
  },

  regexEscape(input) {
    return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  },

  assertSymbolString(symbol) {
    if (typeof symbol !== 'string') {
      throw new Error('invalid symbol:' + JSON.stringify(symbol, null, 2));
    }
  },



  toFunctionString(fn, name) {
    const str = fn.toString();
    if (str.match(/^function\s+\(/)) {
      return str.replace(/^function\s+\(/, `function ${name || fn.name}(`);
    }
    return 'function ' + str;
  },

  escapeString(str, quote) {
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

  getAstNodeClassName(str) {
    return util.ucfirst(util.camelCase(str)) + '_Node';
  },

  serializeObject(obj, stringify, parent) {
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
    } else if (isArray(obj)) {
      ret.push('[');
      var sub = [];
      util.each(obj, function (v) {
        var t = utils.serializeObject(v, stringify, obj);
        if (t !== false) {
          sub.push(t);
        }
      });
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
}));

utils.globalUtils = globalUtils;

const { isOptionalSymbol,
  checkProductionLabelIsSame,
  cleanAst,
  defaultTransformAstNode,
  isZeroOrMoreSymbol, isOneOrMoreSymbol, isArray } =
  utils;
