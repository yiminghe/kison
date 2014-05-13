#!/usr/bin/env node

/**
 * Generate parser function using LALR algorithm.
 * @author yiminghe@gmail.com
 */
var program = require('./commander');
program
    .option('-g, --grammar <grammar>', 'Set kison grammar file')
    .option('-e, --encoding [encoding]', 'Set grammar file encoding', 'utf-8')
    .option('-n, --name [name]', 'Set file name')
    .option('-w, --watch', 'Watch grammar file change')
    .option('-k, --kissy', 'Generate kissy module format')
    // defaults bool true
    .option('--no-compressSymbol', 'Set compress symbol', true)
    .option('--compressLexerState', 'Set compress lexer state')
    .parse(process.argv);

var Utils = require('../lib/utils'),
    KISON = require('../lib/'),
/*jshint camelcase:false*/
    js_beautify = require('js-beautify').js_beautify,
    fs = require('fs'),
    path = require('path'),
    grammar = path.resolve(program.grammar),
    encoding = program.encoding;

var kisonCfg = {
    compressLexerState: program.compressLexerState,
    compressSymbol: program.compressSymbol
};

var grammarBaseName = program.name ? program.name : path.basename(grammar, '-grammar.kison');
var modulePath = path.resolve(grammar, '../' + grammarBaseName + '.js');

var codeTemplate = '' +
    '/*\n' +
    '  Generated by kison.' +
    '*/\n' +
    '(function(undefined){\n' +
    '/*jshint quotmark:false, loopfunc:true, indent:false, unused:false, asi:true, boss:true*/\n' +
    '{code}\n' +
    '})();';

var kissyCodeTemplate = '' +
    '/*\n' +
    '  Generated by kison.' +
    '*/\n' +
    'KISSY.add(function(_, undefined){\n' +
    '/*jshint quotmark:false, loopfunc:true, indent:false, unused:false, asi:true, boss:true*/\n' +
    '{code}\n' +
    '});';

function my_js_beautify(str) {
    //return str;
    var opts = {
        'indent_size': '4',
        'indent_char': ' ',
        'preserve_newlines': true,
        'brace_style': 'collapse',
        'keep_array_indentation': false,
        'space_after_anon_function': true
    };
    return js_beautify(str, opts);
}

function genParser() {
    var grammarContent = fs.readFileSync(grammar, encoding);

    console.info('start generate grammar module: ' + modulePath + '\n');
    var start = Date.now();
    /*jshint evil:true*/
    var code = new KISON.Grammar(eval(grammarContent)).genCode(kisonCfg);

    var moduleCode = my_js_beautify(Utils.substitute(
        program.kissy ? kissyCodeTemplate : codeTemplate, {
            code: code
        }));

    fs.writeFileSync(modulePath, moduleCode, encoding);

    console.info('generate grammar module: ' + modulePath + ' at ' + (new Date().toLocaleString()));
    console.info('duration: ' + (Date.now() - start) + 'ms');
}

var bufferCompile = Utils.buffer(genParser);

if (program.watch) {
    fs.watch(grammar, bufferCompile);
    genParser();
} else {
    bufferCompile();
}
