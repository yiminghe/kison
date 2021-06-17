
  /*
    Generated by kison.
  */
  var formula = (function(undefined){
  /* Generated by kison */
var parser = {};
/*jslint quotmark: false*/
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

  /*
     Input languages
     @type {String}
     */

  self.resetInput(self.input);
};
Lexer.prototype = {
  resetInput: function(input) {
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
  mapEndSymbol: function() {
    return this.mapSymbol(Lexer.STATIC.END_TAG);
  },
  mapHiddenSymbol: function() {
    return this.mapSymbol(Lexer.STATIC.HIDDEN_TAG);
  },
  getCurrentRules: function() {
    var self = this,
      currentState = self.stateStack[self.stateStack.length - 1],
      rules = [];
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
        token: Lexer.STATIC.END_TAG,
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
      var regexp = rule.regexp || rule[1],
        token = rule.token || rule[0],
        action = rule.action || rule[2] || undefined;

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
  INITIAL: "I",
  DEBUG_CONTEXT_LIMIT: 20,
  END_TAG: "$EOF",
  HIDDEN_TAG: "$HIDDEN"
};
var lexer = new Lexer({
  rules: [
    {
      regexp: /^\s+/,
      token: "$HIDDEN"
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
      regexp: /^\{/,
      token: "{"
    },
    {
      regexp: /^\}/,
      token: "}"
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
      regexp: /^NOT/,
      token: "NOT"
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
      regexp: {
        en: /^,/,
        de: /^;/
      },
      token: "SEPARATOR"
    },
    {
      regexp: /^NOT/,
      token: "NOT"
    },
    {
      regexp: /^./,
      token: "$ERROR"
    }
  ]
});
parser.lexer = lexer;
parser.productions = [
  ["formula", ["expression"]],
  ["expression", ["exp="], 0, "single-exp"],
  [
    "exp=_",
    [
      "=",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp<=",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp=_"
    ]
  ],
  ["exp=_", []],
  [
    "exp=",
    [
      "exp<=",
      {
        s: 1
      },
      "exp=_"
    ],
    0,
    "single-exp"
  ],
  [
    "exp<=_",
    [
      "<=",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp<",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp<=_"
    ]
  ],
  [
    "exp<=_",
    [
      ">=",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp<",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp<=_"
    ]
  ],
  [
    "exp<=_",
    [
      "<>",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp<",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp<=_"
    ]
  ],
  [
    "exp<=_",
    [
      "NOT",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp<",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp<=_"
    ]
  ],
  [
    "exp<=_",
    [
      "||",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp<",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp<=_"
    ]
  ],
  ["exp<=_", []],
  [
    "exp<=",
    [
      "exp<",
      {
        s: 1
      },
      "exp<=_"
    ],
    0,
    "single-exp"
  ],
  [
    "exp<_",
    [
      "<",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp+",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp<_"
    ]
  ],
  [
    "exp<_",
    [
      ">",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp+",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp<_"
    ]
  ],
  ["exp<_", []],
  [
    "exp<",
    [
      "exp+",
      {
        s: 1
      },
      "exp<_"
    ],
    0,
    "single-exp"
  ],
  [
    "exp+_",
    [
      "+",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp*",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp+_"
    ]
  ],
  [
    "exp+_",
    [
      "-",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp*",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp+_"
    ]
  ],
  ["exp+_", []],
  [
    "exp+",
    [
      "exp*",
      {
        s: 1
      },
      "exp+_"
    ],
    0,
    "single-exp"
  ],
  [
    "exp*_",
    [
      "*",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp^",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp*_"
    ]
  ],
  [
    "exp*_",
    [
      "/",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp^",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp*_"
    ]
  ],
  ["exp*_", []],
  [
    "exp*",
    [
      "exp^",
      {
        s: 1
      },
      "exp*_"
    ],
    0,
    "single-exp"
  ],
  [
    "exp^_",
    [
      "^",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp&",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp^_"
    ]
  ],
  ["exp^_", []],
  [
    "exp^",
    [
      "exp&",
      {
        s: 1
      },
      "exp^_"
    ],
    0,
    "single-exp"
  ],
  [
    "exp&_",
    [
      "&",
      function(astProcessor, lexer) {
        astProcessor.pushStack(lexer.text);
      },
      "exp%",
      function(astProcessor) {
        astProcessor.createOpNode();
      },
      {
        s: 1
      },
      "exp&_"
    ]
  ],
  ["exp&_", []],
  [
    "exp&",
    [
      "exp%",
      {
        s: 1
      },
      "exp&_"
    ],
    0,
    "single-exp"
  ],
  [
    "exp%_",
    [
      "%",
      {
        s: 1
      },
      "exp%_"
    ]
  ],
  ["exp%_", []],
  [
    "exp%",
    [
      "prefix-exp",
      {
        s: 1
      },
      "exp%_"
    ],
    0,
    "single-exp"
  ],
  ["prefix-exp", ["-", "prefix-exp"], 0, "single-exp"],
  ["prefix-exp", ["+", "prefix-exp"], 0, "single-exp"],
  ["prefix-exp", ["atom-exp"], 0, "single-exp"],
  ["atom-exp", ["(", "exp=", ")"], 0, "single-exp"],
  ["atom-exp", ["NUMBER"], 0, "number-exp"],
  ["atom-exp", ["STRING"], 0, "string-exp"],
  ["atom-exp", ["LOGIC"], 0, "string-exp"],
  ["atom-exp", ["ERROR"], 0, "error-exp"],
  ["atom-exp", ["VARIABLE"], 0, "error-exp"],
  ["atom-exp", ["cell"], 0, "single-exp"],
  ["atom-exp", ["function"], 0, "single-exp"],
  ["atom-exp", ["array"], 0, "single-exp"],
  ["_function", ["arguments", ")"]],
  ["_function", [")"]],
  ["function", ["FUNCTION", "(", "_function"]],
  ["array-element", ["STRING"]],
  ["array-element", ["NUMBER"]],
  ["array-element", ["LOGIC"]],
  ["array-element", ["ERROR"]],
  [
    "array-list_",
    [
      "SEPARATOR",
      "array-element",
      {
        s: 1
      },
      "array-list_"
    ]
  ],
  ["array-list_", []],
  [
    "array-list",
    [
      "array-element",
      {
        s: 1
      },
      "array-list_"
    ]
  ],
  ["array", ["{", "array-list", "}"]],
  [
    "arguments_",
    [
      "SEPARATOR",
      "exp=",
      {
        s: 1
      },
      "arguments_"
    ]
  ],
  ["arguments_", []],
  [
    "arguments",
    [
      "exp=",
      {
        s: 1
      },
      "arguments_"
    ]
  ],
  ["_cell", [":", "CELL"]],
  ["_cell", []],
  ["cell", ["CELL", "_cell"]]
];
const productionSkipEndSet = new Set([
  2,
  3,
  5,
  6,
  7,
  8,
  9,
  10,
  12,
  13,
  14,
  16,
  17,
  18,
  20,
  21,
  22,
  24,
  25,
  27,
  28,
  30,
  31,
  45,
  46,
  52,
  53,
  56,
  57,
  59,
  60
]);
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
    SEPARATOR: [3]
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
    NOT: [8],
    "||": [9],
    "=": [10],
    $EOF: [10],
    ")": [10],
    SEPARATOR: [10]
  },
  "exp<=": {
    "-": [11],
    "+": [11],
    "(": [11],
    NUMBER: [11],
    STRING: [11],
    LOGIC: [11],
    ERROR: [11],
    VARIABLE: [11],
    CELL: [11],
    FUNCTION: [11],
    "{": [11]
  },
  "exp<_": {
    "<": [12],
    ">": [13],
    "<=": [14],
    ">=": [14],
    "<>": [14],
    NOT: [14],
    "||": [14],
    "=": [14],
    $EOF: [14],
    ")": [14],
    SEPARATOR: [14]
  },
  "exp<": {
    "-": [15],
    "+": [15],
    "(": [15],
    NUMBER: [15],
    STRING: [15],
    LOGIC: [15],
    ERROR: [15],
    VARIABLE: [15],
    CELL: [15],
    FUNCTION: [15],
    "{": [15]
  },
  "exp+_": {
    "+": [16],
    "-": [17],
    "<": [18],
    ">": [18],
    "<=": [18],
    ">=": [18],
    "<>": [18],
    NOT: [18],
    "||": [18],
    "=": [18],
    $EOF: [18],
    ")": [18],
    SEPARATOR: [18]
  },
  "exp+": {
    "-": [19],
    "+": [19],
    "(": [19],
    NUMBER: [19],
    STRING: [19],
    LOGIC: [19],
    ERROR: [19],
    VARIABLE: [19],
    CELL: [19],
    FUNCTION: [19],
    "{": [19]
  },
  "exp*_": {
    "*": [20],
    "/": [21],
    "+": [22],
    "-": [22],
    "<": [22],
    ">": [22],
    "<=": [22],
    ">=": [22],
    "<>": [22],
    NOT: [22],
    "||": [22],
    "=": [22],
    $EOF: [22],
    ")": [22],
    SEPARATOR: [22]
  },
  "exp*": {
    "-": [23],
    "+": [23],
    "(": [23],
    NUMBER: [23],
    STRING: [23],
    LOGIC: [23],
    ERROR: [23],
    VARIABLE: [23],
    CELL: [23],
    FUNCTION: [23],
    "{": [23]
  },
  "exp^_": {
    "^": [24],
    "*": [25],
    "/": [25],
    "+": [25],
    "-": [25],
    "<": [25],
    ">": [25],
    "<=": [25],
    ">=": [25],
    "<>": [25],
    NOT: [25],
    "||": [25],
    "=": [25],
    $EOF: [25],
    ")": [25],
    SEPARATOR: [25]
  },
  "exp^": {
    "-": [26],
    "+": [26],
    "(": [26],
    NUMBER: [26],
    STRING: [26],
    LOGIC: [26],
    ERROR: [26],
    VARIABLE: [26],
    CELL: [26],
    FUNCTION: [26],
    "{": [26]
  },
  "exp&_": {
    "&": [27],
    "^": [28],
    "*": [28],
    "/": [28],
    "+": [28],
    "-": [28],
    "<": [28],
    ">": [28],
    "<=": [28],
    ">=": [28],
    "<>": [28],
    NOT: [28],
    "||": [28],
    "=": [28],
    $EOF: [28],
    ")": [28],
    SEPARATOR: [28]
  },
  "exp&": {
    "-": [29],
    "+": [29],
    "(": [29],
    NUMBER: [29],
    STRING: [29],
    LOGIC: [29],
    ERROR: [29],
    VARIABLE: [29],
    CELL: [29],
    FUNCTION: [29],
    "{": [29]
  },
  "exp%_": {
    "%": [30],
    "&": [31],
    "^": [31],
    "*": [31],
    "/": [31],
    "+": [31],
    "-": [31],
    "<": [31],
    ">": [31],
    "<=": [31],
    ">=": [31],
    "<>": [31],
    NOT: [31],
    "||": [31],
    "=": [31],
    $EOF: [31],
    ")": [31],
    SEPARATOR: [31]
  },
  "exp%": {
    "-": [32],
    "+": [32],
    "(": [32],
    NUMBER: [32],
    STRING: [32],
    LOGIC: [32],
    ERROR: [32],
    VARIABLE: [32],
    CELL: [32],
    FUNCTION: [32],
    "{": [32]
  },
  "prefix-exp": {
    "-": [33],
    "+": [34],
    "(": [35],
    NUMBER: [35],
    STRING: [35],
    LOGIC: [35],
    ERROR: [35],
    VARIABLE: [35],
    CELL: [35],
    FUNCTION: [35],
    "{": [35]
  },
  "atom-exp": {
    "(": [36],
    NUMBER: [37],
    STRING: [38],
    LOGIC: [39],
    ERROR: [40],
    VARIABLE: [41],
    CELL: [42],
    FUNCTION: [43],
    "{": [44]
  },
  _function: {
    "-": [45],
    "+": [45],
    "(": [45],
    NUMBER: [45],
    STRING: [45],
    LOGIC: [45],
    ERROR: [45],
    VARIABLE: [45],
    CELL: [45],
    FUNCTION: [45],
    "{": [45],
    ")": [46]
  },
  function: {
    FUNCTION: [47]
  },
  "array-element": {
    STRING: [48],
    NUMBER: [49],
    LOGIC: [50],
    ERROR: [51]
  },
  "array-list_": {
    SEPARATOR: [52],
    "}": [53]
  },
  "array-list": {
    STRING: [54],
    NUMBER: [54],
    LOGIC: [54],
    ERROR: [54]
  },
  array: {
    "{": [55]
  },
  arguments_: {
    SEPARATOR: [56],
    ")": [57]
  },
  arguments: {
    "-": [58],
    "+": [58],
    "(": [58],
    NUMBER: [58],
    STRING: [58],
    LOGIC: [58],
    ERROR: [58],
    VARIABLE: [58],
    CELL: [58],
    FUNCTION: [58],
    "{": [58]
  },
  _cell: {
    ":": [59],
    "%": [60],
    "&": [60],
    "^": [60],
    "*": [60],
    "/": [60],
    "+": [60],
    "-": [60],
    "<": [60],
    ">": [60],
    "<=": [60],
    ">=": [60],
    "<>": [60],
    NOT: [60],
    "||": [60],
    "=": [60],
    $EOF: [60],
    ")": [60],
    SEPARATOR: [60]
  },
  cell: {
    CELL: [61]
  }
};
parser.parse = function parse(input, options) {
  const productionEndToken = "kison-end-" + Date.now();

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

  function getProductionSymbol(p) {
    return p.symbol || p[0];
  }

  function getProductionRhs(p) {
    return p.rhs || p[1];
  }

  function getProductionLabel(p) {
    return p.label || p[3];
  }

  function getOriginalSymbol(s) {
    return lexer.mapReverseSymbol(s);
  }

  options = options || {};
  let error;
  var { onErrorRecovery, onAction = noop, lexerEnv } = options;
  var self = this;
  var { lexer, table, productions } = self;

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

    while (topSymbol === productionEndToken || topSymbol.s) {
      if (topSymbol.s) {
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
              .concat(productionEndToken)
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
