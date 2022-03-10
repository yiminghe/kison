import Benchmark from 'benchmark';
import formulaLL from '../src/parserLL';
import formulaLLK from '../src/parserLLK';

var code = 'sum(A1:B2, 10, "OK", namedRange) + avg(A1:A3,{1,2;3,4})';
var oneCode = code;
var codes = [];

for (var i = 0; i < 1000; i++) {
  codes.push(code);
}

code = codes.join(' + ');

console.log('code: `' + oneCode + '` (100 times)');

var suite = new Benchmark.Suite();

suite
  .add('formula#LL(1)', function () {
    formulaLL.parse(code);
  })
  .add('formula#LL(K)', function () {
    formulaLLK.parse(code);
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });
