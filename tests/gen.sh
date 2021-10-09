npx kison --declaration --bnf=./llk.bnf -m llk -g llk-grammar.js

npx rr -out:./llk.xhtml ./llk.bnf

npx kison --declaration -m ll -g ll-grammar.js

npx kison -g lr-grammar.js
