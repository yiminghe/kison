/*
Generated By kison v0.4.6

Generate time: Fri Jul 02 2021 11:28:28 GMT+0800 (中国标准时间)
*/
var index = (function(undefined) {
  "use strict";

  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it =
      (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      return function() {
        if (i >= o.length) return { done: true };
        return { done: false, value: o[i++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }

  function _extends() {
    _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
    return _extends.apply(this, arguments);
  }

  var my = {
    markType: function markType(self, type, enter) {
      if (enter === void 0) {
        enter = true;
      }

      var userData = self.userData;
      userData[type] = userData[type] || 0;

      if (enter) {
        ++userData[type];
      } else if (userData.inArray) {
        --userData[type];
      }
    },
    last: function last(arr) {
      return arr && arr[arr.length - 1];
    }
  };

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
    this.rules = [].concat(this.rules);
    this.userData = {};
    var errorRule = (this.errorRule = {
      regexp: /^./,
      token: Lexer.STATIC.UNKNOWN_TOKEN
    });
    var ruleIndexMap = (this.ruleIndexMap = {
      token: 0,
      regexp: 1,
      action: 2,
      filter: 3,
      state: 4
    });
    var errorRuleCompress = (this.errorRuleCompress = []);
    errorRuleCompress[ruleIndexMap.token] = errorRule.token;
    errorRuleCompress[ruleIndexMap.regexp] = errorRule.regexp;
    this.resetInput(this.input);
  };

  Lexer.prototype = {
    resetInput: function resetInput(input) {
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
    mapEndSymbol: function mapEndSymbol() {
      return this.mapSymbol(Lexer.STATIC.EOF_TOKEN);
    },
    mapHiddenSymbol: function mapHiddenSymbol() {
      return this.mapSymbol(Lexer.STATIC.HIDDEN_TOKEN);
    },
    getRuleItem: function getRuleItem(rule, itemType) {
      if (this.isCompress) {
        return rule[this.ruleIndexMap[itemType]];
      } else {
        return rule[itemType];
      }
    },
    getCurrentRules: function getCurrentRules() {
      var _this = this;

      var currentState = this.stateStack[this.stateStack.length - 1],
        rules = [];

      if (this.mapState) {
        currentState = this.mapState(currentState);
      }

      each(this.rules, function(r) {
        var filter = _this.getRuleItem(r, "filter");

        if (filter) {
          if (filter.call(_this)) {
            rules.push(r);
          }

          return;
        }

        var state = _this.getRuleItem(r, "state");

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
    peekState: function peekState(n) {
      n = n || 1;
      return this.stateStack[this.stateStack.length - n];
    },
    pushState: function pushState(state) {
      this.stateStack.push(state);
    },
    popState: function popState(num) {
      num = num || 1;
      var ret;

      while (num--) {
        ret = this.stateStack.pop();
      }

      return ret;
    },
    showDebugInfo: function showDebugInfo() {
      var DEBUG_CONTEXT_LIMIT = Lexer.STATIC.DEBUG_CONTEXT_LIMIT;
      var matched = this.matched,
        match = this.match,
        input = this.input;
      matched = matched.slice(0, matched.length - match.length);
      var past =
          (matched.length > DEBUG_CONTEXT_LIMIT ? "..." : "") +
          matched.slice(0 - DEBUG_CONTEXT_LIMIT).replace(/\n/g, " "),
        next = match + input; //#JSCOVERAGE_ENDIF

      next =
        next.slice(0, DEBUG_CONTEXT_LIMIT).replace(/\n/g, " ") +
        (next.length > DEBUG_CONTEXT_LIMIT ? "..." : "");
      return past + next + "\n" + new Array(past.length + 1).join("-") + "^";
    },
    mapSymbol: function mapSymbol(t) {
      return this.symbolMap[t];
    },
    mapReverseSymbol: function mapReverseSymbol(rs) {
      var symbolMap = this.symbolMap,
        reverseSymbolMap = this.reverseSymbolMap;

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
    toJSON: function toJSON() {
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
    peek: function peek(skipHidden) {
      var token = this.lex(skipHidden, true);

      if (this.tokensQueue.indexOf(token) === -1) {
        this.tokensQueue.push(token);
      }

      return token;
    },
    lex: function lex(skipHidden, reserveQueue) {
      if (skipHidden === undefined) {
        skipHidden = true;
      }

      var tokensQueue = this.tokensQueue;

      if (reserveQueue) {
        for (var _i = 0; _i < tokensQueue.length; _i++) {
          var _token = tokensQueue[_i];

          if (skipHidden && _token.t === this.mapHiddenSymbol()) {
            continue;
          }

          return _token;
        }
      } else {
        while (tokensQueue.length) {
          var _token2 = tokensQueue.shift();

          if (skipHidden && _token2.t === this.mapHiddenSymbol()) {
            continue;
          }

          return _token2;
        }
      }

      var i,
        rule,
        m,
        ret,
        lines,
        rules = this.getCurrentRules();
      var env = this.env,
        input = this.input;
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
        } //#JSCOVERAGE_ENDIF

        if ((m = input.match(regexp))) {
          this.start = this.end;
          this.end += m[0].length;
          lines = m[0].match(/\n.*/g);

          if (lines) {
            this.lineNumber += lines.length;
          }

          var position = {
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
          var match; // for error report

          match = this.match = m[0]; // all matches

          this.matches = m; // may change by user

          this.text = match; // matched content utils now

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

            return _extends(
              {
                text: this.text,
                token: this.token,
                t: ret
              },
              position
            );
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
      ["$HIDDEN", /^\s+/, undefined, undefined, ["s", "I"]],
      [
        "a",
        /^\(/,
        function() {
          var userData = this.userData;
          userData.markParen = userData.markParen || [];
          var lastItem = my.last(userData.markParen);

          if (lastItem && lastItem.index === this.start) {
            return;
          }

          userData.markParen.push({
            index: this.end,
            func: false
          });
        }
      ],
      [
        "b",
        /^\)/,
        function() {
          var userData = this.userData;
          userData.markParen = userData.markParen || [];
          userData.markParen.pop();
        }
      ],
      [
        "c",
        /^\{/,
        function() {
          // array constants
          my.markType(this, "a");
        }
      ],
      ["d", /^:/],
      ["e", /^=/],
      ["f", /^<=/],
      ["g", /^>=/],
      ["h", /^<>/],
      ["i", /^>/],
      ["j", /^</],
      ["k", /^\+/],
      ["l", /^\-/],
      ["m", /^\*/],
      ["n", /^\//],
      ["o", /^\^/],
      ["p", /^&/],
      ["q", /^%/],
      [
        "r",
        /^\}/,
        function() {
          my.markType(this, "a", false);
        }
      ],
      ["s", /^,/, undefined, undefined, ["s"]],
      [
        "t",
        /^\[#(?:[_A-Za-z一-龥]+[_A-Za-z_0-9一-龥]*)\]/,
        undefined,
        undefined,
        ["s", "I"]
      ],
      [
        "u",
        /^(?:(?:(?:\[(?:'.|[^\]'#])+\])(?:\:(?:\[(?:'.|[^\]'#])+\]))?)|(?:'.|[^\]#'])+)/,
        undefined,
        undefined,
        ["s"]
      ],
      [
        "v",
        /^\[/,
        function() {
          this.pushState("s");
        },
        undefined,
        ["s", "I"]
      ],
      ["w", /^@/, undefined, undefined, ["s"]],
      [
        "x",
        /^\]/,
        function() {
          this.popState();
        },
        undefined,
        ["s"]
      ],
      [
        "y",
        {
          en: /^[,;]/,
          de: /^[\\;]/
        },
        undefined,
        function() {
          return !!this.userData.a;
        }
      ],
      [
        "z",
        /^,/,
        undefined,
        function() {
          var lastItem = my.last(this.userData.markParen);
          return !lastItem || !lastItem.func;
        }
      ],
      [
        "aa",
        {
          en: /^,/,
          de: /^;/
        }
      ],
      [
        "ab",
        /^"(?:""|[^"])*"/,
        function() {
          this.text = this.text.slice(1, -1).replace(/""/g, '"');
        }
      ],
      [
        "ac",
        /^(?:(?:[_A-Za-z一-龥]+[_A-Za-z_0-9一-龥]*)(?:\.(?:[_A-Za-z一-龥]+[_A-Za-z_0-9一-龥]*))*)(?=[(])/,
        function() {
          var userData = this.userData;
          userData.markParen = userData.markParen || [];
          userData.markParen.push({
            index: this.end,
            func: true
          });
        }
      ],
      ["ad", /^#[A-Z0-9\/]+(!|\?)? /],
      [
        "ae",
        /^(?:(?:(?:'(?:''|[^'])*')|(?:(?:[_A-Za-z一-龥]+[_A-Za-z_0-9一-龥]*)(?:\:(?:[_A-Za-z一-龥]+[_A-Za-z_0-9一-龥]*))?))!)?(?:\$?[A-Za-z]+\$?[0-9]+)(?:\s*\:\s*(?:\$?[A-Za-z]+\$?[0-9]+))?/
      ],
      ["af", /^(TRUE|FALSE)(?=\b)/i],
      [
        "ag",
        /^(?:(?:[_A-Za-z一-龥]+[_A-Za-z_0-9一-龥]*)(?:\.(?:[_A-Za-z一-龥]+[_A-Za-z_0-9一-龥]*))*)(?=[\[])/
      ],
      [
        "ah",
        /^(?:(?:[_A-Za-z一-龥]+[_A-Za-z_0-9一-龥]*)(?:\.(?:[_A-Za-z一-龥]+[_A-Za-z_0-9一-龥]*))*)/
      ],
      [
        "ai",
        {
          en: /^(?:0|[1-9][0-9]*)?\.(?:[0-9][0-9]*)(?:[eE][+-]?[0-9]+)?/,
          de: /^(?:0|[1-9][0-9]*)?,(?:[0-9][0-9]*)(?:[eE][+-]?[0-9]+)?/
        }
      ],
      ["ai", /^(?:0|[1-9][0-9]*)(?:[eE][+-]?[0-9]+)?/]
    ],
    isCompress: 1
  });
  var parser = {
    productions: [
      ["aj", ["ak"]],
      ["ak", ["al"], undefined, "single-exp"],
      ["am", ["e", "an", 1, "am"]],
      ["am", ["f", "an", 1, "am"]],
      ["am", ["g", "an", 1, "am"]],
      ["am", ["h", "an", 1, "am"]],
      ["am", ["i", "an", 1, "am"]],
      ["am", ["j", "an", 1, "am"]],
      ["am", []],
      ["al", ["an", 1, "am"], undefined, "single-exp"],
      ["ao", ["k", "ap", 1, "ao"]],
      ["ao", ["l", "ap", 1, "ao"]],
      ["ao", []],
      ["an", ["ap", 1, "ao"], undefined, "single-exp"],
      ["aq", ["m", "ar", 1, "aq"]],
      ["aq", ["n", "ar", 1, "aq"]],
      ["aq", []],
      ["ap", ["ar", 1, "aq"], undefined, "single-exp"],
      ["as", ["o", "at", 1, "as"]],
      ["as", []],
      ["ar", ["at", 1, "as"], undefined, "single-exp"],
      ["au", ["p", "av", 1, "au"]],
      ["au", []],
      ["at", ["av", 1, "au"], undefined, "single-exp"],
      ["aw", ["q", 1, "aw"]],
      ["aw", []],
      ["av", ["ax", 1, "aw"], undefined, "single-exp"],
      ["ax", ["l", "ax"], undefined, "single-exp"],
      ["ax", ["k", "ax"], undefined, "single-exp"],
      ["ax", ["ay"], undefined, "single-exp"],
      ["ay", ["a", "al", "b"], undefined, "single-exp"],
      ["ay", ["ai"], undefined, "number-exp"],
      ["ay", ["ab"], undefined, "string-exp"],
      ["ay", ["af"], undefined, "string-exp"],
      ["ay", ["ad"], undefined, "error-exp"],
      ["ay", ["ah"], undefined, "error-exp"],
      ["ay", ["az"], undefined, "single-exp"],
      ["ay", ["ba"], undefined, "single-exp"],
      ["ay", ["bb"], undefined, "single-exp"],
      ["bc", ["ae"]],
      ["bc", ["bd"]],
      ["be", ["bc", 1, "be"]],
      ["be", ["z", "bc", 1, "be"]],
      ["be", []],
      ["az", ["bc", 1, "be"]],
      ["bf", ["ab"]],
      ["bf", ["ai"]],
      ["bf", ["af"]],
      ["bf", ["ad"]],
      ["bg", ["y", "bf", 1, "bg"]],
      ["bg", []],
      ["bh", ["bf", 1, "bg"]],
      ["bb", ["c", "bh", "r"]],
      ["ba", ["ac", "a", "bi", "b"]],
      ["bj", [], undefined, "single-exp"],
      ["bj", ["al"], undefined, "single-exp"],
      ["bk", ["aa", "bj", 1, "bk"]],
      ["bk", []],
      ["bi", ["bj", 1, "bk"]],
      ["bd", ["ag", "bl"]],
      ["bd", ["bl"]],
      ["bl", ["t"]],
      ["bl", ["v", "bm", "x"]],
      ["bn", ["u"]],
      ["bn", []],
      ["bo", ["w", "bn"]],
      ["bm", ["bo"]],
      ["bm", ["bp"]],
      ["bq", ["u"]],
      ["bq", ["t"]],
      ["br", ["s", "bq", 1, "br"]],
      ["br", []],
      ["bp", ["bq", 1, "br"]]
    ],
    productionIndexMap: {
      symbol: 0,
      rhs: 1,
      action: 2,
      label: 3
    },
    getProductionItemByType: function getProductionItemByType(p, itemType) {
      if (this.isCompress) {
        return p[this.productionIndexMap[itemType]];
      }

      return p[itemType];
    },
    getProductionSymbol: function getProductionSymbol(p) {
      return this.getProductionItemByType(p, "symbol");
    },
    getProductionRhs: function getProductionRhs(p) {
      return this.getProductionItemByType(p, "rhs");
    },
    getProductionAction: function getProductionAction(p) {
      return this.getProductionItemByType(p, "action");
    },
    getProductionLabel: function getProductionLabel(p) {
      return this.getProductionItemByType(p, "label");
    },
    isCompress: 1
  };
  parser.getProductionSymbol = parser.getProductionSymbol.bind(parser);
  parser.getProductionRhs = parser.getProductionRhs.bind(parser);
  parser.getProductionAction = parser.getProductionAction.bind(parser);
  parser.getProductionLabel = parser.getProductionLabel.bind(parser);
  parser.lexer = lexer;
  lexer.symbolMap = {
    $UNKNOWN: "$UNKNOWN",
    $HIDDEN: "$HIDDEN",
    $EOF: "$EOF",
    "(": "a",
    ")": "b",
    "{": "c",
    ":": "d",
    "=": "e",
    "<=": "f",
    ">=": "g",
    "<>": "h",
    ">": "i",
    "<": "j",
    "+": "k",
    "-": "l",
    "*": "m",
    "/": "n",
    "^": "o",
    "&": "p",
    "%": "q",
    "}": "r",
    SPECIFIER_SEPARATOR: "s",
    TABLE_ITEM_SPECIFIER: "t",
    TABLE_COLUMN_SPECIFIER: "u",
    "[": "v",
    "@": "w",
    "]": "x",
    ARRAY_SEPARATOR: "y",
    REF_SEPARATOR: "z",
    ARGUMENT_SEPARATOR: "aa",
    STRING: "ab",
    FUNCTION: "ac",
    ERROR: "ad",
    CELL: "ae",
    LOGIC: "af",
    TABLE_NAME: "ag",
    NAME: "ah",
    NUMBER: "ai",
    formula: "aj",
    expression: "ak",
    "exp=": "al",
    "exp=_": "am",
    "exp+": "an",
    "exp+_": "ao",
    "exp*": "ap",
    "exp*_": "aq",
    "exp^": "ar",
    "exp^_": "as",
    "exp&": "at",
    "exp&_": "au",
    "exp%": "av",
    "exp%_": "aw",
    "prefix-exp": "ax",
    "atom-exp": "ay",
    reference: "az",
    function: "ba",
    array: "bb",
    "reference-item": "bc",
    "structure-reference": "bd",
    reference_: "be",
    "array-element": "bf",
    "array-list_": "bg",
    "array-list": "bh",
    arguments: "bi",
    argument: "bj",
    arguments_: "bk",
    "table-specifier": "bl",
    "table-specifier-inner": "bm",
    "_table-this-row": "bn",
    "table-this-row": "bo",
    "table-column-specifier": "bp",
    "table-specifier-item": "bq",
    "table-column-specifier_": "br"
  };
  var productionSkipEndSet = new Set([
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    10,
    11,
    12,
    14,
    15,
    16,
    18,
    19,
    21,
    22,
    24,
    25,
    41,
    42,
    43,
    49,
    50,
    56,
    57,
    63,
    64,
    70,
    71
  ]);
  var productionEndFlag = 2;
  var productionReductionFlag = 1;

  var isProductionEndFlag = function isProductionEndFlag(t) {
    return t === productionEndFlag;
  };

  var isProductionReductionFlag = function isProductionReductionFlag(t) {
    return t === productionReductionFlag;
  };

  parser.table = {
    aj: {
      l: 0,
      k: 0,
      a: 0,
      ai: 0,
      ab: 0,
      af: 0,
      ad: 0,
      ah: 0,
      ae: 0,
      ag: 0,
      t: 0,
      v: 0,
      ac: 0,
      c: 0
    },
    ak: {
      l: 1,
      k: 1,
      a: 1,
      ai: 1,
      ab: 1,
      af: 1,
      ad: 1,
      ah: 1,
      ae: 1,
      ag: 1,
      t: 1,
      v: 1,
      ac: 1,
      c: 1
    },
    am: {
      e: 2,
      f: 3,
      g: 4,
      h: 5,
      i: 6,
      j: 7,
      $EOF: 8,
      b: 8,
      aa: 8
    },
    al: {
      l: 9,
      k: 9,
      a: 9,
      ai: 9,
      ab: 9,
      af: 9,
      ad: 9,
      ah: 9,
      ae: 9,
      ag: 9,
      t: 9,
      v: 9,
      ac: 9,
      c: 9
    },
    ao: {
      k: 10,
      l: 11,
      e: 12,
      f: 12,
      g: 12,
      h: 12,
      i: 12,
      j: 12,
      $EOF: 12,
      b: 12,
      aa: 12
    },
    an: {
      l: 13,
      k: 13,
      a: 13,
      ai: 13,
      ab: 13,
      af: 13,
      ad: 13,
      ah: 13,
      ae: 13,
      ag: 13,
      t: 13,
      v: 13,
      ac: 13,
      c: 13
    },
    aq: {
      m: 14,
      n: 15,
      k: 16,
      l: 16,
      e: 16,
      f: 16,
      g: 16,
      h: 16,
      i: 16,
      j: 16,
      $EOF: 16,
      b: 16,
      aa: 16
    },
    ap: {
      l: 17,
      k: 17,
      a: 17,
      ai: 17,
      ab: 17,
      af: 17,
      ad: 17,
      ah: 17,
      ae: 17,
      ag: 17,
      t: 17,
      v: 17,
      ac: 17,
      c: 17
    },
    as: {
      o: 18,
      m: 19,
      n: 19,
      k: 19,
      l: 19,
      e: 19,
      f: 19,
      g: 19,
      h: 19,
      i: 19,
      j: 19,
      $EOF: 19,
      b: 19,
      aa: 19
    },
    ar: {
      l: 20,
      k: 20,
      a: 20,
      ai: 20,
      ab: 20,
      af: 20,
      ad: 20,
      ah: 20,
      ae: 20,
      ag: 20,
      t: 20,
      v: 20,
      ac: 20,
      c: 20
    },
    au: {
      p: 21,
      o: 22,
      m: 22,
      n: 22,
      k: 22,
      l: 22,
      e: 22,
      f: 22,
      g: 22,
      h: 22,
      i: 22,
      j: 22,
      $EOF: 22,
      b: 22,
      aa: 22
    },
    at: {
      l: 23,
      k: 23,
      a: 23,
      ai: 23,
      ab: 23,
      af: 23,
      ad: 23,
      ah: 23,
      ae: 23,
      ag: 23,
      t: 23,
      v: 23,
      ac: 23,
      c: 23
    },
    aw: {
      q: 24,
      p: 25,
      o: 25,
      m: 25,
      n: 25,
      k: 25,
      l: 25,
      e: 25,
      f: 25,
      g: 25,
      h: 25,
      i: 25,
      j: 25,
      $EOF: 25,
      b: 25,
      aa: 25
    },
    av: {
      l: 26,
      k: 26,
      a: 26,
      ai: 26,
      ab: 26,
      af: 26,
      ad: 26,
      ah: 26,
      ae: 26,
      ag: 26,
      t: 26,
      v: 26,
      ac: 26,
      c: 26
    },
    ax: {
      l: 27,
      k: 28,
      a: 29,
      ai: 29,
      ab: 29,
      af: 29,
      ad: 29,
      ah: 29,
      ae: 29,
      ag: 29,
      t: 29,
      v: 29,
      ac: 29,
      c: 29
    },
    ay: {
      a: 30,
      ai: 31,
      ab: 32,
      af: 33,
      ad: 34,
      ah: 35,
      ae: 36,
      ag: 36,
      t: 36,
      v: 36,
      ac: 37,
      c: 38
    },
    bc: {
      ae: 39,
      ag: 40,
      t: 40,
      v: 40
    },
    be: {
      ae: 41,
      ag: 41,
      t: 41,
      v: 41,
      z: 42,
      q: 43,
      p: 43,
      o: 43,
      m: 43,
      n: 43,
      k: 43,
      l: 43,
      e: 43,
      f: 43,
      g: 43,
      h: 43,
      i: 43,
      j: 43,
      $EOF: 43,
      b: 43,
      aa: 43
    },
    az: {
      ae: 44,
      ag: 44,
      t: 44,
      v: 44
    },
    bf: {
      ab: 45,
      ai: 46,
      af: 47,
      ad: 48
    },
    bg: {
      y: 49,
      r: 50
    },
    bh: {
      ab: 51,
      ai: 51,
      af: 51,
      ad: 51
    },
    bb: {
      c: 52
    },
    ba: {
      ac: 53
    },
    bj: {
      aa: 54,
      b: 54,
      l: 55,
      k: 55,
      a: 55,
      ai: 55,
      ab: 55,
      af: 55,
      ad: 55,
      ah: 55,
      ae: 55,
      ag: 55,
      t: 55,
      v: 55,
      ac: 55,
      c: 55
    },
    bk: {
      aa: 56,
      b: 57
    },
    bi: {
      l: 58,
      k: 58,
      a: 58,
      ai: 58,
      ab: 58,
      af: 58,
      ad: 58,
      ah: 58,
      ae: 58,
      ag: 58,
      t: 58,
      v: 58,
      ac: 58,
      c: 58,
      aa: 58,
      b: 58
    },
    bd: {
      ag: 59,
      t: 60,
      v: 60
    },
    bl: {
      t: 61,
      v: 62
    },
    bn: {
      u: 63,
      x: 64
    },
    bo: {
      w: 65
    },
    bm: {
      w: 66,
      u: 67,
      t: 67
    },
    bq: {
      u: 68,
      t: 69
    },
    br: {
      s: 70,
      x: 71
    },
    bp: {
      u: 72,
      t: 72
    }
  };

  parser.parse = function parse(input, options) {
    var tokens = [];
    var recoveryTokens = [];
    var terminalNodes = [];

    var AstNode = /*#__PURE__*/ (function() {
      function AstNode(cfg) {
        Object.assign(this, cfg);

        if (cfg.children) {
          this.setChildren(cfg.children);
        }
      }

      var _proto = AstNode.prototype;

      _proto.addChild = function addChild(c) {
        this.addChildren([c]);
      };

      _proto.addChildren = function addChildren(cs) {
        var _this$children;

        (_this$children = this.children).push.apply(_this$children, cs);

        this.setChildren(this.children);
      };

      _proto.setChildren = function setChildren(cs) {
        if (!cs.length) {
          this.children = [];
          return;
        }

        var first = cs[0];
        var last = cs[cs.length - 1];
        this.start = first.start;
        this.end = last.end;
        this.firstLine = first.firstLine;
        this.lastLine = last.lastLine;
        this.firstColumn = first.firstColumn;
        this.lastColumn = last.lastColumn;
        this.children = cs;

        for (
          var _iterator = _createForOfIteratorHelperLoose(cs), _step;
          !(_step = _iterator()).done;

        ) {
          var c = _step.value;
          c.parent = this;
        }
      };

      _proto.toJSON = function toJSON() {
        var ret = {};

        for (
          var _i2 = 0, _Object$keys = Object.keys(this);
          _i2 < _Object$keys.length;
          _i2++
        ) {
          var k = _Object$keys[_i2];

          if (k !== "parent" && k !== "t") {
            ret[k] = this[k];
          }
        }

        return ret;
      };

      return AstNode;
    })();

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
    var error;
    var _options = options,
      onErrorRecovery = _options.onErrorRecovery,
      _options$onAction = _options.onAction,
      onAction = _options$onAction === void 0 ? noop : _options$onAction,
      lexerEnv = _options.lexerEnv;
    var lexer = this.lexer,
      table = this.table,
      productions = this.productions,
      getProductionSymbol = this.getProductionSymbol,
      getProductionRhs = this.getProductionRhs,
      getProductionLabel = this.getProductionLabel;
    lexer.env = lexerEnv;
    var symbolStack = [getProductionSymbol(productions[0])];
    var astStack = [
      new AstNode({
        children: []
      })
    ];
    lexer.resetInput(input);
    var token;
    var next;
    var currentToken;

    function getError() {
      var expected = getExpected();
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
      if (ast.token || ast.error) {
        return ast;
      }

      if (ast.children) {
        var children = [];

        for (
          var _iterator2 = _createForOfIteratorHelperLoose(ast.children),
            _step2;
          !(_step2 = _iterator2()).done;

        ) {
          var c = _step2.value;

          if (cleanAst(c)) {
            children.push(c);
          }
        }

        ast.setChildren(children);
      }

      if (!ast.children || !ast.children.length) {
        return null;
      }

      if (ast.children.length === 1) {
        var child = ast.children[0];

        if (
          (ast.label && child.label && ast.label === child.label) ||
          (!ast.label && !child.label && ast.symbol === child.symbol)
        ) {
          ast.setChildren(child.children);
          ast.symbol = child.symbol;
        }
      }

      return ast;
    }

    function getAst(raw) {
      var ast = astStack[0] && astStack[0].children && astStack[0].children[0];

      if (ast) {
        astStack[0].children.forEach(function(a) {
          return delete a.parent;
        });
      }

      if (raw) {
        return ast;
      }

      return ast && cleanAst(ast);
    }

    var topSymbol;
    var errorNode;
    var lastSymbol;

    function popSymbolStack() {
      var last = symbolStack.pop();

      if (typeof last === "string") {
        lastSymbol = last;
      }
    }

    function getExpected() {
      var s = topSymbol || lastSymbol;
      var ret = (table[s] && Object.keys(table[s])) || [];
      return ret.map(function(r) {
        return lexer.mapReverseSymbol(r);
      });
    }

    function closeAstWhenError() {
      errorNode = new AstNode(
        _extends(
          {
            error: error
          },
          error.lexer
        )
      );
      peekStack(astStack).addChild(errorNode);

      while (astStack.length !== 1) {
        var _ast = astStack.pop();

        if (_ast.symbol && isExtraSymbol(_ast)) {
          var topAst = peekStack(astStack);
          topAst.children.pop();
          topAst.addChildren(_ast.children);
        }
      }
    }

    var production;

    while (1) {
      topSymbol = peekStack(symbolStack);

      if (!topSymbol) {
        break;
      }

      while (
        isProductionEndFlag(topSymbol) ||
        isProductionReductionFlag(topSymbol)
      ) {
        var _ast2 = astStack.pop();

        if (isProductionReductionFlag(topSymbol)) {
          var stackTop = peekStack(astStack);
          var wrap = new AstNode({
            symbol: _ast2.symbol,
            children: [_ast2],
            label: _ast2.label
          });
          stackTop.children.pop();
          stackTop.addChild(wrap);
          astStack.push(wrap);
        }

        popSymbolStack();
        topSymbol = peekStack(symbolStack);

        if (!topSymbol) {
          break;
        }
      }

      if (typeof topSymbol === "string") {
        if (!token) {
          token = lexer.lex();
          tokens.push(token);
          recoveryTokens.push(token);
        }

        currentToken = token;

        if (topSymbol === token.t) {
          symbolStack.pop();
          var terminalNode = new AstNode(token);
          terminalNodes.push(terminalNode);
          var parent = peekStack(astStack);
          parent.addChild(terminalNode);
          token = null;
        } else if ((next = getTableVal(topSymbol, token.t)) !== undefined) {
          popSymbolStack();
          production = productions[next];

          if (productionSkipEndSet.has(next)) {
            symbolStack.push.apply(
              symbolStack,
              getProductionRhs(production)
                .concat()
                .reverse()
            );
          } else {
            var newAst = new AstNode({
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
            var recommendedAction = {};
            var nextToken = lexer.peek(); // should delete

            if (
              topSymbol === nextToken.t ||
              getTableVal(topSymbol, nextToken.t) !== undefined
            ) {
              recommendedAction.action = "del";
            } else if (error.expected.length) {
              recommendedAction.action = "add";
            }

            var _errorNode = new AstNode(
              _extends(
                {
                  error: error
                },
                error.lexer
              )
            );

            peekStack(astStack).addChild(_errorNode);
            var recovery =
              onErrorRecovery(
                {
                  errorNode: _errorNode,
                  ast: getAst(true)
                },
                recommendedAction
              ) || {};
            var action = recovery.action;
            peekStack(astStack).children.pop();

            if (!action) {
              closeAstWhenError();
              break;
            }

            if (action === "del") {
              error.recovery = true;
              recoveryTokens.pop();
              token = null;
            } else if (action === "add") {
              error.recovery = true;
              token = _extends({}, token, {
                token: recovery.token,
                text: recovery.text,
                t: lexer.mapSymbol(recovery.token)
              });
              recoveryTokens.push(token);
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
        popSymbolStack();
        topSymbol = peekStack(symbolStack);
      }

      if (!symbolStack.length) {
        break;
      }
    }

    if (!error && currentToken.t !== lexer.mapEndSymbol()) {
      error = {
        errorMessage: getError(),
        expected: getExpected(),
        symbol: lexer.mapReverseSymbol(topSymbol || lastSymbol),
        lexer: currentToken
      };
      closeAstWhenError();
    }

    var ast = getAst();
    return {
      ast: ast,
      tokens: tokens,
      recoveryTokens: recoveryTokens,
      errorNode: errorNode,
      error: error,
      terminalNodes: terminalNodes
    };
  };

  return parser;
})();

if (typeof module !== "undefined") {
  module.exports = index;
}
