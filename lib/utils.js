// @ts-check

var util = require('modulex-util');

var doubleReg = /"/g;
var single = /'/g;

const gened = {
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
};

var { isArray } = gened;

const utils = (module.exports = Object.assign({}, util, gened, {
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

  filterRhs(rhs) {
    return rhs.filter((r) => typeof r === 'string');
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

  isOptionalSymbol(s) {
    return typeof s === 'string' && s.length > 1 && s.endsWith('?');
  },

  normalizeSymbol(s) {
    return isOptionalSymbol(s) || isZeroOrMoreSymbol(s) ? s.slice(0, -1) : s;
  },

  isZeroOrMoreSymbol(s) {
    return typeof s === 'string' && s.length > 1 && s.endsWith('*');
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
    } else if (util.isArray(obj)) {
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

const { isOptionalSymbol, isZeroOrMoreSymbol } = utils;
