/*
Generated By kison v0.4.24

Generate time: Mon Sep 13 2021 15:50:15 GMT+0800 (中国标准时间)
*/
var $parser = (function(undefined) {
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
  var Lexer = function(cfg) {
    if (Lexer.supportSticky === undefined) {
      try {
        Lexer.supportSticky = typeof /(?:)/.sticky == "boolean";
      } catch (e) {
        Lexer.supportSticky = false;
      }
    }

    const ruleIndexMap = (this.ruleIndexMap = {
      token: 0,
      regexp: 1,
      action: 2,
      filter: 3,
      state: 4
    });

    this.rules = [];
    this.defaultEnv = undefined;
    mix(this, cfg);
    this.rules = this.rules.concat();
    this.transformRules();
    this.userData = {};
    const errorRule = (this.errorRule = {
      regexp: this.matchAny,
      token: Lexer.STATIC.UNKNOWN_TOKEN
    });
    const errorRuleCompress = (this.errorRuleCompress = []);
    errorRuleCompress[ruleIndexMap.token] = errorRule.token;
    errorRuleCompress[ruleIndexMap.regexp] = errorRule.regexp;
    this.resetInput(this.input);
    this.options = {};
  };
  Lexer.prototype = {
    transformRegExp: function(obj, p, disableSticky) {
      const pattern = obj[p];
      if (pattern.test) {
        let source = pattern.source;
        if (source.startsWith("^")) {
          source = source.slice(1);
        }
        var flags = Lexer.supportSticky && !disableSticky ? "gy" : "g";
        if (pattern.multiline) flags += "m";
        if (pattern.ignoreCase) flags += "i";
        if (pattern.unicode) flags += "u";
        obj[p] = new RegExp(source, flags);
      } else if (typeof pattern === "object") {
        for (const k of Object.keys(pattern)) {
          this.transformRegExp(pattern, k);
        }
      }
    },
    transformRules: function() {
      if (Lexer.supportSticky) {
        const regIndex = this.isCompress ? this.ruleIndexMap.regexp : "regexp";
        for (const r of this.rules) {
          this.transformRegExp(r, regIndex);
        }
      }
    },
    matchAny: function() {
      return this.end < this.input.length ? this.input.charAt(this.end) : false;
    },
    resetInput: function(input) {
      this.tokensQueue = [];
      this.tokens = [];
      this.userData = {};
      this.input = input;
      this.matched = "";
      this.stateStack = [Lexer.STATIC.INITIAL_STATE];
      this.match = "";
      this.text = "";
      this.firstLine = 1;
      this.lineNumber = 1;
      this.lastLine = 1;
      this.start = 0;
      this.end = 0;
      this.firstColumn = 1;
      this.lastColumn = 1;
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
    peekState: function(n) {
      n = n || 1;
      return this.mapReverseState(this.stateStack[this.stateStack.length - n]);
    },
    pushState: function(state) {
      this.stateStack.push(this.mapState(state));
    },
    popState: function(num) {
      num = num || 1;
      var ret;
      while (num--) {
        ret = this.stateStack.pop();
      }
      return ret && this.mapReverseState(ret);
    },
    showDebugInfo: function() {
      var { DEBUG_CONTEXT_LIMIT } = Lexer.STATIC;
      var { matched, match, input } = this;

      matched = matched.slice(0, matched.length - match.length);
      var past =
          (matched.length > DEBUG_CONTEXT_LIMIT ? "..." : "") +
          matched
            .slice(0 - DEBUG_CONTEXT_LIMIT)
            .split("\n")
            .join(" "),
        next = match + input.slice(this.end);
      //#JSCOVERAGE_ENDIF
      next =
        next
          .slice(0, DEBUG_CONTEXT_LIMIT)
          .split("\n")
          .join(" ") + (next.length > DEBUG_CONTEXT_LIMIT ? "..." : "");
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
    mapState: function(s) {
      var { stateMap } = this;
      if (!stateMap) {
        return s;
      }
      return stateMap[s] || (stateMap[s] = this.genShortId("state"));
    },
    mapReverseState: function(rs) {
      var { stateMap, reverseStateMap } = this;
      if (!reverseStateMap && stateMap) {
        reverseStateMap = this.reverseStateMap = {};
        for (var i in stateMap) {
          reverseStateMap[stateMap[i]] = i;
        }
      }
      if (reverseStateMap) {
        return reverseStateMap[rs] || rs;
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
    peek: function() {
      const token = this._lex(true);
      this.tokensQueue.push(token);
      if (token.token === Lexer.STATIC.HIDDEN_TOKEN) {
        return this.peek();
      }
      return token;
    },
    matchRegExp: function(regexp) {
      if (regexp.test) {
        regexp.lastIndex = this.end;
        const ret = regexp.exec(this.input);
        if (ret && ret.index !== this.end) {
          return null;
        }
        return ret;
      }
      return regexp.call(this, this);
    },
    lex: function() {
      const token = this._lex();
      this.tokens.push(token);
      if (token.token === Lexer.STATIC.HIDDEN_TOKEN) {
        return this.lex();
      }
      return token;
    },
    nextChar: function(index = 0) {
      return this.getChar(this.end + index);
    },
    nextCharCode: function(index = 0) {
      return this.getCharCode(this.end + index);
    },
    nextStartsWith: function(search) {
      let { input, end } = this;
      const l = search.length;
      for (let i = 0; i < l; i++) {
        if (input.charAt(end++) !== search.charAt(i)) {
          return false;
        }
      }
      return true;
    },
    nextCharAt: function(index) {
      return this.input.charAt(this.end + index);
    },
    nextLength: function() {
      return this.input.length - this.end;
    },
    getChar: function(index = 0) {
      if (this.options.unicode) {
        const code = this.input.codePointAt(index);
        if (code === undefined || isNaN(code)) {
          return "";
        }
        return String.fromCodePoint(code);
      }
      return this.input.charAt(index);
    },
    getCharCode: function(index = 0) {
      if (this.options.unicode) {
        return this.input.codePointAt(index);
      }
      return this.input.charCodeAt(index);
    },
    _lex: function(skipQueue) {
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

      if (this.end >= input.length) {
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
  Lexer.STATIC = {
    INITIAL_STATE: "I",
    DEBUG_CONTEXT_LIMIT: 20,
    EOF_TOKEN: "$EOF",
    UNKNOWN_TOKEN: "$UNKNOWN",
    HIDDEN_TOKEN: "$HIDDEN"
  };
  var lexer = new Lexer({
    rules: [
      ["$HIDDEN", /\s+/g],
      ["NUMBER", /[0-9]+(\.[0-9]+)?\b/g],
      ["+", /\+/g],
      ["-", /-/g],
      ["(", /\(/g],
      [")", /\)/g],
      ["*", /\*/g],
      ["/", /\//g],
      ["^", /\^/g],
      ["ERROR_LA", /./g]
    ],
    isCompress: 1,
    defaultEnv: undefined
  });
  lexer.stateMap = {
    I: "I"
  };
  function lex(input, options = {}) {
    lexer.options = options;
    lexer.resetInput(input);
    while (lexer.lex().token !== Lexer.STATIC.EOF_TOKEN);
    return {
      tokens: lexer.tokens
    };
  }
  var parser = {
    productions: [
      ["exp", ["add"]],
      [
        "(add)1_",
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
          "(add)1_"
        ]
      ],
      [
        "(add)1_",
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
          "(add)1_"
        ]
      ],
      ["(add)1_", []],
      ["add", ["mul", 1, "(add)1_"], undefined, "exp"],
      [
        "(mul)1_",
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
          "(mul)1_"
        ]
      ],
      [
        "(mul)1_",
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
          "(mul)1_"
        ]
      ],
      ["(mul)1_", []],
      ["mul", ["expo", 1, "(mul)1_"], undefined, "exp"],
      [
        "_1(expo)",
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
      ["_1(expo)", []],
      ["expo", ["atom", "_1(expo)"], undefined, "exp"],
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
  parser.lex = lex;
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
    "(add)1_": {
      "+": 1,
      "-": 2,
      $EOF: 3,
      ")": 3
    },
    add: {
      NUMBER: 4,
      "(": 4
    },
    "(mul)1_": {
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
    "_1(expo)": {
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

  parser.parse = function parse(input, options) {
    const recoveryTokens = [];
    const terminalNodes = [];

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
    var {
      onErrorRecovery,
      onAction = noop,
      lexerOptions = {},
      transformNode
    } = options;

    function checkSymbolLabel(node, parent) {
      if (node.label || parent.label) {
        if (node.label === parent.label) {
          return node.children;
        } else {
          return node;
        }
      }
      if (node.symbol === parent.symbol) {
        return node.children;
      }
      return node;
    }

    function defaultTransformNode({ node, parent }) {
      if (node.token || node.error) {
        return node;
      }
      if (node.children?.length > 1) {
        if (parent.children.length === 1 && node.symbol === parent.symbol) {
          return node.children;
        }
        return node;
      }
      return checkSymbolLabel(node, parent);
    }

    if (transformNode !== false && !transformNode) {
      transformNode = defaultTransformNode;
    }

    var {
      lexer,
      table,
      productions,
      getProductionSymbol,
      getProductionRhs,
      getProductionLabel
    } = parser;

    lexer.options = lexerOptions;

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
      const tips = [];
      if (expected.length) {
        tips.push("'" + expected.join("', '") + "' expected.");
      }
      if (currentToken) {
        tips.push("current token: '" + currentToken.token + "'.");
      }
      const tip = tips.join("\n");
      return {
        errorMessage: [
          "syntax error at line " +
            lexer.lineNumber +
            ":\n" +
            lexer.showDebugInfo(),
          ...tips
        ].join("\n"),
        tip
      };
    }

    function cleanAst(ast) {
      if (!transformNode) {
        return ast;
      }
      if (ast.children) {
        let children;

        while (true) {
          let changed = false;
          let index = 0;
          children = [];
          for (const c of ast.children) {
            const node = transformNode({
              node: c,
              index,
              parent: ast,
              defaultTransformNode
            });
            if (Array.isArray(node)) {
              children.push(...node);
            } else if (node) {
              children.push(node);
            }
            changed = changed || node !== c;
            index++;
          }
          ast.setChildren(children);
          if (!changed) {
            break;
          }
        }

        for (const c of children) {
          cleanAst(c);
        }
      }
      return ast;
    }

    function getAst(raw) {
      const ast =
        astStack[0] && astStack[0].children && astStack[0].children[0];
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
            recovery: false,
            ...getError(),
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
                  parseTree: getAst(true)
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
        ...getError(),
        expected: getExpected(),
        symbol: lexer.mapReverseSymbol(topSymbol || lastSymbol),
        lexer: currentToken
      };
      closeAstWhenError();
    }

    const ast = getAst();

    return {
      ast,
      tokens: lexer.tokens,
      recoveryTokens,
      errorNode,
      error,
      terminalNodes
    };
  };
  return parser;
})();

export default $parser;
