SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/../../ && npm run compile 

cd $SCRIPT_DIR/

npx kison --bnf=./cal.bnf --es -g ./cal-grammar.js 

npx rr -out:./cal.xhtml ./cal.bnf

