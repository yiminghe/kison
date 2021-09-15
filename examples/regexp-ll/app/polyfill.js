/*! http://mths.be/codepointat v0.1.0 by @mathias */
if (!String.prototype.codePointAt) {
  (function() {
    "use strict"; // 严格模式，needed to support `apply`/`call` with `undefined`/`null`
    var codePointAt = function(position) {
      if (this == null) {
        throw TypeError();
      }
      var string = String(this);
      var size = string.length;
      // 变成整数
      var index = position ? Number(position) : 0;
      if (index != index) {
        // better `isNaN`
        index = 0;
      }
      // 边界
      if (index < 0 || index >= size) {
        return undefined;
      }
      // 第一个编码单元
      var first = string.charCodeAt(index);
      var second;
      if (
        // 检查是否开始 surrogate pair
        first >= 0xd800 &&
        first <= 0xdbff && // high surrogate
        size > index + 1 // 下一个编码单元
      ) {
        second = string.charCodeAt(index + 1);
        if (second >= 0xdc00 && second <= 0xdfff) {
          // low surrogate
          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          return (first - 0xd800) * 0x400 + second - 0xdc00 + 0x10000;
        }
      }
      return first;
    };
    if (Object.defineProperty) {
      Object.defineProperty(String.prototype, "codePointAt", {
        value: codePointAt,
        configurable: true,
        writable: true
      });
    } else {
      String.prototype.codePointAt = codePointAt;
    }
  })();
}

if (!String.fromCodePoint)
  (function(stringFromCharCode) {
    var fromCodePoint = function(_) {
      var codeUnits = [],
        codeLen = 0,
        result = "";
      for (var index = 0, len = arguments.length; index !== len; ++index) {
        var codePoint = +arguments[index];
        // correctly handles all cases including `NaN`, `-Infinity`, `+Infinity`
        // The surrounding `!(...)` is required to correctly handle `NaN` cases
        // The (codePoint>>>0) === codePoint clause handles decimals and negatives
        if (!(codePoint < 0x10ffff && codePoint >>> 0 === codePoint))
          throw RangeError("Invalid code point: " + codePoint);
        if (codePoint <= 0xffff) {
          // BMP code point
          codeLen = codeUnits.push(codePoint);
        } else {
          // Astral code point; split in surrogate halves
          // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          codePoint -= 0x10000;
          codeLen = codeUnits.push(
            (codePoint >> 10) + 0xd800, // highSurrogate
            (codePoint % 0x400) + 0xdc00 // lowSurrogate
          );
        }
        if (codeLen >= 0x3fff) {
          result += stringFromCharCode.apply(null, codeUnits);
          codeUnits.length = 0;
        }
      }
      return result + stringFromCharCode.apply(null, codeUnits);
    };
    try {
      // IE 8 only supports `Object.defineProperty` on DOM elements
      Object.defineProperty(String, "fromCodePoint", {
        value: fromCodePoint,
        configurable: true,
        writable: true
      });
    } catch (e) {
      String.fromCodePoint = fromCodePoint;
    }
  })(String.fromCharCode);
