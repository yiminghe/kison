# kison

[![kison For Nodejs](https://nodei.co/npm/kison.png)](https://npmjs.org/package/kison)
[![NPM version](https://badge.fury.io/js/kison.png)](http://badge.fury.io/js/kison)
[![NPM downloads](http://img.shields.io/npm/dm/kison.svg)](https://npmjs.org/package/kison)
[![Build Status](https://travis-ci.org/yiminghe/kison.svg?branch=master)](https://travis-ci.org/yiminghe/kison)


A parser generator for javascript originated in KISSY. (LALR/LL)

## example

### grammar and lexer definition

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

### run command

defaults to lalr parser generator

```
kison -g cal-grammar.js
```

or

ll parser generator, need to eliminate left recursive. (TODO)

```
kison -m ll -g cal-grammar.js
```


### generated parser

cal.js:

``` javascript
(function(){
    var parser = {
        parse: function(){
            // ...
        }
    }
    return parser;
})();
```

### run parser

``` javascript
    parser.parse('1+2') // => 3
    parser.parse('2-1') // => 1
    parser.parse('2a') // => syntax error at line 1: 2^a expect NUMBER
```

## changelog

### 0.4.0-alpha.0 - 2021/06/02

* support ll parser
* change config

### 0.3.0 - 2014/08/25

* optimize error debug info