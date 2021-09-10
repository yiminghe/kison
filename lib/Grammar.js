// @ts-check

var Utils = require("./utils");
var mix = Object.assign;
var { each, filterRhs, serializeObject, eachRhs, assertSymbolString } = Utils;
var NonTerminal = require("./NonTerminal");
var Lexer = require("./Lexer");
var Production = require("./Production");

function setSize(set3) {
  return Object.keys(set3).length;
}

function camelCase(str) {
  return str.replace(/-(\w)/g, (m, m1) => {
    return m1.toUpperCase();
  });
}

function emurate(keys, ret, callback) {
  if (!keys.length) {
    if (callback) {
      callback(ret);
    }
    return;
  }
  const rest = keys.slice(1);
  const k = keys[0];
  ret[k] = 1;
  emurate(rest, ret, callback);
  ret[k] = 0;
  emurate(rest, ret, callback);
}

class Grammar {
  table = {};

  itemSets = [];

  nonTerminals = {};

  terminals = {};

  isCompress = false;

  operators = undefined;

  my = undefined;

  lexer = undefined;

  static START_TAG = "$START";

  constructor(cfg) {
    Object.assign(this, cfg);

    if (cfg.lexer) {
      this.setLexer(this.lexer);
    }

    this.productionIndexMap = {
      symbol: 0,
      rhs: 1,
      action: 2,
      label: 3
    };
  }

  setLexer(v) {
    if (!(v instanceof Lexer)) {
      v = new Lexer(v);
    }
    this.lexer = v;
  }

  // https://www.w3.org/TR/2010/REC-xquery-20101214/#EBNFNotation
  // https://www.bottlecaps.de/rr/ui
  toBNF() {
    this.buildTerminals();
    const ret = [];
    for (const p of this.productions) {
      const line = [camelCase(p.symbol), "::="];
      for (const r of p.rhs) {
        if (typeof r === "string") {
          if (this.terminals[r]) {
            line.push(`'${r}'`);
          } else {
            line.push(camelCase(r));
          }
        }
      }
      ret.push(line.join(" "));
    }
    return ret.join("\n");
  }

  getProductionItemByType(p, itemType) {
    if (this.isCompress) {
      return p[this.productionIndexMap[itemType]];
    }
    return p[itemType];
  }

