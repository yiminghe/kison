var Kison = require('../../lib/');
var Grammar = Kison.Grammar;
var grammar = new Grammar({
    productions: [
        {
            symbol: 'a',
            rhs: [
                'A'
            ]
        },
        {
            symbol:'d',
            rhs:['D']
        },
        {
            symbol: 'd',
            rhs: [
                'd',
                'E'
            ]
        },
        {
            symbol: 'd',
            rhs: [
                'd',
                'b'
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

var code = grammar.genCode();
// console.log(code);
// console.log(JSON.stringify(grammar.table));
// console.log(grammar.visualizeTable());
var parser = Function.call(null, code+'\n return parser;')();
console.log(parser.parse('a'));