// @ts-check

var Utils = require('./utils');
var { serializeObject, mix, isArray, inArray, each, toFunctionString } = Utils;

function mapSymbolForCodeGen(t) {
  return this.symbolMap[t];
}

const nonSerializedMethods = {
  init: 1,
  genCode: 1,
  genShortId: 1,
  constructor: 1,
};

var lexer;

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

class Lexer {
  static STATIC = {
    INITIAL_STATE: 'I',
    DEBUG_CONTEXT_LIMIT: 20,
    EOF_TOKEN: '$EOF',
    UNKNOWN_TOKEN: '$UNKNOWN',
    HIDDEN_TOKEN: '$HIDDEN',
  };

  isCompress = undefined;

  static supportSticky = undefined;

  constructor(cfg) {
    this.init(cfg);
  }

  transformRegExp(obj, p, disableSticky) {
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
  }

  hasToken(t) {
    return this.tokenSet.has(t);
  }

  transformRules() {
    if (Lexer.supportSticky) {
      const regIndex = this.isCompress ? this.ruleIndexMap.regexp : 'regexp';
      for (const r of this.rules) {
        this.transformRegExp(r, regIndex);
      }
    }
  }

  init(cfg) {
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
    mix(this, cfg);
    this.rules = this.rules.concat();
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
    const errorRuleCompress = (this.errorRuleCompress = []);
    errorRuleCompress[ruleIndexMap.token] = errorRule.token;
    errorRuleCompress[ruleIndexMap.regexp] = errorRule.regexp;
    this.resetInput(this.input);
    this.options = {};
  }

  matchAny() {
    return this.end < this.input.length ? this.input.charAt(this.end) : false;
  }

  addRule(rule) {
    this.rules.push(rule);
    const token = this.getRuleItem(rule, 'token');
    if (token) {
      this.tokenSet.add(token);
    }
  }

  resetInput(input) {
    this.token = undefined;
    this.tokensQueue = [];
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
  }

  genShortId(field) {
    var base = 97, // a-1
      max = 122, // z
      interval = max - base + 1;
    field += '__gen';
    if (!(field in this)) {
      this[field] = -1;
    }
    var index = (this[field] = this[field] + 1);
    var ret = '';
    do {
      ret = String.fromCharCode(base + (index % interval)) + ret;
      // 00 = 10*1+0
      index = Math.floor(index / interval) - 1;
    } while (index >= 0);
    return ret;
  }

  genCode(cfg) {
    var STATIC = Lexer.STATIC,
      code = [
        toFunctionString(mix),
        toFunctionString(isArray),
        toFunctionString(each),
        toFunctionString(inArray),
      ],
      stateMap;

    var { compressSymbol, compressLexerState: compressState } = cfg;

    var genPrototype = {};

    for (const name of Object.getOwnPropertyNames(Lexer.prototype)) {
      if (
        !nonSerializedMethods[name] &&
        typeof Lexer.prototype[name] === 'function'
      ) {
        genPrototype[name] = Lexer.prototype[name];
      }
    }

    if (compressSymbol) {
      this.symbolMap = {};
      genPrototype.mapSymbol = mapSymbolForCodeGen;
    }

    if (compressState) {
      stateMap = this.stateMap = {};
      stateMap[Lexer.STATIC.INITIAL_STATE] = Lexer.STATIC.INITIAL_STATE;
    }

    code.push('var Lexer = ' + serializeObject(this.init) + ';');

    code.push('Lexer.prototype= ' + serializeObject(genPrototype) + ';');

    code.push('Lexer.STATIC= ' + serializeObject(STATIC) + ';');

    const ruleIndexMap = this.ruleIndexMap;

    const newRules = [];

    var newCfg = serializeObject(
      {
        rules: this.rules,
        isCompress: 1,
        defaultEnv: this.defaultEnv,
      },
      (v, parent) => {
        if (
          parent &&
          parent.isKisonRule &&
          Array.isArray(parent) &&
          parent[ruleIndexMap.regexp] &&
          v === parent[ruleIndexMap.regexp] &&
          typeof v === 'string'
        ) {
          return v;
        }
        var ret;
        if (v && (v.regexp || v.token)) {
          ret = [];
          var state = v.hasOwnProperty('state') && v.state,
            regexp = v.hasOwnProperty('regexp') && v.regexp,
            filter = v.hasOwnProperty('filter') && v.filter,
            action = v.hasOwnProperty('action') && v.action,
            token = v.hasOwnProperty('token') && v.token;

          if (token && compressSymbol) {
            token = this.mapSymbol(token);
          }
          if (token) {
            ret[ruleIndexMap.token] = token;
          }
          if (regexp) {
            ret[ruleIndexMap.regexp] = regexp;
            this.transformRegExp(ret, ruleIndexMap.regexp, true);
          }
          if (action) {
            ret[ruleIndexMap.action] = action;
          }
          if (filter) {
            ret[ruleIndexMap.filter] = filter;
          }
          if (compressState && state) {
            state = Utils.map(state, (s) => {
              return this.mapState(s);
            });
          }
          if (state) {
            ret[ruleIndexMap.state] = state;
          }
          ret['isKisonRule'] = 1;
          newRules.push(ret);
        }
        return ret;
      },
    );

    code.push('var lexer = new Lexer(' + newCfg + ');');

    if (compressState) {
      code.push('lexer.stateMap = ' + serializeObject(stateMap) + ';');
    }

    code.push(lex.toString());

    return code.join('\n');
  }

