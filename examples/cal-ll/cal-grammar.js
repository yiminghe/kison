const lexerConfig = require("../common/cal-lexer");

const operators = [["+", "-"], ["*", "/"], ["^"], ["$"]];

const rightOperatorMap = {
  "^": 1
};

function generateOpProductions() {
  const ret = [];
  operators.forEach((o, index) => {
    if (index === operators.length - 1) {
      return;
    }
    const next = operators[index + 1][0];
    const current = operators[index][0];
    const exp = `Exp${current}`;
    const nextExp = `Exp${next}`;
    ret.push({
      symbol: exp,
      rhs: [nextExp]
    });
    if (rightOperatorMap[current]) {
      for (const o of operators[index]) {
        ret.push({
          symbol: exp,
          rhs: [
            nextExp,
            o,
            function(astProcessor, lexer) {
              astProcessor.pushStack(lexer.text);
            },
            exp,
            function(astProcessor) {
              astProcessor.createOpNode();
            }
          ]
        });
      }
    } else {
      for (const o of operators[index]) {
        ret.push({
          symbol: exp,
          rhs: [
            exp,
            o,
            function(astProcessor, lexer) {
              astProcessor.pushStack(lexer.text);
            },
            nextExp,
            function(astProcessor) {
              astProcessor.createOpNode();
            }
          ]
        });
      }
    }
  });
  return ret;
}

module.exports = () => ({
  productions: [
    {
      symbol: "Exp",
      rhs: ["Exp+"]
    },
    ...generateOpProductions(),
    {
      symbol: "Exp$",
      rhs: [
        "NUMBER",
        function(astProcessor, lexer) {
          astProcessor.pushStack(Number(lexer.text));
        }
      ]
    },
    {
      symbol: "Exp$",
      rhs: ["(", "Exp+", ")"]
    }
  ],

  ...lexerConfig()
});
