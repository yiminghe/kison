
/*
Generated By kison v0.4.5

Generate time: Thu Jul 01 2021 18:30:13 GMT+0800 (中国标准时间)
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
    ["exp", ["add"]],
    [
      "add_",
      [
        "+",
        function(astProcessor, lexer) {
          astProcessor.pushStack(lexer.text);
        },
        "mul",
        function(astProcessor) {
          astProcessor.createOpNode();
        },
        1,
        "add_"
      ]
    ],
    [
      "add_",
      [
        "-",
        function(astProcessor, lexer) {
          astProcessor.pushStack(lexer.text);
        },
        "mul",
        function(astProcessor) {
          astProcessor.createOpNode();
        },
        1,
        "add_"
      ]
    ],
    ["add_", []],
    ["add", ["mul", 1, "add_"], undefined, "single-exp"],
    [
      "mul_",
      [
        "*",
        function(astProcessor, lexer) {
          astProcessor.pushStack(lexer.text);
        },
        "expo",
        function(astProcessor) {
          astProcessor.createOpNode();
        },
        1,
        "mul_"
      ]
    ],
    [
      "mul_",
      [
        "/",
        function(astProcessor, lexer) {
          astProcessor.pushStack(lexer.text);
        },
        "expo",
        function(astProcessor) {
          astProcessor.createOpNode();
        },
        1,
        "mul_"
      ]
    ],
    ["mul_", []],
    ["mul", ["expo", 1, "mul_"], undefined, "single-exp"],
    [
      "_expo",
      [
        "^",
        function(astProcessor, lexer) {
          astProcessor.pushStack(lexer.text);
        },
        "expo",
        function(astProcessor) {
          astProcessor.createOpNode();
        }
      ]
    ],
    ["_expo", []],
    ["expo", ["atom", "_expo"], undefined, "single-exp"],
    [
      "atom",
      [
        "NUMBER",
        function(astProcessor, lexer) {
          astProcessor.pushStack(Number(lexer.text));
        }
      ]
    ],
    ["atom", ["(", "add", ")"]]
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
const productionSkipEndSet = new Set([1, 2, 3, 5, 6, 7, 9, 10]);
const productionEndFlag = 2;
const productionReductionFlag = 1;
const isProductionEndFlag = function(t) {
  return t === productionEndFlag;
};
const isProductionReductionFlag = function(t) {
  return t === productionReductionFlag;
};
parser.table = {
  exp: {
    NUMBER: 0,
    "(": 0
  },
  add_: {
    "+": 1,
    "-": 2,
    $EOF: 3,
    ")": 3
  },
  add: {
    NUMBER: 4,
    "(": 4
  },
  mul_: {
    "*": 5,
    "/": 6,
    "+": 7,
    "-": 7,
    $EOF: 7,
    ")": 7
  },
  mul: {
    NUMBER: 8,
    "(": 8
  },
  _expo: {
    "^": 9,
    "*": 10,
    "/": 10,
    "+": 10,
    "-": 10,
    $EOF: 10,
    ")": 10
  },
  expo: {
    NUMBER: 11,
    "(": 11
  },
  atom: {
    NUMBER: 12,
    "(": 13
  }
};
parser.parse = function parse(input, options) {
  const tokens = [];
  const recoveryTokens = [];
  const terminalNodes = [];

  class AstNode {
    constructor(cfg) {
      Object.assign(this, cfg);
      if (cfg.children) {
        this.setChildren(cfg.children);
      }
    }

    addChild(c) {
      this.addChildren([c]);
    }

    addChildren(cs) {
      this.children.push(...cs);
      this.setChildren(this.children);
    }

    setChildren(cs) {
      if (!cs.length) {
        this.children = [];
        return;
      }
      const first = cs[0];
      const last = cs[cs.length - 1];
      this.start = first.start;
      this.end = last.end;
      this.firstLine = first.firstLine;
      this.lastLine = last.lastLine;
      this.firstColumn = first.firstColumn;
      this.lastColumn = last.lastColumn;
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
  } = this;

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
    if (ast.token || ast.error) {
      return ast;
    }
    if (ast.children) {
      let children = [];
      for (const c of ast.children) {
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
      const child = ast.children[0];
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
    const ast = astStack[0] && astStack[0].children && astStack[0].children[0];
    if (ast) {
      astStack[0].children.forEach(a => delete a.parent);
    }
    if (raw) {
      return ast;
    }
    return ast && cleanAst(ast);
  }

  let topSymbol;

  let errorNode;

  let lastSymbol;

  function popSymbolStack() {
    const last = symbolStack.pop();
    if (typeof last === "string") {
      lastSymbol = last;
    }
  }

  function getExpected() {
    const s = topSymbol || lastSymbol;
    const ret = (table[s] && Object.keys(table[s])) || [];
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
      let ast = astStack.pop();
      if (isProductionReductionFlag(topSymbol)) {
        const stackTop = peekStack(astStack);
        const wrap = new AstNode({
          symbol: ast.symbol,
          children: [ast],
          label: ast.label
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
        const terminalNode = new AstNode(token);
        terminalNodes.push(terminalNode);
        const parent = peekStack(astStack);
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

          const errorNode = new AstNode({
            error,
            ...error.lexer
          });

          peekStack(astStack).addChild(errorNode);

          const recovery =
            onErrorRecovery(
              {
                errorNode,
                ast: getAst(true)
              },
              recommendedAction
            ) || {};
          const { action } = recovery;

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
            token = {
              ...token,
              token: recovery.token,
              text: recovery.text,
              t: lexer.mapSymbol(recovery.token)
            };
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

  const ast = getAst();

  return {
    ast,
    tokens,
    recoveryTokens,
    errorNode,
    error,
    terminalNodes
  };
};

  return parser;
  })();

    export default cal;
