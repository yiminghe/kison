/**
 * @ignore
 * LALR grammar parser
 * @author yiminghe@gmail.com
 */

var Grammar = require("../Grammar");
var debug = require("debug")("kison");
var Utils = require("../utils");
var mix = Object.assign;
var each = Utils.each;
var indexOf = Utils.indexOf;
var serializeObject = Utils.serializeObject;
var Item = require("./Item");
var ItemSet = require("./ItemSet");

// debug = console.log.bind(console);

var GrammarConst = {
  SHIFT_TYPE: 1,
  REDUCE_TYPE: 2,
  ACCEPT_TYPE: 0,
  TYPE_INDEX: 0,
  PRODUCTION_INDEX: 1,
  TO_INDEX: 2
};
var START_TAG = Grammar.START_TAG;

function visualizeAction(action, productions, itemSets) {
  switch (action[GrammarConst.TYPE_INDEX]) {
    case GrammarConst.SHIFT_TYPE:
      debug("shift");
      break;
    case GrammarConst.REDUCE_TYPE:
      debug("reduce");
      break;
    case GrammarConst.ACCEPT_TYPE:
      debug("accept");
      break;
  }
  debug("from production:");
  if (action[GrammarConst.PRODUCTION_INDEX] !== undefined) {
    debug(productions[action[GrammarConst.PRODUCTION_INDEX]] + "");
  } else {
    debug("undefined");
  }
  debug("to itemSet:");
  if (action[GrammarConst.TO_INDEX] !== undefined) {
    debug(itemSets[action[GrammarConst.TO_INDEX]].toString(1));
  } else {
    debug("undefined");
  }
}

class LALRGrammar extends Grammar {
  constructor(cfg) {
    super(cfg);
    this.productions.unshift({
      symbol: START_TAG,
      rhs: [this.productions[0].symbol]
    });
  }

  build() {
    super.build();
    var self = this;
    self.buildItemSet();
    self.buildLalrItemSets();
    self.buildTable();
  }

