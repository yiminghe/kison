# kison

[![kison For Nodejs](https://nodei.co/npm/kison.png)](https://npmjs.org/package/kison)
[![NPM version](https://badge.fury.io/js/kison.png)](http://badge.fury.io/js/kison)
[![NPM downloads](http://img.shields.io/npm/dm/kison.svg)](https://npmjs.org/package/kison)
[![Build Status](https://travis-ci.org/yiminghe/kison.svg?branch=master)](https://travis-ci.org/yiminghe/kison)

[https://yiminghe.me/kison](https://yiminghe.me/kison)

[https://github.com/yiminghe/kison](https://github.com/yiminghe/kison)

A LALR/LL parser generator for javascript originated from [KISSY XTemplate](https://github.com/xtemplate/xtemplate)

## examples

[https://yiminghe.me/kison/examples/](https://yiminghe.me/kison/examples/)

### grammar and lexer definition

#### LALR

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
#### LL

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

### run command

#### params

- es: generate es module `kison --es -g cal-grammar.js`

#### LALR

```
kison -g cal-grammar.js
```

#### LL

ll parser generator

```
kison -m ll -g cal-grammar.js
```

### run parser

``` javascript
    parser.parse('1+2') // => 3
    parser.parse('2-1') // => 1
    parser.parse('2a') // => syntax error at line 1: 2^a expect NUMBER
```

## changelog

### 0.4.1 - 2021/06/23

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