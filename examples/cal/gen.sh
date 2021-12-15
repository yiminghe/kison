SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../../ && yarn run compile 

cd $SCRIPT_DIR/

yarn run kison --bnf=./cal.bnf --es -g ./cal-grammar.js 

yarn run rr -out:./cal.xhtml ./cal.bnf

