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
    const exp_ = exp + "_";
    const nextExp = `Exp${next}`;
    if (rightOperatorMap[current]) {
      for (const o of operators[index]) {
        ret.push(
          {
            symbol: exp_,
            rhs: [
              o,
              function(astProcessor, lexer) {
                astProcessor.pushStack(lexer.text);
              },
              exp,
              function(astProcessor) {
                astProcessor.createOpNode();
              }
            ]
          },
          {
            symbol: exp_,
            rhs: []
          },
          {
            symbol: exp,
            rhs: [nextExp, exp_]
          }
        );
      }
    } else {
      ret.push(
        {
          symbol: exp,
          rhs: [nextExp, exp_]
        },

        {
          symbol: exp_,
          rhs: []
        }
      );
      for (const o of operators[index]) {
        ret.push({
          symbol: exp_,
          rhs: [
            o,
            function(astProcessor, lexer) {
              astProcessor.pushStack(lexer.text);
            },
            nextExp,
            function(astProcessor) {
              astProcessor.createOpNode();
            },
            exp_
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

  lexer: {
    rules: [
      {
        regexp: /^\s+/
      },
      {
        regexp: /^[0-9]+(\.[0-9]+)?\b/,
        token: "NUMBER"
      },
      {
        regexp: /^\+/,
        token: "+"
      },
      {
        regexp: /^-/,
        token: "-"
      },
      {
        regexp: /^\(/,
        token: "("
      },
      {
        regexp: /^\)/,
        token: ")"
      },
      {
        regexp: /^\*/,
        token: "*"
      },
      {
        regexp: /^\//,
        token: "/"
      },
      {
        regexp: /^\^/,
        token: "^"
      },
      {
        // force to match one for error message
        regexp: /^./,
        token: "ERROR_LA"
      }
    ]
  }
});
