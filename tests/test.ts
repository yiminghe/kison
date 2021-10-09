import ll from './ll';
// @ts-ignore
import lr from './lr';
import llk from './llk';

const exp = '1+2*4\n2+3\n';

(function () {
  if (1) {
    console.log('llk:' + '*'.repeat(10));
    debugger;
    const ret = llk.parse(exp);
    if (ret.error) {
      console.log(ret.error.errorMessage);
      throw new Error('llk error!');
    } else {
      console.log(JSON.stringify(ret.ast, null, 2));
    }
  }

  if (0) {
    console.log('ll:' + '*'.repeat(10));
    const ret = ll.parse(exp);
    if (ret.error) {
      console.log(ret);
      throw new Error('ll error!');
    } else {
      console.log(JSON.stringify(ret.ast, null, 2));
    }
  }
  if (0) {
    console.log();
    console.log('lr:' + '*'.repeat(10));
    console.log(lr.parse('1+2*3'));
  }
})();
