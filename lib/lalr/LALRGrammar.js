// @ts-check

const Lexer = require('../Lexer');
var Grammar = require('../Grammar');
const utils = require('../utils');
var debug = require('debug')('kison');
var { each, serializeObject } = utils;
var Item = require('./Item');
var ItemSet = require('./ItemSet');

function measure(label, fn) {
  const now = Date.now();
  console.log(`start ${label} -------`);
  fn();
  console.log(`end ${label} -------`, Date.now() - now);
}

var GrammarConst = {
  SHIFT_TYPE: 1,
  REDUCE_TYPE: 2,
  ACCEPT_TYPE: 0,
  TYPE_INDEX: 0,
  VALUE_INDEX: 1,
};

const ActionTypeMap = [];
ActionTypeMap[GrammarConst.SHIFT_TYPE] = 'shift';
ActionTypeMap[GrammarConst.REDUCE_TYPE] = 'reduce';
ActionTypeMap[GrammarConst.ACCEPT_TYPE] = 'accept';

var { START_TAG } = Grammar;

function visualizeAction(action, productions, itemSets) {
  let actionType;
  switch (action[GrammarConst.TYPE_INDEX]) {
    case GrammarConst.SHIFT_TYPE:
      debug('shift');
      actionType = 'shift';
      break;
    case GrammarConst.REDUCE_TYPE:
      debug('reduce');
      actionType = 'reduce';
      break;
    case GrammarConst.ACCEPT_TYPE:
      debug('accept');
      break;
  }
  debug('from production:');
  if (actionType === 'reduce') {
    debug(productions[action[GrammarConst.VALUE_INDEX]] + '');
  } else {
    debug('undefined');
  }
  debug('to itemSet:');
  if (actionType === 'shift') {
    debug(itemSets[action[GrammarConst.VALUE_INDEX]].toString(1));
  } else {
    debug('undefined');
  }
}

class LALRGrammar extends Grammar {
  genDTs() {
    return '';
  }

  expandProductionsInternal() {}

  build() {
    super.build();
    this.buildOperatorPriority();
    this.buildItemSet();
    this.buildLalrItemSets();
    this.buildTable();
  }

  buildOperatorPriority() {
    const { operators } = this;

    if (!operators) {
      return;
    }

    const rightOperatorMap = {};
    this.operatorPriorityMap = {};

    const { operatorPriorityMap } = this;

    for (var i = 0; i < operators.length; i++) {
      let op = operators[i];
      const p = (i + 1) * 5;

      const rightPriority = op[0] === 'right';

      const restOp = op.slice(1);

      for (let o of restOp) {
        operatorPriorityMap[o] = p;
        if (rightPriority) {
          rightOperatorMap[o] = 1;
        }
      }
    }
    for (const p of this.productions) {
      const op = p.precedence || p.lastTerminal(this.lexer);
      const opPriority = op && operatorPriorityMap[op];
      if (opPriority) {
        // https://www.gnu.org/software/bison/manual/html_node/How-Precedence.html
        if (rightOperatorMap[op]) {
          p.priority = opPriority - 1;
        } else {
          p.priority = opPriority + 1;
        }
      }
    }
  }

