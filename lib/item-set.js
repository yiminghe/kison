/**
 * @ignore
 * Item Set for KISON
 * @author yiminghe@gmail.com
 */

var Utils = require('./utils');

module.exports = ItemSet;

function ItemSet(cfg) {
    Object.defineProperties(this, {
        items: {
            writable: true,
            value: []
        },
        gotos: {
            writable: true,
            value: {}
        },
        reverseGotos: {
            writable: true,
            // 多个来源同一个symbol指向自己
            //{ c: [x,y]}
            value: {}
        }
    });
    Utils.mix(this, cfg);
}

/**
 * ItemSet for grammar
 * @class Kison.ItemSet
 */
ItemSet.prototype = {
    constructor: ItemSet,
    // Insert item by order
    addItem: function (item) {
        var items = this.items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].production.toString() > item.production.toString()) {
                break;
            }
        }
        items.splice(i, 0, item);
    },

    size: function () {
        return this.items.length;
    },

    findItemIndex: function (item, ignoreLookAhead) {
        var oneItems = this.items;
        for (var i = 0; i < oneItems.length; i++) {
            if (oneItems[i].equals(item, ignoreLookAhead)) {
                return i;
            }
        }
        return -1;
    },

    getItemAt: function (index) {
        return this.items[index];
    },

    equals: function (other, ignoreLookAhead) {
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
    },
    toString: function (withGoto) {
        var ret = [],
            gotos = this.gotos;
        Utils.each(this.items, function (item) {
            ret.push(item.toString());
        });
        if (withGoto) {
            ret.push('start gotos:');
            Utils.each(gotos, function (itemSet, symbol) {
                ret.push(symbol + ' -> ');
                ret.push(itemSet.toString());
            });
            ret.push('end gotos:');
        }
        return ret.join(' \n ');
    },

    addReverseGoto: function (symbol, item) {
        var reverseGotos = this.reverseGotos;
        reverseGotos[symbol] = reverseGotos[symbol] || [];
        reverseGotos[symbol].push(item);
    }
};