  buildOperatorPriority() {
    const { operators } = this;

    if (!operators) {
      return;
    }

    this.rightOperatorMap = {};
    this.operatorPriorityMap = {};

    const { operatorPriorityMap, rightOperatorMap } = this;

    for (var i = 0; i < operators.length; i++) {
      let op = operators[i];
      const p = (i + 1) * 5;

      const rightPriority = op[0] === "right";

      const restOp = op.slice(1);

      for (let o of restOp) {
        o = this.lexer.mapSymbol(o);
        operatorPriorityMap[o] = p;
        if (rightPriority) {
          rightOperatorMap[o] = 1;
        }
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

  expandOptionalSymbol() {
    if (this.__expandOptionalSymbol) {
      return;
    }
    this.__expandOptionalSymbol = 1;
    var { productions: vs } = this;
    const newVs = [];
    for (const p of vs) {
      const { rhs } = p;
      const keys = [];
      for (let i = 0; i < rhs.length; i++) {
        const r = rhs[i];
        if (typeof r === "string" && r !== "?" && r.endsWith("?")) {
          keys.push(i);
        }
      }
      if (keys.length) {
        emurate(keys, {}, ret => {
          const newP = { ...p, rhs: [...p.rhs] };
          newVs.push(newP);
          const { rhs } = newP;
          for (let i = rhs.length - 1; i >= 0; i--) {
            const r = rhs[i];
            if (typeof r === "string" && r !== "?" && r.endsWith("?")) {
              if (ret[i]) {
                rhs[i] = r.slice(0, -1);
              } else {
                rhs.splice(i, 1);
              }
            }
          }
        });
      } else {
        newVs.push(p);
      }
    }
    this.productions = newVs;
  }

  build() {
    this.expandOptionalSymbol();
    var { productions: vs } = this;
    each(vs, function(v, index) {
      vs[index] = new Production(v);
    });
    this.buildProductions();
    this.buildOperatorPriority();
    this.buildTerminals();
    this.buildNonTerminals();
    this.buildNullable();
    this.buildFirsts();
  }

  buildProductions() {
    var { lexer, productions: vs } = this;
    each(vs, (v, index) => {
      v.symbol = lexer.mapSymbol(v.symbol);
      var rhs = v.rhs;
      eachRhs(rhs, function(r, index) {
        rhs[index] = lexer.mapSymbol(r);
      });
      vs[index] = v instanceof Production ? v : new Production(v);
    });
  }

  buildTerminals() {
    if (this.__buildTerminals) {
      return;
    }
    this.__buildTerminals = 1;
    var { lexer, terminals } = this;
    var { rules } = lexer;
    terminals[lexer.mapEndSymbol()] = 1;
    each(rules, rule => {
      var token = lexer.getRuleItem(rule, "token");
      if (token) {
        terminals[token] = 1;
      }
    });
  }

  buildNonTerminals() {
    var { terminals, nonTerminals, productions } = this;
    each(productions, production => {
      var { symbol } = production;
      var nonTerminal = nonTerminals[symbol];
      if (!nonTerminal) {
        nonTerminal = nonTerminals[symbol] = new NonTerminal({
          symbol: symbol
        });
      }
      nonTerminal.productions.push(production);
      eachRhs(production.rhs, rh => {
        if (!terminals[rh] && !nonTerminals[rh]) {
          nonTerminals[rh] = new NonTerminal({
            symbol: rh
          });
        }
      });
    });
  }

  buildNullable() {
    var i, rhs, n, t, production, productions;
    var { nonTerminals } = this;
    var cont = true;
    // loop until no further changes have been made
    while (cont) {
      cont = false;
      // 传递
      // S -> T
      // T -> t
      // check if each production is null able
      each(this.productions, production => {
        if (!production.nullable) {
          rhs = filterRhs(production.rhs);
          for (i = 0, n = 0; (t = rhs[i]); ++i) {
            if (this.isNullable(t)) {
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
      each(nonTerminals, v => {
        if (!v.nullable) {
          ({ productions } = v);
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
    var { nonTerminals } = this;
    // rhs
    if (symbol instanceof Array) {
      symbol = filterRhs(symbol);
      for (var i = 0, t; (t = symbol[i]); ++i) {
        if (!this.isNullable(t)) {
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
    var firsts = {};
    var { nonTerminals } = this;
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
        if (!this.isNullable(t)) {
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
    var { nonTerminals } = this;
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
      each(this.productions, production => {
        var firsts = this.findFirst(production.rhs);
        if (setSize(firsts) !== setSize(production.firsts)) {
          production.firsts = firsts;
          cont = true;
        }
      });
      for (symbol in nonTerminals) {
        nonTerminal = nonTerminals[symbol];
        firsts = {};
        each(nonTerminal.productions, production => {
          mix(firsts, production.firsts);
        });
        if (setSize(firsts) !== setSize(nonTerminal.firsts)) {
          nonTerminal.firsts = firsts;
          cont = true;
        }
      }
    }
  }

  getProductionSymbol(p) {
    return this.getProductionItemByType(p, "symbol");
  }
  getProductionRhs(p) {
    return this.getProductionItemByType(p, "rhs");
  }
  getProductionAction(p) {
    return this.getProductionItemByType(p, "action");
  }
  getProductionLabel(p) {
    return this.getProductionItemByType(p, "label");
  }

  genCodeInternal(code, cfg) {}

  genCode(cfg) {
    cfg = cfg || {};
    var { lexer } = this;
    var lexerCode = lexer.genCode(cfg);
    this.build();
    var productions = [];
    const { productionIndexMap } = this;
    each(this.productions, p => {
      var { action, label } = p;
      var ret = [];
      ret[productionIndexMap.symbol] = p.symbol;
      ret[productionIndexMap.rhs] = p.rhs;
      if (action) {
        ret[productionIndexMap.action] = action;
      }
      if (label) {
        ret[productionIndexMap.label] = label;
      }
      productions.push(ret);
    });
    var code = [];
    if (this.my) {
      code.push(`var my = ${serializeObject(this.my)};`);
    }
    code.push(lexerCode);
    code.push(
      "var parser = " +
        serializeObject({
          productions,
          productionIndexMap,
          getProductionItemByType: this.getProductionItemByType,
          getProductionSymbol: this.getProductionSymbol,
          getProductionRhs: this.getProductionRhs,
          getProductionAction: this.getProductionAction,
          getProductionLabel: this.getProductionLabel,
          isCompress: 1
        }) +
        ";"
    );

    code.push(
      "parser.getProductionSymbol=parser.getProductionSymbol.bind(parser);",
      "parser.getProductionRhs=parser.getProductionRhs.bind(parser);",
      "parser.getProductionAction=parser.getProductionAction.bind(parser);",
      "parser.getProductionLabel=parser.getProductionLabel.bind(parser);"
    );

    code.push("parser.lexer = lexer;");
    code.push("parser.lex = lex;");
    if (cfg.compressSymbol) {
      code.push("lexer.symbolMap = " + serializeObject(lexer.symbolMap) + ";");
    }
    return (
      "(function(undefined){" +
      this.genCodeInternal(code, cfg) +
      "\n return parser; \n})()"
    );
  }
}

module.exports = Grammar;
