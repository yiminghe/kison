// @ts-check

const { filterRhs, eachRhs } = require('./utils');

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

  lastTerminal(lexer) {
    const rhs = filterRhs(this.rhs);
    for (let i = rhs.length - 1; i >= 0; i--) {
      if (lexer.hasToken(rhs[i], true)) {
        return rhs[i];
      }
    }
    return null;
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
      if (typeof rhs[i] === 'string') {
        stringStart++;
      }
      if (stringStart === index) {
        if (!inclusive) {
          while (rhs[i + 1] && typeof rhs[i + 1] !== 'string') {
            i++;
          }
        }
        return i;
      }
    }
    return rhs.length;
  }

  toString(dot, lexer) {
    var rhsStr = '';
    var { rhs } = this;
    eachRhs(rhs, (r, index) => {
      if (index === dot) {
        rhsStr += ' . ';
      }

      rhsStr += r + ' ';
    });
    if (dot === rhs.length) {
      rhsStr += ' . ';
    }
    return this.symbol + ' => ' + rhsStr;
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
