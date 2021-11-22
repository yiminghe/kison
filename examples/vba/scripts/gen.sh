# --no-compressSymbol --no-compressLexerState

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../../../ && npm run compile 

cd $SCRIPT_DIR/../

npx babel ./grammar/es --out-dir ./grammar/tmp

# npx kison --declaration --no-compressSymbol --no-compressLexerState  --library=vbaParser  -m ll --es -g ./grammar/tmp/vba-grammar.js -o ./src/parserLL.js

npx kison --declaration --no-compressSymbol --no-compressLexerState --bnf=./grammar/vba.bnf --library=vbaParser -m llk --es -g ./grammar/tmp/vba-grammar.js -o ./src/parser.js

npx rr -out:./grammar/vba.xhtml ./grammar/vba.bnf
