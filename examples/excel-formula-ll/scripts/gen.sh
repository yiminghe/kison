# --no-compressSymbol --no-compressLexerState

npx kison --declaration --no-compressSymbol --no-compressLexerState  --library=formulaParser --bnf=./grammar/formula.bnf -m ll --es -g ./grammar/formula-grammar.js -o ./src/parserLL.js



npx kison --declaration --no-compressSymbol --no-compressLexerState  --library=formulaParser -m llk --es -g ./grammar/formula-grammar.js -o ./src/parserLLK.js



npx rr -out:./grammar/formula.xhtml ./grammar/formula.bnf