  closure(itemSet) {
    var self = this;
    var items = itemSet.items;
    var productions = self.productions;
    var cont = 1;
    while (cont) {
      cont = false;
      each(items, function(item) {
        var dotPosition = item.dotPosition;
        var production = item.production;
        var rhs = production.rhs;
        var dotSymbol = rhs[dotPosition];
        var lookAhead = item.lookAhead;
        var finalFirsts = {};
        each(lookAhead, function(_, ahead) {
          var rightRhs = rhs.slice(dotPosition + 1);
          rightRhs.push(ahead);
          mix(finalFirsts, self.findFirst(rightRhs));
        });
        each(productions, function(p2) {
          if (p2.symbol === dotSymbol) {
            var newItem = new Item({
              production: p2
            });
            /*
                         2012-07-26
                         improve performance,
                         reduce item number,
                         merge lookahead with same production
                         and dotPosition
                         */
            var itemIndex = itemSet.findItemIndex(newItem, true);
            var findItem;
            if (itemIndex !== -1) {
              findItem = itemSet.getItemAt(itemIndex);
              cont = cont || !!findItem.addLookAhead(finalFirsts);
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
  }

  gotos(i, x) {
    var j = new ItemSet();
    var iItems = i.items;
    each(iItems, function(item) {
      var production = item.production;
      var dotPosition = item.dotPosition;
      var markSymbol = production.rhs[dotPosition];
      if (markSymbol === x) {
        var newItem = new Item({
          production: production,
          dotPosition: dotPosition + 1
        });
        var itemIndex = j.findItemIndex(newItem, true);
        var findItem;

        if (itemIndex !== -1) {
          findItem = j.getItemAt(itemIndex);
          findItem.addLookAhead(item.lookAhead);
        } else {
          // transfer look item forward
          // a -> .de  ->  a -> d.e
          newItem.addLookAhead(item.lookAhead);
          j.addItem(newItem);
        }
      }
    });
    return this.closure(j);
  }

  findItemSetIndex(itemSet) {
    var itemSets = this.itemSets;
    var i;
    for (i = 0; i < itemSets.length; i++) {
      if (itemSets[i].equals(itemSet)) {
        return i;
      }
    }
    return -1;
  }

  // algorithm: 4.53
  buildItemSet() {
    var self = this;
    var lexer = self.lexer;
    var itemSets = self.itemSets;
    var lookAheadTmp = {};
    var productions = self.productions;
    lookAheadTmp[lexer.mapEndSymbol()] = 1;
    var initItemSet = self.closure(
      new ItemSet({
        items: [
          new Item({
            production: productions[0],
            lookAhead: lookAheadTmp
          })
        ]
      })
    );

    itemSets.push(initItemSet);
    var condition = true;
    var symbols = Utils.merge(self.terminals, self.nonTerminals);
    delete symbols[lexer.mapEndSymbol()];
    while (condition) {
      condition = false;
      var itemSets2 = itemSets.concat();
      each(itemSets2, function(itemSet) {
        each(symbols, function(v, symbol) {
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
  }

  buildLalrItemSets() {
    var itemSets = this.itemSets;
    var i, j, one, two;
    for (i = 0; i < itemSets.length; i++) {
      one = itemSets[i];
      for (j = i + 1; j < itemSets.length; j++) {
        two = itemSets[j];
        if (one.equals(two, true)) {
          for (var k = 0; k < one.items.length; k++) {
            one.items[k].addLookAhead(two.items[k].lookAhead);
          }
          var oneGotos = one.gotos;
          each(two.gotos, function(item, symbol) {
            oneGotos[symbol] = item;
            item.addReverseGoto(symbol, one);
          });
          each(two.reverseGotos, function(items, symbol) {
            each(items, function(item) {
              item.gotos[symbol] = one;
              one.addReverseGoto(symbol, item);
            });
          });
          itemSets.splice(j--, 1);
        }
      }
    }
  }

  buildTable() {
    var self = this;
    const operatorPriorityMap = self.operatorPriorityMap;
    var lexer = self.lexer;
    var table = self.table;
    var itemSets = self.itemSets;
    var productions = self.productions;
    var mappedStartTag = lexer.mapSymbol(START_TAG);
    var mappedEndTag = lexer.mapEndSymbol();
    var gotos = {};
    var action = {};
    var nonTerminals, i, itemSet;
    table.gotos = gotos;
    table.action = action;
    nonTerminals = self.nonTerminals;
    for (i = 0; i < itemSets.length; i++) {
      itemSet = itemSets[i];
      each(itemSet.items, function(item) {
        var production = item.production;
        if (item.dotPosition === production.rhs.length) {
          if (production.symbol === mappedStartTag) {
            if (item.lookAhead[mappedEndTag]) {
              action[i] = action[i] || {};
              const t = action[i][mappedEndTag];
              const val = [];
              val[GrammarConst.TYPE_INDEX] = GrammarConst.ACCEPT_TYPE;
              if (t && t.toString() !== val.toString()) {
                debug(new Array(29).join("*"));
                debug(
                  "***** conflict in reduce: action already defined ->",
                  "warn"
                );
                debug("***** current item:", "info");
                debug(item.toString());
                debug("***** current action:", "info");
                visualizeAction(t, productions, itemSets);
                debug("***** will be overwritten ->", "info");
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
            each(item.lookAhead, function(_, l) {
              const t = action[i][l];
              const val = [];
              val[GrammarConst.TYPE_INDEX] = GrammarConst.REDUCE_TYPE;
              val[GrammarConst.PRODUCTION_INDEX] = indexOf(
                production,
                productions
              );
              if (t && t.toString() !== val.toString()) {
                debug(new Array(29).join("*"));
                debug("conflict in reduce: action already defined ->", "warn");
                debug("***** current item:", "info");
                debug(item.toString());
                debug("***** current action:", "info");
                visualizeAction(t, productions, itemSets);
                debug("***** will be overwritten ->", "info");
                visualizeAction(val, productions, itemSets);
              }
              action[i][l] = val;
            });
          }
        }
      });
      // shift over reduce
      each(itemSet.gotos, function(anotherItemSet, symbol) {
        if (!nonTerminals[symbol]) {
          action[i] = action[i] || {};
          const val = [];
          val[GrammarConst.TYPE_INDEX] = GrammarConst.SHIFT_TYPE;
          val[GrammarConst.TO_INDEX] = indexOf(anotherItemSet, itemSets);
          const t = action[i][symbol];
          if (t && t.toString() !== val.toString()) {
            if (t[GrammarConst.TYPE_INDEX] === GrammarConst.REDUCE_TYPE) {
              const p = productions[t[GrammarConst.PRODUCTION_INDEX]];
              if (p.priority && operatorPriorityMap[symbol]) {
                if (p.priority < operatorPriorityMap[symbol]) {
                  action[i][symbol] = val;
                }
                return;
              }
            }
            debug(new Array(29).join("*"));
            debug("conflict in shift: action already defined ->", "warn");
            debug("***** current itemSet:", "info");
            debug(itemSet.toString(1));
            debug("***** current symbol:", "info");
            debug(symbol);
            debug("***** goto itemSet:", "info");
            debug(anotherItemSet.toString(1));
            debug("***** current action:", "info");
            visualizeAction(t, productions, itemSets);
            debug("***** will be overwritten ->", "info");
            visualizeAction(val, productions, itemSets);
          }
          action[i][symbol] = val;
        } else {
          gotos[i] = gotos[i] || {};
          const t = gotos[i][symbol];
          const val = indexOf(anotherItemSet, itemSets);
          if (t && val !== t) {
            debug(new Array(29).join("*"));
            debug("conflict in shift: goto already defined ->", "warn");
            debug("***** current itemSet:", "info");
            debug(itemSet.toString(1));
            debug("***** current symbol:", "info");
            debug(symbol);
            debug("***** goto itemSet:", "info");
            debug(anotherItemSet.toString(1));
            debug("***** current goto state:", "info");
            debug(t);
            debug("***** will be overwritten ->", "info");
            debug(val);
          }
          gotos[i][symbol] = val;
        }
      });
    }
  }

  visualizeTable() {
    var self = this;
    var table = self.table;
    var gotos = table.gotos;
    var action = table.action;
    var productions = self.productions;
    var ret = [];
    each(self.itemSets, function(itemSet, i) {
      ret.push(new Array(70).join("*") + " itemSet : " + i);
      ret.push(itemSet.toString());
      ret.push("");
    });
    ret.push("");
    ret.push(new Array(70).join("*") + " table : ");
    each(action, function(av, index) {
      each(av, function(v, s) {
        var str;
        var type = v[GrammarConst.TYPE_INDEX];
        if (type === GrammarConst.ACCEPT_TYPE) {
          str = "acc";
        } else if (type === GrammarConst.REDUCE_TYPE) {
          var production = productions[v[GrammarConst.PRODUCTION_INDEX]];
          str = "r, " + production.symbol + "=" + production.rhs.join(" ");
        } else if (type === GrammarConst.SHIFT_TYPE) {
          str = "s, " + v[GrammarConst.TO_INDEX];
        }
        ret.push("action[" + index + "]" + "[" + s + "] = " + str);
      });
    });
    ret.push("");
    each(gotos, function(sv, index) {
      each(sv, function(v, s) {
        ret.push("goto[" + index + "]" + "[" + s + "] = " + v);
      });
    });
    return ret.join("\n");
  }

  genCodeInternal(code) {
    code.push(peekStack.toString());
    code.push("var GrammarConst = " + serializeObject(GrammarConst) + ";");
    code.push("parser.table = " + serializeObject(this.table) + ";");
    code.push("parser.parse = " + parse.toString() + ";");
    return code.join("\n");
  }
}

function peekStack(stack, n) {
  n = n || 1;
  return stack[stack.length - n];
}

// #-------------- for generation start
function parse(input, options) {
  options = options || {};
  var { onErrorRecovery } = options;
  var filename = options.filename;
  var state, token, ret, action, $$;
  var self = this;
  var lexer = self.lexer;
  var table = self.table;
  var gotos = table.gotos;
  var tableAction = table.action;
  var productions = self.productions;
  // for debug info
  var prefix = filename ? "in file: " + filename + " " : "";
  var valueStack = [];
  var stateStack = [0];
  var symbolStack = [];
  lexer.resetInput(input);
  while (1) {
    // retrieve state number from top of stack
    state = peekStack(stateStack);
    if (!token) {
      token = lexer.lex();
    }
    if (token) {
      // read action for current state and first input
      action = tableAction[state] && tableAction[state][token.t];
    } else {
      action = null;
    }

    if (!action) {
      const map = [];
      map[GrammarConst.SHIFT_TYPE] = "shift";
      map[GrammarConst.REDUCE_TYPE] = "reduce";
      map[GrammarConst.ACCEPT_TYPE] = "accept";
      var expectedInfo = [];
      var expected = {};
      //#JSCOVERAGE_IF
      if (tableAction[state]) {
        each(tableAction[state], function(v, symbolForState) {
          action = v[GrammarConst.TYPE_INDEX];
          const actionStr = map[action];
          const arr = (expected[actionStr] = expected[actionStr] || []);
          const s = self.lexer.mapReverseSymbol(symbolForState);
          arr.push(s);
          expectedInfo.push(actionStr + ":" + s);
        });
      }
      const error =
        prefix +
        "syntax error at line " +
        lexer.lineNumber +
        ":\n" +
        lexer.showDebugInfo() +
        "\n" +
        "expect " +
        expectedInfo.join(", ");
      throw new Error(error);
    }

    switch (action[GrammarConst.TYPE_INDEX]) {
      case GrammarConst.SHIFT_TYPE:
        symbolStack.push(token.t);
        valueStack.push(lexer.text);
        // push state
        stateStack.push(action[GrammarConst.TO_INDEX]);
        // allow to read more
        token = null;
        break;

      case GrammarConst.REDUCE_TYPE:
        var production = productions[action[GrammarConst.PRODUCTION_INDEX]];
        var reducedSymbol = production.symbol || production[0];
        var reducedAction = production.action || production[2];
        var reducedRhs = production.rhs || production[1];
        var len = reducedRhs.length;
        $$ = peekStack(valueStack, len); // default to $$ = $1
        ret = undefined;
        self.$$ = $$;
        for (var i = 0; i < len; i++) {
          self["$" + (len - i)] = peekStack(valueStack, i + 1);
        }
        if (reducedAction) {
          ret = reducedAction.call(self);
        }
        if (ret !== undefined) {
          $$ = ret;
        } else {
          $$ = self.$$;
        }
        var reverseIndex = len * -1;
        stateStack.splice(reverseIndex, len);
        valueStack.splice(reverseIndex, len);
        symbolStack.splice(reverseIndex, len);
        symbolStack.push(reducedSymbol);
        valueStack.push($$);
        var newState = gotos[peekStack(stateStack)][reducedSymbol];
        stateStack.push(newState);
        break;

      case GrammarConst.ACCEPT_TYPE:
        return $$;
    }
  }
}

module.exports = LALRGrammar;

// #-------------------- for generation end

/**
 * @ignore
 * Refer
 *   - Compilers: Principles,Techniques and Tools.
 *   - http://zaach.github.com/jison/
 *   - http://www.gnu.org/software/bison/
 */
