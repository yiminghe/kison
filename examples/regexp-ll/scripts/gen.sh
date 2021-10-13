npx babel ./grammar/es --out-dir ./grammar/tmp

npx kison --no-compressSymbol --no-compressLexerState --bnf=./grammar/regexp.bnf -m ll --es -g ./grammar/tmp/regexp-grammar.js -o ./src/parser.js

npx rr -out:./grammar/regexp.xhtml ./grammar/regexp.bnf
