/**
 * @ignore
 * Production for KISON
 * @author yiminghe@gmail.com
 */

const { filterRhs, eachRhs } = require("./utils");

class Production {
  firsts = {};
  follows = {};
  symbol = undefined;
  rhs = [];
  nullable = false;
  action = undefined;
  priority = undefined;

  constructor(cfg) {
    Object.assign(this, cfg);
  }

  equals(other) {
    if (!equals(other.rhs, this.rhs)) {
      return false;
    }
    return other.symbol === this.symbol;
  }

  getSymbolString(lexer, r) {
    if (lexer) {
      return lexer.mapReverseSymbol(r);
    }
    return r;
  }

  commonLeftIndex(production) {
    if (this.symbol !== production.symbol) {
      return 0;
    }
    const rhs = filterRhs(this.rhs);
    const otherRhs = filterRhs(production.rhs);
    const l = Math.min(rhs.length, otherRhs.length);
    for (let i = 0; i < l; i++) {
      if (rhs[i] !== otherRhs[i]) {
        return i;
      }
    }
    return l;
  }

  rhsEqSymbol(nonTerminals) {
    return this.rhs.length === 1 && !!nonTerminals[this.rhs[0]];
  }

  replaceSymbol(original, replaced) {
    if (this.symbol === original) {
      this.symbol = replaced;
    }
    eachRhs(this.rhs, (r, index) => {
      if (r === original) {
        this.rhs[index] = replaced;
      }
    });
  }

  indexAtStringIndex(index, inclusive) {
    let stringStart = -1;
    const { rhs } = this;
    for (let i = 0; i < rhs.length; i++) {
      if (typeof rhs[i] === "string") {
        stringStart++;
      }
      if (stringStart === index) {
        if (!inclusive) {
          while (rhs[i + 1] && typeof rhs[i + 1] !== "string") {
            i++;
          }
        }
        return i;
      }
    }
    return rhs.length;
  }

  toString(dot, lexer) {
    var rhsStr = "";
    var { rhs } = this;
    eachRhs(rhs, (r, index) => {
      if (index === dot) {
        rhsStr += " . ";
      }

      rhsStr += this.getSymbolString(lexer, r) + " ";
    });
    if (dot === rhs.length) {
      rhsStr += " . ";
    }
    return this.getSymbolString(lexer, this.symbol) + " => " + rhsStr;
  }
}

module.exports = Production;

function equals(s1, s2) {
  if (s1.length !== s2.length) {
    return false;
  }
  for (var i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      return false;
    }
  }
  return true;
}
