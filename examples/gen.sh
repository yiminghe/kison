SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/

cd ../tests && sh gen.sh
cd ../examples/xtemplate && sh gen.sh
cd ../excel-formula-ll && npm run gen
cd ../cal-ll && sh gen.sh
cd ../regexp-ll && npm run gen
cd ../cal && sh gen.sh
cd ../vba && npm run gen