  getRuleItem(rule, itemType) {
    if (this.isCompress) {
      return rule[this.ruleIndexMap[itemType]];
    } else {
      return rule[itemType];
    }
  }

  getCurrentRules() {
    var currentState = this.stateStack[this.stateStack.length - 1],
      rules = [];
    each(this.rules, (r) => {
      var filter = this.getRuleItem(r, 'filter');
      if (filter) {
        if (filter.call(this)) {
          rules.push(r);
        }
        return;
      }
      var state = this.getRuleItem(r, 'state');
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
  }

  peekState(n) {
    n = n || 1;
    return this.mapReverseState(this.stateStack[this.stateStack.length - n]);
  }

  pushState(state) {
    this.stateStack.push(this.mapState(state));
  }

  popState(num) {
    num = num || 1;
    var ret;
    while (num--) {
      ret = this.stateStack.pop();
    }
    return ret && this.mapReverseState(ret);
  }

  showDebugInfo() {
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
  }

  mapSymbol(t) {
    if (!t) {
      return t;
    }
    var { symbolMap } = this;
    if (!symbolMap) {
      return t;
    }
    // force string, see util.clone iphone5s ios7 bug
    return symbolMap[t] || (symbolMap[t] = this.genShortId('symbol'));
  }

  mapReverseSymbol(rs) {
    if (!rs) {
      return rs;
    }
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
  }

  mapState(s) {
    var { stateMap } = this;
    if (!stateMap) {
      return s;
    }
    return stateMap[s] || (stateMap[s] = this.genShortId('state'));
  }

  mapReverseState(rs) {
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
  }

  toJSON() {
    return {
      text: this.text,
      firstLine: this.firstLine,
      firstColumn: this.firstColumn,
      lastLine: this.lastLine,
      lastColumn: this.lastColumn,
      token: this.token,
      start: this.start,
      end: this.end,
    };
  }

  peek() {
    const token = this._lex(true);
    this.tokensQueue.push(token);
    if (token.token === Lexer.STATIC.HIDDEN_TOKEN) {
      return this.peek();
    }
    return token;
  }

  matchRegExp(regexp) {
    if (regexp.test) {
      regexp.lastIndex = this.end;
      const ret = regexp.exec(this.input);
      if (ret && ret.index !== this.end) {
        return null;
      }
      return ret;
    }
    return regexp.call(this, this);
  }

  lex() {
    const token = this._lex();
    this.tokens.push(token);
    if (token.token === Lexer.STATIC.HIDDEN_TOKEN) {
      return this.lex();
    }
    return token;
  }

  nextChar(index = 0) {
    return this.getChar(this.end + index);
  }

  nextCharCode(index = 0) {
    return this.getCharCode(this.end + index);
  }

  nextStartsWith(search) {
    let { input, end } = this;
    const l = search.length;
    for (let i = 0; i < l; i++) {
      if (input.charAt(end++) !== search.charAt(i)) {
        return false;
      }
    }
    return true;
  }

  nextCharAt(index) {
    return this.input.charAt(this.end + index);
  }

  nextLength() {
    return this.input.length - this.end;
  }

  getChar(index = 0) {
    if (this.options.unicode) {
      const code = this.input.codePointAt(index);
      if (code === undefined || isNaN(code)) {
        return '';
      }
      return String.fromCodePoint(code);
    }
    return this.input.charAt(index);
  }

  getCharCode(index = 0) {
    if (this.options.unicode) {
      return this.input.codePointAt(index);
    }
    return this.input.charCodeAt(index);
  }

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

    this.match = this.text = '';

    if (this.end >= input.length) {
      this.token = Lexer.STATIC.EOF_TOKEN;
      this.start = this.end;
      this.firstLine = this.lastLine;
      this.firstColumn = this.lastColumn;
      return {
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
            ...position,
          };
        } else {
          // ignore
          return this._lex(skipQueue);
        }
      }
    }
  }
}

module.exports = Lexer;
