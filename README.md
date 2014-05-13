# kison

[![KISSY For Nodejs](https://nodei.co/npm/kison.png)](https://npmjs.org/package/kison)
[![NPM version](https://badge.fury.io/js/kison.png)](http://badge.fury.io/js/kison)
[![NPM downloads](http://img.shields.io/npm/dm/kison.svg)](https://npmjs.org/package/kison)
[![Build Status](https://secure.travis-ci.org/yiminghe.travis.yml/kison.png?branch=master)](https://travis-ci.org/yiminghe/kison)


A parser generator for javascript originated in KISSY

## example

### grammar and lexer definition

cal-grammar.kison:

``` javascript
(function () {
    return {
        productions: [
            {
                symbol: 'expressions',
                rhs: ['e']
            },

            {
                symbol: 'e',
                rhs: ['e', '-', 'e'],
                action: function () {
                    return this.$1 - this.$3;
                }
            },
            {
                symbol: 'e',
                rhs: ['e', '+', 'e'],
                action: function () {
                    return this.$1 + this.$3;
                }
            },
            {
                symbol: 'e',
                rhs: ['NUMBER'],
                action: function () {
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

})();
```

### run command

```
kison -g cal-grammar.kison
```

### generated parser

cal.js:

```
(function(){
    var parser = {
        parse: function(){
            // ...
        }
    }
    return parser;
})();
```
