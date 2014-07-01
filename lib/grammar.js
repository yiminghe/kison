/**
 * @ignore
 * LALR grammar parser
 * @author yiminghe@gmail.com
 */
var debug = require('debug')('kison');
/*jshint loopfunc: true*/
var Utils = require('./utils');
var mix = Utils.mix;
var Item = require('./item');
var ItemSet = require('./item-set');
var NonTerminal = require('./non-terminal');
var Lexer = require('./lexer');
var Production = require('./production');
var GrammarConst = {
    SHIFT_TYPE: 1,
    REDUCE_TYPE: 2,
    ACCEPT_TYPE: 0,
    TYPE_INDEX: 0,
    PRODUCTION_INDEX: 1,
    TO_INDEX: 2
};
var serializeObject = Utils.serializeObject,
    END_TAG = Lexer.STATIC.END_TAG,
    START_TAG = '$START';
var indexOf = Utils.indexOf;

module.exports = Grammar;

function setSize(set3) {
    var count = 0, i;
    for (i in set3) {
        count++;
    }
    return count;
}

function visualizeAction(action, productions, itemSets) {
    switch (action[GrammarConst.TYPE_INDEX]) {
        case GrammarConst.SHIFT_TYPE:
            debug('shift');
            break;
        case GrammarConst.REDUCE_TYPE:
            debug('reduce');
            break;
        case GrammarConst.ACCEPT_TYPE:
            debug('accept');
            break;
    }
    debug('from production:');
    if (action[GrammarConst.PRODUCTION_INDEX] !== undefined) {
        debug(productions[action[GrammarConst.PRODUCTION_INDEX]] + '');
    } else {
        debug('undefined');
    }
    debug('to itemSet:');
    if (action[GrammarConst.TO_INDEX] !== undefined) {
        debug(itemSets[action[GrammarConst.TO_INDEX]].toString(1));
    } else {
        debug('undefined');
    }
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
            get: function () {
                return lexer;
            },
            set: function (v) {
                if (!(v instanceof  Lexer)) {
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

/**
 * grammar generator
 * @class Kison.Grammar
 */
Grammar.prototype = {
    constructor: Grammar,

    build: function () {
        var self = this,
            lexer = self.lexer,
            vs = self.productions;

        vs.unshift({
            symbol: START_TAG,
            rhs: [vs[0].symbol]
        });

        Utils.each(vs, function (v, index) {
            v.symbol = lexer.mapSymbol(v.symbol);
            var rhs = v.rhs;
            Utils.each(rhs, function (r, index) {
                rhs[index] = lexer.mapSymbol(r);
            });
            vs[index] = new Production(v);
        });

        self.buildTerminals();
        self.buildNonTerminals();
        self.buildNullable();
        self.buildFirsts();
        self.buildItemSet();
        self.buildLalrItemSets();
        self.buildTable();
    },

    buildTerminals: function () {
        var self = this,
            lexer = self.lexer,
            rules = lexer && lexer.rules,
            terminals = self.terminals;
        terminals[lexer.mapSymbol(END_TAG)] = 1;
        Utils.each(rules, function (rule) {
            var token = rule.token || rule[0];
            if (token) {
                terminals[token] = 1;
            }
        });
    },

    buildNonTerminals: function () {
        var self = this,
            terminals = self.terminals,
            nonTerminals = self.nonTerminals,
            productions = self.productions;

        Utils.each(productions, function (production) {
            var symbol = production.symbol,
                nonTerminal = nonTerminals[symbol];

            if (!nonTerminal) {
                nonTerminal = nonTerminals[symbol] = new NonTerminal({
                    symbol: symbol
                });
            }

            nonTerminal.productions.push(production);

            Utils.each(production.handles, function (handle) {
                if (!terminals[handle] && !nonTerminals[handle]) {
                    nonTerminals[handle] = new NonTerminal({
                        symbol: handle
                    });
                }
            });
        });
    },

    buildNullable: function () {
        var self = this,
            i,
            rhs,
            n,
            symbol,
            t,
            production,
            productions,
            nonTerminals = self.nonTerminals,
            cont = true;

        // loop until no further changes have been made
        while (cont) {
            cont = false;
            // 传递
            // S -> T
            // T -> t
            // check if each production is null able
            Utils.each(self.productions, function (production) {
                if (!production.nullable) {
                    rhs = production.rhs;
                    for (i = 0, n = 0; (t = rhs[i]); ++i) {
                        if (self.isNullable(t)) {
                            n++;
                        }
                    }
                    if (n === i) { // production is null able if all tokens are null able
                        production.nullable = cont = true;
                    }
                }
            });

            //check if each symbol is null able
            for (symbol in nonTerminals) {

                if (!nonTerminals[symbol].nullable) {
                    productions = nonTerminals[symbol].productions;
                    for (i = 0; (production = productions[i]); i++) {
                        if (production.nullable) {
                            nonTerminals[symbol].nullable = cont = true;
                            break;
                        }
                    }
                }

            }
        }
    },

    isNullable: function (symbol) {
        var self = this,
            nonTerminals = self.nonTerminals;
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

    findFirst: function (symbol) {
        var self = this,
            firsts = {},
            t,
            i,
            nonTerminals = self.nonTerminals;
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
            return [symbol];
            // non terminal
        } else {
            return nonTerminals[symbol].firsts;
        }
    },

    buildFirsts: function () {
        var self = this,
            nonTerminal,
            nonTerminals = self.nonTerminals,
            cont = true,
            symbol, firsts;

        // loop until no further changes have been made
        while (cont) {
            cont = false;

            // 传递
            // S -> T
            // T -> t

            // S -> S y
            // S -> t
            Utils.each(self.productions, function (production) {
                var firsts = self.findFirst(production.rhs);
                if (setSize(firsts) !== setSize(production.firsts)) {
                    production.firsts = firsts;
                    cont = true;
                }
            });

            for (symbol in nonTerminals) {

                nonTerminal = nonTerminals[symbol];
                firsts = {};
                Utils.each(nonTerminal.productions, function (production) {
                    mix(firsts, production.firsts);
                });
                if (setSize(firsts) !== setSize(nonTerminal.firsts)) {
                    nonTerminal.firsts = firsts;
                    cont = true;
                }

            }
        }
    },

    closure: function (itemSet) {
        var self = this,
            items = itemSet.items,
            productions = self.productions,
            cont = 1;

        while (cont) {
            cont = false;

            Utils.each(items, function (item) {

                var dotPosition = item.dotPosition,
                    production = item.production,
                    rhs = production.rhs,
                    dotSymbol = rhs[dotPosition],
                    lookAhead = item.lookAhead,
                    finalFirsts = {};

                Utils.each(lookAhead, function (_, ahead) {
                    var rightRhs = rhs.slice(dotPosition + 1);
                    rightRhs.push(ahead);
                    Utils.mix(finalFirsts, self.findFirst(rightRhs));
                });

                Utils.each(productions, function (p2) {
                    if (p2.symbol === dotSymbol) {

                        var newItem = new Item({
                                production: p2
                            }),

                        /*
                         2012-07-26
                         improve performance,
                         reduce item number,
                         merge lookahead with same production
                         and dotPosition
                         */
                            itemIndex = itemSet.findItemIndex(newItem, true),
                            findItem;

                        if (itemIndex !== -1) {
                            findItem = itemSet.getItemAt(itemIndex);
                            cont = cont || (!!findItem.addLookAhead(finalFirsts));
                        } else {
                            newItem.addLookAhead(finalFirsts);
                            itemSet.addItem(newItem);
                            cont = true;
                        }

                    }
                });

            });
        }

        return itemSet;
    },

    gotos: function (i, x) {
        var j = new ItemSet(),
            iItems = i.items;
        Utils.each(iItems, function (item) {
            var production = item.production,
                dotPosition = item.dotPosition,
                markSymbol = production.rhs[dotPosition];
            if (markSymbol === x) {
                var newItem = new Item({
                        production: production,
                        dotPosition: dotPosition + 1
                    }),
                    itemIndex = j.findItemIndex(newItem, true), findItem;

                if (itemIndex !== -1) {
                    findItem = j.getItemAt(itemIndex);
                    findItem.addLookAhead(item.lookAhead);
                } else {
                    newItem.addLookAhead(item.lookAhead);
                    j.addItem(newItem);
                }
            }
        });
        return this.closure(j);
    },

    findItemSetIndex: function (itemSet) {
        var itemSets = this.itemSets, i;
        for (i = 0; i < itemSets.length; i++) {
            if (itemSets[i].equals(itemSet)) {
                return i;
            }
        }
        return -1;

    },

    // algorithm: 4.53
    buildItemSet: function () {
        var self = this,
            lexer = self.lexer,
            itemSets = self.itemSets,
            lookAheadTmp = {},
            productions = self.productions;

        lookAheadTmp[lexer.mapSymbol(END_TAG)] = 1;

        var initItemSet = self.closure(
            new ItemSet({
                items: [
                    new Item({
                        production: productions[0],
                        lookAhead: lookAheadTmp
                    })
                ]
            }));

        itemSets.push(initItemSet);

        var condition = true,
            symbols = Utils.merge(self.terminals, self.nonTerminals);

        delete  symbols[lexer.mapSymbol(END_TAG)];

        while (condition) {
            condition = false;
            var itemSets2 = itemSets.concat();
            Utils.each(itemSets2, function (itemSet) {
                Utils.each(symbols, function (v, symbol) {

                    if (!itemSet.__cache) {
                        itemSet.__cache = {};
                    }

                    // already computed itemSet 's symbol closure
                    if (itemSet.__cache[symbol]) {
                        return;
                    }

                    var itemSetNew = self.gotos(itemSet, symbol);

                    itemSet.__cache[symbol] = 1;

                    if (itemSetNew.size() === 0) {
                        return;
                    }

                    var index = self.findItemSetIndex(itemSetNew);

                    if (index > -1) {
                        itemSetNew = itemSets[index];
                    } else {
                        itemSets.push(itemSetNew);
                        condition = true;
                    }

                    itemSet.gotos[symbol] = itemSetNew;
                    itemSetNew.addReverseGoto(symbol, itemSet);
                });
            });

        }
    },

    buildLalrItemSets: function () {
        var itemSets = this.itemSets,
            i, j, one, two;

        for (i = 0; i < itemSets.length; i++) {
            one = itemSets[i];
            for (j = i + 1; j < itemSets.length; j++) {
                two = itemSets[j];
                if (one.equals(two, true)) {

                    for (var k = 0; k < one.items.length; k++) {
                        one.items[k]
                            .addLookAhead(two.items[k].lookAhead);
                    }

                    var oneGotos = one.gotos;

                    Utils.each(two.gotos, function (item, symbol) {
                        oneGotos[symbol] = item;
                        item.addReverseGoto(symbol, one);
                    });

                    Utils.each(two.reverseGotos, function (items, symbol) {
                        Utils.each(items, function (item) {
                            item.gotos[symbol] = one;
                            one.addReverseGoto(symbol, item);
                        });
                    });

                    itemSets.splice(j--, 1);
                }
            }
        }
    },

    buildTable: function () {
        var self = this,
            lexer = self.lexer,
            table = self.table,
            itemSets = self.itemSets,
            productions = self.productions,
            mappedStartTag = lexer.mapSymbol(START_TAG),
            mappedEndTag = lexer.mapSymbol(END_TAG),
            gotos = {},
            action = {},
            nonTerminals,
            i,
            itemSet,
            t;

        table.gotos = gotos;
        table.action = action;
        nonTerminals = self.nonTerminals;

        for (i = 0; i < itemSets.length; i++) {

            itemSet = itemSets[i];

            Utils.each(itemSet.items, function (item) {
                var production = item.production;
                var val;
                if (item.dotPosition === production.rhs.length) {
                    if (production.symbol === mappedStartTag) {
                        if (item.lookAhead[mappedEndTag]) {
                            action[i] = action[i] || {};
                            t = action[i][mappedEndTag];
                            val = [];
                            val[GrammarConst.TYPE_INDEX] = GrammarConst.ACCEPT_TYPE;
                            if (t && t.toString() !== val.toString()) {
                                debug(new Array(29).join('*'));
                                debug('***** conflict in reduce: action already defined ->',
                                    'warn');
                                debug('***** current item:', 'info');
                                debug(item.toString());
                                debug('***** current action:', 'info');
                                visualizeAction(t, productions, itemSets);
                                debug('***** will be overwritten ->', 'info');
                                visualizeAction(val, productions, itemSets);
                            }
                            action[i][mappedEndTag] = val;
                        }
                    } else {
                        action[i] = action[i] || {};
                        // 移入，规约冲突
                        // 1+ 2*3
                        // 2 -> f, f 's lookahead contains *
                        // f !-> e, e 's lookahead does not contain *
                        Utils.each(item.lookAhead, function (_, l) {
                            t = action[i][l];
                            val = [];
                            val[GrammarConst.TYPE_INDEX] = GrammarConst.REDUCE_TYPE;
                            val[GrammarConst.PRODUCTION_INDEX] = Utils.indexOf(production, productions);
                            if (t && t.toString() !== val.toString()) {
                                debug(new Array(29).join('*'));
                                debug('conflict in reduce: action already defined ->',
                                    'warn');
                                debug('***** current item:', 'info');
                                debug(item.toString());
                                debug('***** current action:', 'info');
                                visualizeAction(t, productions, itemSets);
                                debug('***** will be overwritten ->', 'info');
                                visualizeAction(val, productions, itemSets);
                            }
                            action[i][l] = val;
                        });
                    }
                }
            });

            // shift over reduce
            Utils.each(itemSet.gotos, function (anotherItemSet, symbol) {
                var val;
                if (!nonTerminals[symbol]) {
                    action[i] = action[i] || {};
                    val = [];
                    val[GrammarConst.TYPE_INDEX] = GrammarConst.SHIFT_TYPE;
                    val[GrammarConst.TO_INDEX] = indexOf(anotherItemSet, itemSets);
                    t = action[i][symbol];
                    if (t && t.toString() !== val.toString()) {
                        debug(new Array(29).join('*'));
                        debug('conflict in shift: action already defined ->',
                            'warn');
                        debug('***** current itemSet:', 'info');
                        debug(itemSet.toString(1));
                        debug('***** current symbol:', 'info');
                        debug(symbol);
                        debug('***** goto itemSet:', 'info');
                        debug(anotherItemSet.toString(1));
                        debug('***** current action:', 'info');
                        visualizeAction(t, productions, itemSets);
                        debug('***** will be overwritten ->', 'info');
                        visualizeAction(val, productions, itemSets);
                    }
                    action[i][symbol] = val;
                } else {
                    gotos[i] = gotos[i] || {};
                    t = gotos[i][symbol];
                    val = indexOf(anotherItemSet, itemSets);
                    if (t && val !== t) {
                        debug(new Array(29).join('*'));
                        debug('conflict in shift: goto already defined ->',
                            'warn');
                        debug('***** current itemSet:', 'info');
                        debug(itemSet.toString(1));
                        debug('***** current symbol:', 'info');
                        debug(symbol);
                        debug('***** goto itemSet:', 'info');
                        debug(anotherItemSet.toString(1));
                        debug('***** current goto state:', 'info');
                        debug(t);
                        debug('***** will be overwritten ->', 'info');
                        debug(val);
                    }
                    gotos[i][symbol] = val;
                }
            });
        }
    },

    visualizeTable: function () {
        var self = this,
            table = self.table,
            gotos = table.gotos,
            action = table.action,
            productions = self.productions,
            ret = [];

        Utils.each(self.itemSets, function (itemSet, i) {
            ret.push(new Array(70).join('*') + ' itemSet : ' + i);
            ret.push(itemSet.toString());
            ret.push('');
        });

        ret.push('');

        ret.push(new Array(70).join('*') + ' table : ');

        Utils.each(action, function (av, index) {
            Utils.each(av, function (v, s) {
                var str, type = v[GrammarConst.TYPE_INDEX];
                if (type === GrammarConst.ACCEPT_TYPE) {
                    str = 'acc';
                } else if (type === GrammarConst.REDUCE_TYPE) {
                    var production = productions[v[GrammarConst.PRODUCTION_INDEX]];
                    str = 'r, ' + production.symbol + '=' +
                        production.rhs.join(' ');
                } else if (type === GrammarConst.SHIFT_TYPE) {
                    str = 's, ' + v[GrammarConst.TO_INDEX];
                }
                ret.push('action[' + index + ']' + '[' + s + '] = ' + str);
            });
        });

        ret.push('');

        Utils.each(gotos, function (sv, index) {
            Utils.each(sv, function (v, s) {
                ret.push('goto[' + index + ']' + '[' + s + '] = ' + v);
            });
        });

        return ret;
    },

    genCode: function (cfg) {
        cfg = cfg || {};

        var self = this,
            table = self.table,
            lexer = self.lexer,
            lexerCode = lexer.genCode(cfg);

        self.build();

        var productions = [];

        Utils.each(self.productions, function (p) {
            var action = p.action,
                ret = [p.symbol, p.rhs];
            if (action) {
                ret.push(action);
            }
            productions.push(ret);
        });

        var code = [];

        code.push('/* Generated by kison */');

        code.push('var parser = {},' +
            'GrammarConst = ' + serializeObject(GrammarConst) +
            ';');

        code.push(lexerCode);

        code.push('parser.lexer = lexer;');

        if (cfg.compressSymbol) {
            code.push('lexer.symbolMap = ' + serializeObject(lexer.symbolMap) + ';');
        }

        code.push('parser.productions = ' + serializeObject(productions) + ';');
        code.push('parser.table = ' + serializeObject(table) + ';');
        code.push('parser.parse = ' + parse.toString() + ';');
        return code.join('\n');
    }
};

// #-------------- for generation start
function parse(input, filename) {
    var self = this,
        lexer = self.lexer,
        state,
        symbol,
        action,
        table = self.table,
        gotos = table.gotos,
        tableAction = table.action,
        productions = self.productions,
        valueStack = [null],
    // for debug info
        prefix = filename ? ('in file: ' + filename + ' ') : '',
        stack = [0];

    lexer.resetInput(input);

    while (1) {
        // retrieve state number from top of stack
        state = stack[stack.length - 1];

        if (!symbol) {
            symbol = lexer.lex();
        }

        if (symbol) {
            // read action for current state and first input
            action = tableAction[state] && tableAction[state][symbol];
        } else {
            action = null;
        }

        if (!action) {
            var expected = [], error;
            //#JSCOVERAGE_IF
            if (tableAction[state]) {
                for (var symbolForState in tableAction[state]) {
                    action = tableAction[state][symbolForState][GrammarConst.TYPE_INDEX];
                    var map = [];
                    map[GrammarConst.SHIFT_TYPE] = 'shift';
                    map[GrammarConst.REDUCE_TYPE] = 'reduce';
                    map[GrammarConst.ACCEPT_TYPE] = 'accept';
                    expected.push(map[action] + ':' + self.lexer.mapReverseSymbol(symbolForState));
                }
            }
            error = prefix + 'syntax error at line ' + lexer.lineNumber +
                ':\n' + lexer.showDebugInfo() +
                '\n' + 'expect ' + expected.join(', ');
            throw new Error(error);
        }

        switch (action[GrammarConst.TYPE_INDEX]) {
            case GrammarConst.SHIFT_TYPE:
                stack.push(symbol);

                valueStack.push(lexer.text);

                // push state
                stack.push(action[GrammarConst.TO_INDEX]);

                // allow to read more
                symbol = null;

                break;

            case GrammarConst.REDUCE_TYPE:
                var production = productions[action[GrammarConst.PRODUCTION_INDEX]],
                    reducedSymbol = production.symbol || production[0],
                    reducedAction = production.action || production[2],
                    reducedRhs = production.rhs || production[1],
                    len = reducedRhs.length,
                    i = 0,
                    ret,
                    $$ = valueStack[valueStack.length - len]; // default to $$ = $1

                ret = undefined;

                self.$$ = $$;

                for (; i < len; i++) {
                    self['$' + (len - i)] = valueStack[valueStack.length - 1 - i];
                }

                if (reducedAction) {
                    ret = reducedAction.call(self);
                }

                if (ret !== undefined) {
                    $$ = ret;
                } else {
                    $$ = self.$$;
                }

                stack = stack.slice(0, -1 * len * 2);
                valueStack = valueStack.slice(0, -1 * len);

                stack.push(reducedSymbol);

                valueStack.push($$);

                var newState = gotos[stack[stack.length - 2]][stack[stack.length - 1]];

                stack.push(newState);

                break;

            case GrammarConst.ACCEPT_TYPE:
                return $$;
        }
    }
}

// #-------------------- for generation end

/**
 * @ignore
 * Refer
 *   - Compilers: Principles,Techniques and Tools.
 *   - http://zaach.github.com/jison/
 *   - http://www.gnu.org/software/bison/
 */