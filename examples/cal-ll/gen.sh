SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

cd $SCRIPT_DIR/

cd action && sh gen.sh
cd ../user-data && sh gen.sh