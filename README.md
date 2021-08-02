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


### excel-formula-parser

[excel-formula-parser](https://yiminghe.me/kison/examples/excel-formula-ll/):

[![excel-formula-parser](https://nodei.co/npm/@yiminghe/excel-formula-parser.png)](https://npmjs.org/package/%40yiminghe%2Fexcel-formula-parser)
[![npm version](https://badge.fury.io/js/%40yiminghe%2Fexcel-formula-parser.svg)](https://badge.fury.io/js/%40yiminghe%2Fexcel-formula-parser)
[![NPM downloads](https://img.shields.io/npm/dm/@yiminghe/excel-formula-parser.svg)](https://npmjs.org/package/%40yiminghe%2Fexcel-formula-parser)


### regexp in javascript

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

cal-grammar.js:

``` javascript
module.exports = {
    productions: [
        {
            symbol: 'expressions',
            rhs: ['e']
        },

        {
            symbol: 'e',
            rhs: ['e', '-', 'e'],
            action() {
                return this.$1 - this.$3;
            }
        },
        {
            symbol: 'e',
            rhs: ['e', '+', 'e'],
            action() {
                return this.$1 + this.$3;
            }
        },
        {
            symbol: 'e',
            rhs: ['NUMBER'],
            action() {
                return Number(this.$1);
            }
        }
    ],

    lexer: {
        rules: [
            {
                regexp: /^\s+/
            },
            {
                regexp: /^[0-9]+(\.[0-9]+)?\b/,
                token: 'NUMBER'
            },
            {
                regexp: /^\+/,
                token: '+'
            },
            {
                regexp: /^-/,
                token: '-'
            }
        ]
    }
};
```
### LL

cal-grammar.js: support direct left recursive.

``` javascript
module.exports = () => ({
  productions: [
    {
      symbol: "Exp",
      rhs: ["AddExp"]
    },
    {
      symbol: "AddExp",
      rhs: ["MulExp"]
    },
    {
      symbol: "AddExp",
      rhs: [
        "AddExp",
        "+",
        "MulExp",
      ]
    },
    {
      symbol: "MulExp",
      rhs: ["PrimExp"]
    },
    {
      symbol: "MulExp",
      rhs: [
        "MulExp",
        "*",
        "PrimExp",
      ]
    },
    {
      symbol: "PrimExp",
      rhs: [
        "NUMBER",
      ]
    },
    {
      symbol: "PrimExp",
      rhs: ["(", "AddExp", ")"]
    }
  ],

  lexer: {
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

### 0.4.2 - 2021/06/24

* COMMON
  * add $HIDDEN token type 
  * use js config file
  * add excel formula demo
  * support filter for lexer config

* LL
  * support LL parser
  * support direct left recursive elimination and extract common prefix for LL
  * support parser tree auto return even if partly error
 
* LALR
  * support operator priority for LALR parser

### 0.3.0 - 2014/08/25

* optimize error debug info



<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css" />

<a class="github-fork-ribbon" href="https://github.com/yiminghe/kison" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
