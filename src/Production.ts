import utils from './utils';
import type { Rhs } from './types';
import type Lexer from './Lexer';

const { filterRhs, eachRhs } = utils;

interface Params {
  symbol: string;
  rhs: Rhs;
  label?: string;
  ruleIndex: number;
  skipAstNode?: boolean;
  action?: Function;
  predict?: Function;
}

class Production {
  firsts: Record<string, number> = {};
  follows: Record<string, number> = {};
  symbol: string = '';
  rhs: Rhs = [];
  flat?: boolean;
  nullable = false;
  action?: Function;
  predict?: Function;
  ruleIndex: number;
  priority?: number;
  precedence?: string;
  skipAstNode?: boolean;
  label?: string;

  constructor(cfg: Params) {
    Object.assign(this, cfg);
    this.ruleIndex = cfg.ruleIndex;
  }

  equals(other: Production) {
    if (!equals(other.rhs, this.rhs)) {
      return false;
    }
    return other.symbol === this.symbol;
  }

  lastTerminal(lexer: Lexer) {
    const rhs = filterRhs(this.rhs);
    for (let i = rhs.length - 1; i >= 0; i--) {
      const rh = rhs[i];
      if (typeof rh === 'string' && lexer.hasToken(rh)) {
        return rhs[i];
      }
    }
    return null;
  }

  commonLeftIndex(production: Production) {
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

  rhsEqSymbol(nonTerminals: Record<string, true>) {
    return (
      this.rhs.length === 1 &&
      typeof this.rhs[0] === 'string' &&
      !!nonTerminals[this.rhs[0]]
    );
  }

  replaceSymbol(original: string, replaced: string) {
    if (this.symbol === original) {
      this.symbol = replaced;
    }
    eachRhs(this.rhs, (r, index) => {
      if (r === original) {
        this.rhs[index] = replaced;
      }
    });
  }

  indexAtStringIndex(index: number, inclusive?: boolean) {
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

  toString(dot?: number) {
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

export default Production;

function equals(s1: Rhs, s2: Rhs) {
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
