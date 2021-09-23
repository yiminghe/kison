// @ts-check

var Utils = require('./utils');

/**
 * non-terminal symbol for grammar
 * @class Kison.NonTerminal
 */
class NonTerminal {
  productions = [];
  symbol = undefined;
  firsts = {};
  nullable = false;
  follows = {};

  constructor(cfg) {
    Object.assign(this, cfg);
  }

  addFollows(follows) {
    const { follows: myFollow } = this;
    let changed = false;
    for (var key in follows) {
      if (!myFollow[key]) {
        myFollow[key] = 1;
        changed = true;
      }
    }
    return changed;
  }
}

module.exports = NonTerminal;
