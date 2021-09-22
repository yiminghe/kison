// @ts-check

var Utils = require('./utils');
var mix = Object.assign;
var { each, filterRhs, serializeObject, eachRhs, assertSymbolString } = Utils;
var NonTerminal = require('./NonTerminal');
var Lexer = require('./Lexer');
var Production = require('./Production');

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

  nonTerminals = {};

  itemSets = [];

  productions = [];

  isCompress = false;

  operators = undefined;

  my = undefined;

  lexer = undefined;

  static START_TAG = '$START';

  constructor(cfg) {
    Object.assign(this, cfg);

    if (this.productions && this.productions[0]) {
      this.productions = [
        {
          symbol: Grammar.START_TAG,
          rhs: [this.productions[0].symbol],
        },
        ...this.productions,
      ];
    }

    if (cfg.lexer) {
      this.setLexer(this.lexer);
    }

    this.productionIndexMap = {
      symbol: 0,
      rhs: 1,
      action: 2,
      label: 3,
    };
  }

  setLexer(v) {
    if (!(v instanceof Lexer)) {
      v = new Lexer(v);
      var { productions } = this;
      const nonTerminals = {};
      for (const production of productions) {
        var { symbol } = production;
        nonTerminals[symbol] = 1;
      }
      for (const production of productions) {
        eachRhs(production.rhs, rh => {
          if (rh.length > 1 && rh.endsWith('?')) {
            rh = rh.slice(0, -1);
          }
          if (!v.hasToken(rh) && !nonTerminals[rh]) {
            v.addRule({
              token: rh,
              regexp: new RegExp(Utils.regexEscape(rh), 'g'),
            });
          }
        });
      }
    }
    this.lexer = v;
  }

  // https://www.w3.org/TR/2010/REC-xquery-20101214/#EBNFNotation
  // https://www.bottlecaps.de/rr/ui
  toBNF() {
    this.expandProductions();
    const { lexer } = this;
    const ret = [];
    for (const p of this.productions) {
      if (p.symbol === Grammar.START_TAG) {
        continue;
      }
      const line = [camelCase(p.symbol), '::='];
      for (const r of p.rhs) {
        if (typeof r === 'string') {
          if (lexer.hasToken(r)) {
            line.push(`'${r}'`);
          } else {
            line.push(camelCase(r));
          }
        }
      }
      ret.push(line.join(' '));
    }
    return ret.join('\n');
  }

  getProductionItemByType(p, itemType) {
    if (this.isCompress) {
      return p[this.productionIndexMap[itemType]];
    }
    return p[itemType];
  }

  expandProductions() {
    if (this.__expandProductions) {
      return;
    }
    this.__expandProductions = 1;
    this.expandOptionalSymbol();
    this.expandProductionsInternal();
  }

  expandProductionsInternal() {}

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
        if (typeof r === 'string' && r !== '?' && r.endsWith('?')) {
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
            if (typeof r === 'string' && r !== '?' && r.endsWith('?')) {
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
    this.expandProductions();
    var { productions: vs } = this;
    each(vs, function(v, index) {
      vs[index] = new Production(v);
    });
    this.buildProductions();
    this.buildNonTerminals();
    this.buildNullable();
    this.buildFirsts();
  }

  buildProductions() {}

  buildNonTerminals() {
    var { lexer, nonTerminals, productions } = this;
    for (const production of productions) {
      var { symbol } = production;
      var nonTerminal = nonTerminals[symbol];
      if (!nonTerminal) {
        nonTerminal = nonTerminals[symbol] = new NonTerminal({
          symbol: symbol,
        });
      }
      nonTerminal.productions.push(production);
      eachRhs(production.rhs, rh => {
        if (!lexer.hasToken(rh, true) && !nonTerminals[rh]) {
          nonTerminals[rh] = new NonTerminal({
            symbol: rh,
          });
        }
      });
    }
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
      for (const production of this.productions) {
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
      }
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
      for (const production of this.productions) {
        var firsts = this.findFirst(production.rhs);
        if (setSize(firsts) !== setSize(production.firsts)) {
          production.firsts = firsts;
          cont = true;
        }
      }
      for (symbol in nonTerminals) {
        nonTerminal = nonTerminals[symbol];
        firsts = {};
        for (const production of nonTerminal.productions) {
          mix(firsts, production.firsts);
        }
        if (setSize(firsts) !== setSize(nonTerminal.firsts)) {
          nonTerminal.firsts = firsts;
          cont = true;
        }
      }
    }
  }

  getProductionSymbol(p) {
    return this.getProductionItemByType(p, 'symbol');
  }
  getProductionRhs(p) {
    return this.getProductionItemByType(p, 'rhs');
  }
  getProductionAction(p) {
    return this.getProductionItemByType(p, 'action');
  }
  getProductionLabel(p) {
    return this.getProductionItemByType(p, 'label');
  }

  mapSymbols(s) {
    if (Array.isArray(s)) {
      return s.map(t => this.mapSymbols(t));
    }
    if (typeof s === 'string') {
      return this.lexer.mapSymbol(s);
    }
    return s;
  }

  genCodeInternal(code, cfg) {
    return '';
  }

  genCode(cfg) {
    cfg = cfg || {};
    var { lexer } = this;
    var lexerCode = lexer.genCode(cfg);
    this.build();
    var productions = [];
    const { productionIndexMap } = this;
    for (const p of this.productions) {
      var { action, label } = p;
      var ret = [];
      ret[productionIndexMap.symbol] = this.mapSymbols(p.symbol);
      ret[productionIndexMap.rhs] = this.mapSymbols(p.rhs);
      if (action) {
        ret[productionIndexMap.action] = action;
      }
      if (label) {
        ret[productionIndexMap.label] = this.mapSymbols(label);
      }
      productions.push(ret);
    }
    var code = [];
    if (this.my) {
      code.push(`var my = ${serializeObject(this.my)};`);
    }
    code.push(lexerCode);
    code.push(
      'var parser = ' +
        serializeObject({
          productions,
          productionIndexMap,
          getProductionItemByType: this.getProductionItemByType,
          getProductionSymbol: this.getProductionSymbol,
          getProductionRhs: this.getProductionRhs,
          getProductionAction: this.getProductionAction,
          getProductionLabel: this.getProductionLabel,
          isCompress: 1,
        }) +
        ';',
    );

    code.push(
      'parser.getProductionSymbol=parser.getProductionSymbol.bind(parser);',
      'parser.getProductionRhs=parser.getProductionRhs.bind(parser);',
      'parser.getProductionAction=parser.getProductionAction.bind(parser);',
      'parser.getProductionLabel=parser.getProductionLabel.bind(parser);',
    );

    code.push('parser.lexer = lexer;');
    code.push('parser.lex = lex;');

    let internalCode = this.genCodeInternal(code, cfg);

    if (cfg.compressSymbol) {
      internalCode +=
        '\nlexer.symbolMap = ' + serializeObject(lexer.symbolMap) + ';';
    }
    return '(function(undefined){' + internalCode + '\n return parser; \n})()';
  }
}

module.exports = Grammar;
