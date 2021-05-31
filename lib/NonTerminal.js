/**
 * @ignore
 * NonTerminal Set for KISON
 * @author yiminghe@gmail.com
 */

var Utils = require("./utils");

/**
 * non-terminal symbol for grammar
 * @class Kison.NonTerminal
 */
function NonTerminal(cfg) {
  Object.defineProperties(this, {
    productions: {
      writable: true,
      value: []
    },
    symbol: {
      writable: true
    },
    firsts: {
      writable: true,
      value: {}
    },
    nullable: {
      writable: true,
      value: false
    },
    follows: {
      writable: true,
      value: {}
    }
  });
  Utils.mix(this, cfg);
}

NonTerminal.prototype = {
  constructor: NonTerminal,

  addFollows(follows) {
    const myFollow = this.follows;
    let changed = false;
    for (var key in follows) {
      if (!myFollow[key]) {
        myFollow[key] = 1;
        changed = true;
      }
    }
    return changed;
  }
};

module.exports = NonTerminal;
