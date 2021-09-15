npx kison --no-compressSymbol --no-compressLexerState --bnf=./grammar/regexp.bnf -m ll --es -g ./grammar/regexp-grammar.js -o ./src/parser.js

npx rr -out:./grammar/regexp.xhtml ./grammar/regexp.bnf
