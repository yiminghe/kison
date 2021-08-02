/**
 * @ignore
 * Item Set for KISON
 * @author yiminghe@gmail.com
 */

var Utils = require("../utils");

class ItemSet {
  items = [];
  gotos = {};
  // 多个来源同一个symbol指向自己
  //{ c: [x,y]}
  reverseGotos = {};

  constructor(cfg) {
    Object.assign(this, cfg);
  }

  // Insert item by order
  addItem(item) {
    var items = this.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].production.toString() > item.production.toString()) {
        break;
      }
    }
    items.splice(i, 0, item);
  }

  size() {
    return this.items.length;
  }

  findItemIndex(item, ignoreLookAhead) {
    var oneItems = this.items;
    for (var i = 0; i < oneItems.length; i++) {
      if (oneItems[i].equals(item, ignoreLookAhead)) {
        return i;
      }
    }
    return -1;
  }

  getItemAt(index) {
    return this.items[index];
  }

  equals(other, ignoreLookAhead) {
    var oneItems = this.items,
      i,
      otherItems = other.items;
    if (oneItems.length !== otherItems.length) {
      return false;
    }
    for (i = 0; i < oneItems.length; i++) {
      if (!oneItems[i].equals(otherItems[i], ignoreLookAhead)) {
        return false;
      }
    }
    return true;
  }

  toString(withGoto) {
    var ret = [],
      gotos = this.gotos;
    Utils.each(this.items, function(item) {
      ret.push(item.toString());
    });
    if (withGoto) {
      ret.push("start gotos:");
      Utils.each(gotos, function(itemSet, symbol) {
        ret.push(symbol + " -> ");
        ret.push(itemSet.toString());
      });
      ret.push("end gotos:");
    }
    return ret.join(" \n ");
  }

  addReverseGoto(symbol, item) {
    var reverseGotos = this.reverseGotos;
    reverseGotos[symbol] = reverseGotos[symbol] || [];
    reverseGotos[symbol].push(item);
  }
}

module.exports = ItemSet;
