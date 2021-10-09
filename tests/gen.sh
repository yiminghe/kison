npx kison --no-compressSymbol --no-compressLexerState --declaration --bnf=./llk.bnf -m llk -g llk-grammar.js

#npx rr -out:./llk.xhtml ./llk.bnf

npx kison --declaration --no-compressSymbol  --no-compressLexerState -m ll -g ll-grammar.js

#npx kison -g lr-grammar.js
