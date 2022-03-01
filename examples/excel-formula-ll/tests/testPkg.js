const { parser, FormulaEngine } = require('../pkg');

console.log(parser.parse('sum(a1,a2)'));

console.log('*'.repeat(20));

// or
console.log(
  parser.parse('sum(a1;a2)', {
    lexerOptions: { env: 'de' },
  }),
);

console.log('*'.repeat(20));

const engine = new FormulaEngine();

engine.initWithValues([
  [
    {
      type: 'number',
      value: 1,
    },
    {
      type: 'formula',
      formula: '=a1',
    },
  ],
]);

console.log(
  engine.getCellValue({
    row: 1,
    col: 2,
  }),
);
