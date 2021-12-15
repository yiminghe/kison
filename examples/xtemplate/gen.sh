SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../../ && yarn run compile 

cd $SCRIPT_DIR/

yarn run kison -g parser-grammar.js