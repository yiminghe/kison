# --no-compressSymbol --no-compressLexerState

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../ && npm run compile 

cd $SCRIPT_DIR/

npx kison --no-compressSymbol --no-compressLexerState --declaration --bnf=./llk.bnf -m llk -g ./llk-grammar.js

# npx kison --declaration -m ll -g ./ll-grammar.js

# npx kison -g ./lr-grammar.js

#npx rr -out:./llk.xhtml ./llk.bnf
