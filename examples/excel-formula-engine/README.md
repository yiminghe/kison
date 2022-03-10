# excel formula engine

https://github.com/yiminghe/kison

## usage

```js
import { parser, FormulaEngine } from 'excel-formula-engine';

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

## api

```ts
export declare class FormulaEngine {
    initWithValues(values: CellValue[][], options?: FormulaEngineOptions): ChangedCell[] | undefined;
    setCellValue(address: CellAddress, cell: CellValue): ChangedCell[];
    get width(): number;
    get height(): number;
    getCellValue(address: CellAddress): CellValue;
    insertRows(before: number, count?: number): ChangedCell[];
    deleteRows(at: number, count?: number): ChangedCell[];
    evaluateFormula(formula: string): All_Value_Type;
}
```

## feature

- function: `sum(a1:a2,b1)`
- intersection: `sum(a1:a2 b1)`
- union: `sum((a1:a2,b1))`
- 3d reference: `sum(shee1:sheet2!a1:a2)`
- structure reference: `sum(t[[#total],[y]],t[x])`
- array formula and spilled reference: `@sum(@a1:a2 a3#, {1;2}+{2,3})`  
