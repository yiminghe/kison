node ../../bin/kison --no-compressSymbol --bnf=./grammar/regexp.bnf -m ll --es -g ./grammar/regexp-grammar.js -o ./src/parser.js

node  ../../node_modules/@yiminghe/rr/rr -out:./grammar/regexp.xhtml ./grammar/regexp.bnf
