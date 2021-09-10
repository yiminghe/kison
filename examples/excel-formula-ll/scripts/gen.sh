# --no-compressSymbol --no-compressLexerState

node ../../bin/kison --no-compressSymbol --no-compressLexerState  --library=formulaParser --bnf=./grammar/formula.bnf -m ll --es -g ./grammar/formula-grammar.js -o ./src/parser.js

node  ../../node_modules/@yiminghe/rr/rr -out:./grammar/formula.xhtml ./grammar/formula.bnf

node ../../bin/kison --library=formulaParser --babel -m ll -g ./grammar/formula-grammar.js -o ./index.js