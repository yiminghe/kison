/**
 * @ignore
 * Lexer to scan token.
 * @author yiminghe@gmail.com
 */

var Utils = require("./utils");
var { serializeObject, mix, isArray, inArray, each, toFunctionString } = Utils;

function mapSymbolForCodeGen(t) {
  return this.symbolMap[t];
}

/**
 * Lexer generator
 * @class Kison.Lexer
 */
function Lexer(cfg) {
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
  this.rules = [];

  mix(this, cfg);

  this.rules = [...this.rules];

  this.userData = {};

  const errorRule = (this.errorRule = {
    regexp: this.matchAny,
    token: Lexer.STATIC.UNKNOWN_TOKEN
  });

  const ruleIndexMap = (this.ruleIndexMap = {
    token: 0,
    regexp: 1,
    action: 2,
    filter: 3,
    state: 4
  });

  const errorRuleCompress = (this.errorRuleCompress = []);
  errorRuleCompress[ruleIndexMap.token] = errorRule.token;
  errorRuleCompress[ruleIndexMap.regexp] = errorRule.regexp;

  this.resetInput(this.input);

  this.options = {};
}

module.exports = Lexer;

Lexer.STATIC = {
  INITIAL_STATE: "I",
  DEBUG_CONTEXT_LIMIT: 20,
  EOF_TOKEN: "$EOF",
  UNKNOWN_TOKEN: "$UNKNOWN",
  HIDDEN_TOKEN: "$HIDDEN"
};

const nonSerializedMethods = {
  genCode: 1,
  mapState: 1,
  genShortId: 1,
  constructor: 1
};

