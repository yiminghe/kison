# --no-compressSymbol --no-compressLexerState

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../../../ && npm run compile 

cd $SCRIPT_DIR/../

npx babel ./grammar/es --out-dir ./grammar/tmp

npx kison --declaration --no-compressSymbol --no-compressLexerState  --library=formulaParser --bnf=./grammar/formula.bnf -m ll --es -g ./grammar/tmp/formula-grammar.js -o ./src/parserLL.js

npx kison --declaration --no-compressSymbol --no-compressLexerState  --library=formulaParser -m llk --es -g ./grammar/tmp/formula-grammar.js -o ./src/parserLLK.js

npx rr -out:./grammar/formula.xhtml ./grammar/formula.bnf
