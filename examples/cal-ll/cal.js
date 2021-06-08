/*
    Generated by kison.
  */
var cal = (function(undefined) {
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
    getCurrentRules: function() {
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
      //#JSCOVERAGE_IF
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
    lex: function() {
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
  Lexer.STATIC = {
    INITIAL: "I",
    DEBUG_CONTEXT_LIMIT: 20,
    END_TAG: "$EOF"
  };
  var lexer = new Lexer({
    rules: [
      {
        regexp: /^\s+/
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
    ["Exp", ["Exp+"]],
    ["Exp+", ["Exp*", "Exp+_"]],
    ["Exp+_", []],
    [
      "Exp+_",
      [
        "+",
        function(astProcessor, lexer) {
          astProcessor.pushStack(lexer.text);
        },
        "Exp*",
        function(astProcessor) {
          astProcessor.createOpNode();
        },
        "Exp+_"
      ]
    ],
    [
      "Exp+_",
      [
        "-",
        function(astProcessor, lexer) {
          astProcessor.pushStack(lexer.text);
        },
        "Exp*",
        function(astProcessor) {
          astProcessor.createOpNode();
        },
        "Exp+_"
      ]
    ],
    ["Exp*", ["Exp^", "Exp*_"]],
    ["Exp*_", []],
    [
      "Exp*_",
      [
        "*",
        function(astProcessor, lexer) {
          astProcessor.pushStack(lexer.text);
        },
        "Exp^",
        function(astProcessor) {
          astProcessor.createOpNode();
        },
        "Exp*_"
      ]
    ],
    [
      "Exp*_",
      [
        "/",
        function(astProcessor, lexer) {
          astProcessor.pushStack(lexer.text);
        },
        "Exp^",
        function(astProcessor) {
          astProcessor.createOpNode();
        },
        "Exp*_"
      ]
    ],
    [
      "Exp^_",
      [
        "^",
        function(astProcessor, lexer) {
          astProcessor.pushStack(lexer.text);
        },
        "Exp^",
        function(astProcessor) {
          astProcessor.createOpNode();
        }
      ]
    ],
    ["Exp^_", []],
    ["Exp^", ["Exp$", "Exp^_"]],
    [
      "Exp$",
      [
        "NUMBER",
        function(astProcessor, lexer) {
          astProcessor.pushStack(Number(lexer.text));
        }
      ]
    ],
    ["Exp$", ["(", "Exp+", ")"]]
  ];
  parser.table = {
    Exp: {
      NUMBER: [0],
      "(": [0]
    },
    "Exp+": {
      NUMBER: [1],
      "(": [1]
    },
    "Exp+_": {
      $EOF: [2],
      ")": [2],
      "+": [3],
      "-": [4]
    },
    "Exp*": {
      NUMBER: [5],
      "(": [5]
    },
    "Exp*_": {
      "+": [6],
      "-": [6],
      $EOF: [6],
      ")": [6],
      "*": [7],
      "/": [8]
    },
    "Exp^_": {
      "^": [9],
      "*": [10],
      "/": [10],
      "+": [10],
      "-": [10],
      $EOF: [10],
      ")": [10]
    },
    "Exp^": {
      NUMBER: [11],
      "(": [11]
    },
    Exp$: {
      NUMBER: [12],
      "(": [13]
    }
  };
  parser.parse = function parse(input, options) {
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

      toJSON() {
        const ret = {};
        for (const k of Object.keys(this)) {
          if (k !== "parent") {
            ret[k] = this[k];
          }
        }
        return ret;
      }
    }

    function isExtraSymbol(ast) {
      return ast.children && !ast.children.length;
      // const { children } = ast;
      // if (children.length <= 1) {
      //   return true;
      // }
      // // endsWith _ is extra symbol: add_
      // const s = ast.symbol;
      // const o = lexer.mapReverseSymbol(s);
      // if (o.charAt(o.length - 1) === '_') {
      //   return true;
      // }
      // compress level
      return false;
    }

    const endToken = "kison-end-" + Date.now();

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

    function getOriginalSymbol(s) {
      return lexer.mapReverseSymbol(s);
    }

    options = options || {};
    let error;
    var { onErrorRecovery, onAction = noop } = options;
    var self = this;
    var {
      lexer,
      operatorPriorityMap,
      rightOperatorMap,
      table,
      productions
    } = self;
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

    // const operatorPriorityStack = [-Infinity];

    // function lastOperatorPriority(n) {
    //   n = n || 1;
    //   return operatorPriorityStack[operatorPriorityStack.length - n];
    // }

    let production;

    while (1) {
      topSymbol = peekStack(symbolStack);

      while (topSymbol === endToken) {
        const ast = astStack.pop();
        if (ast.symbol && isExtraSymbol(ast)) {
          const topAst = peekStack(astStack);
          topAst.children.pop();
          topAst.children.push(...ast.children);
        }
        symbolStack.pop();
        topSymbol = peekStack(symbolStack);
      }

      if (typeof topSymbol === "string") {
        currentToken = token = token || lexer.lex();

        // const currentPriority = operatorPriorityMap && operatorPriorityMap[token];
        // if (currentPriority) {
        //   operatorPriorityStack.push(currentPriority);
        // }

        if (topSymbol === token) {
          symbolStack.pop();
          peekStack(astStack).addChild(new AstNode(lexer.toJSON()));
          token = null;
        } else if ((next = getTableVal(topSymbol, token)) !== undefined) {
          let n = next[0];
          // if (next.length > 1) {
          //   if (currentPriority) {
          //     const reduceIndex = next[1];
          //     const shiftIndex = next[0];
          //     const lastPriority = lastOperatorPriority(2);
          //     if (currentPriority < lastPriority || (lastPriority === currentPriority && !rightOperatorMap[token])) {
          //       n = reduceIndex;
          //     } else {
          //       n = shiftIndex;
          //     }
          //   } else {
          //     const e = [`Conflict ${lexer.mapReverseSymbol(symbol)} : ${lexer.mapReverseSymbol(f)} ->`];
          //     for (const index of next) {
          //       e.push(productions[index].toString(undefined, lexer));
          //     }
          //     throw new Error(e.join('\n'));
          //   }
          // }
          const newAst = new AstNode({
            symbol: getOriginalSymbol(topSymbol),
            children: []
          });
          peekStack(astStack).addChild(newAst);
          astStack.push(newAst);
          symbolStack.pop();
          production = productions[n];
          symbolStack.push.apply(
            symbolStack,
            getProductionRhs(production)
              .concat(endToken)
              .reverse()
          );
        } else {
          if (token === lexer.mapEndSymbol()) {
            error = {
              lexer,
              errorMessage: getError(),
              expected: getExpected(),
              symbol: lexer.mapReverseSymbol(topSymbol),
              token: null
            };
            if (onErrorRecovery) {
              onErrorRecovery(error);
            } else {
              closeAstWhenError();
            }
            break;
          } else {
            error = {
              lexer,
              errorMessage: getError(),
              expected: getExpected(),
              symbol: lexer.mapReverseSymbol(topSymbol),
              token
            };
            if (onErrorRecovery) {
              const recovery = onErrorRecovery(error) || {};
              const { action } = recovery;
              if (!action || action === "del") {
                lexer.matched = lexer.matched.slice(0, -lexer.match.length);
                token = null;
              } else if (action === "add") {
                token = lexer.mapSymbol(recovery.token);
                lexer.text = recovery.content || "<?>";
                lexer.matched += lexer.text;
              }
            } else {
              closeAstWhenError();
              return {
                ast: astStack[0],
                error
              };
            }
          }
        }
      }

      topSymbol = peekStack(symbolStack);

      while (topSymbol && typeof topSymbol !== "string") {
        onAction({
          lexer,
          action: topSymbol
        });
        symbolStack.pop();
        topSymbol = peekStack(symbolStack);
      }

      if (!symbolStack.length) {
        break;
      }
    }

    if (currentToken !== lexer.mapEndSymbol()) {
      error = {
        lexer,
        errorMessage: getError(),
        symbol: null,
        token: currentToken
      };
      if (onErrorRecovery) {
        onErrorRecovery(error);
      } else if (!error) {
        closeAstWhenError();
      }
    }

    const ast = astStack[0] && astStack[0].children && astStack[0].children[0];

    if (ast) {
      delete ast.parent;
    }

    return {
      ast,
      errorNode,
      error
    };
  };

  return parser;
})();

export default cal;