const Grammar = require("../Grammar");
var Utils = require("../utils");

var serializeObject = Utils.serializeObject;

class LLGrammar extends Grammar {
  table = {};

  constructor(cfg) {
    super(cfg);
  }

  findFollows(symbol) {
    var self = this;
    var nonTerminals = self.nonTerminals;
    if (!nonTerminals[symbol]) {
      return { [symbol]: 1 };
      // non terminal
    } else {
      return nonTerminals[symbol].follows;
    }
  }

  buildFollows() {
    var self = this;
    const { productions, lexer } = self;
    var nonTerminals = self.nonTerminals;
    var cont = true;
    var nonTerminal, symbol;
    var mappedStartTag = productions[0].symbol;
    var mappedEndTag = lexer.mapEndSymbol();
    nonTerminals[mappedStartTag].addFollows({
      [mappedEndTag]: 1
    });
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
              const nextSymbols = rhs.slice(index + 1);
              cont =
                cont || nonTerminal.addFollows(this.findFirst(nextSymbols));
              if (this.isNullable(nextSymbols)) {
                cont =
                  cont || nonTerminal.addFollows(this.findFollows(leftSymbol));
              }
            } else {
              cont =
                cont || nonTerminal.addFollows(this.findFollows(leftSymbol));
            }
          }
        }
      }
    }
  }

  build() {
    super.build();
    this.buildFollows();
    this.buildTable();
  }

  setTable(row, col, val) {
    this.table[row] = this.table[row] || {};
    this.table[row][col] = val;
  }

  buildTable() {
    const { productions } = this;
    productions.forEach((p, index) => {
      const { symbol, rhs } = p;
      const firsts = this.findFirst(rhs);
      for (const f of Object.keys(firsts)) {
        this.setTable(symbol, f, index);
      }
      if (this.isNullable(rhs)) {
        const follows = this.findFollows(symbol);
        for (const f of Object.keys(follows)) {
          this.setTable(symbol, f, index);
        }
      }
    });
  }

  visualizeTable() {
    const ret = [];
    const { table, productions } = this;
    for (const nonTerminal of Object.keys(table)) {
      const col = table[nonTerminal];
      if (col) {
        for (const terminal of Object.keys(col)) {
          const p = col[terminal];
          if (p !== undefined) {
            const production = productions[p];
            ret.push(
              `${nonTerminal} ${terminal} => ${
                production.symbol
              } -> ${production.rhs.join(", ") || "EMPTY"}`
            );
          }
        }
      }
    }
    return ret.join("\n");
  }

  genCodeInternal(code) {
    code.push("parser.table = " + serializeObject(this.table) + ";");
    code.push("parser.parse = " + parse.toString() + ";");
    return code.join("\n");
  }
}

function parse(input, options) {
  function peekStack(stack, n) {
    n = n || 1;
    return stack[stack.length - n];
  }

  function getTableVal(row, col) {
    return table[row] && table[row][col];
  }

  function noop() {}

  function getProductionSymbol(p) {
    return p.symbol || p[0];
  }

  function getProductionRhs(p) {
    return p.rhs || p[1];
  }

  options = options || {};
  var { onTerminal, onErrorRecovery } = options;
  onTerminal = onTerminal || noop;
  onErrorRecovery = onErrorRecovery || noop;
  var self = this;
  var lexer = self.lexer;
  var table = self.table;
  var productions = self.productions;
  var symbolStack = [getProductionSymbol(productions[0])];
  lexer.resetInput(input);
  let token;
  let next;
  let currentToken;

  function getError() {
    const expected = getExpected();
    return (
      "syntax error at line " +
      lexer.lineNumber +
      ":\n" +
      lexer.showDebugInfo() +
      "\n" +
      (expected.length ? "expect " + expected.join(", ") : "")
    );
  }

  let topSymbol;

  function getExpected() {
    return (table[topSymbol] && Object.keys(table[topSymbol])) || [];
  }

  while (1) {
    topSymbol = peekStack(symbolStack);
    currentToken = token = token || lexer.lex();
    if (topSymbol === token) {
      symbolStack.pop();
      onTerminal(topSymbol);
      token = null;
    } else if ((next = getTableVal(topSymbol, token)) !== undefined) {
      symbolStack.pop();
      const production = productions[next];
      symbolStack.push.apply(
        symbolStack,
        getProductionRhs(production)
          .concat()
          .reverse()
      );
    } else {
      if (token === lexer.mapEndSymbol()) {
        onErrorRecovery({
          lexer,
          error: getError(),
          expected: getExpected(),
          symbol: lexer.mapReverseSymbol(topSymbol),
          token: null
        });
        break;
      } else {
        const action = (
          onErrorRecovery({
            lexer,
            error: getError(),
            expected: getExpected(),
            symbol: lexer.mapReverseSymbol(topSymbol),
            token
          }) || {}
        ).action;
        if (!action || action === "del") {
          token = null;
        }
      }
    }
    if (!symbolStack.length) {
      break;
    }
  }

  if (currentToken !== lexer.mapEndSymbol()) {
    onErrorRecovery({
      lexer,
      error: getError(),
      symbol: null,
      token: currentToken
    });
  }
}

module.exports = LLGrammar;
