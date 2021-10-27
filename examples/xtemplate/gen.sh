SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../../ && npm run compile 

cd $SCRIPT_DIR/

npx kison -g parser-grammar.js