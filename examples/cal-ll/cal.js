
  /*
    Generated by kison.
  */
  var cal = (function(undefined){
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
      regexp: /^[0-9]+(\.[0-9]+)?\b/,
      token: "NUMBER"
    },
    {
      regexp: /^\+/,
      token: "+"
    },
    {
      regexp: /^-/,
      token: "-"
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
      regexp: /^./,
      token: "ERROR_LA"
    }
  ]
});
parser.lexer = lexer;
parser.productions = [
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
      {
        s: 1
      },
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
      {
        s: 1
      },
      "add_"
    ]
  ],
  ["add_", []],
  [
    "add",
    [
      "mul",
      {
        s: 1
      },
      "add_"
    ],
    undefined,
    "single-exp"
  ],
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
      {
        s: 1
      },
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
      {
        s: 1
      },
      "mul_"
    ]
  ],
  ["mul_", []],
  [
    "mul",
    [
      "expo",
      {
        s: 1
      },
      "mul_"
    ],
    undefined,
    "single-exp"
  ],
  ["expo", ["atom", "_expo"], undefined, "single-exp"],
  ["_expo", []],
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
];
const productionSkipEndSet = new Set([1, 2, 3, 5, 6, 7, 10, 11]);
parser.table = {
  exp: {
    NUMBER: [0],
    "(": [0]
  },
  add_: {
    "+": [1],
    "-": [2],
    $EOF: [3],
    ")": [3]
  },
  add: {
    NUMBER: [4],
    "(": [4]
  },
  mul_: {
    "*": [5],
    "/": [6],
    "+": [7],
    "-": [7],
    $EOF: [7],
    ")": [7]
  },
  mul: {
    NUMBER: [8],
    "(": [8]
  },
  expo: {
    NUMBER: [9],
    "(": [9]
  },
  _expo: {
    "*": [10],
    "/": [10],
    "+": [10],
    "-": [10],
    $EOF: [10],
    ")": [10],
    "^": [11]
  },
  atom: {
    NUMBER: [12],
    "(": [13]
  }
};
parser.parse = function parse(input, options) {
  const productionEndToken = "kison-end-" + Date.now();

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

  let topSymbol;

  let errorNode;

  function getExpected() {
    const ret = (table[topSymbol] && Object.keys(table[topSymbol])) || [];
    return ret.map(r => lexer.mapReverseSymbol(r));
  }

  function closeAstWhenError() {
    errorNode = new AstNode({
      error
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
    topAst.children.push(...ast.children);
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
        const topChildren = stackTop.children;
        topChildren[topChildren.length - 1] = wrap;
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

          const recovery = onErrorRecovery(error, recommendedAction) || {};
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

  const ast = astStack[0] && astStack[0].children && astStack[0].children[0];

  if (ast) {
    delete ast.parent;
  }

  function cleanAst(ast) {
    if (!ast.children) {
      return ast;
    }
    if (ast.children.length === 1) {
      const child = ast.children[0];
      if (ast.label && child.label && ast.label === child.label) {
        ast.setChildren(child.children);
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

  return {
    ast: cleanAst(ast),
    // ast,
    errorNode,
    terminalNodes
  };
};

  return parser;
  })();

    export default cal;
