/**
 * @ignore
 * Production for KISON
 * @author yiminghe@gmail.com
 */

var Utils = require("./utils");

function Production(cfg) {
  Object.defineProperties(this, {
    firsts: {
      writable: true,
      value: {}
    },
    follows: {
      writable: true,
      value: []
    },
    symbol: {
      writable: true
    },
    rhs: {
      writable: true,
      value: []
    },
    nullable: {
      writable: true,
      value: false
    },
    action: {
      writable: true
      // action for this production
    }
  });
  Object.assign(this, cfg);
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

/**
 * production for grammar
 * @class Kison.Production
 */
Production.prototype = {
  constructor: Production,

  equals(other) {
    var self = this;
    if (!equals(other.rhs, self.rhs)) {
      return false;
    }
    return other.symbol === self.symbol;
  },

  toString(dot) {
    var rhsStr = "";
    var rhs = this.rhs;
    Utils.eachRhs(rhs, function(r, index) {
      if (index === dot) {
        rhsStr += " . ";
      }
      rhsStr += r + " ";
    });
    if (dot === rhs.length) {
      rhsStr += " . ";
    }
    return this.symbol + " => " + rhsStr;
  }
};
