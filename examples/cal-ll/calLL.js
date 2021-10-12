/*
Generated By kison v0.5.5

Generate time: Tue Oct 12 2021 11:50:56 GMT+0800 (中国标准时间)
*/
var $parser = (function (undefined) {
  var AstNode = class AstNode {
    parent = null;
    symbol = undefined;
    label = undefined;
    type = undefined;

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
        if (k !== 'parent' && k !== 't') {
          ret[k] = this[k];
        }
      }
      return ret;
    }
  };
  var filterRhs = function (rhs) {
    return rhs.filter((r) => typeof r === 'string');
  };
  var isExtraAstNode = function (ast) {
    return ast.children && !ast.children.length;
  };
  var peekStack = function (stack, n) {
    n = n || 1;
    return stack[stack.length - n];
  };
  var getOriginalSymbol = function (s) {
    let uncompressed = lexer.mapReverseSymbol(s);
    return parser.prioritySymbolMap[uncompressed] || uncompressed;
  };
  var closeAstWhenError = function (error, astStack) {
    const errorNode = new AstNode({
      type: 'token',
      error,
      ...error.lexer,
    });
    peekStack(astStack).addChild(errorNode);
    while (astStack.length !== 1) {
      const ast = astStack.pop();
      if (ast.symbol && isExtraAstNode(ast)) {
        const topAst = peekStack(astStack);
        topAst.children.pop();
        topAst.addChildren(ast.children);
      }
    }
    return errorNode;
  };
  var pushRecoveryTokens = function (recoveryTokens, token) {
    const { EOF_TOKEN } = Lexer.STATIC;
    let eof;
    if (recoveryTokens[recoveryTokens.length - 1]?.token === EOF_TOKEN) {
      eof = recoveryTokens.pop();
    }
    recoveryTokens.push(token);
    if (eof && token.token !== EOF_TOKEN) {
      recoveryTokens.push(eof);
    }
  };
  var getParseError = function (getExpected) {
    const expected = getExpected();
    const tips = [];
    if (expected.length) {
      tips.push("'" + expected.join("', '") + "' expected.");
    }
    tips.push("current token: '" + lexer.getCurrentToken().token + "'.");
    const tip = tips.join('\n');
    return {
      errorMessage: [
        'syntax error at line ' +
          lexer.lineNumber +
          ':\n' +
          lexer.showDebugInfo(),
        ...tips,
      ].join('\n'),
      tip,
    };
  };
  var cleanAst = function (ast, transformNode) {
    if (!transformNode) {
      return ast;
    }
    if (ast.children) {
      let children;
      let childrenChanged;
      while (true) {
        let changed = false;
        let index = 0;
        children = [];
        for (const c of ast.children) {
          const node = transformNode({
            node: c,
            index,
            parent: ast,
            defaultTransformNode: defaultTransformAstNode,
          });
          if (Array.isArray(node)) {
            children.push(...node);
          } else if (node) {
            children.push(node);
          }
          changed = changed || node !== c;
          index++;
        }
        if (!changed) {
          break;
        } else {
          ast.setChildren(children);
          childrenChanged = true;
        }
      }
      if (childrenChanged && ast.parent) {
        cleanAst(ast.parent, transformNode);
      } else {
        for (const c of children) {
          cleanAst(c, transformNode);
        }
      }
    }
    return ast;
  };
  var getAstRootNode = function (astStack, transformNode, raw) {
    let ast = astStack[0];
    ast = ast?.children?.[0];
    ast = ast?.children?.[0];
    if (ast) {
      ast.parent = null;
    }
    if (raw) {
      return ast;
    }
    return ast && cleanAst(ast, transformNode);
  };
  var checkProductionLabelIsSame = function (node, parent) {
    if (node.label || parent.label) {
      if (node.label === parent.label) {
        return node.children;
      }
      return node;
    }
    return node.children;
  };
  var defaultTransformAstNode = function ({ node, parent }) {
    if (node.token || node.error || node.symbol !== parent.symbol) {
      return node;
    }
    if (parent.children.length === 1) {
      // do not check label
      // replace label!
      parent.label = node.label;
      return node.children;
    }
    if (node.children.length > 1) {
      return node;
    }
    // drill down to token
    if (node.children[0]?.token) {
      // do not check label
      // parent.label = node.label;
      return node.children;
    }
    return checkProductionLabelIsSame(node, parent);
  };
  var isAddAstNodeFlag = function (t) {
    return t === productionAddAstNodeFlag;
  };
  var isProductionEndFlag = function (t) {
    return t === productionEndFlag;
  };
  var isOneOrMoreSymbol = function (s) {
    return typeof s === 'string' && s.length > 1 && s.endsWith('+');
  };
  var isOptionalSymbol = function (s) {
    return typeof s === 'string' && s.length > 1 && s.endsWith('?');
  };
  var normalizeSymbol = function (s) {
    return isOptionalSymbol(s) || isZeroOrMoreSymbol(s) || isOneOrMoreSymbol(s)
      ? s.slice(0, -1)
      : s;
  };
  var isZeroOrMoreSymbol = function (s) {
    return typeof s === 'string' && s.length > 1 && s.endsWith('*');
  };
  var rootSmUnit = undefined;
  var productionSkipAstNodeSet = undefined;
  var symbolStack = [{}];
  var productionsBySymbol = {};
  var cachedStateMatchMap = undefined;
  var productionAddAstNodeFlag = 1;
  var productionEndFlag = 2;
  var Lexer = function (cfg) {
    this.nextTokens = [];
    if (Lexer.supportSticky === undefined) {
      try {
        Lexer.supportSticky = typeof /(?:)/.sticky == 'boolean';
      } catch (e) {
        Lexer.supportSticky = false;
      }
    }

    const ruleIndexMap = (this.ruleIndexMap = {
      token: 0,
      regexp: 1,
      action: 2,
      filter: 3,
      state: 4,
    });
    const STATIC = Lexer.STATIC;
    this.tokenSet = new Set([
      STATIC.EOF_TOKEN,
      STATIC.UNKNOWN_TOKEN,
      STATIC.HIDDEN_TOKEN,
    ]);
    this.rules = [];
    this.defaultEnv = undefined;
    Object.assign(this, cfg);
    this.rules = this.rules.concat();

    this.regexpIndex = this.isCompress ? this.ruleIndexMap.regexp : 'regexp';
    this.getRuleItem = this.isCompress
      ? this.getRuleItemCompress
      : this.getRuleItemNoCompress;

    this.transformRules();
    this.userData = {};
    const errorRule = (this.errorRule = {
      regexp: this.matchAny,
      token: Lexer.STATIC.UNKNOWN_TOKEN,
    });
    for (const rule of this.rules) {
      const token = this.getRuleItem(rule, 'token');
      if (token) {
        this.tokenSet.add(token);
      }
    }
    if (this.isCompress) {
      const errorRuleCompress = (this.errorRule = []);
      errorRuleCompress[ruleIndexMap.token] = errorRule.token;
      errorRuleCompress[ruleIndexMap.regexp] = errorRule.regexp;
    }
    this.resetInput(this.input);
    this.options = {};
  };
  Lexer.prototype = {
    transformRegExp: function (obj, p, disableSticky) {
      const pattern = obj[p];
      if (pattern.test) {
        let source = pattern.source;
        if (source.startsWith('^')) {
          source = source.slice(1);
        }
        var flags = Lexer.supportSticky && !disableSticky ? 'gy' : 'g';
        if (pattern.multiline) flags += 'm';
        if (pattern.ignoreCase) flags += 'i';
        if (pattern.unicode) flags += 'u';
        obj[p] = new RegExp(source, flags);
      } else if (typeof pattern === 'object') {
        for (const k of Object.keys(pattern)) {
          this.transformRegExp(pattern, k);
        }
      }
    },
    hasToken: function (t) {
      return this.tokenSet.has(t);
    },
    transformRules: function () {
      if (Lexer.supportSticky) {
        const { regexpIndex } = this;
        for (const r of this.rules) {
          this.transformRegExp(r, regexpIndex);
        }
      }
    },
    matchAny: function () {
      return this.end < this.input.length ? this.input.charAt(this.end) : false;
    },
    addRule: function (rule) {
      this.rules.push(rule);
      const token = this.getRuleItem(rule, 'token');
      if (token) {
        this.tokenSet.add(token);
      }
    },
    resetInput: function (input) {
      this.token = undefined;
      this.tokensQueue = [];
      this.nextTokens = [];
      this.tokens = [];
      this.userData = {};
      this.input = input;
      this.matched = '';
      this.stateStack = [Lexer.STATIC.INITIAL_STATE];
      this.match = '';
      this.text = '';
      this.firstLine = 1;
      this.lineNumber = 1;
      this.lastLine = 1;
      this.start = 0;
      this.end = 0;
      this.firstColumn = 1;
      this.lastColumn = 1;
    },
    getRuleItemNoCompress: function (rule, itemType) {
      return rule[itemType];
    },
    getRuleItemCompress: function (rule, itemType) {
      return rule[this.ruleIndexMap[itemType]];
    },
    getCurrentRules: function () {
      var currentState = this.stateStack[this.stateStack.length - 1],
        rules = [];
      for (const r of this.rules) {
        var filter = this.getRuleItem(r, 'filter');
        if (filter) {
          if (filter.call(this)) {
            rules.push(r);
          }
          continue;
        }
        var state = this.getRuleItem(r, 'state');
        if (!state) {
          if (currentState === Lexer.STATIC.INITIAL_STATE) {
            rules.push(r);
          }
        } else if (state.indexOf(currentState) !== -1) {
          rules.push(r);
        }
      }
      rules.push(this.errorRule);
      return rules;
    },
    peekState: function (n) {
      n = n || 1;
      return this.mapReverseState(this.stateStack[this.stateStack.length - n]);
    },
    pushState: function (state) {
      this.stateStack.push(this.mapState(state));
    },
    popState: function (num) {
      num = num || 1;
      var ret;
      while (num--) {
        ret = this.stateStack.pop();
      }
      return ret && this.mapReverseState(ret);
    },
    showDebugInfo: function () {
      var { DEBUG_CONTEXT_LIMIT } = Lexer.STATIC;
      var { matched, match, input } = this;

      matched = matched.slice(0, matched.length - match.length);
      var past =
          (matched.length > DEBUG_CONTEXT_LIMIT ? '...' : '') +
          matched
            .slice(0 - DEBUG_CONTEXT_LIMIT)
            .split('\n')
            .join(' '),
        next = match + input.slice(this.end);
      //#JSCOVERAGE_ENDIF
      next =
        next.slice(0, DEBUG_CONTEXT_LIMIT).split('\n').join(' ') +
        (next.length > DEBUG_CONTEXT_LIMIT ? '...' : '');
      return past + next + '\n' + new Array(past.length + 1).join('-') + '^';
    },
    mapSymbol: function (n) {
      return n;
    },
    mapReverseSymbol: function (n) {
      return n;
    },
    mapState: function (n) {
      return n;
    },
    mapReverseState: function (n) {
      return n;
    },
    toJSON: function () {
      const currentToken = this.getCurrentToken();
      return {
        text: currentToken.text,
        firstLine: currentToken.firstLine,
        firstColumn: currentToken.firstColumn,
        lastLine: currentToken.lastLine,
        lastColumn: currentToken.lastColumn,
        token: currentToken.token,
        start: currentToken.start,
        end: currentToken.end,
      };
    },
    stash: function () {
      this.stashIndex = this.tokens.length;
    },
    stashPop: function () {
      this.nextTokens = [
        ...this.tokens.slice(this.stashIndex),
        ...this.nextTokens,
      ];
      this.tokens.length = this.stashIndex;
    },
    matchRegExp: function (regexp) {
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
    pushToken: function (token) {
      const tokens = this.tokens;
      if (tokens[tokens.length - 1]?.token === Lexer.STATIC.EOF_TOKEN) {
        tokens.pop();
      }
      tokens.push(token);
    },
    lex: function () {
      const { EOF_TOKEN, HIDDEN_TOKEN } = Lexer.STATIC;

      const token = this.nextToken();
      const tokens = this.tokens;
      const lastToken = tokens[tokens.length - 1];
      if (
        lastToken &&
        token.token === EOF_TOKEN &&
        lastToken.token === EOF_TOKEN
      ) {
        return token;
      }
      this.tokens.push(token);
      if (token.token === HIDDEN_TOKEN || !token.token) {
        return this.lex();
      }
      return token;
    },
    getCurrentToken: function () {
      if (this.tokens[this.tokens.length - 1]) {
        return this.tokens[this.tokens.length - 1];
      }
      return this.lex();
    },
    getLastToken: function () {
      return this.tokens[this.tokens.length - 2] || this.getCurrentToken();
    },
    nextChar: function (index = 0) {
      return this.getChar(this.end + index);
    },
    nextCharCode: function (index = 0) {
      return this.getCharCode(this.end + index);
    },
    nextStartsWith: function (search) {
      let { input, end } = this;
      const l = search.length;
      for (let i = 0; i < l; i++) {
        if (input.charAt(end++) !== search.charAt(i)) {
          return false;
        }
      }
      return true;
    },
    nextCharAt: function (index) {
      return this.input.charAt(this.end + index);
    },
    nextLength: function () {
      return this.input.length - this.end;
    },
    getChar: function (index = 0) {
      if (this.options.unicode) {
        const code = this.input.codePointAt(index);
        if (code === undefined || isNaN(code)) {
          return '';
        }
        return String.fromCodePoint(code);
      }
      return this.input.charAt(index);
    },
    getCharCode: function (index = 0) {
      if (this.options.unicode) {
        return this.input.codePointAt(index);
      }
      return this.input.charCodeAt(index);
    },
    getTokensLength: function () {
      return this.tokens.length;
    },
    nextToken: function () {
      if (this.nextTokens.length) {
        return this.nextTokens.shift();
      }
      var i,
        rule,
        m,
        ret,
        lines,
        rules = this.getCurrentRules();

      var { input } = this;

      var { env = this.defaultEnv } = this.options;

      this.match = this.text = '';

      if (this.end >= input.length) {
        this.token = Lexer.STATIC.EOF_TOKEN;
        this.start = this.end;
        this.firstLine = this.lastLine;
        this.firstColumn = this.lastColumn;
        return {
          text: '',
          t: this.mapSymbol(this.token),
          token: this.token,
          start: this.start,
          end: this.end,
          firstLine: this.firstLine,
          firstColumn: this.firstColumn,
          lastLine: this.lastLine,
          lastColumn: this.lastColumn,
        };
      }

      for (i = 0; i < rules.length; i++) {
        rule = rules[i];
        var regexp = this.getRuleItem(rule, 'regexp'),
          token = this.getRuleItem(rule, 'token'),
          action = this.getRuleItem(rule, 'action');

        if (
          typeof regexp !== 'function' &&
          regexp &&
          env &&
          typeof regexp.test !== 'function'
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
          lines = m[0].split('\n');
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
              : this.lastColumn + m[0].length,
          };

          Object.assign(this, position);

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
              ...position,
            };
          } else {
            // ignore
            return this.nextToken();
          }
        }
      }
    },
  };
  Lexer.STATIC = {
    INITIAL_STATE: 'I',
    DEBUG_CONTEXT_LIMIT: 20,
    EOF_TOKEN: '$EOF',
    UNKNOWN_TOKEN: '$UNKNOWN',
    HIDDEN_TOKEN: '$HIDDEN',
  };
  var lexer = new Lexer({
    rules: [
      ['$HIDDEN', /\s+/g],
      ['NUMBER', /[0-9]+(\.[0-9]+)?\b/g],
      ['(', /\(/g],
      [')', /\)/g],
      ['+', /\+/g],
      ['-', /\-/g],
      ['*', /\*/g],
      ['/', /\//g],
      ['^', /\^/g],
    ],
    isCompress: 1,
    defaultEnv: undefined,
  });
  function lex(input, options = {}) {
    lexer.options = options;
    lexer.resetInput(input);
    const { state } = options;
    if (state) {
      if (state.userData) {
        lexer.userData = state.userData;
      }
      if (state.stateStack) {
        lexer.stateStack = state.stateStack;
      }
    }
    while (lexer.lex().token !== Lexer.STATIC.EOF_TOKEN);
    return {
      state: {
        userData: lexer.userData,
        stateStack: lexer.stateStack,
      },
      tokens: lexer.tokens,
    };
  }
  var parser = {
    productions: [
      ['$START', ['exp']],
      ['exp_p_end', ['(', 'exp', ')']],
      [
        'exp_p_end',
        [
          'NUMBER',
          function (astProcessor, lexer) {
            astProcessor.pushStack(Number(lexer.text));
          },
        ],
      ],
      [
        '(exp)1_',
        [
          '+',
          function (astProcessor, token) {
            astProcessor.pushStack(token.text);
          },
          'exp_p_2',
          function (astProcessor) {
            astProcessor.createOpNode();
          },
          1,
          '(exp)1_',
        ],
      ],
      [
        '(exp)1_',
        [
          '-',
          function (astProcessor, token) {
            astProcessor.pushStack(token.text);
          },
          'exp_p_2',
          function (astProcessor) {
            astProcessor.createOpNode();
          },
          1,
          '(exp)1_',
        ],
      ],
      ['(exp)1_', []],
      ['exp', ['exp_p_2', 1, '(exp)1_']],
      [
        '(exp_p_2)1_',
        [
          '*',
          function (astProcessor, token) {
            astProcessor.pushStack(token.text);
          },
          'exp_p_3',
          function (astProcessor) {
            astProcessor.createOpNode();
          },
          1,
          '(exp_p_2)1_',
        ],
      ],
      [
        '(exp_p_2)1_',
        [
          '/',
          function (astProcessor, token) {
            astProcessor.pushStack(token.text);
          },
          'exp_p_3',
          function (astProcessor) {
            astProcessor.createOpNode();
          },
          1,
          '(exp_p_2)1_',
        ],
      ],
      ['(exp_p_2)1_', []],
      ['exp_p_2', ['exp_p_3', 1, '(exp_p_2)1_']],
      [
        '_1(exp_p_3)',
        [
          '^',
          function (astProcessor, token) {
            astProcessor.pushStack(token.text);
          },
          'exp_p_3',
          function (astProcessor) {
            astProcessor.createOpNode();
          },
        ],
      ],
      ['_1(exp_p_3)', []],
      ['exp_p_3', ['exp_p_4', '_1(exp_p_3)']],
      ['exp_p_4', ['exp_p_end']],
      [
        'exp_p_4',
        [
          '-',
          'exp_p_4',
          (astProcessor) => {
            astProcessor.createUnaryNode('-');
          },
        ],
      ],
    ],
    productionIndexMap: {
      symbol: 0,
      rhs: 1,
      action: 2,
      label: 3,
    },
    getProductionItemByType: function (p, itemType) {
      if (this.isCompress) {
        return p[this.productionIndexMap[itemType]];
      }
      return p[itemType];
    },
    getProductionSymbol: function (p) {
      return this.getProductionItemByType(p, 'symbol');
    },
    getProductionRhs: function (p) {
      return this.getProductionItemByType(p, 'rhs');
    },
    getProductionAction: function (p) {
      return this.getProductionItemByType(p, 'action');
    },
    getProductionLabel: function (p) {
      return this.getProductionItemByType(p, 'label');
    },
    isCompress: 1,
  };
  parser.getProductionSymbol = parser.getProductionSymbol.bind(parser);
  parser.getProductionRhs = parser.getProductionRhs.bind(parser);
  parser.getProductionAction = parser.getProductionAction.bind(parser);
  parser.getProductionLabel = parser.getProductionLabel.bind(parser);
  parser.lexer = lexer;
  parser.lex = lex;
  parser.prioritySymbolMap = {
    exp_p_end: 'exp',
    exp_p_1: 'exp',
    exp_p_2: 'exp',
    exp_p_3: 'exp',
    exp_p_4: 'exp',
  };
  productionSkipAstNodeSet = new Set([3, 4, 5, 7, 8, 9, 11, 12]);
  parser.table = {
    $START: {
      '(': 0,
      NUMBER: 0,
      '-': 0,
    },
    exp_p_end: {
      '(': 1,
      NUMBER: 2,
    },
    '(exp)1_': {
      '+': 3,
      '-': 4,
      $EOF: 5,
      ')': 5,
    },
    exp: {
      '(': 6,
      NUMBER: 6,
      '-': 6,
    },
    '(exp_p_2)1_': {
      '*': 7,
      '/': 8,
      '+': 9,
      '-': 9,
      $EOF: 9,
      ')': 9,
    },
    exp_p_2: {
      '(': 10,
      NUMBER: 10,
      '-': 10,
    },
    '_1(exp_p_3)': {
      '^': 11,
      '*': 12,
      '/': 12,
      '+': 12,
      '-': 12,
      $EOF: 12,
      ')': 12,
    },
    exp_p_3: {
      '(': 13,
      NUMBER: 13,
      '-': 13,
    },
    exp_p_4: {
      '(': 14,
      NUMBER: 14,
      '-': 15,
    },
  };
  parser.parse = function parse(input, options) {
    const recoveryTokens = [];
    const terminalNodes = [];

    const { EOF_TOKEN } = Lexer.STATIC;

    function getTableVal(row, col) {
      return table[row] && table[row][col];
    }
    function isSymbolName(s) {
      return !!table[s];
    }

    options = options || {};
    let error;
    var {
      onErrorRecovery,
      onAction,
      lexerOptions = {},
      transformNode,
    } = options;

    if (transformNode !== false && !transformNode) {
      transformNode = defaultTransformAstNode;
    }

    var {
      lexer,
      table,
      productions,
      getProductionSymbol,
      getProductionRhs,
      getProductionLabel,
    } = parser;

    lexer.options = lexerOptions;
    const startSymbol = getProductionSymbol(productions[0]);

    symbolStack = [startSymbol];

    const astStack = [
      new AstNode({
        children: [],
      }),
    ];
    lexer.resetInput(input);
    let token;
    let next;

    let topSymbol;

    let errorNode;

    function popSymbolStack() {
      symbolStack.pop();
    }

    let getExpected = function () {
      const s = topSymbol;
      if (!isSymbolName(s)) {
        return [lexer.mapReverseSymbol(s)];
      }
      const ret = (table[s] && Object.keys(table[s])) || [];
      return ret.map((r) => lexer.mapReverseSymbol(r));
    };

    let production;

    while (1) {
      topSymbol = peekStack(symbolStack);

      if (!topSymbol) {
        break;
      }

      while (isProductionEndFlag(topSymbol) || isAddAstNodeFlag(topSymbol)) {
        let ast = astStack.pop();
        if (isAddAstNodeFlag(topSymbol)) {
          const stackTop = peekStack(astStack);
          const wrap = new AstNode({
            type: 'symbol',
            symbol: ast.symbol,
            children: [ast],
            label: ast.label,
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

      if (typeof topSymbol === 'string') {
        if (!token) {
          token = lexer.lex();
          pushRecoveryTokens(recoveryTokens, token);
        }
        if (topSymbol === token.t) {
          symbolStack.pop();
          const terminalNode = new AstNode(token);
          terminalNode.type = 'token';
          terminalNodes.push(terminalNode);
          const parent = peekStack(astStack);
          parent.addChild(terminalNode);
          token = lexer.lex();
          pushRecoveryTokens(recoveryTokens, token);
        } else if ((next = getTableVal(topSymbol, token.t)) !== undefined) {
          popSymbolStack();
          production = productions[next];

          if (productionSkipAstNodeSet?.has(next)) {
            symbolStack.push.apply(
              symbolStack,
              getProductionRhs(production).concat().reverse(),
            );
          } else {
            const newAst = new AstNode({
              type: 'symbol',
              symbol: getOriginalSymbol(topSymbol),
              label: getOriginalSymbol(getProductionLabel(production)),
              children: [],
            });
            peekStack(astStack).addChild(newAst);
            astStack.push(newAst);
            symbolStack.push.apply(
              symbolStack,
              getProductionRhs(production).concat(productionEndFlag).reverse(),
            );
          }
        } else {
          error = {
            recovery: false,
            ...getParseError(getExpected),
            expected: getExpected(),
            symbol: peekStack(astStack).symbol,
            lexer: lexer.toJSON(),
          };
          if (onErrorRecovery) {
            const recommendedAction = {};
            lexer.stash();
            const nextToken = lexer.lex();
            lexer.stashPop();
            // should delete
            if (
              topSymbol === nextToken.t ||
              getTableVal(topSymbol, nextToken.t) !== undefined
            ) {
              recommendedAction.action = 'del';
            } else if (error.expected.length) {
              recommendedAction.action = 'add';
            }

            const localErrorNode = new AstNode({
              error,
              type: 'token',
              ...error.lexer,
            });
            peekStack(astStack).addChild(localErrorNode);

            const recovery =
              onErrorRecovery(
                {
                  errorNode: localErrorNode,
                  parseTree: getAstRootNode(astStack, transformNode, true),
                },
                recommendedAction,
              ) || {};

            const { action } = recovery;

            peekStack(astStack).children.pop();

            if (!action) {
              errorNode = closeAstWhenError(error, astStack);
              break;
            }

            if (action === 'del') {
              error.recovery = true;
              const deleteToken = recoveryTokens.pop();
              deleteToken.recovery = 'del';
              token = null;
            } else if (action === 'add') {
              error.recovery = true;
              token = {
                ...token,
                token: recovery.token,
                text: recovery.text,
                t: lexer.mapSymbol(recovery.token),
                recovery: 'add',
              };
              lexer.pushToken(token);
              pushRecoveryTokens(recoveryTokens, token);
            }
          } else {
            errorNode = closeAstWhenError(error, astStack);
            break;
          }
        }
      }

      topSymbol = peekStack(symbolStack);

      while (topSymbol && typeof topSymbol === 'function') {
        if (onAction) {
          onAction({
            token: lexer.getLastToken(),
            action: topSymbol,
            parseTree: getAstRootNode(astStack, transformNode, true),
          });
        }
        popSymbolStack();
        topSymbol = peekStack(symbolStack);
      }

      if (!symbolStack.length) {
        break;
      }
    }

    if (!error && lexer.getCurrentToken().token !== EOF_TOKEN) {
      // reduction done but still has input
      if (!symbolStack.length) {
        getExpected = () => [EOF_TOKEN];
        lexer.lex();
      }
      error = {
        ...getParseError(getExpected),
        expected: getExpected(),
        symbol: peekStack(astStack)?.symbol,
        lexer: lexer.toJSON(),
      };
      errorNode = closeAstWhenError(error, astStack);
    }

    const ast = getAstRootNode(astStack, transformNode);

    symbolStack = [];

    return {
      ast,
      tokens: lexer.tokens,
      recoveryTokens,
      errorNode,
      error,
      terminalNodes,
    };
  };
  return parser;
})();

export default $parser;