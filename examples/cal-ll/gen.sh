SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../../ && npm run compile 

cd $SCRIPT_DIR/

npx kison --no-compressSymbol  --no-compressLexerState --declaration --bnf=./cal.bnf -m ll --es -g cal-grammar.js -o ./calLL.js

npx kison --no-compressSymbol  --no-compressLexerState --declaration -m llk --es -g cal-grammar.js -o ./calLLK.js

npx rr -out:./cal.xhtml ./cal.bnf
