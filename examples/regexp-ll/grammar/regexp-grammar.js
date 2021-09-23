const my = {
  charRange: [
    [0x09],
    [0x0a],
    [0x0d],
    [0x20, 0xd7ff],
    [0xe000, 0xfffd],
    [0x10000, 0x10ffff],
  ],
  createMatchString(str, lexer) {
    if (!lexer.nextStartsWith(str)) {
      return false;
    }
    return [str];
  },
  matchOnlyEscapeChar(lexer, index = 0) {
    let m = '';
    let char = lexer.nextChar(index);
    m += char;
    if (char === '\\') {
      char = lexer.nextChar(index + 1);
      m += char;
    } else {
      return { m, r: false };
    }
    if (m === '\\u' || m === '\\x') {
      const len = m === '\\u' ? 4 : 2;
      let matchedNumber = my.matchNumber(lexer, index + 2, 1, len);
      if (matchedNumber && matchedNumber[0].length === len) {
        matchedNumber = matchedNumber[0];
        let first = parseInt(matchedNumber, 16);
        if (lexer.options.unicode && index === 0) {
          // 检查是否开始 surrogate pair
          if (first >= 0xd800 && first <= 0xdbff) {
            let secondRet = my.matchOnlyEscapeChar(lexer, index + 2 + len);
            let second = (secondRet && secondRet.r && secondRet.r[2]) || 0;
            if (second >= 0xdc00 && second <= 0xdfff) {
              // low surrogate
              // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
              let totoal = (first - 0xd800) * 0x400 + second - 0xdc00 + 0x10000;
              return {
                m,
                r: [
                  m + matchedNumber + secondRet.r[0],
                  String.fromCodePoint(totoal),
                  totoal,
                ],
              };
            }
          }
        }
        return {
          m,
          r: [m + matchedNumber, String.fromCharCode(first), first],
        };
      }
    }
    return {
      m,
    };
  },
  matchEscapeChar(lexer) {
    const ret = my.matchOnlyEscapeChar(lexer);
    if (ret.r !== undefined) {
      return ret.r;
    }
    if (my.matchCharCode(lexer.nextCharCode(1))) {
      return [ret.m, lexer.nextChar(1)];
    }
    return false;
  },
  matchAnyChar(lexer) {
    const char = lexer.nextChar();
    if (char === '.' && !lexer.userData.insideCharacterGroup) {
      return [char];
    }
    return false;
  },
  matchChar(lexer) {
    return my.matchCharCode(lexer.nextCharCode());
  },
  matchCharCode(charCode) {
    const range = my.charRange;
    for (const r of range) {
      if (r.length == 1) {
        if (r[0] === charCode) {
          return [String.fromCodePoint(charCode)];
        }
      } else if (charCode >= r[0] || charCode <= r[1]) {
        return [String.fromCodePoint(charCode)];
      }
    }
    return false;
  },
  matchGroupName(lexer, prefix) {
    let ret = [];
    let index = prefix.length;
    let char = lexer.nextChar(index++);
    while ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
      ret.push(char);
      char = lexer.nextChar(index++);
    }
    if (char === '>') {
      const name = ret.join('');
      return [prefix + name + '>', name];
    }
    return false;
  },
  matchBackreference(lexer) {
    if (lexer.nextChar() !== '\\') {
      return false;
    }
    const prefix = '\\k<';
    if (lexer.nextStartsWith(prefix)) {
      return my.matchGroupName(lexer, prefix);
    }
    const match = my.matchNumber(lexer, 1);
    if (match === false) {
      return false;
    }
    match[0] = '\\' + match[0];
    return match;
  },
  matchQuantifierNumber(lexer) {
    if (lexer.userData.insideQuantifierRange) {
      return my.matchNumber(lexer);
    }
    return false;
  },
  matchNumber(lexer, start = 0, hex, max) {
    let index = 0;
    const match = [];
    let l = max || lexer.nextLength();
    l = Math.min(l, lexer.nextLength());
    while (index < l) {
      const char = lexer.nextCharAt(start + index).toLowerCase();
      if (char < '0' || char > '9') {
        if (hex) {
          if (char < 'a' || char > 'f') {
            break;
          }
        } else {
          break;
        }
      }
      match.push(char);
      index++;
    }
    return match.length ? [match.join('')] : false;
  },
  matchNamedGroupPrefix(lexer) {
    const prefix = '(?<';
    if (!lexer.nextStartsWith(prefix)) {
      return false;
    }
    return my.matchGroupName(lexer, prefix);
  },
};

