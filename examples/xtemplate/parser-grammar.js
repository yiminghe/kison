/**
 * lalr grammar and lexer rules for kissy xtemplate.
 * @author yiminghe@gmail.com
 */

function popState() {
  this.popState();
}

var codeSection = ['p', 'e'];

module.exports = {
  productions: [
    {
      symbol: 'program',
      rhs: ['statements', 'INVERSE', 'statements'],
      action() {
        return new this.yy.ProgramNode(this.lexer.lineNumber, this.$1, this.$3);
      },
    },
    {
      symbol: 'program',
      rhs: ['statements'],
      action() {
        return new this.yy.ProgramNode(this.lexer.lineNumber, this.$1);
      },
    },
    {
      symbol: 'statements',
      rhs: ['statement'],
      action() {
        return [this.$1];
      },
    },
    {
      symbol: 'statements',
      rhs: ['statements', 'statement'],
      action() {
        this.$1.push(this.$2);
      },
    },

    // call block function
    {
      symbol: 'statement',
      rhs: [
        'OPEN_BLOCK',
        'function',
        'CLOSE',
        'program',
        'OPEN_CLOSE_BLOCK',
        'id',
        'CLOSE',
      ],
      action() {
        return new this.yy.BlockStatement(
          this.lexer.lineNumber,
          this.$2,
          this.$4,
          this.$6,
          this.$1.length !== 4,
        );
      },
    },

    // render expression
    {
      symbol: 'statement',
      rhs: ['OPEN_TPL', 'expression', 'CLOSE'],
      action() {
        return new this.yy.ExpressionStatement(
          this.lexer.lineNumber,
          this.$2,
          this.$1.length !== 3,
        );
      },
    },

    // render literal html content
    {
      symbol: 'statement',
      rhs: ['CONTENT'],
      action() {
        return new this.yy.ContentStatement(this.lexer.lineNumber, this.$1);
      },
    },

    {
      symbol: 'function',
      rhs: ['id', 'LPAREN', 'params', 'COMMA', 'hash', 'RPAREN'],
      action() {
        return new this.yy.Function(
          this.lexer.lineNumber,
          this.$1,
          this.$3,
          this.$5,
        );
      },
    },

    {
      symbol: 'function',
      rhs: ['id', 'LPAREN', 'params', 'RPAREN'],
      action() {
        return new this.yy.Function(this.lexer.lineNumber, this.$1, this.$3);
      },
    },
    {
      symbol: 'function',
      rhs: ['id', 'LPAREN', 'hash', 'RPAREN'],
      action() {
        return new this.yy.Function(
          this.lexer.lineNumber,
          this.$1,
          null,
          this.$3,
        );
      },
    },
    {
      symbol: 'function',
      rhs: ['id', 'LPAREN', 'RPAREN'],
      action() {
        return new this.yy.Function(this.lexer.lineNumber, this.$1);
      },
    },

    // params start
    {
      symbol: 'params',
      rhs: ['params', 'COMMA', 'param'],
      action() {
        this.$1.push(this.$3);
      },
    },
    {
      symbol: 'params',
      rhs: ['param'],
      action() {
        return [this.$1];
      },
    },
    {
      symbol: 'param',
      rhs: ['expression'],
    },
    // params end

    // expression start
    {
      symbol: 'expression',
      rhs: ['conditionalOrExpression'],
    },
    {
      symbol: 'conditionalOrExpression',
      rhs: ['conditionalAndExpression'],
    },
    {
      symbol: 'conditionalOrExpression',
      rhs: ['conditionalOrExpression', 'OR', 'conditionalAndExpression'],
      action() {
        return new this.yy.ConditionalOrExpression(this.$1, this.$3);
      },
    },
    {
      symbol: 'conditionalAndExpression',
      rhs: ['equalityExpression'],
    },
    {
      symbol: 'conditionalAndExpression',
      rhs: ['conditionalAndExpression', 'AND', 'equalityExpression'],
      action() {
        return new this.yy.ConditionalAndExpression(this.$1, this.$3);
      },
    },
    {
      symbol: 'equalityExpression',
      rhs: ['relationalExpression'],
    },
    {
      symbol: 'equalityExpression',
      rhs: ['equalityExpression', 'LOGIC_EQUALS', 'relationalExpression'],
      action() {
        return new this.yy.EqualityExpression(this.$1, '===', this.$3);
      },
    },
    {
      symbol: 'equalityExpression',
      rhs: ['equalityExpression', 'LOGIC_NOT_EQUALS', 'relationalExpression'],
      action() {
        return new this.yy.EqualityExpression(this.$1, '!==', this.$3);
      },
    },
    {
      symbol: 'relationalExpression',
      rhs: ['additiveExpression'],
    },
    {
      symbol: 'relationalExpression',
      rhs: ['relationalExpression', 'LT', 'additiveExpression'],
      action() {
        return new this.yy.RelationalExpression(this.$1, '<', this.$3);
      },
    },
    {
      symbol: 'relationalExpression',
      rhs: ['relationalExpression', 'GT', 'additiveExpression'],
      action() {
        return new this.yy.RelationalExpression(this.$1, '>', this.$3);
      },
    },
    {
      symbol: 'relationalExpression',
      rhs: ['relationalExpression', 'LE', 'additiveExpression'],
      action() {
        return new this.yy.RelationalExpression(this.$1, '<=', this.$3);
      },
    },
    {
      symbol: 'relationalExpression',
      rhs: ['relationalExpression', 'GE', 'additiveExpression'],
      action() {
        return new this.yy.RelationalExpression(this.$1, '>=', this.$3);
      },
    },
    {
      symbol: 'additiveExpression',
      rhs: ['multiplicativeExpression'],
    },
    {
      symbol: 'additiveExpression',
      rhs: ['additiveExpression', 'PLUS', 'multiplicativeExpression'],
      action() {
        return new this.yy.AdditiveExpression(this.$1, '+', this.$3);
      },
    },
    {
      symbol: 'additiveExpression',
      rhs: ['additiveExpression', 'MINUS', 'multiplicativeExpression'],
      action() {
        return new this.yy.AdditiveExpression(this.$1, '-', this.$3);
      },
    },
    {
      symbol: 'multiplicativeExpression',
      rhs: ['unaryExpression'],
    },
    {
      symbol: 'multiplicativeExpression',
      rhs: ['multiplicativeExpression', 'MULTIPLY', 'unaryExpression'],
      action() {
        return new this.yy.MultiplicativeExpression(this.$1, '*', this.$3);
      },
    },
    {
      symbol: 'multiplicativeExpression',
      rhs: ['multiplicativeExpression', 'DIVIDE', 'unaryExpression'],
      action() {
        return new this.yy.MultiplicativeExpression(this.$1, '/', this.$3);
      },
    },
    {
      symbol: 'multiplicativeExpression',
      rhs: ['multiplicativeExpression', 'MODULUS', 'unaryExpression'],
      action() {
        return new this.yy.MultiplicativeExpression(this.$1, '%', this.$3);
      },
    },
    {
      symbol: 'unaryExpression',
      rhs: ['NOT', 'unaryExpression'],
      action() {
        return new this.yy.UnaryExpression(this.$1, this.$2);
      },
    },
    {
      symbol: 'unaryExpression',
      rhs: ['MINUS', 'unaryExpression'],
      action() {
        return new this.yy.UnaryExpression(this.$1, this.$2);
      },
    },
    {
      symbol: 'unaryExpression',
      rhs: ['primaryExpression'],
    },
    {
      symbol: 'primaryExpression',
      rhs: ['function'],
    },
    {
      symbol: 'primaryExpression',
      rhs: ['STRING'],
      action() {
        return new this.yy.String(this.lexer.lineNumber, this.$1);
      },
    },
    {
      symbol: 'primaryExpression',
      rhs: ['NUMBER'],
      action() {
        return new this.yy.Number(this.lexer.lineNumber, this.$1);
      },
    },
    {
      symbol: 'primaryExpression',
      rhs: ['BOOLEAN'],
      action() {
        return new this.yy.Boolean(this.lexer.lineNumber, this.$1);
      },
    },
    {
      symbol: 'primaryExpression',
      rhs: ['id'],
    },
    {
      symbol: 'primaryExpression',
      rhs: ['LPAREN', 'expression', 'RPAREN'],
      action() {
        return this.$2;
      },
    },
    // expression end

    // hash start
    {
      symbol: 'hash',
      rhs: ['hash', 'COMMA', 'hashSegment'],
      action() {
        var hash = this.$1,
          seg = this.$3;
        hash.value[seg[0]] = seg[1];
      },
    },
    {
      symbol: 'hash',
      rhs: ['hashSegment'],
      action() {
        var hash = new this.yy.Hash(this.lexer.lineNumber),
          $1 = this.$1;
        hash.value[$1[0]] = $1[1];
        return hash;
      },
    },
    {
      symbol: 'hashSegment',
      rhs: ['ID', 'EQUALS', 'expression'],
      action() {
        return [this.$1, this.$3];
      },
    },
    // hash end

    // path start
    {
      symbol: 'id',
      rhs: ['idSegments'],
      action() {
        return new this.yy.Id(this.lexer.lineNumber, this.$1);
      },
    },
    {
      symbol: 'idSegments',
      rhs: ['idSegments', 'SEP', 'ID'],
      action() {
        this.$1.push(this.$3);
      },
    },
    {
      symbol: 'idSegments',
      rhs: ['idSegments', 'REF_START', 'expression', 'REF_END'],
      action() {
        this.$1.push(this.$3);
      },
    },
    {
      symbol: 'idSegments',
      rhs: ['ID'],
      action() {
        return [this.$1];
      },
    },
    // path end
  ],
  lexer: {
    // states:
    // t: in tpl mode
    // et: escape tpl
    // e: enter escaped tpl {{
    // p: enter plain tpl {{{
    rules: [
      {
        // "\n".match(/./)
        regexp: /^[\s\S]*?(?={{)/,
        action() {
          var self = this,
            text = self.text,
            m,
            n = 0;

          if ((m = text.match(/\\+$/))) {
            n = m[0].length;
          }
          if (n % 2) {
            self.pushState('et');
            text = text.slice(0, -1);
          } else {
            self.pushState('t');
          }
          if (n) {
            text = text.replace(/\\+$/g, function (m) {
              return new Array(m.length / 2 + 1).join('\\');
            });
          }
          // https://github.com/kissyteam/kissy/issues/330
          // return even empty
          self.text = text;
          return 'CONTENT';
        },
      },
      {
        regexp: /^[\s\S]+/,
        token: 'CONTENT',
      },
      {
        state: ['et'],
        token: 'CONTENT',
        regexp: /^[\s\S]{2,}?(?:(?={{)|$)/,
        action: popState,
      },
      {
        state: ['t'],
        // support Inverted Sections in mustache
        // support {{@
        regexp: /^{{{?(?:#|@)/,
        token: 'OPEN_BLOCK',
        action() {
          var self = this,
            text = self.text;
          if (text.length === 4) {
            self.pushState('p');
          } else {
            self.pushState('e');
          }
        },
      },
      {
        state: ['t'],
        regexp: /^{{{?\//,
        token: 'OPEN_CLOSE_BLOCK',
        action() {
          var self = this,
            text = self.text;
          if (text.length === 4) {
            self.pushState('p');
          } else {
            self.pushState('e');
          }
        },
      },
      {
        state: ['t'],
        regexp: /^{{\s*else\s*}}/,
        token: 'INVERSE',
        action: popState,
      },
      {
        state: ['t'],
        // ignore comment
        regexp: /^{{![\s\S]*?}}/,
        action: popState,
      },
      {
        // literal mode
        state: ['t'],
        regexp: /^{{%([\s\S]*?)%}}/,
        action() {
          // return to content mode
          this.text = this.matches[1] || '';
          this.popState();
        },
        token: 'CONTENT',
      },
      {
        state: ['t'],
        regexp: /^{{{?/,
        token: 'OPEN_TPL',
        action() {
          var self = this,
            text = self.text;
          if (text.length === 3) {
            self.pushState('p');
          } else {
            self.pushState('e');
          }
        },
      },
      {
        // ignore white space
        state: codeSection,
        regexp: /^\s+/,
      },
      {
        state: codeSection,
        regexp: /^,/,
        token: 'COMMA',
      },
      {
        state: ['p'],
        regexp: /^}}}/,
        action() {
          this.popState(2);
        },
        token: 'CLOSE',
      },
      {
        state: ['e'],
        regexp: /^}}/,
        action() {
          this.popState(2);
        },
        token: 'CLOSE',
      },
      {
        state: codeSection,
        regexp: /^\(/,
        token: 'LPAREN',
      },
      {
        state: codeSection,
        regexp: /^\)/,
        token: 'RPAREN',
      },
      {
        state: codeSection,
        regexp: /^\|\|/,
        token: 'OR',
      },
      {
        state: codeSection,
        regexp: /^&&/,
        token: 'AND',
      },
      {
        state: codeSection,
        regexp: /^===/,
        token: 'LOGIC_EQUALS',
      },
      {
        state: codeSection,
        regexp: /^!==/,
        token: 'LOGIC_NOT_EQUALS',
      },
      {
        state: codeSection,
        regexp: /^>=/,
        token: 'GE',
      },
      {
        state: codeSection,
        regexp: /^<=/,
        token: 'LE',
      },
      {
        state: codeSection,
        regexp: /^>/,
        token: 'GT',
      },
      {
        state: codeSection,
        regexp: /^</,
        token: 'LT',
      },
      {
        state: codeSection,
        regexp: /^\+/,
        token: 'PLUS',
      },
      {
        state: codeSection,
        regexp: /^-/,
        token: 'MINUS',
      },
      {
        state: codeSection,
        regexp: /^\*/,
        token: 'MULTIPLY',
      },
      {
        state: codeSection,
        regexp: /^\//,
        token: 'DIVIDE',
      },
      {
        state: codeSection,
        regexp: /^%/,
        token: 'MODULUS',
      },
      {
        state: codeSection,
        regexp: /^!/,
        token: 'NOT',
      },
      {
        state: codeSection,
        // notice escape string
        regexp: /^"(\\[\s\S]|[^\\"])*"/,
        action() {
          this.text = this.text.slice(1, -1).replace(/\\"/g, '"');
        },
        token: 'STRING',
      },
      {
        state: codeSection,
        // notice escape string
        regexp: /^'(\\[\s\S]|[^\\'])*'/,
        action() {
          this.text = this.text.slice(1, -1).replace(/\\'/g, "'");
        },
        token: 'STRING',
      },
      {
        state: codeSection,
        regexp: /^true/,
        token: 'BOOLEAN',
      },
      {
        state: codeSection,
        regexp: /^false/,
        token: 'BOOLEAN',
      },
      {
        state: codeSection,
        regexp: /^\d+(?:\.\d+)?(?:e-?\d+)?/i,
        token: 'NUMBER',
      },
      {
        state: codeSection,
        regexp: /^=/,
        token: 'EQUALS',
      },
      {
        state: codeSection,
        regexp: /^\.\./,
        token: 'ID',
        action() {
          // wait for '/'
          this.pushState('ws');
        },
      },
      {
        state: ['ws'],
        regexp: /^\//,
        token: 'SEP',
        action: popState,
      },
      {
        state: codeSection,
        regexp: /^\./,
        token: 'SEP',
      },
      {
        state: codeSection,
        regexp: /^\[/,
        token: 'REF_START',
      },
      {
        state: codeSection,
        regexp: /^\]/,
        token: 'REF_END',
      },
      {
        state: codeSection,
        regexp: /^[a-zA-Z0-9_$]+/,
        token: 'ID',
      },
    ],
  },
};

/**
 * issues:
 *
 *  2013-06-17 reduce shift conflicts!
 *   {{n - 1}} expression: n-1
 *   {{n -1}} param n(-1)
 *   remove support for -1
 *
 */
