var exp = '1';

const ll = require('./ll');
const lr = require('./lr');

console.log('ll:' + '*'.repeat(10));
console.log(JSON.stringify(ll.parse(exp).ast, null, 2));
console.log();
console.log('lr:' + '*'.repeat(10));
console.log(lr.parse(exp));
