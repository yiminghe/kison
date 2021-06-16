var RegexEscape = require("regex-escape");

const operators = [
    ['='],
    ['<=', '>=', '<>', 'NOT', '||'],
    ['<', '>'],
    ['+', '-'], ['*', '/'], ['^'],
    ['&'],
    ['%']
];


const operatorTokens = [].concat(...operators);

const rightOperatorMap = {
    // "^": 1
};

function generateOpProductions() {
    const ret = [];
    operators.forEach((o, index) => {
        if (index === operators.length - 1) {
            return;
        }
        const next = operators[index + 1][0];
        const current = operators[index][0];
        const exp = `exp${current}`;
        const nextExp = `exp${next}`;
        ret.push({
            symbol: exp,
            rhs: [nextExp],
            label: "single-exp"
        });
        if (rightOperatorMap[current]) {
            for (const o of operators[index]) {
                ret.push({
                    symbol: exp,
                    rhs: [
                        nextExp,
                        o,
                        function (astProcessor, lexer) {
                            astProcessor.pushStack(lexer.text);
                        },
                        exp,
                        function (astProcessor) {
                            astProcessor.createOpNode();
                        }
                    ],
                    label: "single-exp"
                });
            }
        } else {
            for (const o of operators[index]) {
                ret.push({
                    symbol: exp,
                    rhs: [
                        exp,
                        o,
                        function (astProcessor, lexer) {
                            astProcessor.pushStack(lexer.text);
                        },
                        nextExp,
                        function (astProcessor) {
                            astProcessor.createOpNode();
                        }
                    ],
                    label: "single-exp"
                });
            }
        }
    });
    return ret;
}

const startExp = "exp" + operators[0][0];

function createRules(tokens) {
    return tokens.map((token) => {
        return {
            regexp: new RegExp('^' + RegexEscape(token)),
            token,
        };
    });
}

module.exports = () => ({
    productions: [
        {
            symbol: 'formula',
            rhs: ['expression'],
        },
        {
            symbol: 'expression',
            rhs: [startExp],
            label: 'single-exp',
        },
        ...generateOpProductions(),
        {
            symbol: 'exp%',
            rhs: ['exp%', '%'],
            label: 'single-exp',
        },
        {
            symbol: 'exp%',
            rhs: ['prefix-exp'],
            label: 'single-exp',
        },
        {
            symbol: 'prefix-exp',
            rhs: ['-', 'prefix-exp'],
            label: 'single-exp',
        },
        {
            symbol: 'prefix-exp',
            rhs: ['+', 'prefix-exp'],
            label: 'single-exp',
        },
        {
            symbol: 'prefix-exp',
            rhs: ['atom-exp'],
            label: 'single-exp',
        },
        {
            symbol: 'atom-exp',
            rhs: ['(', startExp, ')'],
            label: 'single-exp',
        },
        {
            symbol: 'atom-exp',
            rhs: ['NUMBER'],
            label: 'number-exp',
        },
        {
            symbol: 'atom-exp',
            rhs: ['STRING'],
            label: 'string-exp',
        },
        {
            symbol: 'atom-exp',
            rhs: ['ERROR'],
            label: 'error-exp',
        },
        {
            symbol: 'atom-exp',
            rhs: ['cell'],
            label: 'single-exp',
        },
        {
            symbol: 'atom-exp',
            rhs: ['function'],
            label: 'single-exp',
        },
        {
            symbol: 'function',
            rhs: ['FUNCTION', '(', ')'],
        },
        {
            symbol: 'function',
            rhs: ['FUNCTION', '(', 'arguments', ')'],
        },
        {
            symbol: 'arguments',
            rhs: [startExp]
        },
        {
            symbol: 'arguments',
            rhs: ['arguments', 'ARGUMENT_SEPARATOR', startExp]
        },
        {
            symbol: 'cell',
            rhs: ['ABSOLUTE_CELL'],
        },
        {
            symbol: 'cell',
            rhs: ['RELATIVE_CELL'],
        },
        {
            symbol: 'cell',
            rhs: ['MIXED_CELL'],
        },
        {
            symbol: 'cell',
            rhs: ['ABSOLUTE_CELL', ':', 'ABSOLUTE_CELL'],
        },
        {
            symbol: 'cell',
            rhs: ['ABSOLUTE_CELL', ':', 'RELATIVE_CELL'],
        },
        {
            symbol: 'cell',
            rhs: ['ABSOLUTE_CELL', ':', 'MIXED_CELL'],
        },
        {
            symbol: 'cell',
            rhs: ['RELATIVE_CELL', ':', 'ABSOLUTE_CELL'],
        },
        {
            symbol: 'cell',
            rhs: ['RELATIVE_CELL', ':', 'RELATIVE_CELL'],
        },
        {
            symbol: 'cell',
            rhs: ['RELATIVE_CELL', ':', 'MIXED_CELL'],
        },
        {
            symbol: 'cell',
            rhs: ['MIXED_CELL', ':', 'ABSOLUTE_CELL'],
        },
        {
            symbol: 'cell',
            rhs: ['MIXED_CELL', ':', 'RELATIVE_CELL'],
        },
        {
            symbol: 'cell',
            rhs: ['MIXED_CELL', ':', 'MIXED_CELL'],
        },
    ],

    lexer: {
        rules: [
            {
                regexp: /^\s+/,
                token: "$HIDDEN"
            },
            {
                regexp: /^"(""|[^"])*"/,
                token: 'STRING',
                action() {
                    this.text = this.text.slice(1, -1).replace(/""/g, '"');
                },
            },
            {
                regexp: /^'(''|[^'])*'/,
                token: 'STRING',
                action() {
                    this.text = this.text.slice(1, -1).replace(/''/g, "'");
                },
            },
            {
                regexp: /[A-Za-z]+[A-Za-z_0-9\.]+(?=[(])/,
                token: 'FUNCTION',
            },
            {
                regexp: /^#[A-Z0-9\/]+(!|\?)? /,
                token: 'ERROR',
            },
            {
                regexp: /^\$[A-Za-z]+\$[0-9]+/,
                token: 'ABSOLUTE_CELL'
            },
            {
                regexp: /^\$[A-Za-z]+[0-9]+/,
                token: 'MIXED_CELL'
            },
            {
                regexp: /^[A-Za-z]+\$[0-9]+/,
                token: 'MIXED_CELL'
            },
            {
                regexp: /^[A-Za-z]+[0-9]+/,
                token: 'RELATIVE_CELL'
            },
            {
                regexp: /^[A-Za-z\.]+(?=[(])/,
                token: 'FUNCTION'
            },
            {
                regexp: /^[A-Za-z]+[A-Za-z_0-9]+/,
                token: 'VARIABLE'
            },
            {
                regexp: /^[A-Za-z_]+/,
                token: 'VARIABLE'
            },
            {
                regexp: /^\d+/,
                token: 'NUMBER',
            },
            ...createRules([
                '(', ')',
                ':',
                '{', '}', ';',
                ...operatorTokens,
            ]),
            {
                regexp: { en: /^,/, de: /^;/ },
                token: "ARGUMENT_SEPARATOR"
            },
            {
                regexp: /^NOT/,
                token: "NOT"
            },
            {
                regexp: /^./,
                token: "$ERROR"
            }
        ]
    }
});