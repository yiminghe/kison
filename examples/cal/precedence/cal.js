
/*
Generated By kison v0.4.5

Generate time: Thu Jul 01 2021 18:30:14 GMT+0800 (中国标准时间)
*/
  var cal = (function(undefined){
  function mix(to, from) {
  for (var f in from) {
    to[f] = from[f];
  }
}
function isArray(obj) {
  return "[object Array]" === Object.prototype.toString.call(obj);
}
function each(object, fn, context) {
  if (object) {
    var key,
      val,
      length,
      i = 0;

    context = context || null;

    if (!isArray(object)) {
      for (key in object) {
        // can not use hasOwnProperty
        if (fn.call(context, object[key], key, object) === false) {
          break;
        }
      }
    } else {
      length = object.length;
      for (val = object[0]; i < length; val = object[++i]) {
        if (fn.call(context, val, i, object) === false) {
          break;
        }
      }
    }
  }
}
function inArray(item, arr) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (arr[i] === item) {
      return true;
    }
  }
  return false;
}
var Lexer = function Lexer(cfg) {
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
  this.tokensQueue = [];

  mix(this, cfg);

  this.rules = [...this.rules];

  this.userData = {};

  this.errorRule = {
    regexp: /^./,
    token: Lexer.STATIC.UNKNOWN_TOKEN
  };

  this.resetInput(this.input);

  this.ruleIndexMap = {
    token: 0,
    regexp: 1,
    action: 2,
    filter: 3,
    state: 4
  };
};
Lexer.prototype = {
  resetInput: function(input) {
    mix(this, {
      userData: {},
      input: input,
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
  mapEndSymbol: function() {
    return this.mapSymbol(Lexer.STATIC.EOF_TOKEN);
  },
  mapHiddenSymbol: function() {
    return this.mapSymbol(Lexer.STATIC.HIDDEN_TOKEN);
  },
  getRuleItem: function(rule, itemType) {
    if (this.isCompress) {
      return rule[this.ruleIndexMap[itemType]];
    } else {
      return rule[itemType];
    }
  },
  getCurrentRules: function() {
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
    rules.push(this.errorRule);
    return rules;
  },
  peekState: function(n) {
    n = n || 1;
    return this.stateStack[this.stateStack.length - n];
  },
  pushState: function(state) {
    this.stateStack.push(state);
  },
  popState: function(num) {
    num = num || 1;
    var ret;
    while (num--) {
      ret = this.stateStack.pop();
    }
    return ret;
  },
  showDebugInfo: function() {
    var { DEBUG_CONTEXT_LIMIT } = Lexer.STATIC;
    var { matched, match, input } = this;

    matched = matched.slice(0, matched.length - match.length);
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
  mapSymbol: function(t) {
    var { symbolMap } = this;
    if (!symbolMap) {
      return t;
    }
    // force string, see util.clone iphone5s ios7 bug
    return symbolMap[t] || (symbolMap[t] = this.genShortId("symbol"));
  },
  mapReverseSymbol: function(rs) {
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
  toJSON: function() {
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
  peek: function(skipHidden) {
    const token = this.lex(skipHidden, true);
    if (this.tokensQueue.indexOf(token) === -1) {
      this.tokensQueue.push(token);
    }
    return token;
  },
  lex: function(skipHidden, reserveQueue) {
    if (skipHidden === undefined) {
      skipHidden = true;
    }
    const { tokensQueue } = this;
    if (reserveQueue) {
      for (let i = 0; i < tokensQueue.length; i++) {
        const token = tokensQueue[i];
        if (skipHidden && token.t === this.mapHiddenSymbol()) {
          continue;
        }
        return token;
      }
    } else {
      while (tokensQueue.length) {
        const token = tokensQueue.shift();
        if (skipHidden && token.t === this.mapHiddenSymbol()) {
          continue;
        }
        return token;
      }
    }
    var i,
      rule,
      m,
      ret,
      lines,
      rules = this.getCurrentRules();

    var { env, input } = this;

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

      if (env && typeof regexp.test !== "function") {
        regexp = regexp[env];
      }

      if (!regexp) {
        continue;
      }

      //#JSCOVERAGE_ENDIF
      if ((m = input.match(regexp))) {
        this.start = this.end;
        this.end += m[0].length;
        lines = m[0].match(/\n.*/g);
        if (lines) {
          this.lineNumber += lines.length;
        }
        const position = {
          start: this.start,
          end: this.end,
          firstLine: this.lastLine,
          lastLine: this.lineNumber,
          firstColumn: this.lastColumn,
          lastColumn: lines
            ? lines[lines.length - 1].length - 1
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
          if (ret === this.mapHiddenSymbol() && skipHidden) {
            return this.lex();
          }
          return {
            text: this.text,
            token: this.token,
            t: ret,
            ...position
          };
        } else {
          // ignore
          return this.lex();
        }
      }
    }
  }
};
Lexer.STATIC = {
  INITIAL_STATE: "I",
  DEBUG_CONTEXT_LIMIT: 20,
  EOF_TOKEN: "$EOF",
  UNKNOWN_TOKEN: "$UNKNOWN",
  HIDDEN_TOKEN: "$HIDDEN"
};
var lexer = new Lexer({
  rules: [
    ["$HIDDEN", /^\s+/],
    ["NUMBER", /^[0-9]+(\.[0-9]+)?\b/],
    ["+", /^\+/],
    ["-", /^-/],
    ["(", /^\(/],
    [")", /^\)/],
    ["*", /^\*/],
    ["/", /^\//],
    ["^", /^\^/],
    ["ERROR_LA", /^./]
  ],
  isCompress: 1
});
var parser = {
  productions: [
    ["$START", ["Exp"]],
    ["Exp", ["primaryExpression"]],
    [
      "Exp",
      ["Exp", "+", "Exp"],
      function() {
        return { v: this.$1.v + this.$3.v, l: this.$1, r: this.$3, op: "+" };
      }
    ],
    [
      "Exp",
      ["Exp", "^", "Exp"],
      function() {
        return {
          v: Math.pow(this.$1.v, this.$3.v),
          l: this.$1,
          r: this.$3,
          op: "^"
        };
      }
    ],
    [
      "Exp",
      ["Exp", "-", "Exp"],
      function() {
        return { v: this.$1.v - this.$3.v, l: this.$1, r: this.$3, op: "-" };
      }
    ],
    [
      "Exp",
      ["Exp", "*", "Exp"],
      function() {
        return { v: this.$1.v * this.$3.v, l: this.$1, r: this.$3, op: "*" };
      }
    ],
    [
      "Exp",
      ["Exp", "/", "Exp"],
      function() {
        return { v: this.$1.v / this.$3.v, l: this.$1, r: this.$3, op: "/" };
      }
    ],
    [
      "primaryExpression",
      ["(", "Exp", ")"],
      function() {
        return this.$2;
      }
    ],
    [
      "primaryExpression",
      ["NUMBER"],
      function() {
        return { v: Number(this.$1) };
      }
    ]
  ],
  productionIndexMap: {
    symbol: 0,
    rhs: 1,
    action: 2,
    label: 3
  },
  getProductionItemByType: function(p, itemType) {
    if (this.isCompress) {
      return p[this.productionIndexMap[itemType]];
    }
    return p[itemType];
  },
  getProductionSymbol: function(p) {
    return this.getProductionItemByType(p, "symbol");
  },
  getProductionRhs: function(p) {
    return this.getProductionItemByType(p, "rhs");
  },
  getProductionAction: function(p) {
    return this.getProductionItemByType(p, "action");
  },
  getProductionLabel: function(p) {
    return this.getProductionItemByType(p, "label");
  },
  isCompress: 1
};
parser.getProductionSymbol = parser.getProductionSymbol.bind(parser);
parser.getProductionRhs = parser.getProductionRhs.bind(parser);
parser.getProductionAction = parser.getProductionAction.bind(parser);
parser.getProductionLabel = parser.getProductionLabel.bind(parser);
parser.lexer = lexer;
function peekStack(stack, n) {
  n = n || 1;
  return stack[stack.length - n];
}
var ActionTypeMap = ["accept", "shift", "reduce"];
var GrammarConst = {
  SHIFT_TYPE: 1,
  REDUCE_TYPE: 2,
  ACCEPT_TYPE: 0,
  TYPE_INDEX: 0,
  VALUE_INDEX: 1
};
parser.table = {
  gotos: {
    "0": {
      Exp: 3,
      primaryExpression: 4
    },
    "2": {
      Exp: 5,
      primaryExpression: 4
    },
    "6": {
      Exp: 12,
      primaryExpression: 4
    },
    "7": {
      Exp: 13,
      primaryExpression: 4
    },
    "8": {
      Exp: 14,
      primaryExpression: 4
    },
    "9": {
      Exp: 15,
      primaryExpression: 4
    },
    "10": {
      Exp: 16,
      primaryExpression: 4
    }
  },
  action: {
    "0": {
      NUMBER: [1, 1],
      "(": [1, 2]
    },
    "1": {
      $EOF: [2, 8],
      "*": [2, 8],
      "+": [2, 8],
      "-": [2, 8],
      "/": [2, 8],
      "^": [2, 8],
      ")": [2, 8]
    },
    "2": {
      NUMBER: [1, 1],
      "(": [1, 2]
    },
    "3": {
      $EOF: [0],
      "+": [1, 6],
      "-": [1, 7],
      "*": [1, 8],
      "/": [1, 9],
      "^": [1, 10]
    },
    "4": {
      $EOF: [2, 1],
      "*": [2, 1],
      "+": [2, 1],
      "-": [2, 1],
      "/": [2, 1],
      "^": [2, 1],
      ")": [2, 1]
    },
    "5": {
      "+": [1, 6],
      "-": [1, 7],
      ")": [1, 11],
      "*": [1, 8],
      "/": [1, 9],
      "^": [1, 10]
    },
    "6": {
      NUMBER: [1, 1],
      "(": [1, 2]
    },
    "7": {
      NUMBER: [1, 1],
      "(": [1, 2]
    },
    "8": {
      NUMBER: [1, 1],
      "(": [1, 2]
    },
    "9": {
      NUMBER: [1, 1],
      "(": [1, 2]
    },
    "10": {
      NUMBER: [1, 1],
      "(": [1, 2]
    },
    "11": {
      $EOF: [2, 7],
      "*": [2, 7],
      "+": [2, 7],
      "-": [2, 7],
      "/": [2, 7],
      "^": [2, 7],
      ")": [2, 7]
    },
    "12": {
      $EOF: [2, 2],
      "*": [1, 8],
      "+": [2, 2],
      "-": [2, 2],
      "/": [1, 9],
      "^": [1, 10],
      ")": [2, 2]
    },
    "13": {
      $EOF: [2, 4],
      "*": [1, 8],
      "+": [2, 4],
      "-": [2, 4],
      "/": [1, 9],
      "^": [1, 10],
      ")": [2, 4]
    },
    "14": {
      $EOF: [2, 5],
      "*": [2, 5],
      "+": [2, 5],
      "-": [2, 5],
      "/": [2, 5],
      "^": [1, 10],
      ")": [2, 5]
    },
    "15": {
      $EOF: [2, 6],
      "*": [2, 6],
      "+": [2, 6],
      "-": [2, 6],
      "/": [2, 6],
      "^": [1, 10],
      ")": [2, 6]
    },
    "16": {
      $EOF: [2, 3],
      "*": [2, 3],
      "+": [2, 3],
      "-": [2, 3],
      "/": [2, 3],
      "^": [1, 10],
      ")": [2, 3]
    }
  }
};
parser.parse = function parse(input, options) {
  options = options || {};
  var { filename } = options;
  var state, token, ret, action, $;
  var {
    getProductionSymbol,
    getProductionRhs,
    getProductionAction,
    lexer,
    table,
    productions
  } = this;
  var { gotos, action: tableAction } = table;
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
      var expectedInfo = [];
      var expected = {};
      if (tableAction[state]) {
        each(tableAction[state], (v, symbolForState) => {
          action = v[GrammarConst.TYPE_INDEX];
          const actionStr = ActionTypeMap[action];
          const arr = (expected[actionStr] = expected[actionStr] || []);
          const s = this.lexer.mapReverseSymbol(symbolForState);
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
        $ = peekStack(valueStack, len); // default to $ = $1
        ret = undefined;
        this.$ = $;
        for (var i = 0; i < len; i++) {
          this["$" + (len - i)] = peekStack(valueStack, i + 1);
        }
        if (reducedAction) {
          ret = reducedAction.call(this);
        }
        if (ret !== undefined) {
          $ = ret;
        } else {
          $ = this.$;
        }
        var reverseIndex = len * -1;
        stateStack.splice(reverseIndex, len);
        valueStack.splice(reverseIndex, len);
        symbolStack.splice(reverseIndex, len);
        symbolStack.push(reducedSymbol);
        valueStack.push($);
        var newState = gotos[peekStack(stateStack)][reducedSymbol];
        stateStack.push(newState);
        break;

      case GrammarConst.ACCEPT_TYPE:
        return $;
    }
  }
};

  return parser;
  })();

    export default cal;
