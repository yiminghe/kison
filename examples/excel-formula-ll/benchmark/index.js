import Benchmark from 'benchmark';
import formula from '../src/parser';

var code = 'sum(A1:B2, 10, "OK", namedRange) + avg(A1:A3,{1,2;3,4})';
var codes = [];

for (var i = 0; i < 1000; i++) {
  codes.push(code);
}

code = codes.join(' + ');

var suite = new Benchmark.Suite();

suite
  .add('formula#test', function () {
    formula.parse(code);
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
