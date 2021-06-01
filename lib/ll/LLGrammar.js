const Grammar = require("../Grammar");

const { END_TAG } = Grammar;

class LLGrammar extends Grammar {
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
    var mappedEndTag = lexer.mapSymbol(END_TAG);
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

  buildTable() {}
}

module.exports = LLGrammar;
