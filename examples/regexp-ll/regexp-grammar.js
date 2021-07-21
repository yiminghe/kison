// https://github.com/kean/Regex/blob/master/grammar.ebnf

module.exports = () => ({
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
      rhs: ["matchAnyCharacter"]
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
    {
      symbol: "CharacterGroupInner",
      rhs: ["CharacterGroupItem"]
    },

    /* Character Classes
------------------------------------------------------------------*/
    {
      symbol: "CharacterGroupInner",
      rhs: ["CharacterGroupInner", "CharacterGroupItem"],
      flat: true
    },
    {
      symbol: "CharacterGroup",
      rhs: ["[", "^?", "CharacterGroupInner", "]"]
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
      rhs: ["characterClassAnyWord"]
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
      rhs: ["QuantifierType", "LazyModifier?"]
    },
    {
      symbol: "LazyModifier",
      rhs: ["lazyModifier"]
    },

    {
      symbol: "QuantifierType",
      rhs: ["zeroOrMoreQuantifier"]
    },
    {
      symbol: "QuantifierType",
      rhs: ["oneOrMoreQuantifier"]
    },
    {
      symbol: "QuantifierType",
      rhs: ["zeroOrOneQuantifier"]
    },
    {
      symbol: "QuantifierType",
      rhs: ["RangeQuantifier"]
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
      rhs: ["anchorEndOfString"]
    }
  ],

  lexer: {
    rules: [
      {
        regexp: /^\\w/,
        token: "characterClassAnyWord"
      },
      {
        regexp: /^\\W/,
        token: "characterClassAnyWordInverted"
      },
      {
        regexp: /^\\d/,
        token: "characterClassAnyDecimalDigit"
      },
      {
        regexp: /^\\D/,
        token: "characterClassAnyDecimalDigitInverted"
      },

      {
        regexp: /^\?/,
        token: "lazyModifier"
      },
      {
        regexp: /^\*/,
        token: "zeroOrMoreQuantifier"
      },
      {
        regexp: /^\+/,
        token: "oneOrMoreQuantifier"
      },
      {
        regexp: /^\?/,
        token: "zeroOrOneQuantifier"
      },
      /* Backreferences
------------------------------------------------------------------*/
      {
        regexp: /^\\\d+/,
        token: "backreference"
      },

      /* Anchors
      ------------------------------------------------------------------*/
      {
        regexp: /^\\b/,
        token: "anchorWordBoundary"
      },
      {
        regexp: /^\\B/,
        token: "anchorNonWordBoundary"
      },
      {
        regexp: /^\\A/,
        token: "anchorStartOfStringOnly"
      },
      {
        regexp: /^\\z/,
        token: "anchorEndOfStringOnlyNotNewline"
      },
      {
        regexp: /^\\Z/,
        token: "anchorEndOfStringOnly"
      },
      {
        regexp: /^\\G/,
        token: "anchorPreviousMatchEnd"
      },
      {
        regexp: /^\$/,
        token: "anchorEndOfString"
      },

      {
        regexp: /^\d+/,
        token: "int"
      },
      {
        regexp: /^,/,
        token: ","
      },
      {
        regexp: /^\^/,
        token: "^"
      },
      {
        regexp: /^\?:/,
        token: "?:"
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
        regexp: /^\{/,
        token: "{"
      },
      {
        regexp: /^\}/,
        token: "}"
      },
      {
        regexp: /^\[/,
        token: "["
      },
      {
        regexp: /^\]/,
        token: "]"
      },
      {
        regexp: /^\-/,
        token: "-"
      },
      {
        regexp: /^\|/,
        token: "|"
      },
      {
        regexp: /^\./,
        token: "matchAnyCharacter"
      },
      {
        regexp: /^[\x09\x0a\x0d\x20-\ud7ff\ue000-\ufffd\u10000-\u10ffff]/,
        token: "char"
      }
    ]
  }
});
