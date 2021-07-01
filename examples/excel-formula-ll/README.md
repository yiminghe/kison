# excel formula parser

https://github.com/yiminghe/kison

## usage

```js
const formula = require('@yiminghe/excel-formula-parser');

console.log(formula.parse('sum(a1,a2)',{
  lexerEnv: 'en'
}));
```

## feature

- function: `sum(a1:a2,b1)`
- intersection: `sum(a1:a2 b1)`
- union: `sum((a1:a2,b1))`
- 3d reference: `sum(shee1:sheet2!a1:a2)`
- structure reference: `sum(t[[#total],[y]],t[x])`
