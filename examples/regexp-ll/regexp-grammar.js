const my = {
  charRange: [
    [0x09],
    [0x0a],
    [0x0d],
    [0x20, 0xd7ff],
    [0xe000, 0xfffd],
    [0x10000, 0x10ffff]
  ],
  createMatchString(str, { input }) {
    if (input.lastIndexOf(str, 0) !== 0) {
      return false;
    }
    return [str];
  },
  matchEscapeChar({ input }) {
    let m = "";
    let char = input[0];
    m += char;
    if (char === "\\") {
      char = input[1];
      m += char;
    } else {
      return false;
    }
    if (m === "\\u" || m === "\\x") {
      const len = m === "\\u" ? 4 : 2;
      const matchNumber = my.matchNumber(input.slice(2), 1, len);
      if (matchNumber && matchNumber[0].length === len) {
        return [
          m + matchNumber,
          String.fromCharCode(parseInt(matchNumber, 16))
        ];
      }
    }
    if (my.matchChar({ input: char })) {
      return [m, char];
    }
    return false;
  },
  matchAnyChar(lexer) {
    const char = lexer.input[0];
    if (char === "." && !lexer.userData.insideCharacterGroup) {
      return [char];
    }
    return false;
  },
  matchChar({ input }) {
    let char = input[0];
    const range = my.charRange;
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
  matchGroupName(input, prefix) {
    const remain = input.slice(prefix.length);
    let index = 0;
    let char = remain.charAt(index).toLowerCase();
    while (char >= "a" && char <= "z") {
      char = remain.charAt(++index).toLowerCase();
    }
    if (char === ">") {
      const name = remain.slice(0, index);
      return [prefix + name + ">", name];
    }
    return false;
  },
  matchBackreference({ input }) {
    if (input[0] !== "\\") {
      return false;
    }
    const prefix = "\\k<";
    if (input.lastIndexOf(prefix, 0) === 0) {
      return my.matchGroupName(input, prefix);
    }
    const match = my.matchNumber(input.slice(1));
    if (match === false) {
      return false;
    }
    match[0] = "\\" + match[0];
    return match;
  },
  matchQuantifierNumber(lexer) {
    if (lexer.userData.insideQuantifierRange) {
      return my.matchNumber(lexer.input);
    }
    return false;
  },
  matchNumber(input, hex, max) {
    let index = 0;
    const match = [];
    let l = max || input.length;
    l = Math.min(l, input.length);
    while (index < l) {
      const char = input.charAt(index);
      if (char < "0" || char > "9") {
        if (hex) {
          if (char < "a" || char > "f") {
            break;
          }
        } else {
          break;
        }
      }

      match.push(char);
      index++;
    }
    return match.length ? [match.join("")] : false;
  },
  matchNamedGroupPrefix({ input }) {
    const prefix = "(?<";
    if (input.lastIndexOf(prefix, 0) !== 0) {
      return false;
    }
    return my.matchGroupName(input, prefix);
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
    {
      symbol: "Group",
      rhs: ["namedGroupPrefix", "Expression", ")", "Quantifier?"]
    },

    /* Match
------------------------------------------------------------------*/
    {
      symbol: "Match",
      rhs: ["MatchItem", "Quantifier?"]
    },
    {
      symbol: "MatchItem",
      rhs: ["anyChar"]
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
      rhs: ["characterClassAnyWord"]
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
      symbol: "CharacterClass",
      rhs: ["whitespaceCharacter"]
    },
    {
      symbol: "CharacterClass",
      rhs: ["whitespaceCharacterInverted"]
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
      rhs: ["{", "int", ",", "int?", "}"]
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
    },
    {
      symbol: "Anchor",
      rhs: ["lookahead", "Expression", ")"]
    },
    {
      symbol: "Anchor",
      rhs: ["negativeLookahead", "Expression", ")"]
    },
    {
      symbol: "Anchor",
      rhs: ["lookbehind", "Expression", ")"]
    },
    {
      symbol: "Anchor",
      rhs: ["negativeLookbehind", "Expression", ")"]
    }
  ],

  lexer: {
    rules: [
      ...createEscapeMatchLexerRules({
        w: "characterClassAnyWord",
        W: "characterClassAnyWordInverted",
        s: "whitespaceCharacter",
        S: "whitespaceCharacterInverted",
        d: "characterClassAnyDecimalDigit",
        D: "characterClassAnyDecimalDigitInverted",

        /* Anchors
       ------------------------------------------------------------------*/
        b: "anchorWordBoundary",
        B: "anchorNonWordBoundary",
        A: "anchorStartOfStringOnly",
        z: "anchorEndOfStringOnlyNotNewline",
        Z: "anchorEndOfStringOnly",
        G: "anchorPreviousMatchEnd"
      }),

      /* Backreferences
------------------------------------------------------------------*/
      {
        regexp: `my.matchBackreference`,
        token: "backreference"
      },

      {
        regexp: "my.matchEscapeChar",
        token: "char",
        action() {
          this.text = this.matches[1];
        }
      },

      /* Assertions
    ------------------------------------------------------------------ */
      {
        regexp: createStringMatch(`(?=`),
        token: "lookahead"
      },
      {
        regexp: createStringMatch(`(?!`),
        token: "negativeLookahead"
      },
      {
        regexp: createStringMatch(`(?<=`),
        token: "lookbehind"
      },
      {
        regexp: createStringMatch(`(?<!`),
        token: "negativeLookbehind"
      },

      {
        regexp: "my.matchNamedGroupPrefix",
        token: "namedGroupPrefix",
        action() {
          this.text = this.matches[1];
        }
      },

      ...createLiteralLexerRules([
        "$",
        ",",
        "^",
        "?:",
        "?",
        "(",
        ")",
        "-",
        "|",
        "*",
        "+"
      ]),

      {
        regexp: createStringMatch("["),
        token: "[",
        action() {
          this.userData.insideCharacterGroup = true;
        }
      },

      {
        regexp: createStringMatch("]"),
        token: "]",
        action() {
          this.userData.insideCharacterGroup = false;
        }
      },

      {
        regexp: "my.matchAnyChar",
        token: "anyChar"
      },

      {
        regexp: createStringMatch("{"),
        token: "{",
        action() {
          this.userData.insideQuantifierRange = true;
        }
      },

      {
        regexp: createStringMatch("}"),
        token: "}",
        action() {
          this.userData.insideQuantifierRange = false;
        }
      },

      {
        regexp: "my.matchQuantifierNumber",
        token: "int"
      },

      {
        regexp: "my.matchChar",
        token: "char"
      }
    ]
  }
});
