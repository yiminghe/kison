# --no-compressSymbol --no-compressLexerState

npx babel ./grammar/es --out-dir ./grammar/lib

# npx kison --declaration --no-compressSymbol --no-compressLexerState  --library=vbaParser  -m ll --es -g ./grammar/lib/vba-grammar.js -o ./src/parserLL.js



npx kison --declaration --no-compressSymbol --no-compressLexerState --bnf=./grammar/vba.bnf --library=vbaParser -m llk --es -g ./grammar/lib/vba-grammar.js -o ./src/parserLLK.js



npx rr -out:./grammar/vba.xhtml ./grammar/vba.bnf
