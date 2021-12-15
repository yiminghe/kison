SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../../../ && yarn run compile 

cd $SCRIPT_DIR/

yarn run kison --no-compressSymbol  --no-compressLexerState --declaration  --bnf=./cal.bnf -m ll --es -g cal-grammar.js -o ./calLL.js

yarn run kison --no-compressSymbol  --no-compressLexerState --declaration  -m llk --es -g cal-grammar.js -o ./calLLK.js

# npx rr -out:./cal.xhtml ./cal.bnf
