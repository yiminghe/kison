SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../../../ && yarn run compile 

cd $SCRIPT_DIR/../

yarn run kison --no-compressSymbol --no-compressLexerState --astNodeUserDataTypes=./grammar/es/astNodeUserDataTypes --bnf=./grammar/regexp.bnf --declaration -m ll --es -g ./grammar/es/regexp-grammar.ts -o ./src/parser.js

yarn run rr -out:./grammar/regexp.xhtml ./grammar/regexp.bnf
