# kison

[![kison For Nodejs](https://nodei.co/npm/kison.png)](https://npmjs.org/package/kison)
[![NPM version](https://badge.fury.io/js/kison.png)](http://badge.fury.io/js/kison)
[![NPM downloads](http://img.shields.io/npm/dm/kison.svg)](https://npmjs.org/package/kison)
[![Build Status](https://travis-ci.com/yiminghe/kison.svg?branch=master)](https://travis-ci.com/yiminghe/kison)

[https://yiminghe.me/kison](https://yiminghe.me/kison)

[https://github.com/yiminghe/kison](https://github.com/yiminghe/kison)

A LALR(1)/LL(1) parser generator for javascript originated from [KISSY XTemplate](https://github.com/xtemplate/xtemplate)

## examples

[https://yiminghe.me/kison/examples/](https://yiminghe.me/kison/examples/)


### excel-formula

[excel-formula](https://yiminghe.me/kison/examples/excel-formula-ll/):

[![excel-formula](https://nodei.co/npm/@yiminghe/excel-formula.png)](https://npmjs.org/package/%40yiminghe%2Fexcel-formula)
[![npm version](https://badge.fury.io/js/%40yiminghe%2Fexcel-formula.svg)](https://badge.fury.io/js/%40yiminghe%2Fexcel-formula)
[![NPM downloads](https://img.shields.io/npm/dm/@yiminghe/excel-formula.svg)](https://npmjs.org/package/%40yiminghe%2Fexcel-formula)


### async regexp in javascript

[regexp](https://yiminghe.me/kison/examples/regexp-ll/):

[![regexp](https://nodei.co/npm/@yiminghe/regexp.png)](https://npmjs.org/package/%40yiminghe%2Fregexp)
[![npm version](https://badge.fury.io/js/%40yiminghe%2Fregexp.svg)](https://badge.fury.io/js/%40yiminghe%2Fregexp)
[![NPM downloads](https://img.shields.io/npm/dm/@yiminghe/regexp.svg)](https://npmjs.org/package/%40yiminghe%2Fregexp)

## run command

```
npx kison -g xx-grammar.js
```

## grammar and lexer definition

### LALR

cal-grammar.js: support operator precedence

``` javascript
module.exports = {
  productions: [
    {
      symbol: 'Exp',
      rhs: ['primaryExpression'],
    },

    {
      symbol: 'Exp',
      rhs: ['Exp', '^', 'Exp'],
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
      symbol: 'Exp',
      rhs: ['Exp', '-', 'Exp'],
      action() {
        return { v: this.$1.v - this.$3.v, l: this.$1, r: this.$3, op: '-' };
      },
    },
    {
      symbol: 'Exp',
      rhs: ['Exp', '*', 'Exp'],
      action() {
        return { v: this.$1.v * this.$3.v, l: this.$1, r: this.$3, op: '*' };
      },
    },
    {
      symbol: 'Exp',
      rhs: ['Exp', '/', 'Exp'],
      action() {
        return { v: this.$1.v / this.$3.v, l: this.$1, r: this.$3, op: '/' };
      },
    },
    {
      symbol: 'Exp',
      precedence: 'UMINUS',
      rhs: ['-', 'Exp'],
      action() {
        return { v: -this.$2.v, op: 'UMINUS' };
      },
    },
    {
      symbol: 'Exp',
      rhs: ['Exp', '+', 'Exp'],
      action() {
        return { v: this.$1.v + this.$3.v, l: this.$1, r: this.$3, op: '+' };
      },
    },
    {
      symbol: 'primaryExpression',
      rhs: ['(', 'Exp', ')'],
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
### LL

cal-grammar.js: support direct left recursive and operator precedence. 

``` javascript
module.exports = () => ({
  productions: [
    {
      symbol: 'exp',
      rhs: ['exp', '+', 'exp'],
      label: 'add-exp',
    },
    {
      symbol: 'exp',
      rhs: ['exp', '-', 'exp'],
    },
    {
      symbol: 'exp',
      rhs: ['exp', '*', 'exp'],
    },
    {
      symbol: 'exp',
      rhs: ['exp', '/', 'exp'],
    },
    {
      symbol: 'exp',
      rhs: ['exp', '^', 'exp'],
    },
    {
      symbol: 'exp',
      rhs: [
        '-',
        'exp',
      ],
      precedence: 'UMINUS',
    },
    {
      symbol: 'exp',
      rhs: [
        'NUMBER',
      ],
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
        regexp: /^\s+/,
        token: '$HIDDEN',
      },
      {
        regexp: /^[0-9]+(\.[0-9]+)?\b/,
        token: "NUMBER"
      },
    ]
  }
});
```

## command options

- es: generate es module `npx kison --es -g cal-grammar.js`
- g: grammar file
- m: ll or lalr
- babel: use babel to transform code. need install @babel/core@7.x and @babel/preset-env manually

### LALR

```
npx kison -g cal-grammar.js
```

### LL

ll parser generator

```
npx kison -m ll -g cal-grammar.js
```

## changelog

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
