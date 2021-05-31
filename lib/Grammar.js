/**
 * @ignore
 * grammar parser
 * @author yiminghe@gmail.com
 */
var debug = require("debug")("kison");
/*jshint loopfunc: true*/
var Utils = require("./utils");
var mix = Utils.mix;
var each = Utils.each;
var NonTerminal = require("./NonTerminal");
var Lexer = require("./Lexer");
var Production = require("./Production");

var END_TAG = Lexer.STATIC.END_TAG;
var START_TAG = "$START";

function setSize(set3) {
    return Object.keys(set3).length;
}

function Grammar(cfg) {
    var lexer;
    Object.defineProperties(this, {
        table: {
            writable: true,
            value: {}
        },
        itemSets: {
            writable: true,
            value: []
        },
        productions: {
            writable: true,
            value: []
        },
        nonTerminals: {
            writable: true,
            value: {}
        },
        lexer: {
            get() {
                return lexer;
            },
            set(v) {
                if (!(v instanceof Lexer)) {
                    v = new Lexer(v);
                }
                lexer = v;
            }
        },
        terminals: {
            writable: true,
            value: {}
        }
    });
    mix(this, cfg);
}

Grammar.START_TAG = START_TAG;

/**
 * grammar generator
 * @class Kison.Grammar
 */
Grammar.prototype = {
    constructor: Grammar,

    build() {
        var self = this;
        var lexer = self.lexer;
        var vs = self.productions;
        vs.unshift({
            symbol: START_TAG,
            rhs: [vs[0].symbol]
        });
        each(vs, function (v, index) {
            v.symbol = lexer.mapSymbol(v.symbol);
            var rhs = v.rhs;
            each(rhs, function (r, index) {
                rhs[index] = lexer.mapSymbol(r);
            });
            vs[index] = new Production(v);
        });
        self.buildTerminals();
        self.buildNonTerminals();
        self.buildNullable();
        self.buildFirsts();
    },

    buildTerminals() {
        var self = this;
        var lexer = self.lexer;
        var rules = lexer && lexer.rules;
        var terminals = self.terminals;
        terminals[lexer.mapSymbol(END_TAG)] = 1;
        each(rules, function (rule) {
            var token = rule.token || rule[0];
            if (token) {
                terminals[token] = 1;
            }
        });
    },

    buildNonTerminals() {
        var self = this;
        var terminals = self.terminals;
        var nonTerminals = self.nonTerminals;
        var productions = self.productions;
        each(productions, function (production) {
            var symbol = production.symbol;
            var nonTerminal = nonTerminals[symbol];
            if (!nonTerminal) {
                nonTerminal = nonTerminals[symbol] = new NonTerminal({
                    symbol: symbol
                });
            }
            nonTerminal.productions.push(production);
            each(production.rhs, function (rh) {
                if (!terminals[rh] && !nonTerminals[rh]) {
                    nonTerminals[rh] = new NonTerminal({
                        symbol: rh
                    });
                }
            });
        });
    },

    buildNullable() {
        var self = this;
        var i, rhs, n, t, production, productions;
        var nonTerminals = self.nonTerminals;
        var cont = true;
        // loop until no further changes have been made
        while (cont) {
            cont = false;
            // 传递
            // S -> T
            // T -> t
            // check if each production is null able
            each(self.productions, function (production) {
                if (!production.nullable) {
                    rhs = production.rhs;
                    for (i = 0, n = 0; (t = rhs[i]); ++i) {
                        if (self.isNullable(t)) {
                            n++;
                        }
                    }
                    if (n === i) {
                        // production is null able if all tokens are null able
                        production.nullable = cont = true;
                    }
                }
            });
            //check if each symbol is null able
            each(nonTerminals, function (v) {
                if (!v.nullable) {
                    productions = v.productions;
                    for (i = 0; (production = productions[i]); i++) {
                        if (production.nullable) {
                            v.nullable = cont = true;
                            break;
                        }
                    }
                }
            });
        }
    },

    isNullable(symbol) {
        var self = this;
        var nonTerminals = self.nonTerminals;
        // rhs
        if (symbol instanceof Array) {
            for (var i = 0, t; (t = symbol[i]); ++i) {
                if (!self.isNullable(t)) {
                    return false;
                }
            }
            return true;
            // terminal
        } else if (!nonTerminals[symbol]) {
            return false;
            // non terminal
        } else {
            return nonTerminals[symbol].nullable;
        }
    },

    findFirst(symbol) {
        var self = this;
        var firsts = {};
        var nonTerminals = self.nonTerminals;
        var t, i;
        // rhs
        if (symbol instanceof Array) {
            for (i = 0; (t = symbol[i]); ++i) {
                if (!nonTerminals[t]) {
                    firsts[t] = 1;
                } else {
                    mix(firsts, nonTerminals[t].firsts);
                }
                if (!self.isNullable(t)) {
                    break;
                }
            }
            return firsts;
            // terminal
        } else if (!nonTerminals[symbol]) {
            return { [symbol]: 1 };
            // non terminal
        } else {
            return nonTerminals[symbol].firsts;
        }
    },

    findFollow(symbol) {
        var self = this;
        var nonTerminals = self.nonTerminals;
        if (!nonTerminals[symbol]) {
            return { [symbol]: 1 };
            // non terminal
        } else {
            return nonTerminals[symbol].follows;
        }
    },

    buildFollows() {
        var self = this;
        const { productions, lexer } = self;
        var nonTerminals = self.nonTerminals;
        var cont = true;
        var nonTerminal, symbol;
        var mappedStartTag = lexer.mapSymbol(START_TAG);
        var mappedEndTag = lexer.mapSymbol(END_TAG);
        if (!nonTerminals[mappedStartTag]) {
            debugger
        }
        nonTerminals[mappedStartTag].follows[mappedEndTag] = 1;
        // loop until no further changes have been made
        while (cont) {
            cont = false;
            for (symbol in nonTerminals) {
                nonTerminal = nonTerminals[symbol];
                for (const p of productions) {
                    const { rhs, symbol: leftSymbol } = p;
                    const index = rhs.indexOf(symbol);
                    if (index !== -1) {
                        if (index !== rhs.length - 1) {
                            const nextSymbol = rhs[index + 1];
                            cont = cont || nonTerminal.addFollows(this.findFirst(nextSymbol));
                            if (this.isNullable(nextSymbol)) {
                                cont = cont || nonTerminal.addFollows(this.findFollow(leftSymbol));
                            }
                        } else {
                            cont = cont || nonTerminal.addFollows(this.findFollow(leftSymbol));
                        }
                    }
                }
            }
        }
    },

    buildFirsts() {
        var self = this;
        var nonTerminals = self.nonTerminals;
        var cont = true;
        var nonTerminal, symbol, firsts;
        // loop until no further changes have been made
        while (cont) {
            cont = false;
            // 传递
            // S -> T
            // T -> t

            // S -> S y
            // S -> t
            each(self.productions, function (production) {
                var firsts = self.findFirst(production.rhs);
                if (setSize(firsts) !== setSize(production.firsts)) {
                    production.firsts = firsts;
                    cont = true;
                }
            });
            for (symbol in nonTerminals) {
                nonTerminal = nonTerminals[symbol];
                firsts = {};
                each(nonTerminal.productions, function (production) {
                    mix(firsts, production.firsts);
                });
                if (setSize(firsts) !== setSize(nonTerminal.firsts)) {
                    nonTerminal.firsts = firsts;
                    cont = true;
                }
            }
        }
    },

};

module.exports = Grammar;
