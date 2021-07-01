const formula = require("./index.js");

console.log(
  formula.parse("sum(a1,a2)", {
    lexerEnv: "en"
  })
);
