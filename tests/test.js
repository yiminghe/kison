var exp = '1+';
const ll = require('./ll');
const lr = require('./lr');
const llk = require('./llk');

(function () {
  if (1) {
    console.log('llk:' + '*'.repeat(10));
    debugger;
    const ret = llk.parse(exp);
    if (ret.error) {
      console.log(ret);
    } else {
      console.log(JSON.stringify(ret.ast, null, 2));
    }
  }

  if (0) {
    console.log('ll:' + '*'.repeat(10));
    const ret = ll.parse(exp);
    if (ret.error) {
      console.log(ret);
    } else {
      console.log(JSON.stringify(ret.ast, null, 2));
    }
  }
  if (0) {
    console.log();
    console.log('lr:' + '*'.repeat(10));
    console.log(lr.parse(exp));
  }
})();
