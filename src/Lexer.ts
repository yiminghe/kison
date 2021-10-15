import Utils from './utils';
import type { Token } from './parser';

var { serializeObject, normalizeSymbol } = Utils;

function mapSymbolForCodeGen(this: Lexer, t: string) {
  return (this.symbolMap && this.symbolMap[t]) || t;
}

function mapStateForCodeGen(this: Lexer, t: string) {
  return (this.stateMap && this.stateMap[t]) || t;
}

const nonSerializedMethods: Record<string, number> = {
  init: 1,
  genCode: 1,
  genShortId: 1,
  constructor: 1,
};

var lexer: Lexer;

export interface LexerRule {
  token: string;
  regexp: Function | RegExp;
  action?: Function;
}

interface Params {
  rules: LexerRule[];
}

interface Options {
  env?: string;
  unicode?: boolean;
  state?: {
    userData?: any;
    stateStack?: string[];
  };
}

function lex(input: string, options: Options = {}) {
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

function identity(n: any) {
  return n;
}

class Lexer {
  start: number = 0;
  end: number = 0;
  firstLine: number = 0;
  lastLine: number = 0;
  firstColumn: number = 0;
  lastColumn: number = 0;
  lineNumber: number = 0;
  matched: string = '';
  stateStack: string[] = [];

  token: string = '';
  t: string = '';
  text: string = '';
  match: string = '';

  tokens: Token[] = [];

  nextTokens: Token[] = [];

  options: Options = {};

  defaultEnv?: string;

  rules: LexerRule[] = [];

  ruleIndexMap: Record<string, number> = {};

  tokenSet: Set<string> = new Set();

  static supportSticky?: boolean;

  static STATIC = {
    INITIAL_STATE: 'I',
    DEBUG_CONTEXT_LIMIT: 20,
    EOF_TOKEN: '$EOF',
    UNKNOWN_TOKEN: '$UNKNOWN',
    HIDDEN_TOKEN: '$HIDDEN',
  };

  getRuleItem: Function = () => {};

  isCompress = undefined;

  regexpIndex: string | number = '';

  userData: any;

  errorRule: LexerRule | any[] = [];

  errorRuleCompress: any[] = [];

  input: string = '';

  symbolMap?: Record<string, string>;

  stateMap?: Record<string, string>;

  reverseSymbolMap?: Record<string, string>;

  reverseStateMap?: Record<string, string>;

  stashIndex: number = 0;

  matches: string[] = [];

  constructor(cfg: Params) {
    this.init(cfg);
  }

  transformRegExp(obj: any, p: string | number, disableSticky?: boolean) {
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

  hasToken(t: string) {
    return this.tokenSet.has(t);
  }

  transformRules() {
    if (Lexer.supportSticky) {
      const { regexpIndex } = this;
      for (const r of this.rules) {
        this.transformRegExp(r, regexpIndex);
      }
    }
  }

  init(cfg: Params) {
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
      const errorRuleCompress: any[] = (this.errorRule = []);
      errorRuleCompress[ruleIndexMap.token] = errorRule.token;
      errorRuleCompress[ruleIndexMap.regexp] = errorRule.regexp;
    }
    this.resetInput(this.input);
    this.options = {};
  }

  matchAny() {
    return this.end < this.input.length ? this.input.charAt(this.end) : false;
  }

  addRule(rule: LexerRule) {
    this.rules.push(rule);
    const token = this.getRuleItem(rule, 'token');
    if (token) {
      this.tokenSet.add(token);
    }
  }

  resetInput(input: string) {
    this.token = '';
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
  }

  genShortId(field: string) {
    var base = 97, // a-1
      max = 122, // z
      interval = max - base + 1;
    field += '__gen';
    const self: any = this;
    if (!(field in this)) {
      self[field] = -1;
    }
    var index = (self[field] = self[field] + 1);
    var ret = '';
    do {
      ret = String.fromCharCode(base + (index % interval)) + ret;
      // 00 = 10*1+0
      index = Math.floor(index / interval) - 1;
    } while (index >= 0);
    return ret;
  }

  genCode(cfg: { compressSymbol?: boolean; compressLexerState?: boolean }) {
    var STATIC = Lexer.STATIC,
      code = [],
      stateMap: Record<string, string> | null = null;

    var { compressSymbol, compressLexerState: compressState } = cfg;

    var genPrototype: Record<string, Function> = {};

    const lexerProtype: any = Lexer.prototype;

    for (const name of Object.getOwnPropertyNames(lexerProtype)) {
      if (
        !nonSerializedMethods[name] &&
        typeof lexerProtype[name] === 'function'
      ) {
        genPrototype[name] = lexerProtype[name];
      }
    }

    if (compressSymbol) {
      this.symbolMap = {};
      genPrototype.mapSymbol = mapSymbolForCodeGen;
    } else {
      genPrototype.mapSymbol = genPrototype.mapReverseSymbol = identity;
    }

    if (compressState) {
      stateMap = this.stateMap = {};
      stateMap[Lexer.STATIC.INITIAL_STATE] = Lexer.STATIC.INITIAL_STATE;
      genPrototype.mapState = mapStateForCodeGen;
    } else {
      genPrototype.mapState = genPrototype.mapReverseState = identity;
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
      (v: any, parent: any) => {
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
        var ret: any;
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
            state = state.map((s: string) => {
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

    if (compressState && stateMap) {
      code.push('lexer.stateMap = ' + serializeObject(stateMap) + ';');
    }

    code.push(lex.toString());

    return code.join('\n');
  }

  getRuleItemNoCompress(rule: any, itemType: string | number) {
    return rule[itemType];
  }

  getRuleItemCompress(rule: any, itemType: string | number) {
    return rule[this.ruleIndexMap[itemType]];
  }

  getCurrentRules() {
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
  }

  peekState(n: number = 1) {
    return this.mapReverseState(this.stateStack[this.stateStack.length - n]);
  }

  pushState(state: string) {
    this.stateStack.push(this.mapState(state));
  }

  popState(num: number = 1) {
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

  mapSymbol(t: string) {
    var { symbolMap } = this;
    if (!symbolMap) {
      return t;
    }
    const nt = normalizeSymbol(t);
    if (nt === t) {
      // force string, see util.clone iphone5s ios7 bug
      return symbolMap[t] || (symbolMap[t] = this.genShortId('symbol'));
    } else {
      symbolMap[nt] || (symbolMap[nt] = this.genShortId('symbol'));
      return symbolMap[nt] + t.slice(-1);
    }
  }

  mapReverseSymbol(rs: string) {
    var { symbolMap, reverseSymbolMap } = this;
    if (!reverseSymbolMap && symbolMap) {
      reverseSymbolMap = this.reverseSymbolMap = {};
      for (var i of Object.keys(symbolMap)) {
        reverseSymbolMap[symbolMap[i]] = i;
      }
    }
    const nrs = normalizeSymbol(rs);
    if (nrs === rs) {
      return (reverseSymbolMap && reverseSymbolMap[rs]) || rs;
    } else {
      return (
        ((reverseSymbolMap && reverseSymbolMap[nrs]) || nrs) + rs.slice(-1)
      );
    }
  }

  mapState(s: string) {
    var { stateMap } = this;
    if (!stateMap) {
      return s;
    }
    return stateMap[s] || (stateMap[s] = this.genShortId('state'));
  }

  mapReverseState(rs: string) {
    var { stateMap, reverseStateMap } = this;
    if (!reverseStateMap && stateMap) {
      reverseStateMap = this.reverseStateMap = {};
      for (var i of Object.keys(stateMap)) {
        reverseStateMap[stateMap[i]] = i;
      }
    }
    return (reverseStateMap && reverseStateMap[rs]) || rs;
  }

  toJSON() {
    const currentToken = this.getCurrentToken();
    return {
      t: currentToken.t,
      text: currentToken.text,
      firstLine: currentToken.firstLine,
      firstColumn: currentToken.firstColumn,
      lastLine: currentToken.lastLine,
      lastColumn: currentToken.lastColumn,
      token: currentToken.token,
      start: currentToken.start,
      end: currentToken.end,
    };
  }

  stash() {
    this.stashIndex = this.tokens.length;
  }

  stashPop() {
    this.nextTokens = [
      ...this.tokens.slice(this.stashIndex),
      ...this.nextTokens,
    ];
    this.tokens.length = this.stashIndex;
  }

  matchRegExp(regexp: Function | RegExp) {
    if (typeof regexp !== 'function') {
      regexp.lastIndex = this.end;
      const ret = regexp.exec(this.input);
      if (ret && ret.index !== this.end) {
        return null;
      }
      return ret;
    }
    return regexp.call(this, this);
  }

  pushToken(token: Token) {
    const tokens = this.tokens;
    if (tokens[tokens.length - 1]?.token === Lexer.STATIC.EOF_TOKEN) {
      tokens.pop();
    }
    tokens.push(token);
  }

  lex(): Token {
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
  }

  getCurrentToken() {
    if (this.tokens[this.tokens.length - 1]) {
      return this.tokens[this.tokens.length - 1];
    }
    return this.lex();
  }

  getLastToken() {
    return this.tokens[this.tokens.length - 2] || this.getCurrentToken();
  }

  nextChar(index = 0) {
    return this.getChar(this.end + index);
  }

  nextCharCode(index = 0) {
    return this.getCharCode(this.end + index);
  }

  nextStartsWith(search: string) {
    let { input, end } = this;
    const l = search.length;
    for (let i = 0; i < l; i++) {
      if (input.charAt(end++) !== search.charAt(i)) {
        return false;
      }
    }
    return true;
  }

  nextCharAt(index: number) {
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

  getTokensLength() {
    return this.tokens.length;
  }

  nextToken(): Token {
    if (this.nextTokens.length) {
      return this.nextTokens.shift()!;
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
    throw new Error('no match lexer');
  }
}

export default Lexer;