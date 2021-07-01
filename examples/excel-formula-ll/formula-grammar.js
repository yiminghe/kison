function RegexEscape(input) {
  return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

const operators = [
  ["=", "<=", ">=", "<>", ">", "<"],
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

const decimalFractionLiteral = "(?:[0-9][0-9]*)";
const decimalIntegerLiteral = "(?:0|[1-9][0-9]*)";
const exponentPart = "(?:[eE][+-]?[0-9]+)";
const namePart = "(?:[_A-Za-z\u4e00-\u9fa5]+[_A-Za-z_0-9\u4e00-\u9fa5]*)";
const fullNamePart = `(?:${namePart}(?:\\.${namePart})*)`;
const cellAddressLiteral = `(?:\\$?[A-Za-z]+\\$?[0-9]+)`;
const sheetAddress = `(?:(?:
  
  (?:'(?:''|[^'])*')
  
  |

(?:${namePart}(?:\\:${namePart})?)

)!)`.replace(/\s/g, "");
const tableColumnSpecifierLiteral = `(?:
  \\[
    (?:
      '\\]|'#|''|[^\\]'#]
      )+
    \\]
  )`.replace(/\s/g, "");
const tableColumnRange = `(?:${tableColumnSpecifierLiteral}(?:\\:${tableColumnSpecifierLiteral})?)`;
const tableColumnSpecifier = `(?:${tableColumnRange}|${namePart})`;

const my = {
  markType(self, type, enter = true) {
    const { userData } = self;
    userData[type] = userData[type] || 0;
    if (enter) {
      ++userData[type];
    } else if (userData.inArray) {
      --userData[type];
    }
  },
  last(arr) {
    return arr && arr[arr.length - 1];
  }
};

module.exports = () => ({
  my,
  productions: [
    // basic
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
      rhs: ["NAME"],
      label: "error-exp"
    },
    {
      symbol: "atom-exp",
      rhs: ["reference"],
      label: "single-exp"
    },
    {
      symbol: "reference-item",
      rhs: ["CELL"]
    },
    {
      symbol: "reference-item",
      rhs: ["structure-reference"]
    },
    {
      symbol: "reference",
      rhs: ["reference-item"]
    },
    {
      symbol: "reference",
      rhs: ["reference", "reference-item"]
    },
    {
      symbol: "reference",
      rhs: ["reference", "REF_SEPARATOR", "reference-item"]
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

    // function
    {
      symbol: "function",
      rhs: ["FUNCTION", "(", "arguments", ")"]
    },
    {
      symbol: "argument",
      label: "single-exp",
      rhs: []
    },
    {
      symbol: "argument",
      label: "single-exp",
      rhs: [startExp]
    },
    {
      symbol: "arguments",
      rhs: ["argument"]
    },
    {
      symbol: "arguments",
      rhs: ["arguments", "ARGUMENT_SEPARATOR", "argument"]
    },

    // structure reference
    {
      symbol: "structure-reference",
      rhs: ["TABLE_NAME", "table-specifier"]
    },
    {
      symbol: "structure-reference",
      rhs: ["table-specifier"]
    },
    {
      symbol: "table-specifier",
      rhs: ["TABLE_ITEM_SPECIFIER"]
    },
    {
      symbol: "table-specifier",
      rhs: ["[", "table-specifier-inner", "]"]
    },
    {
      symbol: "table-this-row",
      rhs: ["@"]
    },
    {
      symbol: "table-this-row",
      rhs: ["@", "TABLE_COLUMN_SPECIFIER"]
    },
    {
      symbol: "table-specifier-inner",
      rhs: ["table-this-row"]
    },
    {
      symbol: "table-specifier-inner",
      rhs: ["table-column-specifier"]
    },
    {
      symbol: "table-specifier-item",
      rhs: ["TABLE_COLUMN_SPECIFIER"]
    },
    {
      symbol: "table-specifier-item",
      rhs: ["TABLE_ITEM_SPECIFIER"]
    },
    {
      symbol: "table-column-specifier",
      rhs: ["table-specifier-item"]
    },
    {
      symbol: "table-column-specifier",
      rhs: [
        "table-column-specifier",
        "SPECIFIER_SEPARATOR",
        "table-specifier-item"
      ]
    }
  ],

  lexer: {
    rules: [
      {
        regexp: /^\s+/,
        token: "$HIDDEN"
      },
      {
        regexp: /^\(/,
        token: "(",
        action() {
          const { userData } = this;
          userData.markParen = userData.markParen || [];
          const lastItem = my.last(userData.markParen);
          if (lastItem && lastItem.index === this.start) {
            return;
          }
          userData.markParen.push({ index: this.end, func: false });
        }
      },
      {
        regexp: /^\)/,
        token: ")",
        action() {
          const { userData } = this;
          userData.markParen = userData.markParen || [];
          userData.markParen.pop();
        }
      },
      {
        regexp: /^\{/,
        token: "{",
        action() {
          // array constants
          my.markType(this, "a");
        }
      },
      ...createRules([":", ...operatorTokens]),
      {
        regexp: /^\}/,
        token: "}",
        action() {
          my.markType(this, "a", false);
        }
      },

      // structure reference
      {
        state: ["s", "I"],
        regexp: new RegExp(`^\\[#${namePart}\\]`),
        token: "TABLE_ITEM_SPECIFIER"
      },
      {
        state: ["s"],
        regexp: new RegExp(`^${tableColumnSpecifier}`),
        token: "TABLE_COLUMN_SPECIFIER"
      },
      {
        state: ["s", "I"],
        regexp: /^\[/,
        token: "[",
        action() {
          this.pushState("s");
        }
      },
      {
        state: ["s"],
        regexp: /^@/,
        token: "@"
      },
      {
        state: ["s"],
        regexp: /^\]/,
        token: "]",
        action() {
          this.popState();
        }
      },
      {
        state: ["s"],
        regexp: /^,/,
        token: "SPECIFIER_SEPARATOR"
      },
      {
        filter() {
          return !!this.userData.a;
        },
        regexp: { en: /^[,;]/, de: /^[\\;]/ },
        token: "ARRAY_SEPARATOR"
      },
      {
        filter() {
          const lastItem = my.last(this.userData.markParen);
          return !lastItem || !lastItem.func;
        },
        regexp: /^,/,
        token: "REF_SEPARATOR"
      },
      {
        regexp: { en: /^,/, de: /^;/ },
        token: "ARGUMENT_SEPARATOR"
      },
      {
        regexp: /^"(?:""|[^"])*"/,
        token: "STRING",
        action() {
          this.text = this.text.slice(1, -1).replace(/""/g, '"');
        }
      },
      {
        regexp: new RegExp(`^${fullNamePart}(?=[(])`),
        token: "FUNCTION",
        action() {
          const { userData } = this;
          userData.markParen = userData.markParen || [];
          userData.markParen.push({ index: this.end, func: true });
        }
      },
      {
        regexp: /^#[A-Z0-9\/]+(!|\?)? /,
        token: "ERROR"
      },
      {
        regexp: new RegExp(
          `^${sheetAddress}?${cellAddressLiteral}(?:\\s*\\:\\s*${cellAddressLiteral})?`
        ),
        token: "CELL"
      },
      {
        regexp: /^(TRUE|FALSE)(?=\b)/i,
        token: "LOGIC"
      },
      {
        regexp: new RegExp(`^${fullNamePart}(?=[\\[])`),
        token: "TABLE_NAME"
      },
      {
        regexp: new RegExp(`^${fullNamePart}`),
        token: "NAME"
      },
      {
        regexp: {
          en: new RegExp(
            `^${decimalIntegerLiteral}?\\.${decimalFractionLiteral}${exponentPart}?`
          ),
          de: new RegExp(
            `^${decimalIntegerLiteral}?,${decimalFractionLiteral}${exponentPart}?`
          )
        },
        token: "NUMBER"
      },
      {
        regexp: new RegExp(`^${decimalIntegerLiteral}${exponentPart}?`),
        token: "NUMBER"
      }
    ]
  }
});
