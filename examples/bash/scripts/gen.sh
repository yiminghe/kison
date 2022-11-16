# --no-compressSymbol --no-compressLexerState

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../../../ && yarn run compile 

cd $SCRIPT_DIR/../

# npx kison --declaration --no-compressSymbol --no-compressLexerState  --library=bashParser  -m ll --es -g ./grammar/es/bash-grammar.ts -o ./src/parserLL.js

yarn run kison --declaration --no-compressSymbol --no-compressLexerState --bnf=./grammar/bash.bnf --library=bashParser -m llk --es -g ./grammar/es/bash-grammar.ts -o ./src/parser.js

yarn run rr -out:./grammar/bash.xhtml ./grammar/bash.bnf
