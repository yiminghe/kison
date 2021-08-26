const formula = require("./index.js");

let ret = formula.parse("sum(a1:a3,a2)", {
  lexerEnv: "en"
});

console.log(ret);

console.log("*".repeat(20));

console.log(JSON.stringify(ret.ast, null, 2));
