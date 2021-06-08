/**
 * @ignore
 * grammar parser
 * @author yiminghe@gmail.com
 */
var debug = require("debug")("kison");
/*jshint loopfunc: true*/
var Utils = require("./utils");
var mix = Object.assign;
var { each, filterRhs, serializeObject, eachRhs, assertSymbolString } = Utils;
var NonTerminal = require("./NonTerminal");
var Lexer = require("./Lexer");
var Production = require("./Production");

function setSize(set3) {
  return Object.keys(set3).length;
}

class Grammar {
  table = {};

  itemSets = [];

  nonTerminals = {};

  terminals = {};

  static START_TAG = "$START";

  constructor(cfg) {
    var lexer;
    Object.defineProperties(this, {
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
      }
    });
    mix(this, cfg);
  }

  buildOperatorPriority() {
    const { operators } = this;

    if (!operators) {
      return;
    }

    this.rightOperatorMap = {};
    this.operatorPriorityMap = {};

    const { operatorPriorityMap, rightOperatorMap, rightOperators } = this;

    for (var i = 0; i < operators.length; i++) {
      let op = operators[i];
      const p = (i + 1) * 5;
      if (typeof op === "string") {
        op = [op];
      }

      for (let o of op) {
        o = this.lexer.mapSymbol(o);
        operatorPriorityMap[o] = p;
      }
    }
    if (rightOperators) {
      for (let o of rightOperators) {
        o = this.lexer.mapSymbol(o);
        rightOperatorMap[o] = 1;
      }
    }
    const allOperators = Object.keys(operatorPriorityMap);

    for (const p of this.productions) {
      const { rhs } = p;
      for (const op of allOperators) {
        const index = rhs.indexOf(op);
        if (index > 0 && index < rhs.length - 1) {
          const opPriority = operatorPriorityMap[op];
          if (rightOperatorMap[op]) {
            p.priority = opPriority - 1;
          } else {
            p.priority = opPriority + 1;
          }
        }
      }
    }
  }

  build() {
    var self = this;
    var lexer = self.lexer;
    var vs = self.productions;
    each(vs, function(v, index) {
      v.symbol = lexer.mapSymbol(v.symbol);
      var rhs = v.rhs;
      eachRhs(rhs, function(r, index) {
        rhs[index] = lexer.mapSymbol(r);
      });
      vs[index] = new Production(v);
    });
    self.buildOperatorPriority();
    self.buildTerminals();
    self.buildNonTerminals();
    self.buildNullable();
    self.buildFirsts();
  }

  buildTerminals() {
    var self = this;
    var lexer = self.lexer;
    var rules = lexer && lexer.rules;
    var terminals = self.terminals;
    terminals[lexer.mapEndSymbol()] = 1;
    each(rules, function(rule) {
      var token = rule.token || rule[0];
      if (token) {
        terminals[token] = 1;
      }
    });
  }

  buildNonTerminals() {
    var self = this;
    var terminals = self.terminals;
    var nonTerminals = self.nonTerminals;
    var productions = self.productions;
    each(productions, function(production) {
      var symbol = production.symbol;
      var nonTerminal = nonTerminals[symbol];
      if (!nonTerminal) {
        nonTerminal = nonTerminals[symbol] = new NonTerminal({
          symbol: symbol
        });
      }
      nonTerminal.productions.push(production);
      eachRhs(production.rhs, function(rh) {
        if (!terminals[rh] && !nonTerminals[rh]) {
          nonTerminals[rh] = new NonTerminal({
            symbol: rh
          });
        }
      });
    });
  }

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
      each(self.productions, function(production) {
        if (!production.nullable) {
          rhs = filterRhs(production.rhs);
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
      each(nonTerminals, function(v) {
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
  }

  isNullable(symbol) {
    var self = this;
    var nonTerminals = self.nonTerminals;
    // rhs
    if (symbol instanceof Array) {
      symbol = filterRhs(symbol);
      for (var i = 0, t; (t = symbol[i]); ++i) {
        if (!self.isNullable(t)) {
          return false;
        }
      }
      return true;
      // terminal
    }
    assertSymbolString(symbol);
    if (!nonTerminals[symbol]) {
      return false;
      // non terminal
    } else {
      return nonTerminals[symbol].nullable;
    }
  }

  findFirst(symbol) {
    var self = this;
    var firsts = {};
    var nonTerminals = self.nonTerminals;
    var t, i;
    // rhs
    if (symbol instanceof Array) {
      symbol = filterRhs(symbol);
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
    }
    assertSymbolString(symbol);
    if (!nonTerminals[symbol]) {
      return { [symbol]: 1 };
      // non terminal
    } else {
      return nonTerminals[symbol].firsts;
    }
  }

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
      each(self.productions, function(production) {
        var firsts = self.findFirst(production.rhs);
        if (setSize(firsts) !== setSize(production.firsts)) {
          production.firsts = firsts;
          cont = true;
        }
      });
      for (symbol in nonTerminals) {
        nonTerminal = nonTerminals[symbol];
        firsts = {};
        each(nonTerminal.productions, function(production) {
          mix(firsts, production.firsts);
        });
        if (setSize(firsts) !== setSize(nonTerminal.firsts)) {
          nonTerminal.firsts = firsts;
          cont = true;
        }
      }
    }
  }

  genCode(cfg) {
    cfg = cfg || {};
    var self = this;
    var lexer = self.lexer;
    var lexerCode = lexer.genCode(cfg);
    self.build();
    var productions = [];
    each(self.productions, function(p) {
      var action = p.action;
      var ret = [p.symbol, p.rhs];
      if (action) {
        ret.push(action);
      }
      productions.push(ret);
    });
    var code = [];
    code.push("/* Generated by kison */");
    code.push("var parser = {};");
    code.push(lexerCode);
    code.push("parser.lexer = lexer;");
    if (cfg.compressSymbol) {
      code.push("lexer.symbolMap = " + serializeObject(lexer.symbolMap) + ";");
    }
    code.push("parser.productions = " + serializeObject(productions) + ";");
    return this.genCodeInternal(code, cfg);
  }
}

module.exports = Grammar;
