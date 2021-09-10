npx kison --no-compressSymbol --bnf=./cal.bnf -m ll --es -g cal-grammar.js

npx rr -out:./cal.xhtml ./cal.bnf
