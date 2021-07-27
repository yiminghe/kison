// https://github.com/kean/Regex/blob/master/grammar.ebnf

const c0 = "0".charCodeAt(0);
const c9 = "9".charCodeAt(0);

const my = {
  c0,
  c9,
  createMatchString(str, lexer) {
    const { input } = lexer;
    if (input.lastIndexOf(str, str.length) !== 0) {
      return false;
    }
    return [str];
  },
  createMatchCharRange(range, lexer) {
    const char = lexer.input[0];
    const charCode = char.charCodeAt(0);
    for (const r of range) {
      if (r.length == 1) {
        if (r[0] === charCode) {
          return [char];
        }
      } else if (charCode >= r[0] || charCode <= r[1]) {
        return [char];
      }
    }
    return false;
  },
  matchBackreference(lexer) {
    const { input } = lexer;
    if (input[0] !== "\\") {
      return false;
    }
    const match = my.matchNumber({ input: input.slice(1) });
    if (match === false) {
      return false;
    }
    match[0] = "\\" + match[0];
    return match;
  },
  matchNumber(lexer) {
    let index = 0;
    const match = [];
    const { input } = lexer;
    const l = input.length;
    while (index < l) {
      const char = input[index];
      const codeCode = input.charCodeAt(index);
      if (codeCode < my.c0 || codeCode > my.c9) {
        break;
      }
      match.push(char);
      index++;
    }
    return match.length ? [match.join("")] : false;
  }
};

function createLiteralLexerRules(chars) {
  return chars.map(c => ({
    token: c,
    regexp: createStringMatch(c)
  }));
}

function createEscapeMatchLexerRules(map) {
  return Object.keys(map).map(k => ({
    token: map[k],
    regexp: createStringMatch(`\\${k}`)
  }));
}

const slashCode = "\\".charCodeAt(0);

function createRangeMatch(range) {
  return `my.createMatchCharRange.bind(undefined, ${JSON.stringify(range)})`;
}

function createStringMatch(str) {
  return `my.createMatchString.bind(undefined, ${JSON.stringify(str)})`;
}

module.exports = () => ({
  my,
  productions: [
    {
      symbol: "Regexp",
      rhs: ["^?", "Expression"]
    },
    {
      symbol: "Expression",
      rhs: ["SubExpression"]
    },
    {
      symbol: "Expression",
      rhs: ["Expression", "|", "SubExpression"],
      flat: true
    },
    {
      symbol: "SubExpression",
      rhs: ["ExpressionItem"]
    },
    {
      symbol: "SubExpression",
      rhs: ["SubExpression", "ExpressionItem"],
      flat: true
    },
    {
      symbol: "ExpressionItem",
      rhs: ["Match"]
    },
    {
      symbol: "ExpressionItem",
      rhs: ["Group"]
    },
    {
      symbol: "ExpressionItem",
      rhs: ["Anchor"]
    },
    {
      symbol: "ExpressionItem",
      rhs: ["backreference"]
    },

    /* Grouping Constructs 
    ------------------------------------------------------------------*/

    {
      symbol: "Group",
      rhs: ["(", "?:?", "Expression", ")", "Quantifier?"]
    },

    /* Match
------------------------------------------------------------------*/
    {
      symbol: "Match",
      rhs: ["MatchItem", "Quantifier?"]
    },
    {
      symbol: "MatchItem",
      rhs: ["."]
    },
    {
      symbol: "MatchItem",
      rhs: ["MatchCharacterClass"]
    },
    {
      symbol: "MatchItem",
      rhs: ["char"]
    },
    {
      symbol: "MatchCharacterClass",
      rhs: ["CharacterGroup"]
    },
    {
      symbol: "MatchCharacterClass",
      rhs: ["CharacterClass"]
    },


    /* Character Classes
------------------------------------------------------------------*/
    {
      symbol: "CharacterGroup",
      rhs: ["[", "^?", "CharacterGroupInner", "]"]
    },
    {
      symbol: "CharacterGroupInner",
      rhs: ["CharacterGroupItem"]
    },
    {
      symbol: "CharacterGroupInner",
      rhs: ["CharacterGroupInner", "CharacterGroupItem"],
      flat: true
    },
    {
      symbol: "CharacterGroupItem",
      rhs: ["CharacterClass"]
    },
    {
      symbol: "CharacterGroupItem",
      rhs: ["CharacterRange"]
    },
    {
      symbol: "CharacterClass",
      rhs: ["characterClassAnyWordInverted"]
    },
    {
      symbol: "CharacterClass",
      rhs: ["characterClassAnyDecimalDigit"]
    },
    {
      symbol: "CharacterClass",
      rhs: ["characterClassAnyDecimalDigitInverted"]
    },
    {
      symbol: "CharacterRange",
      rhs: ["char"]
    },
    {
      symbol: "CharacterRange",
      rhs: ["char", "-", "char"]
    },

    /* Quantifiers 
    ------------------------------------------------------------------*/
    {
      symbol: "Quantifier",
      rhs: ["QuantifierType", "??"]
    },
    {
      symbol: "QuantifierType",
      rhs: ["*"]
    },
    {
      symbol: "QuantifierType",
      rhs: ["+"]
    },
    {
      symbol: "QuantifierType",
      rhs: ["?"]
    },
    {
      symbol: "QuantifierType",
      rhs: ["{", "int", "}"]
    },
    {
      symbol: "QuantifierType",
      rhs: ["{", "int", ",", "int", "}"]
    },

    /* Anchors
    ------------------------------------------------------------------*/
    {
      symbol: "Anchor",
      rhs: ["anchorWordBoundary"]
    },
    {
      symbol: "Anchor",
      rhs: ["anchorNonWordBoundary"]
    },
    {
      symbol: "Anchor",
      rhs: ["anchorStartOfStringOnly"]
    },
    {
      symbol: "Anchor",
      rhs: ["anchorEndOfStringOnlyNotNewline"]
    },
    {
      symbol: "Anchor",
      rhs: ["anchorEndOfStringOnly"]
    },
    {
      symbol: "Anchor",
      rhs: ["anchorPreviousMatchEnd"]
    },
    {
      symbol: "Anchor",
      rhs: ["$"]
    }
  ],

  lexer: {
    rules: [
      ...createLiteralLexerRules([
        "$",
        ",",
        "^",
        "?:",
        "?",
        "(",
        ")",
        "{",
        "}",
        "[",
        "]",
        "-",
        "|",
        "*",
        "+",
        "."
      ]),

      ...createEscapeMatchLexerRules({
        w: "characterClassAnyWord",
        W: "characterClassAnyWordInverted",
        d: "characterClassAnyDecimalDigit",
        D: "characterClassAnyDecimalDigitInverted"
      }),

      /* Backreferences
------------------------------------------------------------------*/
      {
        regexp: `my.matchBackreference`,
        token: "backreference"
      },

      /* Anchors
      ------------------------------------------------------------------*/
      ...createEscapeMatchLexerRules({
        b: "anchorWordBoundary",
        B: "anchorNonWordBoundary",
        A: "anchorStartOfStringOnly",
        z: "anchorEndOfStringOnlyNotNewline",
        Z: "anchorEndOfStringOnly",
        G: "anchorPreviousMatchEnd"
      }),

      {
        regexp: "my.matchNumber",
        token: "int"
      },
      {
        regexp: createRangeMatch([
          [0x09],
          [0x0a],
          [0x0d],
          [0x20, 0xd7ff],
          [0xe000, 0xfffd],
          [0x10000, 0x10ffff]
        ]),
        token: "char"
      }
    ]
  }
});
