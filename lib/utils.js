/**
 * @ignore
 * utils for kison.
 * @author yiminghe@gmail.com
 */

var util = require("modulex-util");

var doubleReg = /"/g;
var single = /'/g;

const gened = {
  mix(to, from) {
    for (var f in from) {
      to[f] = from[f];
    }
  },

  isArray(obj) {
    return "[object Array]" === Object.prototype.toString.call(obj);
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
  }
};

var { isArray } = gened;

const utils = (module.exports = Object.assign({}, util, gened, {
  eachRhs(rhs, fn) {
    utils.each(rhs, (r, index) => {
      if (typeof r !== "string") {
        return;
      }
      fn(r, index);
    });
  },

  assertSymbolString(symbol) {
    if (typeof symbol !== "string") {
      throw new Error("invalid symbol".symbol);
    }
  },

  filterRhs(rhs) {
    return rhs.filter(r => typeof r === "string");
  },

  toFunctionString(fn, name) {
    const str = fn.toString();
    if (str.match(/^function\s+\(/)) {
      return str.replace(/^function\s+\(/, `function ${name || fn.name}(`);
    }
    return "function " + str;
  },

  escapeString(str, quote) {
    var regexp = single;
    if (quote === '"') {
      regexp = doubleReg;
    } else {
      quote = "'";
    }
    return str
      .replace(/\\/g, "\\\\")
      .replace(/\r/g, "\\r")
      .replace(/\n/g, "\\n")
      .replace(/\t/g, "\\t")
      .replace(regexp, "\\" + quote);
  },

  serializeObject(obj, excludeReg) {
    var r;

    if (
      excludeReg &&
      typeof excludeReg === "function" &&
      (r = excludeReg(obj)) === false
    ) {
      return false;
    }

    if (r !== undefined) {
      obj = r;
    }

    var ret = [];

    if (typeof obj === "string") {
      return "'" + utils.escapeString(obj) + "'";
    } else if (typeof obj === "number") {
      return obj + "";
    } else if (util.isRegExp(obj)) {
      return (
        "/" +
        obj.source +
        "/" +
        (obj.global ? "g" : "") +
        (obj.ignoreCase ? "i" : "") +
        (obj.multiline ? "m" : "")
      );
    } else if (util.isArray(obj)) {
      ret.push("[");
      var sub = [];
      util.each(obj, function(v) {
        var t = utils.serializeObject(v, excludeReg);
        if (t !== false) {
          sub.push(t);
        }
      });
      ret.push(sub.join(", "));
      ret.push("]");
      return ret.join("");
    } else if (typeof obj === "object") {
      ret = [];
      ret[0] = "{";
      var start = 1;
      for (var i in obj) {
        var v = obj[i];
        if (excludeReg && util.isRegExp(excludeReg) && i.match(excludeReg)) {
          continue;
        }
        var t = utils.serializeObject(v, excludeReg);
        if (t === false) {
          continue;
        }
        /*jshint quotmark:false*/
        var key = "'" + utils.escapeString(i) + "'";
        ret.push((start ? "" : ",") + key + ": " + t);
        start = 0;
      }
      ret.push("}");
      return ret.join("\n");
    } else if (typeof obj === "function") {
      return (obj + "").replace(/^[\w-]+/, "function");
    } else {
      return obj + "";
    }
  }
}));
