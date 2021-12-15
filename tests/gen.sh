# --no-compressSymbol --no-compressLexerState

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../ && yarn run compile 

cd $SCRIPT_DIR/

yarn run kison --no-compressSymbol --no-compressLexerState --declaration --bnf=./llk.bnf -m llk -g ./llk-grammar.js

yarn run kison --no-compressSymbol --no-compressLexerState --declaration -m ll -g ./ll-grammar.js

yarn run kison -g ./lr-grammar.js

yarn run rr -out:./llk.xhtml ./llk.bnf