Lexer.prototype = {
  matchAny() {
    return this.input.length ? this.input[0] : false;
  },
  resetInput(input) {
    mix(this, {
      tokensQueue: [],
      tokens: [],
      userData: {},
      input,
      matched: "",
      stateStack: [Lexer.STATIC.INITIAL_STATE],
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
    if (!(field in this)) {
      this[field] = -1;
    }
    var index = (this[field] = this[field] + 1);
    var ret = "";
    do {
      ret = String.fromCharCode(base + (index % interval)) + ret;
      // 00 = 10*1+0
      index = Math.floor(index / interval) - 1;
    } while (index >= 0);
    return ret;
  },

  mapEndSymbol() {
    return this.mapSymbol(Lexer.STATIC.EOF_TOKEN);
  },

  mapHiddenSymbol() {
    return this.mapSymbol(Lexer.STATIC.HIDDEN_TOKEN);
  },

  genCode(cfg) {
    var STATIC = Lexer.STATIC,
      code = [
        toFunctionString(mix),
        toFunctionString(isArray),
        toFunctionString(each),
        toFunctionString(inArray)
      ],
      symbolMap,
      stateMap;

    var { compressSymbol, compressLexerState: compressState } = cfg;
    var genPrototype = Object.assign({}, Lexer.prototype);

    for (const name of Object.keys(genPrototype)) {
      if (nonSerializedMethods[name]) {
        delete genPrototype[name];
      }
    }

    if (compressSymbol) {
      symbolMap = this.symbolMap = {};
      symbolMap[Lexer.STATIC.UNKNOWN_TOKEN] = Lexer.STATIC.UNKNOWN_TOKEN;
      symbolMap[Lexer.STATIC.HIDDEN_TOKEN] = Lexer.STATIC.HIDDEN_TOKEN;
      symbolMap[Lexer.STATIC.EOF_TOKEN] = Lexer.STATIC.EOF_TOKEN;
      this.mapEndSymbol();
      genPrototype.mapSymbol = mapSymbolForCodeGen;
    }

    if (compressState) {
      stateMap = this.stateMap = {};
      stateMap[Lexer.STATIC.INITIAL_STATE] = Lexer.STATIC.INITIAL_STATE;
    }

    code.push("var Lexer = " + Lexer.toString() + ";");

    code.push("Lexer.prototype= " + serializeObject(genPrototype) + ";");

    code.push("Lexer.STATIC= " + serializeObject(STATIC) + ";");

    const ruleIndexMap = this.ruleIndexMap;

    const newRules = [];

    var newCfg = serializeObject(
      {
        rules: this.rules,
        isCompress: 1,
        defaultEnv: this.defaultEnv
      },
      (v, parent) => {
        if (
          parent &&
          parent.isKisonRule &&
          Array.isArray(parent) &&
          parent[ruleIndexMap.regexp] &&
          v === parent[ruleIndexMap.regexp] &&
          typeof v === "string"
        ) {
          return v;
        }
        var ret;
        if (v && (v.regexp || v.token)) {
          ret = [];
          var state = v.hasOwnProperty("state") && v.state,
            regexp = v.hasOwnProperty("regexp") && v.regexp,
            filter = v.hasOwnProperty("filter") && v.filter,
            action = v.hasOwnProperty("action") && v.action,
            token = v.hasOwnProperty("token") && v.token;

          if (token && compressSymbol) {
            token = this.mapSymbol(token);
          }
          if (token) {
            ret[ruleIndexMap.token] = token;
          }
          if (regexp) {
            ret[ruleIndexMap.regexp] = regexp;
          }
          if (action) {
            ret[ruleIndexMap.action] = action;
          }
          if (filter) {
            ret[ruleIndexMap.filter] = filter;
          }
          if (compressState && state) {
            state = Utils.map(state, function(s) {
              return this.mapState(s);
            });
          }
          if (state) {
            ret[ruleIndexMap.state] = state;
          }
          ret.isKisonRule = 1;
          newRules.push(ret);
        }
        return ret;
      }
    );

    code.push("var lexer = new Lexer(" + newCfg + ");");

    // for grammar
    this.rules = newRules;
    this.isCompress = 1;
    if (compressState) {
      code.push("lexer.stateMap = " + serializeObject(stateMap) + ";");
    }

    code.push(lex.toString());

    return code.join("\n");
  },

  getRuleItem(rule, itemType) {
    if (this.isCompress) {
      return rule[this.ruleIndexMap[itemType]];
    } else {
      return rule[itemType];
    }
  },

  getCurrentRules() {
    var currentState = this.stateStack[this.stateStack.length - 1],
      rules = [];
    if (this.mapState) {
      currentState = this.mapState(currentState);
    }
    each(this.rules, r => {
      var filter = this.getRuleItem(r, "filter");
      if (filter) {
        if (filter.call(this)) {
          rules.push(r);
        }
        return;
      }
      var state = this.getRuleItem(r, "state");
      if (!state) {
        if (currentState === Lexer.STATIC.INITIAL_STATE) {
          rules.push(r);
        }
      } else if (inArray(currentState, state)) {
        rules.push(r);
      }
    });
    if (this.isCompress) {
      rules.push(this.errorRuleCompress);
    } else {
      rules.push(this.errorRule);
    }
    return rules;
  },

  peekState(n) {
    n = n || 1;
    return this.stateStack[this.stateStack.length - n];
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
    var { DEBUG_CONTEXT_LIMIT } = Lexer.STATIC;
    var { matched, match, input } = this;

    matched = matched.slice(0, matched.length - match.length);
    var past =
        (matched.length > DEBUG_CONTEXT_LIMIT ? "..." : "") +
        matched
          .slice(0 - DEBUG_CONTEXT_LIMIT)
          .split("\n")
          .join(" "),
      next = match + input;
    //#JSCOVERAGE_ENDIF
    next =
      next
        .slice(0, DEBUG_CONTEXT_LIMIT)
        .split("\n")
        .join(" ") + (next.length > DEBUG_CONTEXT_LIMIT ? "..." : "");
    return past + next + "\n" + new Array(past.length + 1).join("-") + "^";
  },

  mapSymbol(t) {
    var { symbolMap } = this;
    if (!symbolMap) {
      return t;
    }
    // force string, see util.clone iphone5s ios7 bug
    return symbolMap[t] || (symbolMap[t] = this.genShortId("symbol"));
  },

  mapReverseSymbol(rs) {
    var { symbolMap, reverseSymbolMap } = this;
    if (!reverseSymbolMap && symbolMap) {
      reverseSymbolMap = this.reverseSymbolMap = {};
      for (var i in symbolMap) {
        reverseSymbolMap[symbolMap[i]] = i;
      }
    }
    if (reverseSymbolMap) {
      return reverseSymbolMap[rs] || rs;
    } else {
      return rs;
    }
  },

  mapState(s) {
    var { stateMap } = this;
    if (!stateMap) {
      return s;
    }
    return stateMap[s] || (stateMap[s] = this.genShortId("state"));
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

  peek() {
    const token = this._lex(true);
    this.tokensQueue.push(token);
    if (token.token === Lexer.STATIC.HIDDEN_TOKEN) {
      return this.peek();
    }
    return token;
  },
  matchRegExp(regexp) {
    if (regexp.test) {
      return this.input.match(regexp);
    }
    return regexp.call(this, this);
  },
  lex() {
    const token = this._lex();
    this.tokens.push(token);
    if (token.token === Lexer.STATIC.HIDDEN_TOKEN) {
      return this.lex();
    }
    return token;
  },
  getChar(index = 0) {
    if (this.options.unicode) {
      const code = this.input.codePointAt(index);
      if (code === undefined || isNaN(code)) {
        return "";
      }
      return String.fromCodePoint(code);
    }
    return this.input.charAt(index);
  },
  getCharCode(index = 0) {
    if (this.options.unicode) {
      return this.input.codePointAt(index);
    }
    return this.input.charCodeAt(index);
  },
  _lex(skipQueue) {
    if (!skipQueue) {
      const { tokensQueue } = this;
      while (tokensQueue.length) {
        const token = tokensQueue.shift();
        return token;
      }
    }
    var i,
      rule,
      m,
      ret,
      lines,
      rules = this.getCurrentRules();

    var { input } = this;

    var { env = this.defaultEnv } = this.options;

    this.match = this.text = "";

    if (!input) {
      return {
        t: this.mapEndSymbol(),
        token: Lexer.STATIC.EOF_TOKEN,
        start: this.end,
        end: this.end,
        firstLine: this.lastLine,
        firstColumn: this.lastColumn,
        lastLine: this.lastLine,
        lastColumn: this.lastColumn
      };
    }

    for (i = 0; i < rules.length; i++) {
      rule = rules[i];
      var regexp = this.getRuleItem(rule, "regexp"),
        token = this.getRuleItem(rule, "token"),
        action = this.getRuleItem(rule, "action");

      if (
        typeof regexp !== "function" &&
        regexp &&
        env &&
        typeof regexp.test !== "function"
      ) {
        regexp = regexp[env];
      }

      if (!regexp) {
        continue;
      }

      //#JSCOVERAGE_ENDIF
      if ((m = this.matchRegExp(regexp))) {
        this.start = this.end;
        this.end += m[0].length;
        lines = m[0].split("\n");
        lines.shift();
        this.lineNumber += lines.length;
        const position = {
          start: this.start,
          end: this.end,
          firstLine: this.lastLine,
          lastLine: this.lineNumber,
          firstColumn: this.lastColumn,
          lastColumn: lines.length
            ? lines[lines.length - 1].length + 1
            : this.lastColumn + m[0].length
        };
        mix(this, position);
        var match;
        // for error report
        match = this.match = m[0];

        // all matches
        this.matches = m;
        // may change by user
        this.text = match;
        // matched content utils now
        this.matched += match;
        ret = action && action.call(this);
        if (ret === undefined) {
          ret = token;
        } else {
          ret = this.mapSymbol(ret);
        }
        input = input.slice(match.length);
        this.input = input;

        if (ret) {
          this.token = this.mapReverseSymbol(ret);
          return {
            text: this.text,
            token: this.token,
            t: ret,
            ...position
          };
        } else {
          // ignore
          return this._lex(skipQueue);
        }
      }
    }
  }
};

var lexer;

function lex(input, options = {}) {
  lexer.options = options;
  lexer.resetInput(input);
  while (lexer.lex().token !== Lexer.STATIC.EOF_TOKEN);
  return {
    tokens: lexer.tokens
  };
}
