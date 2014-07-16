var Kison = require('../../lib/');
var Grammar = Kison.Grammar;
var Utils = Kison.Utils;
var expect = require('chai').expect;

/*jshint quotmark:false*/
describe("kison", function () {
    it('escape correctly', function () {
        expect(Utils.escapeString("'\\")).to.equal("\\'\\\\");
        expect(Function.call(null, "return '" + Utils.escapeString("'\\") + "'")()).to.equal("'\\");
    });

    // 4-41 文法 GOTO 图
    it("generate goto map ok", function () {
        var grammar = new Grammar({
            productions: [
                {
                    symbol: "S0",
                    rhs: [
                        "S"
                    ]
                },
                {
                    symbol: "S",
                    rhs: [
                        "C", "C"
                    ]
                },
                {
                    symbol: "C",
                    rhs: [
                        "c", "C"
                    ]
                },
                {
                    symbol: "C",
                    rhs: [
                        "d"
                    ]
                }
            ],
            lexer: {
                rules: [
                    {
                        regexp: /^c/,
                        token: 'c'
                    },
                    {
                        regexp: /^d/,
                        token: 'd'
                    }
                ]
            }
        });

        grammar.build();

        var itemSets = grammar.itemSets;

        expect(itemSets.length).to.equal(8);

        var i1gotos = itemSets[1].gotos;

        var cItem = itemSets[0].gotos.c;
        expect(cItem === itemSets[1]).to.equal(true);
        var num = 0;

        for (var symbol in i1gotos) {
            var itemSet = i1gotos[symbol];
            if (symbol === "c") {
                expect(itemSet === itemSets[1]).to.equal(true);
            }
            num++;
        }

        expect(num).to.equal(3);
    });

    it("generate table ok", function () {
        var grammar = new Grammar({
            productions: [
                {
                    symbol: "S0",
                    rhs: [
                        "S"
                    ]
                },
                {
                    symbol: "S",
                    rhs: [
                        "C", "C"
                    ]
                },
                {
                    symbol: "C",
                    rhs: [
                        "c", "C"
                    ]
                },
                {
                    symbol: "C",
                    rhs: [
                        "d"
                    ]
                }
            ],
            lexer: {
                rules: [
                    {
                        regexp: /^c/,
                        token: 'c'
                    },
                    {
                        regexp: /^d/,
                        token: 'd'
                    }
                ]
            }
        });

        grammar.build();

        grammar.visualizeTable();
    });

    it("parse ok", function () {
        var grammar = new Grammar({
            productions: [
                {
                    symbol: "S0",
                    rhs: [
                        "S"
                    ]
                },
                {
                    symbol: "S",
                    rhs: [
                        "C", "C"
                    ]
                },
                {
                    symbol: "C",
                    rhs: [
                        "c", "C"
                    ]
                },
                {
                    symbol: "C",
                    rhs: [
                        "d"
                    ]
                }
            ],
            lexer: {
                rules: [
                    {
                        regexp: /^c/,
                        token: 'c'
                    },
                    {
                        regexp: /^d/,
                        token: 'd'
                    }
                ]
            }
        });
        var code = grammar.genCode(true);
        expect(Function.call(null, code+'\n return parser;')().parse("ccdd")).not.to.equal(false);
    });

    it("can not parse invalid input", function () {
        var grammar = new Grammar({
            productions: [
                {
                    symbol: "S0",
                    rhs: [
                        "S"
                    ]
                },
                {
                    symbol: "S",
                    rhs: [
                        "C", "C"
                    ]
                },
                {
                    symbol: "C",
                    rhs: [
                        "c", "C"
                    ]
                },
                {
                    symbol: "C",
                    rhs: [
                        "d"
                    ]
                }
            ],
            lexer: {
                rules: [
                    {
                        regexp: /^c/,
                        token: 'c'
                    },
                    {
                        regexp: /^d/,
                        token: 'd'
                    }
                ]
            }
        });

        expect(function () {
            Function.call(null, grammar.genCode()+'\n return parser;')().parse("dc");
        }).to['throw']('syntax error at line 1:\ndc\n--^\n' +
            'expect shift:c, shift:d');

    });

    it("can not parse invalid input in compress mode", function () {
        var grammar = new Grammar({
            productions: [
                {
                    symbol: "S0",
                    rhs: [
                        "S"
                    ]
                },
                {
                    symbol: "S",
                    rhs: [
                        "C", "C"
                    ]
                },
                {
                    symbol: "C",
                    rhs: [
                        "c", "C"
                    ]
                },
                {
                    symbol: "C",
                    rhs: [
                        "d"
                    ]
                }
            ],
            lexer: {
                rules: [
                    {
                        regexp: /^c/,
                        token: 'c'
                    },
                    {
                        regexp: /^d/,
                        token: 'd'
                    }
                ]
            }
        });

        expect(function () {
            Function.call(null, grammar.genCode({
                compressSymbol: 1
            })+'\n return parser;')().parse("dc");
        }).to['throw']('syntax error at line 1:\ndc\n--^\n' +
            'expect shift:c, shift:d');

    });

    describe('state', function () {
        it('can parse', function () {
            var log = [];
            var grammar = new Grammar({
                productions: [
                    {
                        symbol: "S",
                        rhs: [
                            "a", "b"
                        ],
                        action: function () {
                            this.yy.log.push(this.$1);
                            this.yy.log.push(this.$2);
                        }
                    }
                ],
                lexer: {
                    rules: [
                        {
                            regexp: /^a/,
                            token: 'a',
                            action: function () {
                                this.pushState('b');
                            }
                        },
                        {
                            regexp: /^b/,
                            state: ['b'],
                            token: 'b',
                            action: function () {
                                this.popState();
                            }
                        }
                    ]
                }
            });

            var parser = Function.call(null, grammar.genCode({
                compressSymbol: 0
            })+'\n return parser;')();

            parser.yy = {
                log: log
            };

            expect(function () {
                parser.parse("ab");
            }).not.to['throw'](undefined);

            expect(log.length).to.equal(2);

            expect(log[0]).to.equal('a');

            expect(log[1]).to.equal('b');
        });

        it('can not parse', function () {
            var log = [];
            var grammar = new Grammar({
                productions: [
                    {
                        symbol: "S",
                        rhs: [
                            "a", "b", "b"
                        ],
                        action: function () {
                            this.yy.log.push(this.$1);
                            this.yy.log.push(this.$2);
                        }
                    }
                ],
                lexer: {
                    rules: [
                        {
                            regexp: /^a/,
                            token: 'a',
                            action: function () {
                                this.pushState('b');
                            }
                        },
                        {
                            regexp: /^b/,
                            state: ['b'],
                            token: 'b',
                            action: function () {
                                this.popState();
                            }
                        }
                    ]
                }
            });
            var parser = Function.call(null, grammar.genCode({
                compressSymbol: 1
            })+'\n return parser;')();

            parser.yy = {
                log: log
            };

            expect(function () {
                parser.parse("abb");
            }).to['throw']('syntax error at line 1:\n' +
                'abb\n' +
                '--^\nexpect shift:b');
        });

        it('can not parse when compress', function () {
            var log = [];
            var grammar = new Grammar({
                productions: [
                    {
                        symbol: "S",
                        rhs: [
                            "a", "b", "b"
                        ],
                        action: function () {
                            this.yy.log.push(this.$1);
                            this.yy.log.push(this.$2);
                        }
                    }
                ],
                lexer: {
                    rules: [
                        {
                            regexp: /^a/,
                            token: 'a',
                            action: function () {
                                this.pushState('b');
                            }
                        },
                        {
                            regexp: /^b/,
                            state: ['b'],
                            token: 'b',
                            action: function () {
                                this.popState();
                            }
                        }
                    ]
                }
            });
            var parser = Function.call(null, grammar.genCode({
                compressSymbol: 0
            })+'\n return parser;')();

            parser.yy = {
                log: log
            };

            expect(function () {
                parser.parse("abb");
            }).to['throw']('syntax error at line 1:\n' +
                'abb\n' +
                '--^\nexpect shift:b');
        });
    });

    it("parse ok with action", function () {
        // S.log("---------------- parse ok with action : ccdd by ");
        // S.log(" S0 => S ");
        // S.log(" S => CC ");
        // S.log(" C => cC ");
        // S.log(" C => d ");
        // S.log("------------------------------------------------\n");

        // S0 => S
        // S => CC
        // C => cC
        // C => d

        var grammar = new Grammar({
            productions: [
                {
                    symbol: "S0",
                    rhs: [
                        "S"
                    ],
                    action: function () {
                        var ret = global.TEST_RET || (global.TEST_RET = []);
                        ret.push("S0 => S");
                        ret.push("|_____ " + this.$1 + " -> S0");
                        ret.push("");
                    }
                },
                {
                    symbol: "S",
                    rhs: [
                        "C", "C"
                    ],
                    action: function () {
                        var ret = global.TEST_RET || (global.TEST_RET = []);
                        ret.push("S => C C");
                        ret.push("|_____ " + this.$1 + " + " + this.$2 + " -> S");
                        ret.push("");
                        return this.$1 + this.$2;
                    }
                },
                {
                    symbol: "C",
                    rhs: [
                        "c", "C"
                    ],
                    action: function () {
                        var ret = global.TEST_RET || (global.TEST_RET = []);
                        ret.push("C => c C");
                        ret.push("|_____ " + this.$1 + " + " + this.$2 + " -> C");
                        ret.push("");
                        return this.$1 + this.$2;
                    }
                },
                {
                    symbol: "C",
                    rhs: [
                        "d"
                    ],
                    action: function () {
                        var ret = global.TEST_RET || (global.TEST_RET = []);
                        ret.push("C => d");
                        ret.push("|_____ " + this.$1 + " -> C");
                        ret.push("");
                        return this.$1;
                    }
                }
            ],
            lexer: {
                rules: [
                    {
                        regexp: /^c/,
                        token: 'c'
                    },
                    {
                        regexp: /^d/,
                        token: 'd'
                    }
                ]
            }
        });

        expect(function () {
            Function.call(null, grammar.genCode()+'\n return parser;')().parse("ccdd");
        }).not.to['throw'](undefined);
    });
});