function createLiteralLexerRules(chars) {
  return chars.map((c) => ({
    token: c,
    regexp: createStringMatch(c),
  }));
}

function createEscapeMatchLexerRules(map) {
  return Object.keys(map).map((k) => ({
    token: map[k],
    regexp: createStringMatch(`\\${k}`),
  }));
}

function createStringMatch(str) {
  return `my.createMatchString.bind(undefined, ${JSON.stringify(str)})`;
}

module.exports = () => ({
  my,
  productions: [
    {
      symbol: 'Regexp',
      rhs: ['^?', 'Expression'],
    },
    {
      symbol: 'Expression',
      rhs: ['SubExpression'],
    },
    {
      symbol: 'Expression',
      rhs: ['Expression', '|', 'SubExpression'],
      flat: true,
    },
    {
      symbol: 'SubExpression',
      rhs: ['ExpressionItem'],
    },
    {
      symbol: 'SubExpression',
      rhs: ['SubExpression', 'ExpressionItem'],
      flat: true,
    },
    {
      symbol: 'ExpressionItem',
      rhs: ['Match'],
    },
    {
      symbol: 'ExpressionItem',
      rhs: ['Group'],
    },
    {
      symbol: 'ExpressionItem',
      rhs: ['Anchor'],
    },
    {
      symbol: 'ExpressionItem',
      rhs: ['backreference'],
    },

    /* Grouping Constructs 
    ------------------------------------------------------------------*/

    {
      symbol: 'Group',
      rhs: ['(', '?:?', 'Expression', ')', 'Quantifier?'],
    },
    {
      symbol: 'Group',
      rhs: ['namedGroupPrefix', 'Expression', ')', 'Quantifier?'],
    },

    /* Match
------------------------------------------------------------------*/
    {
      symbol: 'Match',
      rhs: ['MatchItem', 'Quantifier?'],
    },
    {
      symbol: 'MatchItem',
      rhs: ['anyChar'],
    },
    {
      symbol: 'MatchItem',
      rhs: ['MatchCharacterClass'],
    },
    {
      symbol: 'MatchItem',
      rhs: ['char'],
    },
    {
      symbol: 'MatchCharacterClass',
      rhs: ['CharacterGroup'],
    },
    {
      symbol: 'MatchCharacterClass',
      rhs: ['CharacterClass'],
    },

    /* Character Classes
------------------------------------------------------------------*/
    {
      symbol: 'CharacterGroup',
      rhs: ['[', '^?', 'CharacterGroupInner', ']'],
    },
    {
      symbol: 'CharacterGroupInner',
      rhs: ['CharacterGroupItem'],
    },
    {
      symbol: 'CharacterGroupInner',
      rhs: ['CharacterGroupInner', 'CharacterGroupItem'],
      flat: true,
    },
    {
      symbol: 'CharacterGroupItem',
      rhs: ['CharacterClass'],
    },
    {
      symbol: 'CharacterGroupItem',
      rhs: ['CharacterRange'],
    },
    {
      symbol: 'CharacterClass',
      rhs: ['characterClassAnyWordInverted'],
    },
    {
      symbol: 'CharacterClass',
      rhs: ['characterClassAnyWord'],
    },
    {
      symbol: 'CharacterClass',
      rhs: ['characterClassAnyDecimalDigit'],
    },
    {
      symbol: 'CharacterClass',
      rhs: ['characterClassAnyDecimalDigitInverted'],
    },
    {
      symbol: 'CharacterClass',
      rhs: ['whitespaceCharacter'],
    },
    {
      symbol: 'CharacterClass',
      rhs: ['whitespaceCharacterInverted'],
    },
    {
      symbol: 'CharacterRange',
      rhs: ['char'],
    },
    {
      symbol: 'CharacterRange',
      rhs: ['char', '-', 'char'],
    },

    /* Quantifiers 
    ------------------------------------------------------------------*/
    {
      symbol: 'Quantifier',
      rhs: ['QuantifierType', '??'],
    },
    {
      symbol: 'QuantifierType',
      rhs: ['*'],
    },
    {
      symbol: 'QuantifierType',
      rhs: ['+'],
    },
    {
      symbol: 'QuantifierType',
      rhs: ['?'],
    },
    {
      symbol: 'QuantifierType',
      rhs: ['{', 'int', '}'],
    },
    {
      symbol: 'QuantifierType',
      rhs: ['{', 'int', ',', 'int?', '}'],
    },

    /* Anchors
    ------------------------------------------------------------------*/
    {
      symbol: 'Anchor',
      rhs: ['anchorWordBoundary'],
    },
    {
      symbol: 'Anchor',
      rhs: ['anchorNonWordBoundary'],
    },
    {
      symbol: 'Anchor',
      rhs: ['anchorStartOfStringOnly'],
    },
    {
      symbol: 'Anchor',
      rhs: ['anchorEndOfStringOnlyNotNewline'],
    },
    {
      symbol: 'Anchor',
      rhs: ['anchorEndOfStringOnly'],
    },
    {
      symbol: 'Anchor',
      rhs: ['anchorPreviousMatchEnd'],
    },
    {
      symbol: 'Anchor',
      rhs: ['$'],
    },
    {
      symbol: 'Anchor',
      rhs: ['lookahead', 'Expression', ')'],
    },
    {
      symbol: 'Anchor',
      rhs: ['negativeLookahead', 'Expression', ')'],
    },
    {
      symbol: 'Anchor',
      rhs: ['lookbehind', 'Expression', ')'],
    },
    {
      symbol: 'Anchor',
      rhs: ['negativeLookbehind', 'Expression', ')'],
    },
  ],

  lexer: {
    rules: [
      ...createEscapeMatchLexerRules({
        w: 'characterClassAnyWord',
        W: 'characterClassAnyWordInverted',
        s: 'whitespaceCharacter',
        S: 'whitespaceCharacterInverted',
        d: 'characterClassAnyDecimalDigit',
        D: 'characterClassAnyDecimalDigitInverted',

        /* Anchors
       ------------------------------------------------------------------*/
        b: 'anchorWordBoundary',
        B: 'anchorNonWordBoundary',
        A: 'anchorStartOfStringOnly',
        z: 'anchorEndOfStringOnlyNotNewline',
        Z: 'anchorEndOfStringOnly',
        G: 'anchorPreviousMatchEnd',
      }),

      /* Backreferences
------------------------------------------------------------------*/
      {
        regexp: `my.matchBackreference`,
        token: 'backreference',
      },

      {
        regexp: 'my.matchEscapeChar',
        token: 'char',
        action() {
          this.text = this.matches[1];
        },
      },

      /* Assertions
    ------------------------------------------------------------------ */
      {
        regexp: createStringMatch(`(?=`),
        token: 'lookahead',
      },
      {
        regexp: createStringMatch(`(?!`),
        token: 'negativeLookahead',
      },
      {
        regexp: createStringMatch(`(?<=`),
        token: 'lookbehind',
      },
      {
        regexp: createStringMatch(`(?<!`),
        token: 'negativeLookbehind',
      },

      {
        regexp: 'my.matchNamedGroupPrefix',
        token: 'namedGroupPrefix',
        action() {
          this.text = this.matches[1];
        },
      },

      ...createLiteralLexerRules([
        '$',
        ',',
        '^',
        '?:',
        '?',
        '(',
        ')',
        '-',
        '|',
        '*',
        '+',
      ]),

      {
        regexp: createStringMatch('['),
        token: '[',
        action() {
          this.userData.insideCharacterGroup = true;
        },
      },

      {
        regexp: createStringMatch(']'),
        token: ']',
        action() {
          this.userData.insideCharacterGroup = false;
        },
      },

      {
        regexp: 'my.matchAnyChar',
        token: 'anyChar',
      },

      {
        regexp: createStringMatch('{'),
        token: '{',
        action() {
          this.userData.insideQuantifierRange = true;
        },
      },

      {
        regexp: createStringMatch('}'),
        token: '}',
        action() {
          this.userData.insideQuantifierRange = false;
        },
      },

      {
        regexp: 'my.matchQuantifierNumber',
        token: 'int',
      },

      {
        regexp: 'my.matchChar',
        token: 'char',
      },
    ],
  },
});
