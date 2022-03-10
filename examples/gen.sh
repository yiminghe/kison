SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/

cd ../tests && sh gen.sh
cd ../examples/xtemplate && yarn run gen
cd ../excel-formula-engine && yarn run gen
cd ../cal-ll && yarn run gen
cd ../regular-expression-engine && yarn run gen
cd ../cal && yarn run gen
cd ../vba && yarn run gen