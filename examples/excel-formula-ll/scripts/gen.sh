# --no-compressSymbol --no-compressLexerState

npx kison --no-compressSymbol --no-compressLexerState  --library=formulaParser --bnf=./grammar/formula.bnf -m ll --es -g ./grammar/formula-grammar.js -o ./src/parser.js

# npx rr -out:./grammar/formula.xhtml ./grammar/formula.bnf

npx kison --library=formulaParser --babel -m ll -g ./grammar/formula-grammar.js -o ./index.js