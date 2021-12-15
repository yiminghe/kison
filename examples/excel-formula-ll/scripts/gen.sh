# --no-compressSymbol --no-compressLexerState

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../../../ && yarn run compile 

cd $SCRIPT_DIR/../

yarn run babel ./grammar/es --out-dir ./grammar/tmp

yarn run kison --declaration --no-compressSymbol --no-compressLexerState  --library=formulaParser --bnf=./grammar/formula.bnf -m ll --es -g ./grammar/tmp/formula-grammar.js -o ./src/parser.js

yarn run rr -out:./grammar/formula.xhtml ./grammar/formula.bnf
