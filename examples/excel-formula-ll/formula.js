
/*
Generated By kison v0.4.0

Generate time: Wed Jun 23 2021 12:55:37 GMT+0800 (中国标准时间)
*/
  var formula = (function(undefined){
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
  self.tokensQueue = [];

  mix(self, cfg);

  self.userData = {};

  self.errorRule = {
    regexp: /^./,
    token: Lexer.STATIC.UNKNOWN_TOKEN
  };

  /*
     Input languages
     @type {String}
     */

  self.resetInput(self.input);

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
    var self = this,
      currentState = self.stateStack[self.stateStack.length - 1],
      rules = [];
    if (self.mapState) {
      currentState = self.mapState(currentState);
    }
    each(self.rules, function(r) {
      var filter = self.getRuleItem(r, "filter");
      if (filter) {
        if (filter.call(self)) {
          rules.push(r);
        }
        return;
      }
      var state = self.getRuleItem(r, "state");
      if (!state) {
        if (currentState === Lexer.STATIC.INITIAL_STATE) {
          rules.push(r);
        }
      } else if (inArray(currentState, state)) {
        rules.push(r);
      }
    });
    rules.push(self.errorRule);
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
    var self = this,
      DEBUG_CONTEXT_LIMIT = Lexer.STATIC.DEBUG_CONTEXT_LIMIT,
      matched = self.matched,
      match = self.match,
      input = self.input;
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
    var self = this,
      symbolMap = self.symbolMap;
    if (!symbolMap) {
      return t;
    }
    // force string, see util.clone iphone5s ios7 bug
    return symbolMap[t] || (symbolMap[t] = self.genShortId("symbol"));
  },
  mapReverseSymbol: function(rs) {
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
    var self = this,
      env = self.env,
      input = self.input,
      i,
      rule,
      m,
      ret,
      lines,
      rules = self.getCurrentRules();

    self.match = self.text = "";

    if (!input) {
      return {
        t: self.mapEndSymbol(),
        token: Lexer.STATIC.EOF_TOKEN,
        start: self.end,
        end: self.end,
        firstLine: self.lastLine,
        firstColumn: self.lastColumn,
        lastLine: self.lastLine,
        lastColumn: self.lastColumn
      };
    }

    for (i = 0; i < rules.length; i++) {
      rule = rules[i];
      var regexp = self.getRuleItem(rule, "regexp"),
        token = self.getRuleItem(rule, "token"),
        action = self.getRuleItem(rule, "action");

      if (env && typeof regexp.test !== "function") {
        regexp = regexp[env];
      }

      if (!regexp) {
        continue;
      }

      //#JSCOVERAGE_ENDIF
      if ((m = input.match(regexp))) {
        self.start = self.end;
        self.end += m[0].length;
        lines = m[0].match(/\n.*/g);
        if (lines) {
          self.lineNumber += lines.length;
        }
        const position = {
          start: self.start,
          end: self.end,
          firstLine: self.lastLine,
          lastLine: self.lineNumber,
          firstColumn: self.lastColumn,
          lastColumn: lines
            ? lines[lines.length - 1].length - 1
            : self.lastColumn + m[0].length
        };
        mix(self, position);
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
          if (ret === self.mapHiddenSymbol() && skipHidden) {
            return self.lex();
          }
          return {
            text: self.text,
            token: self.token,
            t: ret,
            ...position
          };
        } else {
          // ignore
          return self.lex();
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
    {
      regexp: /^\s+/,
      token: "$HIDDEN"
    },
    {
      regexp: /^\(/,
      token: "("
    },
    {
      regexp: /^\)/,
      token: ")"
    },
    {
      regexp: /^:/,
      token: ":"
    },
    {
      regexp: /^;/,
      token: ";"
    },
    {
      regexp: /^=/,
      token: "="
    },
    {
      regexp: /^<=/,
      token: "<="
    },
    {
      regexp: /^>=/,
      token: ">="
    },
    {
      regexp: /^<>/,
      token: "<>"
    },
    {
      regexp: /^\|\|/,
      token: "||"
    },
    {
      regexp: /^</,
      token: "<"
    },
    {
      regexp: /^>/,
      token: ">"
    },
    {
      regexp: /^\+/,
      token: "+"
    },
    {
      regexp: /^\-/,
      token: "-"
    },
    {
      regexp: /^\*/,
      token: "*"
    },
    {
      regexp: /^\//,
      token: "/"
    },
    {
      regexp: /^\^/,
      token: "^"
    },
    {
      regexp: /^&/,
      token: "&"
    },
    {
      regexp: /^%/,
      token: "%"
    },
    {
      regexp: /^\{/,
      token: "{",
      action: function() {
        this.userData.inArray = this.userData.inArray || 0;
        this.userData.inArray++;
      }
    },
    {
      regexp: /^\}/,
      token: "}",
      action: function() {
        this.userData.inArray = this.userData.inArray || 1;
        this.userData.inArray--;
      }
    },
    {
      filter: function() {
        return !!this.userData.inArray;
      },
      regexp: {
        en: /^,/,
        de: /^\\/
      },
      token: "ARRAY_SEPARATOR"
    },
    {
      regexp: {
        en: /^,/,
        de: /^;/
      },
      token: "ARGUMENT_SEPARATOR"
    },
    {
      regexp: /^"(""|[^"])*"/,
      token: "STRING",
      action: function() {
        this.text = this.text.slice(1, -1).replace(/""/g, '"');
      }
    },
    {
      regexp: /^[A-Za-z]+[A-Za-z_0-9\.]*(?=[(])/,
      token: "FUNCTION"
    },
    {
      regexp: /^#[A-Z0-9\/]+(!|\?)? /,
      token: "ERROR"
    },
    {
      regexp: /^\$?[A-Za-z]+\$?[0-9]+/,
      token: "CELL"
    },
    {
      regexp: /^(TRUE|FALSE)(?=\b)/,
      token: "LOGIC"
    },
    {
      regexp: /^[A-Za-z]+[A-Za-z_0-9]*/,
      token: "VARIABLE"
    },
    {
      regexp: /^\d+/,
      token: "NUMBER"
    }
  ],
  isCompress: false
});
var parser = {
  productions: [
    ["formula", ["expression"]],
    ["expression", ["exp="], undefined, "single-exp"],
    ["exp=_", ["=", "exp<=", 1, "exp=_"]],
    ["exp=_", []],
    ["exp=", ["exp<=", 1, "exp=_"], undefined, "single-exp"],
    ["exp<=_", ["<=", "exp<", 1, "exp<=_"]],
    ["exp<=_", [">=", "exp<", 1, "exp<=_"]],
    ["exp<=_", ["<>", "exp<", 1, "exp<=_"]],
    ["exp<=_", ["||", "exp<", 1, "exp<=_"]],
    ["exp<=_", []],
    ["exp<=", ["exp<", 1, "exp<=_"], undefined, "single-exp"],
    ["exp<_", ["<", "exp+", 1, "exp<_"]],
    ["exp<_", [">", "exp+", 1, "exp<_"]],
    ["exp<_", []],
    ["exp<", ["exp+", 1, "exp<_"], undefined, "single-exp"],
    ["exp+_", ["+", "exp*", 1, "exp+_"]],
    ["exp+_", ["-", "exp*", 1, "exp+_"]],
    ["exp+_", []],
    ["exp+", ["exp*", 1, "exp+_"], undefined, "single-exp"],
    ["exp*_", ["*", "exp^", 1, "exp*_"]],
    ["exp*_", ["/", "exp^", 1, "exp*_"]],
    ["exp*_", []],
    ["exp*", ["exp^", 1, "exp*_"], undefined, "single-exp"],
    ["exp^_", ["^", "exp&", 1, "exp^_"]],
    ["exp^_", []],
    ["exp^", ["exp&", 1, "exp^_"], undefined, "single-exp"],
    ["exp&_", ["&", "exp%", 1, "exp&_"]],
    ["exp&_", []],
    ["exp&", ["exp%", 1, "exp&_"], undefined, "single-exp"],
    ["exp%_", ["%", 1, "exp%_"]],
    ["exp%_", []],
    ["exp%", ["prefix-exp", 1, "exp%_"], undefined, "single-exp"],
    ["prefix-exp", ["-", "prefix-exp"], undefined, "single-exp"],
    ["prefix-exp", ["+", "prefix-exp"], undefined, "single-exp"],
    ["prefix-exp", ["atom-exp"], undefined, "single-exp"],
    ["atom-exp", ["(", "exp=", ")"], undefined, "single-exp"],
    ["atom-exp", ["NUMBER"], undefined, "number-exp"],
    ["atom-exp", ["STRING"], undefined, "string-exp"],
    ["atom-exp", ["LOGIC"], undefined, "string-exp"],
    ["atom-exp", ["ERROR"], undefined, "error-exp"],
    ["atom-exp", ["VARIABLE"], undefined, "error-exp"],
    ["atom-exp", ["cell"], undefined, "single-exp"],
    ["atom-exp", ["function"], undefined, "single-exp"],
    ["atom-exp", ["array"], undefined, "single-exp"],
    ["_function", ["arguments", ")"]],
    ["_function", [")"]],
    ["function", ["FUNCTION", "(", "_function"]],
    ["array-element", ["STRING"]],
    ["array-element", ["NUMBER"]],
    ["array-element", ["LOGIC"]],
    ["array-element", ["ERROR"]],
    ["array-list_", ["ARRAY_SEPARATOR", "array-element", 1, "array-list_"]],
    ["array-list_", []],
    ["array-list", ["array-element", 1, "array-list_"]],
    ["array", ["{", "array-list", "}"]],
    ["arguments_", ["ARGUMENT_SEPARATOR", "exp=", 1, "arguments_"]],
    ["arguments_", []],
    ["arguments", ["exp=", 1, "arguments_"]],
    ["_cell", [":", "CELL"]],
    ["_cell", []],
    ["cell", ["CELL", "_cell"]]
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
const productionSkipEndSet = new Set([
  2,
  3,
  5,
  6,
  7,
  8,
  9,
  11,
  12,
  13,
  15,
  16,
  17,
  19,
  20,
  21,
  23,
  24,
  26,
  27,
  29,
  30,
  44,
  45,
  51,
  52,
  55,
  56,
  58,
  59
]);
const productionEndFlag = 2;
const productionReductionFlag = 1;
const isProductionEndFlag = function(t) {
  return t === productionEndFlag;
};
const isProductionReductionFlag = function(t) {
  return t === productionReductionFlag;
};
parser.table = {
  formula: {
    "-": [0],
    "+": [0],
    "(": [0],
    NUMBER: [0],
    STRING: [0],
    LOGIC: [0],
    ERROR: [0],
    VARIABLE: [0],
    CELL: [0],
    FUNCTION: [0],
    "{": [0]
  },
  expression: {
    "-": [1],
    "+": [1],
    "(": [1],
    NUMBER: [1],
    STRING: [1],
    LOGIC: [1],
    ERROR: [1],
    VARIABLE: [1],
    CELL: [1],
    FUNCTION: [1],
    "{": [1]
  },
  "exp=_": {
    "=": [2],
    $EOF: [3],
    ")": [3],
    ARGUMENT_SEPARATOR: [3]
  },
  "exp=": {
    "-": [4],
    "+": [4],
    "(": [4],
    NUMBER: [4],
    STRING: [4],
    LOGIC: [4],
    ERROR: [4],
    VARIABLE: [4],
    CELL: [4],
    FUNCTION: [4],
    "{": [4]
  },
  "exp<=_": {
    "<=": [5],
    ">=": [6],
    "<>": [7],
    "||": [8],
    "=": [9],
    $EOF: [9],
    ")": [9],
    ARGUMENT_SEPARATOR: [9]
  },
  "exp<=": {
    "-": [10],
    "+": [10],
    "(": [10],
    NUMBER: [10],
    STRING: [10],
    LOGIC: [10],
    ERROR: [10],
    VARIABLE: [10],
    CELL: [10],
    FUNCTION: [10],
    "{": [10]
  },
  "exp<_": {
    "<": [11],
    ">": [12],
    "<=": [13],
    ">=": [13],
    "<>": [13],
    "||": [13],
    "=": [13],
    $EOF: [13],
    ")": [13],
    ARGUMENT_SEPARATOR: [13]
  },
  "exp<": {
    "-": [14],
    "+": [14],
    "(": [14],
    NUMBER: [14],
    STRING: [14],
    LOGIC: [14],
    ERROR: [14],
    VARIABLE: [14],
    CELL: [14],
    FUNCTION: [14],
    "{": [14]
  },
  "exp+_": {
    "+": [15],
    "-": [16],
    "<": [17],
    ">": [17],
    "<=": [17],
    ">=": [17],
    "<>": [17],
    "||": [17],
    "=": [17],
    $EOF: [17],
    ")": [17],
    ARGUMENT_SEPARATOR: [17]
  },
  "exp+": {
    "-": [18],
    "+": [18],
    "(": [18],
    NUMBER: [18],
    STRING: [18],
    LOGIC: [18],
    ERROR: [18],
    VARIABLE: [18],
    CELL: [18],
    FUNCTION: [18],
    "{": [18]
  },
  "exp*_": {
    "*": [19],
    "/": [20],
    "+": [21],
    "-": [21],
    "<": [21],
    ">": [21],
    "<=": [21],
    ">=": [21],
    "<>": [21],
    "||": [21],
    "=": [21],
    $EOF: [21],
    ")": [21],
    ARGUMENT_SEPARATOR: [21]
  },
  "exp*": {
    "-": [22],
    "+": [22],
    "(": [22],
    NUMBER: [22],
    STRING: [22],
    LOGIC: [22],
    ERROR: [22],
    VARIABLE: [22],
    CELL: [22],
    FUNCTION: [22],
    "{": [22]
  },
  "exp^_": {
    "^": [23],
    "*": [24],
    "/": [24],
    "+": [24],
    "-": [24],
    "<": [24],
    ">": [24],
    "<=": [24],
    ">=": [24],
    "<>": [24],
    "||": [24],
    "=": [24],
    $EOF: [24],
    ")": [24],
    ARGUMENT_SEPARATOR: [24]
  },
  "exp^": {
    "-": [25],
    "+": [25],
    "(": [25],
    NUMBER: [25],
    STRING: [25],
    LOGIC: [25],
    ERROR: [25],
    VARIABLE: [25],
    CELL: [25],
    FUNCTION: [25],
    "{": [25]
  },
  "exp&_": {
    "&": [26],
    "^": [27],
    "*": [27],
    "/": [27],
    "+": [27],
    "-": [27],
    "<": [27],
    ">": [27],
    "<=": [27],
    ">=": [27],
    "<>": [27],
    "||": [27],
    "=": [27],
    $EOF: [27],
    ")": [27],
    ARGUMENT_SEPARATOR: [27]
  },
  "exp&": {
    "-": [28],
    "+": [28],
    "(": [28],
    NUMBER: [28],
    STRING: [28],
    LOGIC: [28],
    ERROR: [28],
    VARIABLE: [28],
    CELL: [28],
    FUNCTION: [28],
    "{": [28]
  },
  "exp%_": {
    "%": [29],
    "&": [30],
    "^": [30],
    "*": [30],
    "/": [30],
    "+": [30],
    "-": [30],
    "<": [30],
    ">": [30],
    "<=": [30],
    ">=": [30],
    "<>": [30],
    "||": [30],
    "=": [30],
    $EOF: [30],
    ")": [30],
    ARGUMENT_SEPARATOR: [30]
  },
  "exp%": {
    "-": [31],
    "+": [31],
    "(": [31],
    NUMBER: [31],
    STRING: [31],
    LOGIC: [31],
    ERROR: [31],
    VARIABLE: [31],
    CELL: [31],
    FUNCTION: [31],
    "{": [31]
  },
  "prefix-exp": {
    "-": [32],
    "+": [33],
    "(": [34],
    NUMBER: [34],
    STRING: [34],
    LOGIC: [34],
    ERROR: [34],
    VARIABLE: [34],
    CELL: [34],
    FUNCTION: [34],
    "{": [34]
  },
  "atom-exp": {
    "(": [35],
    NUMBER: [36],
    STRING: [37],
    LOGIC: [38],
    ERROR: [39],
    VARIABLE: [40],
    CELL: [41],
    FUNCTION: [42],
    "{": [43]
  },
  _function: {
    "-": [44],
    "+": [44],
    "(": [44],
    NUMBER: [44],
    STRING: [44],
    LOGIC: [44],
    ERROR: [44],
    VARIABLE: [44],
    CELL: [44],
    FUNCTION: [44],
    "{": [44],
    ")": [45]
  },
  function: {
    FUNCTION: [46]
  },
  "array-element": {
    STRING: [47],
    NUMBER: [48],
    LOGIC: [49],
    ERROR: [50]
  },
  "array-list_": {
    ARRAY_SEPARATOR: [51],
    "}": [52]
  },
  "array-list": {
    STRING: [53],
    NUMBER: [53],
    LOGIC: [53],
    ERROR: [53]
  },
  array: {
    "{": [54]
  },
  arguments_: {
    ARGUMENT_SEPARATOR: [55],
    ")": [56]
  },
  arguments: {
    "-": [57],
    "+": [57],
    "(": [57],
    NUMBER: [57],
    STRING: [57],
    LOGIC: [57],
    ERROR: [57],
    VARIABLE: [57],
    CELL: [57],
    FUNCTION: [57],
    "{": [57]
  },
  _cell: {
    ":": [58],
    "%": [59],
    "&": [59],
    "^": [59],
    "*": [59],
    "/": [59],
    "+": [59],
    "-": [59],
    "<": [59],
    ">": [59],
    "<=": [59],
    ">=": [59],
    "<>": [59],
    "||": [59],
    "=": [59],
    $EOF: [59],
    ")": [59],
    ARGUMENT_SEPARATOR: [59]
  },
  cell: {
    CELL: [60]
  }
};
parser.parse = function parse(input, options) {
  var self = this;

  const tokens = [];

  const terminalNodes = [];

  class AstNode {
    constructor(cfg) {
      Object.assign(this, cfg);
    }

    addChild(c) {
      this.addChildren([c]);
    }

    addChildren(cs) {
      this.children.push(...cs);
      for (const c of cs) {
        c.parent = this;
      }
    }

    setChildren(cs) {
      this.children = cs;
      for (const c of cs) {
        c.parent = this;
      }
    }

    toJSON() {
      const ret = {};
      for (const k of Object.keys(this)) {
        if (k !== "parent" && k !== "t") {
          ret[k] = this[k];
        }
      }
      return ret;
    }
  }

  function isExtraSymbol(ast) {
    return ast.children && !ast.children.length;
  }

  function peekStack(stack, n) {
    n = n || 1;
    return stack[stack.length - n];
  }

  function getTableVal(row, col) {
    return table[row] && table[row][col];
  }

  function noop() {}

  function getOriginalSymbol(s) {
    return lexer.mapReverseSymbol(s);
  }

  options = options || {};
  let error;
  var { onErrorRecovery, onAction = noop, lexerEnv } = options;

  var {
    lexer,
    table,
    productions,
    getProductionSymbol,
    getProductionRhs,
    getProductionLabel
  } = self;

  lexer.env = lexerEnv;

  var symbolStack = [getProductionSymbol(productions[0])];
  const astStack = [
    new AstNode({
      children: []
    })
  ];
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

  function cleanAst(ast) {
    if (!ast.children) {
      return ast;
    }
    if (ast.children.length === 1) {
      const child = ast.children[0];
      if (
        (ast.label && child.label && ast.label === child.label) ||
        (!ast.label && !child.label && ast.symbol === child.symbol)
      ) {
        ast.setChildren(child.children);
        ast.symbol = child.symbol;
        cleanAst(ast);
      } else {
        cleanAst(child);
      }
    } else {
      for (const c of ast.children) {
        cleanAst(c);
      }
    }
    return ast;
  }

  function getAst() {
    const ast = astStack[0] && astStack[0].children && astStack[0].children[0];

    if (ast) {
      delete ast.parent;
    }

    return ast && cleanAst(ast);
  }

  let topSymbol;

  let errorNode;

  function getExpected() {
    const ret = (table[topSymbol] && Object.keys(table[topSymbol])) || [];
    return ret.map(r => lexer.mapReverseSymbol(r));
  }

  function closeAstWhenError() {
    errorNode = new AstNode({
      error,
      ...error.lexer
    });
    peekStack(astStack).addChild(errorNode);
    while (astStack.length !== 1) {
      const ast = astStack.pop();
      if (ast.symbol && isExtraSymbol(ast)) {
        const topAst = peekStack(astStack);
        topAst.children.pop();
        topAst.addChildren(ast.children);
      }
    }
  }

  function replaceStackTopChild(ast) {
    const topAst = peekStack(astStack);
    topAst.children.pop();
    topAst.addChildren(ast.children);
  }

  let production;

  while (1) {
    topSymbol = peekStack(symbolStack);

    if (!topSymbol) {
      break;
    }

    while (
      isProductionEndFlag(topSymbol) ||
      isProductionReductionFlag(topSymbol)
    ) {
      if (isProductionReductionFlag(topSymbol)) {
        let ast = astStack.pop();
        const stackTop = peekStack(astStack);
        const wrap = new AstNode({
          symbol: ast.symbol,
          children: [ast],
          label: ast.label
        });
        stackTop.children.pop();
        stackTop.addChild(wrap);
        astStack.push(wrap);
      } else {
        let ast = astStack.pop();
        if (ast.symbol && isExtraSymbol(ast)) {
          replaceStackTopChild(ast);
        }
      }
      symbolStack.pop();
      topSymbol = peekStack(symbolStack);
      if (!topSymbol) {
        break;
      }
    }

    if (typeof topSymbol === "string") {
      if (!token) {
        token = lexer.lex();
        tokens.push(token);
      }
      currentToken = token;
      if (topSymbol === token.t) {
        symbolStack.pop();
        const terminalNode = new AstNode(token);
        terminalNodes.push(terminalNode);
        peekStack(astStack).addChild(terminalNode);
        token = null;
      } else if ((next = getTableVal(topSymbol, token.t)) !== undefined) {
        let n = next[0];

        symbolStack.pop();
        production = productions[n];

        if (productionSkipEndSet.has(n)) {
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production)
              .concat()
              .reverse()
          );
        } else {
          const newAst = new AstNode({
            symbol: getOriginalSymbol(topSymbol),
            label: getProductionLabel(production),
            children: []
          });
          peekStack(astStack).addChild(newAst);
          astStack.push(newAst);
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production)
              .concat(productionEndFlag)
              .reverse()
          );
        }
      } else {
        error = {
          errorMessage: getError(),
          expected: getExpected(),
          symbol: lexer.mapReverseSymbol(topSymbol),
          lexer: token
        };
        if (onErrorRecovery) {
          const recommendedAction = {};
          const nextToken = lexer.peek();

          // should delete
          if (
            topSymbol === nextToken.t ||
            getTableVal(topSymbol, nextToken.t) !== undefined
          ) {
            recommendedAction.action = "del";
          } else if (error.expected.length) {
            recommendedAction.action = "add";
          }

          const recovery =
            onErrorRecovery(
              {
                ...error,
                ast: getAst()
              },
              recommendedAction
            ) || {};
          const { action } = recovery;

          if (!action) {
            closeAstWhenError();
            break;
          }

          if (action === "del") {
            error.recovery = true;
            token = null;
          } else if (action === "add") {
            error.recovery = true;
            token = {
              ...token,
              token: recovery.token,
              text: recovery.text,
              t: lexer.mapSymbol(recovery.token)
            };
          }
        } else {
          closeAstWhenError();
          break;
        }
      }
    }

    topSymbol = peekStack(symbolStack);

    while (topSymbol && typeof topSymbol === "function") {
      onAction({
        lexer: currentToken,
        action: topSymbol
      });
      symbolStack.pop();
      topSymbol = peekStack(symbolStack);
    }

    if (!symbolStack.length) {
      break;
    }
  }

  if (!error && currentToken.t !== lexer.mapEndSymbol()) {
    error = "parse end error";
    closeAstWhenError();
  }

  const ast = getAst();

  return {
    ast,
    tokens,
    errorNode,
    error,
    terminalNodes
  };
};

  return parser;
  })();

    export default formula;