  closure(itemSet) {
    var { items } = itemSet;
    var { productions } = this;
    var cont = true;
    while (cont) {
      cont = false;
      each(items, (item) => {
        var { dotPosition, production, lookAhead } = item;
        var { rhs } = production;
        var dotSymbol = rhs[dotPosition];
        var finalFirsts = {};
        each(lookAhead, (_, ahead) => {
          var rightRhs = rhs.slice(dotPosition + 1);
          rightRhs.push(ahead);
          Object.assign(finalFirsts, this.findFirst(rightRhs));
        });
        each(productions, (p2) => {
          if (p2.symbol === dotSymbol) {
            var newItem = new Item({
              production: p2,
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
    each(iItems, (item) => {
      var { production, dotPosition } = item;
      var markSymbol = production.rhs[dotPosition];
      if (markSymbol === x) {
        var newItem = new Item({
          production: production,
          dotPosition: dotPosition + 1,
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
    var { itemSets } = this;
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
    var lookAheadTmp = {};
    var { itemSets, productions } = this;

    lookAheadTmp[Lexer.STATIC.EOF_TOKEN] = 1;
    var initItemSet = this.closure(
      new ItemSet({
        items: [
          new Item({
            production: productions[0],
            lookAhead: lookAheadTmp,
          }),
        ],
      }),
    );

    itemSets.push(initItemSet);

    var condition = true;

    var symbols = new Set(this.lexer.tokenSet);
    for (const key of Object.keys(this.nonTerminals)) {
      symbols.add(key);
    }
    symbols.delete(Lexer.STATIC.EOF_TOKEN);

    const symbolArray = Array.from(symbols);
    const symbolArrayLength = symbolArray.length;
    while (condition) {
      condition = false;
      var itemSets2 = itemSets.concat();
      const itemSets2Length = itemSets2.length;
      for (let i = 0; i < itemSets2Length; i++) {
        const itemSet = itemSets2[i];
        if (!itemSet.__cache) {
          itemSet.__cache = {};
        }
        for (let j = 0; j < symbolArrayLength; j++) {
          const symbol = symbolArray[j];
          // already computed itemSet 's symbol closure
          if (itemSet.__cache[symbol]) {
            continue;
          }
          var itemSetNew = this.gotos(itemSet, symbol);
          itemSet.__cache[symbol] = 1;
          if (itemSetNew.size() === 0) {
            continue;
          }
          var index = this.findItemSetIndex(itemSetNew);
          if (index > -1) {
            itemSetNew = itemSets[index];
          } else {
            itemSets.push(itemSetNew);
            condition = true;
          }
          itemSet.gotos[symbol] = itemSetNew;
          itemSetNew.addReverseGoto(symbol, itemSet);
        }
      }
    }
  }

  buildLalrItemSets() {
    var { itemSets } = this;
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
          each(two.gotos, (item, symbol) => {
            oneGotos[symbol] = item;
            item.addReverseGoto(symbol, one);
          });
          each(two.reverseGotos, (items, symbol) => {
            each(items, (item) => {
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
    var { operatorPriorityMap, table, itemSets, productions, nonTerminals } =
      this;
    var mappedStartTag = START_TAG;
    var mappedEndTag = Lexer.STATIC.EOF_TOKEN;
    var gotos = {};
    var action = {};
    var i, itemSet;
    table.gotos = gotos;
    table.action = action;
    for (i = 0; i < itemSets.length; i++) {
      itemSet = itemSets[i];
      each(itemSet.items, (item) => {
        var { production } = item;
        if (item.dotPosition === production.rhs.length) {
          if (production.symbol === mappedStartTag) {
            if (item.lookAhead[mappedEndTag]) {
              action[i] = action[i] || {};
              const t = action[i][mappedEndTag];
              const val = [];
              val[GrammarConst.TYPE_INDEX] = GrammarConst.ACCEPT_TYPE;
              if (t && t.toString() !== val.toString()) {
                debug(new Array(29).join('*'));
                debug(
                  '***** conflict in reduce: action already defined ->',
                  'warn',
                );
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
            each(item.lookAhead, (_, l) => {
              const t = action[i][l];
              const val = [];
              val[GrammarConst.TYPE_INDEX] = GrammarConst.REDUCE_TYPE;
              val[GrammarConst.VALUE_INDEX] = productions.indexOf(production);
              if (t && t.toString() !== val.toString()) {
                debug(new Array(29).join('*'));
                debug('conflict in reduce: action already defined ->', 'warn');
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
      each(itemSet.gotos, (anotherItemSet, symbol) => {
        if (!nonTerminals[symbol]) {
          action[i] = action[i] || {};
          const val = [];
          val[GrammarConst.TYPE_INDEX] = GrammarConst.SHIFT_TYPE;
          val[GrammarConst.VALUE_INDEX] = itemSets.indexOf(anotherItemSet);
          const t = action[i][symbol];
          if (t && t.toString() !== val.toString()) {
            if (t[GrammarConst.TYPE_INDEX] === GrammarConst.REDUCE_TYPE) {
              const p = productions[t[GrammarConst.VALUE_INDEX]];
              // https://www.gnu.org/software/bison/manual/html_node/How-Precedence.html
              if (p.priority && operatorPriorityMap[symbol]) {
                if (p.priority < operatorPriorityMap[symbol]) {
                  action[i][symbol] = val;
                }
                return;
              }
            }
            debug(new Array(29).join('*'));
            debug('conflict in shift: action already defined ->', 'warn');
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
          const t = gotos[i][symbol];
          const val = itemSets.indexOf(anotherItemSet);
          if (t && val !== t) {
            debug(new Array(29).join('*'));
            debug('conflict in shift: goto already defined ->', 'warn');
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
  }

  visualizeTable() {
    var { table, productions } = this;
    var { gotos, action } = table;
    var ret = [];
    each(this.itemSets, (itemSet, i) => {
      ret.push(new Array(70).join('*') + ' itemSet : ' + i);
      ret.push(itemSet.toString());
      ret.push('');
    });
    ret.push('');
    ret.push(new Array(70).join('*') + ' table : ');
    each(action, (av, index) => {
      each(av, (v, s) => {
        var str;
        var type = v[GrammarConst.TYPE_INDEX];
        if (type === GrammarConst.ACCEPT_TYPE) {
          str = 'acc';
        } else if (type === GrammarConst.REDUCE_TYPE) {
          var production = productions[v[GrammarConst.VALUE_INDEX]];
          str = 'r, ' + production.symbol + '=' + production.rhs.join(' ');
        } else if (type === GrammarConst.SHIFT_TYPE) {
          str = 's, ' + v[GrammarConst.VALUE_INDEX];
        }
        ret.push('action[' + index + ']' + '[' + s + '] = ' + str);
      });
    });
    ret.push('');
    each(gotos, (sv, index) => {
      each(sv, (v, s) => {
        ret.push('goto[' + index + ']' + '[' + s + '] = ' + v);
      });
    });
    return ret.join('\n');
  }

  serializeTable() {
    const { table, lexer } = this;
    const t = {};
    const { gotos, action } = table;

    function transform(obj) {
      const ret = {};
      for (const key of Object.keys(obj)) {
        const o = obj[key];
        const newGoto = {};
        for (const k of Object.keys(o)) {
          newGoto[lexer.mapSymbol(k)] = o[k];
        }
        ret[key] = newGoto;
      }
      return ret;
    }

    t.gotos = transform(gotos);
    t.action = transform(action);

    return serializeObject(t);
  }

  genCodeInternal(code) {
    code.push(peekStack.toString());
    code.push('var ActionTypeMap = ' + serializeObject(ActionTypeMap) + ';');
    code.push('var GrammarConst = ' + serializeObject(GrammarConst) + ';');
    code.push('parser.table = ' + this.serializeTable() + ';');
    code.push('parser.parse = ' + parse.toString() + ';');
    return code.join('\n');
  }
}

function peekStack(stack, n) {
  n = n || 1;
  return stack[stack.length - n];
}

var parser = {};

// #-------------- for generation start
function parse(input, options) {
  options = options || {};
  var { filename } = options;
  var state, token, ret, action, $$;
  var {
    getProductionSymbol,
    getProductionRhs,
    getProductionAction,
    lexer,
    table,
    productions,
  } = parser;
  var { gotos, action: tableAction } = table;
  // for debug info
  var prefix = filename ? 'in file: ' + filename + ' ' : '';
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
      var expectedInfo = [];
      var expected = {};
      if (tableAction[state]) {
        const map = tableAction[state];
        for (const symbolForState of Object.keys(map)) {
          const v = map[symbolForState];
          action = v[GrammarConst.TYPE_INDEX];
          const actionStr = ActionTypeMap[action];
          const arr = (expected[actionStr] = expected[actionStr] || []);
          const s = parser.lexer.mapReverseSymbol(symbolForState);
          arr.push(s);
          expectedInfo.push(actionStr + ':' + s);
        }
      }
      const error =
        prefix +
        'syntax error at line ' +
        lexer.lineNumber +
        ':\n' +
        lexer.showDebugInfo() +
        '\n' +
        'expect ' +
        expectedInfo.join(', ');
      throw new Error(error);
    }

    switch (action[GrammarConst.TYPE_INDEX]) {
      case GrammarConst.SHIFT_TYPE:
        symbolStack.push(token.t);
        valueStack.push(lexer.text);
        // push state
        stateStack.push(action[GrammarConst.VALUE_INDEX]);
        // allow to read more
        token = null;
        break;

      case GrammarConst.REDUCE_TYPE:
        var production = productions[action[GrammarConst.VALUE_INDEX]];
        var reducedSymbol = getProductionSymbol(production);
        var reducedAction = getProductionAction(production);
        var reducedRhs = getProductionRhs(production);
        var len = reducedRhs.length;
        $$ = peekStack(valueStack, len); // default to $$ = $1
        ret = undefined;
        this.$$ = $$;
        for (var i = 0; i < len; i++) {
          this['$' + (len - i)] = peekStack(valueStack, i + 1);
        }
        if (reducedAction) {
          ret = reducedAction.call(this);
        }
        if (ret !== undefined) {
          $$ = ret;
        } else {
          $$ = this.$$;
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
