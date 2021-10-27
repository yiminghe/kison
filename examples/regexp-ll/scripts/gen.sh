SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../../../ && npm run compile 

cd $SCRIPT_DIR/../

npx babel ./grammar/es --out-dir ./grammar/tmp

npx kison --no-compressSymbol --no-compressLexerState --bnf=./grammar/regexp.bnf -m ll --es -g ./grammar/tmp/regexp-grammar.js -o ./src/parser.js

npx rr -out:./grammar/regexp.xhtml ./grammar/regexp.bnf
