/**
 * @ignore
 * Item for KISON
 * @author yiminghe@gmail.com
 */
var Utils = require("../utils");

function equals(s1, s2) {
  for (var i in s1) {
    if (!(i in s2)) {
      return false;
    }
  }

  for (i in s2) {
    if (!(i in s1)) {
      return false;
    }
  }

  return true;
}

function Item(cfg) {
  Object.defineProperties(this, {
    dotPosition: {
      writable: true,
      value: 0
    },
    lookAhead: {
      writable: true,
      /*
             2012-07-27
             improve performance,use object to compare( equal )
             and find( indexOf )
             instead of array
             */
      value: {}
    }
  });
  Utils.mix(this, cfg);
}

/**
 * grammar item
 * @class Kison.Item
 */
Item.prototype = {
  constructor: Item,

  equals(other, ignoreLookAhead) {
    var self = this;
    if (!other.production.equals(self.production)) {
      return false;
    }
    if (other.dotPosition !== self.dotPosition) {
      return false;
    }
    if (!ignoreLookAhead) {
      if (!equals(self.lookAhead, other.lookAhead)) {
        return false;
      }
    }
    return true;
  },

  toString(ignoreLookAhead) {
    return (
      this.production.toString(this.dotPosition) +
      (ignoreLookAhead ? "" : "," + Utils.keys(this.lookAhead).join("/"))
    );
  },

  addLookAhead(ls) {
    var lookAhead = this.lookAhead,
      ret = 0;
    Utils.each(ls, function(_, l) {
      if (!lookAhead[l]) {
        lookAhead[l] = 1;
        ret = 1;
      }
    });
    return ret;
  }
};

module.exports = Item;
