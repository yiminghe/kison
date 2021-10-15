# --no-compressSymbol --no-compressLexerState

npx kison --no-compressSymbol --no-compressLexerState --declaration --bnf=./llk.bnf -m llk -g ./llk-grammar.js

npx kison --declaration -m ll -g ./ll-grammar.js

npx kison -g ./lr-grammar.js

#npx rr -out:./llk.xhtml ./llk.bnf
