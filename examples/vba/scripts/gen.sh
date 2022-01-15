# --no-compressSymbol --no-compressLexerState

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../../../ && yarn run compile 

cd $SCRIPT_DIR/../

# npx kison --declaration --no-compressSymbol --no-compressLexerState  --library=vbaParser  -m ll --es -g ./grammar/es/vba-grammar.ts -o ./src/parserLL.js

yarn run kison --declaration --no-compressSymbol --no-compressLexerState --bnf=./grammar/vba.bnf --library=vbaParser -m llk --es -g ./grammar/es/vba-grammar.ts -o ./src/parser.js

yarn run rr -out:./grammar/vba.xhtml ./grammar/vba.bnf
