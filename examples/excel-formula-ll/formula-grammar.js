function RegexEscape(input) {
  return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

const operators = [
  ["="],
  ["<=", ">=", "<>", "||"],
  ["<", ">"],
  ["+", "-"],
  ["*", "/"],
  ["^"],
  ["&"],
  ["%"]
];

function getExpSymbol(op) {
  return `exp${op}`;
}

const startExp = getExpSymbol(operators[0][0]);
const lastOp = operators[operators.length - 1][0];
const endExp = getExpSymbol(lastOp);

const operatorTokens = [].concat(...operators);

const rightOperatorMap = {
  // "^": 1
};

function generateOpProductions() {
  const ret = [];
  operators.forEach((o, index) => {
    if (index === operators.length - 1) {
      return;
    }
    const next = operators[index + 1][0];
    const current = operators[index][0];
    const exp = getExpSymbol(current);
    const nextExp = getExpSymbol(next);
    ret.push({
      symbol: exp,
      rhs: [nextExp],
      label: "single-exp"
    });
    if (rightOperatorMap[current]) {
      for (const o of operators[index]) {
        ret.push({
          symbol: exp,
          rhs: [nextExp, o, exp],
          label: "single-exp"
        });
      }
    } else {
      for (const o of operators[index]) {
        ret.push({
          symbol: exp,
          rhs: [exp, o, nextExp],
          label: "single-exp"
        });
      }
    }
  });
  return ret;
}

function createRules(tokens) {
  return tokens.map(token => {
    return {
      regexp: new RegExp("^" + RegexEscape(token)),
      token
    };
  });
}

module.exports = () => ({
  productions: [
    {
      symbol: "formula",
      rhs: ["expression"]
    },
    {
      symbol: "expression",
      rhs: [startExp],
      label: "single-exp"
    },
    ...generateOpProductions(),
    {
      symbol: endExp,
      rhs: [endExp, lastOp],
      label: "single-exp"
    },
    {
      symbol: endExp,
      rhs: ["prefix-exp"],
      label: "single-exp"
    },
    {
      symbol: "prefix-exp",
      rhs: ["-", "prefix-exp"],
      label: "single-exp"
    },
    {
      symbol: "prefix-exp",
      rhs: ["+", "prefix-exp"],
      label: "single-exp"
    },
    {
      symbol: "prefix-exp",
      rhs: ["atom-exp"],
      label: "single-exp"
    },
    {
      symbol: "atom-exp",
      rhs: ["(", startExp, ")"],
      label: "single-exp"
    },
    {
      symbol: "atom-exp",
      rhs: ["NUMBER"],
      label: "number-exp"
    },
    {
      symbol: "atom-exp",
      rhs: ["STRING"],
      label: "string-exp"
    },
    {
      symbol: "atom-exp",
      rhs: ["LOGIC"],
      label: "string-exp"
    },
    {
      symbol: "atom-exp",
      rhs: ["ERROR"],
      label: "error-exp"
    },
    {
      symbol: "atom-exp",
      rhs: ["VARIABLE"],
      label: "error-exp"
    },
    {
      symbol: "atom-exp",
      rhs: ["cell"],
      label: "single-exp"
    },
    {
      symbol: "atom-exp",
      rhs: ["function"],
      label: "single-exp"
    },
    {
      symbol: "atom-exp",
      rhs: ["array"],
      label: "single-exp"
    },
    {
      symbol: "function",
      rhs: ["FUNCTION", "(", ")"]
    },
    {
      symbol: "array-element",
      rhs: ["STRING"]
    },
    {
      symbol: "array-element",
      rhs: ["NUMBER"]
    },
    {
      symbol: "array-element",
      rhs: ["LOGIC"]
    },
    {
      symbol: "array-element",
      rhs: ["ERROR"]
    },
    {
      symbol: "function",
      rhs: ["FUNCTION", "(", "arguments", ")"]
    },
    {
      symbol: "array-list",
      rhs: ["array-element"]
    },
    {
      symbol: "array-list",
      rhs: ["array-list", "ARRAY_SEPARATOR", "array-element"]
    },
    {
      symbol: "array",
      rhs: ["{", "array-list", "}"]
    },
    {
      symbol: "arguments",
      rhs: [startExp]
    },
    {
      symbol: "arguments",
      rhs: ["arguments", "ARGUMENT_SEPARATOR", startExp]
    },
    {
      symbol: "cell",
      rhs: ["CELL"]
    },
    {
      symbol: "cell",
      rhs: ["CELL", ":", "CELL"]
    }
  ],

  lexer: {
    rules: [
      {
        regexp: /^\s+/,
        token: "$HIDDEN"
      },
      ...createRules(["(", ")", ":", ";", ...operatorTokens]),
      {
        regexp: /^\{/,
        token: "{",
        action() {
          this.userData.inArray = this.userData.inArray || 0;
          this.userData.inArray++;
        }
      },
      {
        regexp: /^\}/,
        token: "}",
        action() {
          this.userData.inArray = this.userData.inArray || 1;
          this.userData.inArray--;
        }
      },
      {
        filter() {
          return !!this.userData.inArray;
        },
        regexp: { en: /^,/, de: /^\\/ },
        token: "ARRAY_SEPARATOR"
      },
      {
        regexp: { en: /^,/, de: /^;/ },
        token: "ARGUMENT_SEPARATOR"
      },
      {
        regexp: /^"(""|[^"])*"/,
        token: "STRING",
        action() {
          this.text = this.text.slice(1, -1).replace(/""/g, '"');
        }
      },
      {
        regexp: /^[A-Za-z]+[A-Za-z_0-9\.]*(?=[(])/,
        token: "FUNCTION"
      },
      {
        regexp: /^#[A-Z0-9\/]+(!|\?)? /,
        token: "ERROR"
      },
      {
        regexp: /^\$?[A-Za-z]+\$?[0-9]+/,
        token: "CELL"
      },
      {
        regexp: /^(TRUE|FALSE)(?=\b)/,
        token: "LOGIC"
      },
      {
        regexp: /^[A-Za-z]+[A-Za-z_0-9]*/,
        token: "VARIABLE"
      },
      {
        regexp: /^\d+/,
        token: "NUMBER"
      }
    ]
  }
});
