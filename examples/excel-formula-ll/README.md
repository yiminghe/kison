# excel formula engine

https://github.com/yiminghe/kison

## usage

```js
import { parser, FormulaEngine } from '@yiminghe/excel-formula';

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
  [{
    type: 'number',
    value: 1
  },
  {
    type: 'formula',
    formula: '=a1'
  }
  ]
]);

console.log(engine.getCellValue({
  row: 1,
  col: 2
}));
```

## feature

- function: `sum(a1:a2,b1)`
- intersection: `sum(a1:a2 b1)`
- union: `sum((a1:a2,b1))`
- 3d reference: `sum(shee1:sheet2!a1:a2)`
- structure reference: `sum(t[[#total],[y]],t[x])`
- array formula and spilled reference: `@sum(@a1:a2 a3#, {1;2}+{2,3})`  
