import ll from './ll';
// @ts-ignore
import lr from './lr';
import llk from './llk';

const exp = '1+3+4\n1+3*4\n';

(function () {
  let e;
  if (1) {
    console.log('llk:' + '*'.repeat(10));
    const ret = llk.parse(exp);
    if (ret.error) {
      e = ret.error;
      // console.log(JSON.stringify(ret.ast, null, 2));
      console.log(ret.error.errorMessage);
    } else {
      const ast = ret.ast;
      console.log(JSON.stringify(ast, null, 2));
    }
  }

  if (1) {
    console.log('ll:' + '*'.repeat(10));
    const ret = ll.parse(exp);
    if (ret.error) {
      e = ret.error;
      console.log(JSON.stringify(ret.ast, null, 2));
      console.log(ret.error.errorMessage);
    } else {
      console.log(JSON.stringify(ret.ast, null, 2));
    }
  }
  if (1) {
    console.log();
    console.log('lr:' + '*'.repeat(10));
    console.log(lr.parse('1+2*3'));
  }

  if (e) {
    throw e;
  }
})();
