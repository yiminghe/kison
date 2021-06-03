# kison

[![kison For Nodejs](https://nodei.co/npm/kison.png)](https://npmjs.org/package/kison)
[![NPM version](https://badge.fury.io/js/kison.png)](http://badge.fury.io/js/kison)
[![NPM downloads](http://img.shields.io/npm/dm/kison.svg)](https://npmjs.org/package/kison)
[![Build Status](https://travis-ci.org/yiminghe/kison.svg?branch=master)](https://travis-ci.org/yiminghe/kison)


A parser generator for javascript originated in KISSY. (LALR/LL)

## example

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
            },
            {
                // force to match one for error message
                regexp: /^./,
                token: 'ERROR_LA'
            }
        ]
    }
};
```
#### LL

cal-grammar.js:

``` javascript
module.exports = () => ({
  productions: [
    {
      symbol: "Exp",
      rhs: ["AddExp"]
    },
    {
      symbol: "AddExp",
      rhs: ["MulExp", "AddExp1"]
    },
    {
      symbol: "AddExp1",
      rhs: [
        "+",
        function(astProcessor) {
          astProcessor.pushStack(lexer.text);
        },
        "MulExp",
        function(astProcessor) {
          astProcessor.createOpNode("+");
        },
        "AddExp1"
      ]
    },
    {
      symbol: "AddExp1",
      rhs: []
    },
    {
      symbol: "MulExp",
      rhs: ["PrimExp", "MulExp1"]
    },
    {
      symbol: "MulExp1",
      rhs: [
        "*",
        function(astProcessor) {
          astProcessor.pushStack(lexer.text);
        },
        "PrimExp",
        function(astProcessor) {
          astProcessor.createOpNode("*");
        },
        "MulExp1"
      ]
    },
    {
      symbol: "MulExp1",
      rhs: []
    },
    {
      symbol: "PrimExp",
      rhs: [
        "NUMBER",
        function(astProcessor, lexer) {
          astProcessor.pushStack(Number(lexer.text));
        }
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
        // force to match one for error message
        regexp: /^./,
        token: "ERROR_LA"
      }
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

ll parser generator, need to eliminate left recursive.

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

### 0.4.0-alpha.1 - 2021/06/03

* support ll parser
* change config

### 0.3.0 - 2014/08/25

* optimize error debug info