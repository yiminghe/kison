/**
 * @ignore
 * NonTerminal Set for KISON
 * @author yiminghe@gmail.com
 */

var Utils = require('./utils');

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
        }
    });
    Utils.mix(this, cfg);
}

module.exports = NonTerminal;