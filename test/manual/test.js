var Kison = require('../../lib/');
var Grammar = Kison.Grammar;
var Utils = Kison.Utils;
var grammar = new Grammar({
    productions: [
        {
            symbol: "a",
            rhs: [
                "A",
                "d"
            ]
        },
        {
            symbol:'d',
            rhs:['D']
        },
        {
            symbol: "d",
            rhs: [
                "d",
                "E"
            ]
        },
        {
            symbol: "d",
            rhs: [
                "d",
                "b"
            ]
        },
        {
            symbol:'b',
            rhs:['B']
        }
    ],
    lexer: {
        rules: [
            {
                regexp: /^a/,
                token: 'A'
            },
            {
                regexp: /^b/,
                token: 'B'
            },
            {
                regexp: /^c/,
                token: 'C'
            },
            {
                regexp: /^d/,
                token: 'D'
            },
            {
                regexp: /^e/,
                token: 'E'
            }
        ]
    }
});
debugger
grammar.build();
var nonTerminals = grammar.nonTerminals;
console.log(grammar.visualizeTable());