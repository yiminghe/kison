const { parser: formula, evaluate } = require("../pkg");

console.log(formula.parse("sum(a1,a2)"));

console.log("*".repeat(20));

// or
console.log(
  formula.parse("sum(a1;a2)", {
    lexerOptions: { env: "de" }
  })
);

console.log("*".repeat(20));

const { ast } = formula.parse(`sum(1, 2, A1:B2, {5;4}+{1,2})`);

const ret = evaluate(ast, {
  getCellValues(reference) {
    // fake data
    return [
      [
        {
          type: "number",
          value: 1
        }
      ],
      [
        {
          type: "number",
          value: 2
        }
      ]
    ];
  }
});
console.log(ret);
