const lexerConfig = require("../common/cal-lexer");

const operators = [["+", "-"], ["*", "/"], ["^"], ["$"]];

const map = {
  "exp^": "expo",
  "exp-": "subtract",
  "exp+": "add",
  "exp*": "mul",
  "exp/": "divide",
  exp$: "atom"
};

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
    const exp = map[`exp${current}`];
    const nextExp = map[`exp${next}`];
    ret.push({
      symbol: exp,
      rhs: [nextExp],
      label: "exp"
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
          ],
          label: "exp"
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
          ],
          label: "exp"
        });
      }
    }
  });
  return ret;
}

const startExp = map["exp" + operators[0][0]];

module.exports = () => ({
  productions: [
    {
      symbol: "exp",
      rhs: [startExp],
      label: "exp"
    },
    ...generateOpProductions(),
    {
      symbol: "atom",
      rhs: [
        "NUMBER",
        function(astProcessor, lexer) {
          astProcessor.pushStack(Number(lexer.text));
        }
      ],
      label: "exp"
    },
    {
      symbol: "atom",
      rhs: ["(", startExp, ")"],
      label: "exp"
    }
  ],

  ...lexerConfig()
});
