/**
 * @ignore
 * Lexer to scan token.
 * @author yiminghe@gmail.com
 */

var Utils = require("./utils");
var { serializeObject, mix, isArray, inArray, each, toFunctionString } = Utils;

const END_TAG = "$EOF";

function mapSymbolForCodeGen(t) {
  return this.symbolMap[t];
}

/**
 * Lexer generator
 * @class Kison.Lexer
 */
function Lexer(cfg) {
  var self = this;

  /*
     lex rules.
     @type {Object[]}
     @example
     [
     {
     regexp:'\\w+',
     state:['xx'],
     token:'c',
     // this => lex
     action:function(){}
     }
     ]
     */
  self.rules = [];

  mix(self, cfg);

  /*
     Input languages
     @type {String}
     */

  self.resetInput(self.input);
}

module.exports = Lexer;

Lexer.STATIC = {
  INITIAL: "I",
  DEBUG_CONTEXT_LIMIT: 20,
  END_TAG
};

Lexer.prototype = {
  constructor: Lexer,

  resetInput(input) {
    mix(this, {
      input: input,
      matched: "",
      stateStack: [Lexer.STATIC.INITIAL],
      match: "",
      text: "",
      firstLine: 1,
      lineNumber: 1,
      lastLine: 1,
      start: 0,
      end: 0,
      firstColumn: 1,
      lastColumn: 1
    });
  },

  genShortId(field) {
    var base = 97, // a-1
      max = 122, // z
      interval = max - base + 1;
    field += "__gen";
    var self = this;
    if (!(field in self)) {
      self[field] = -1;
    }
    var index = (self[field] = self[field] + 1);
    var ret = "";
    do {
      ret = String.fromCharCode(base + (index % interval)) + ret;
      // 00 = 10*1+0
      index = Math.floor(index / interval) - 1;
    } while (index >= 0);
    return ret;
  },

  mapEndSymbol() {
    return this.mapSymbol(Lexer.STATIC.END_TAG);
  },

  genCode(cfg) {
    var STATIC = Lexer.STATIC,
      self = this,
      compressSymbol = cfg.compressSymbol,
      compressState = cfg.compressLexerState,
      code = [
        "/*jslint quotmark: false*/",
        toFunctionString(mix),
        toFunctionString(isArray),
        toFunctionString(each),
        toFunctionString(inArray)
      ],
      stateMap;

    var genPrototype = Object.assign({}, Lexer.prototype);

    for (const name of Object.keys(genPrototype)) {
      if (name.match(/^(?:genCode|constructor|mapState|genShortId)$/)) {
        delete genPrototype[name];
      }
    }

    if (compressSymbol) {
      self.symbolMap = {};
      self.mapEndSymbol();
      genPrototype.mapSymbol = mapSymbolForCodeGen;
    }

    if (compressState) {
      stateMap = self.stateMap = {};
    }

    code.push("var Lexer = " + Lexer.toString() + ";");

    code.push("Lexer.prototype= " + serializeObject(genPrototype) + ";");

    code.push("Lexer.STATIC= " + serializeObject(STATIC) + ";");

    var newCfg = serializeObject(
      { rules: self.rules },
      compressState || compressSymbol
        ? function(v) {
            var ret;
            if (v && v.regexp) {
              var state = v.state,
                action = v.action,
                token = v.token || 0;
              if (token) {
                token = self.mapSymbol(token);
              }
              ret = [token, v.regexp, action || 0];
              if (compressState && state) {
                state = Utils.map(state, function(s) {
                  return self.mapState(s);
                });
              }
              if (state) {
                ret.push(state);
              }
            }
            return ret;
          }
        : 0
    );

    code.push("var lexer = new Lexer(" + newCfg + ");");

    if (compressState || compressSymbol) {
      // for grammar
      /*jslint evil: true*/
      self.rules = eval("(" + newCfg + ")").rules;
      if (compressState) {
        code.push("lexer.stateMap = " + serializeObject(stateMap) + ";");
      }
    }

    return code.join("\n");
  },

  getCurrentRules() {
    var self = this,
      currentState = self.stateStack[self.stateStack.length - 1],
      rules = [];
    //#JSCOVERAGE_IF
    if (self.mapState) {
      currentState = self.mapState(currentState);
    }
    each(self.rules, function(r) {
      var state = r.state || r[3];
      if (!state) {
        if (currentState === Lexer.STATIC.INITIAL) {
          rules.push(r);
        }
      } else if (inArray(currentState, state)) {
        rules.push(r);
      }
    });
    return rules;
  },

  pushState(state) {
    this.stateStack.push(state);
  },

  popState(num) {
    num = num || 1;
    var ret;
    while (num--) {
      ret = this.stateStack.pop();
    }
    return ret;
  },

  showDebugInfo() {
    var self = this,
      DEBUG_CONTEXT_LIMIT = Lexer.STATIC.DEBUG_CONTEXT_LIMIT,
      matched = self.matched,
      match = self.match,
      input = self.input;
    matched = matched.slice(0, matched.length - match.length);
    //#JSCOVERAGE_IF 0
    var past =
        (matched.length > DEBUG_CONTEXT_LIMIT ? "..." : "") +
        matched.slice(0 - DEBUG_CONTEXT_LIMIT).replace(/\n/g, " "),
      next = match + input;
    //#JSCOVERAGE_ENDIF
    next =
      next.slice(0, DEBUG_CONTEXT_LIMIT).replace(/\n/g, " ") +
      (next.length > DEBUG_CONTEXT_LIMIT ? "..." : "");
    return past + next + "\n" + new Array(past.length + 1).join("-") + "^";
  },

  mapSymbol(t) {
    var self = this,
      symbolMap = self.symbolMap;
    if (!symbolMap) {
      return t;
    }
    // force string, see util.clone iphone5s ios7 bug
    return symbolMap[t] || (symbolMap[t] = self.genShortId("symbol"));
  },

  mapReverseSymbol(rs) {
    var self = this,
      symbolMap = self.symbolMap,
      i,
      reverseSymbolMap = self.reverseSymbolMap;
    if (!reverseSymbolMap && symbolMap) {
      reverseSymbolMap = self.reverseSymbolMap = {};
      for (i in symbolMap) {
        reverseSymbolMap[symbolMap[i]] = i;
      }
    }
    //#JSCOVERAGE_IF
    if (reverseSymbolMap) {
      return reverseSymbolMap[rs] || rs;
    } else {
      return rs;
    }
  },

  mapState(s) {
    var self = this,
      stateMap = self.stateMap;
    if (!stateMap) {
      return s;
    }
    return stateMap[s] || (stateMap[s] = self.genShortId("state"));
  },

  toJSON() {
    return {
      text: this.text,
      firstLine: this.firstLine,
      firstColumn: this.firstColumn,
      lastLine: this.lastLine,
      lastColumn: this.lastColumn,
      token: this.token,
      start: this.start,
      end: this.end
    };
  },

  lex() {
    var self = this,
      input = self.input,
      i,
      rule,
      m,
      ret,
      lines,
      rules = self.getCurrentRules();

    self.match = self.text = "";

    if (!input) {
      return self.mapEndSymbol();
    }

    for (i = 0; i < rules.length; i++) {
      rule = rules[i];
      //#JSCOVERAGE_IF 0
      var regexp = rule.regexp || rule[1],
        token = rule.token || rule[0],
        action = rule.action || rule[2] || undefined;
      //#JSCOVERAGE_ENDIF
      if ((m = input.match(regexp))) {
        self.start = self.end;
        self.end += m[0].length;
        lines = m[0].match(/\n.*/g);
        if (lines) {
          self.lineNumber += lines.length;
        }
        mix(self, {
          firstLine: self.lastLine,
          lastLine: self.lineNumber,
          firstColumn: self.lastColumn,
          lastColumn: lines
            ? lines[lines.length - 1].length - 1
            : self.lastColumn + m[0].length
        });
        var match;
        // for error report
        match = self.match = m[0];

        // all matches
        self.matches = m;
        // may change by user
        self.text = match;
        // matched content utils now
        self.matched += match;
        ret = action && action.call(self);
        if (ret === undefined) {
          ret = token;
        } else {
          ret = self.mapSymbol(ret);
        }
        input = input.slice(match.length);
        self.input = input;

        if (ret) {
          self.token = self.mapReverseSymbol(ret);
          return ret;
        } else {
          // ignore
          return self.lex();
        }
      }
    }
  }
};
