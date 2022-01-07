# kison

[![NPM version](https://badge.fury.io/js/kison.png)](http://badge.fury.io/js/kison)
[![NPM downloads](http://img.shields.io/npm/dm/kison.svg)](https://npmjs.org/package/kison)
[![Build Status](https://app.travis-ci.com/yiminghe/kison.svg?branch=master)](https://app.travis-ci.com/github/yiminghe/kison)

[https://yiminghe.me/kison](https://yiminghe.me/kison)

[https://github.com/yiminghe/kison](https://github.com/yiminghe/kison)

A LALR(1)/LL(1)/LL(K) parser generator for `javascript`/`typescript`

## examples

[https://yiminghe.me/kison/examples/](https://yiminghe.me/kison/examples/)

- [xtemplate](https://github.com/xtemplate/xtemplate): an extensible template engine

[![npm version](https://badge.fury.io/js/xtemplate.svg)](https://badge.fury.io/js/xtemplate)
[![NPM downloads](https://img.shields.io/npm/dm/xtemplate.svg)](https://npmjs.org/package/xtemplate)

- [json](https://github.com/modulex/json): es5 compliant javascript implementation of JSON parser

[![npm version](https://badge.fury.io/js/modulex-json.svg)](https://badge.fury.io/js/modulex-json)
[![NPM downloads](https://img.shields.io/npm/dm/modulex-json.svg)](https://npmjs.org/package/modulex-json)

- [excel-formula](https://yiminghe.me/kison/examples/excel-formula-ll/): excel formula engine

[![npm version](https://badge.fury.io/js/%40yiminghe%2Fexcel-formula.svg)](https://badge.fury.io/js/%40yiminghe%2Fexcel-formula)
[![NPM downloads](https://img.shields.io/npm/dm/@yiminghe/excel-formula.svg)](https://npmjs.org/package/%40yiminghe%2Fexcel-formula)


- [regexp](https://yiminghe.me/kison/examples/regexp-ll/): regexp engine, written in typescript/javascript, [support async stream match](https://medium.com/@yiminghe/match-stream-data-using-regular-expression-a1a08b17ca2e)

[![npm version](https://badge.fury.io/js/%40yiminghe%2Fregexp.svg)](https://badge.fury.io/js/%40yiminghe%2Fregexp)
[![NPM downloads](https://img.shields.io/npm/dm/@yiminghe/regexp.svg)](https://npmjs.org/package/%40yiminghe%2Fregexp)

- [vba](https://yiminghe.me/kison/examples/vba/): vba engine, written in typescript/javascript

[![npm version](https://badge.fury.io/js/vba.svg)](https://badge.fury.io/js/vba)
[![NPM downloads](https://img.shields.io/npm/dm/vba.svg)](https://npmjs.org/package/vba)

## run command

```
npx kison@latest -g xx-grammar.js
```

## grammar and lexer definition

### LALR

cal-grammar.js: support operator precedence

``` javascript
module.exports = {
  productions: [
    {
      symbol: 'exp',
      rhs: ['primaryExpression'],
    },

    {
      symbol: 'exp',
      rhs: ['exp', '^', 'exp'],
      action() {
        return {
          v: Math.pow(this.$1.v, this.$3.v),
          l: this.$1,
          r: this.$3,
          op: '^',
        };
      },
    },
    {
      symbol: 'exp',
      rhs: ['exp', '-', 'exp'],
      action() {
        return { v: this.$1.v - this.$3.v, l: this.$1, r: this.$3, op: '-' };
      },
    },
    {
      symbol: 'exp',
      rhs: ['exp', '*', 'exp'],
      action() {
        return { v: this.$1.v * this.$3.v, l: this.$1, r: this.$3, op: '*' };
      },
    },
    {
      symbol: 'exp',
      rhs: ['exp', '/', 'exp'],
      action() {
        return { v: this.$1.v / this.$3.v, l: this.$1, r: this.$3, op: '/' };
      },
    },
    {
      symbol: 'exp',
      precedence: 'UMINUS',
      rhs: ['-', 'exp'],
      action() {
        return { v: -this.$2.v, op: 'UMINUS' };
      },
    },
    {
      symbol: 'exp',
      rhs: ['exp', '+', 'exp'],
      action() {
        return { v: this.$1.v + this.$3.v, l: this.$1, r: this.$3, op: '+' };
      },
    },
    {
      symbol: 'primaryExpression',
      rhs: ['(', 'exp', ')'],
      action() {
        return this.$2;
      },
    },
    {
      symbol: 'primaryExpression',
      rhs: ['NUMBER'],
      action() {
        return { v: Number(this.$1) };
      },
    },
  ],

  operators: [
    ['left', '+', '-'],
    ['left', '*', '/'],
    ['right', '^'],
    ['right', 'UMINUS'],
  ],

  lexer: {
    rules: [
      {
        regexp: /^\s+/,
        token: '$HIDDEN',
      },
      {
        regexp: /^[0-9]+(\.[0-9]+)?\b/,
        token: 'NUMBER'
      }
    ]
  }
};
```
### LL/LL(K)

cal-grammar.js: 

- LL(1) and LL(K) support:
  - direct left recursive 
  - operator precedence 
  - repeat notation(*/+) 
  - optional notation(?)
  - group notation('('/')')
  - alternative natation('|')
- LL(K) extra support:
  - lazy repeat notation(*?/+?)
  - lazy optional notation(??). 

``` javascript
const startGroup = `'('`;
const endGroup = `')'`;
const alternative = `'|'`;

module.exports = () => ({
  productions: [
    {
      symbol: 'program',
      rhs: ['statements'],
    },
    {
      symbol: 'statements',
      rhs: [startGroup, 'exp', 'NEW_LINE', endGroup + '*'],
    },
    {
      symbol: 'exp',
      rhs: [
        'exp', '+', 'exp',
        alternative,
        'exp', '-', 'exp',
        alternative,
        'exp', '*', 'exp',
        alternative,
        'exp', '/', 'exp',
        alternative,
        'exp', '^', 'exp',
      ],
      label: 'binary-exp',
    },
    {
      symbol: 'exp',
      rhs: ['-', 'exp'],
      precedence: 'UMINUS',
    },
    {
      symbol: 'exp',
      rhs: ['NUMBER'],
    },
    {
      symbol: 'exp',
      rhs: ['(', 'exp', ')'],
    },
  ],

  operators: [
    ['left', '+', '-'],
    ['left', '*', '/'],
    ['right', '^'],
    ['right', 'UMINUS'],
  ],

  lexer: {
    rules: [
      {
        regexp: /^\n/,
        token: 'NEW_LINE',
      },
      {
        regexp: /^\s+/,
        token: '$HIDDEN',
      },
      {
        regexp: /^[0-9]+(\.[0-9]+)?\b/,
        token: 'NUMBER',
      },
    ],
  },
});
```

## command options

- `--es`: generate es module
- `-g`: grammar file
- `-m`: ll or lalr or llk **(llk is powerful than ll but less performant!)**
- `--babel`: use babel to transform code. need install @babel/core@7.x and @babel/preset-env manually
- `--declaration`: generate d.ts type file for LL parser

### LALR

```
npx kison@latest -g cal-grammar.js
```

### LL

ll parser generator

```
npx kison@latest -m ll -g cal-grammar.js
```

## changelog

### 0.5.0 - 2021/09/30

- support '-m llk' support LL(K)

### 0.4.35 - 2021/09/22

- support `--declaration` to generate d.ts type for LL

### 0.4.x - 2021/06/24

* LL & LALR
  * add $HIDDEN token type 
  * use js config file
  * add excel formula demo
  * support filter for lexer config
  * support operator precedence

* LL
  * support LL parser
  * support direct left recursive elimination and extract common prefix for LL
  * support parser tree auto return even if partly error

### 0.3.0 - 2014/08/25

* optimize error debug info



<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css" />

<a class="github-fork-ribbon" href="https://github.com/yiminghe/kison" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
