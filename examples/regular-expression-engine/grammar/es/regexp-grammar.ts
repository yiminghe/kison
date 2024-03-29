/// <reference path="../../../../types/index.d.ts" />
import * as n from './names';

const my = {
  charRange: [
    [0x09],
    [0x0a],
    [0x0d],
    [0x20, 0xd7ff],
    [0xe000, 0xfffd],
    [0x10000, 0x10ffff],
  ],
  createMatchString(str: string, lexer: any) {
    if (!lexer.nextStartsWith(str)) {
      return false;
    }
    return [str];
  },
  matchOnlyEscapeChar(lexer: any, index = 0) {
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
      let matchedNumber = my.matchNumber(lexer, index + 2, true, len);
      if (
        matchedNumber &&
        Array.isArray(matchedNumber) &&
        matchedNumber[0].length === len
      ) {
        const n = matchedNumber[0];
        let first = parseInt(n, 16);
        if (lexer.options.unicode && index === 0) {
          // 检查是否开始 surrogate pair
          if (first >= 0xd800 && first <= 0xdbff) {
            let secondRet: any = my.matchOnlyEscapeChar(lexer, index + 2 + len);
            let second = (secondRet && secondRet.r && secondRet.r[2]) || 0;
            if (second >= 0xdc00 && second <= 0xdfff) {
              // low surrogate
              // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
              let totoal = (first - 0xd800) * 0x400 + second - 0xdc00 + 0x10000;
              return {
                m,
                r: [
                  m + n + secondRet.r[0],
                  String.fromCodePoint(totoal),
                  totoal,
                ],
              };
            }
          }
        }
        return {
          m,
          r: [m + n, String.fromCharCode(first), first],
        };
      }
    }
    return {
      m,
    };
  },
  matchEscapeChar(lexer: any) {
    const ret = my.matchOnlyEscapeChar(lexer);
    if (ret.r !== undefined) {
      return ret.r;
    }
    if (my.matchCharCode(lexer.nextCharCode(1))) {
      return [ret.m, lexer.nextChar(1)];
    }
    return false;
  },
  matchAnyChar(lexer: any) {
    const char = lexer.nextChar();
    if (char === '.' && !lexer.userData.insideCharacterGroup) {
      return [char];
    }
    return false;
  },
  matchChar(lexer: any) {
    return my.matchCharCode(lexer.nextCharCode());
  },
  matchCharCode(charCode: number) {
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
  matchGroupName(lexer: any, prefix: string) {
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
  matchBackreference(lexer: any) {
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
  matchQuantifierNumber(lexer: any) {
    if (lexer.userData.insideQuantifierRange) {
      return my.matchNumber(lexer);
    }
    return false;
  },
  matchNumber(lexer: any, start = 0, hex?: boolean, max?: number) {
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
  matchNamedGroupPrefix(lexer: any) {
    const prefix = '(?<';
    if (!lexer.nextStartsWith(prefix)) {
      return false;
    }
    return my.matchGroupName(lexer, prefix);
  },
};

function createLiteralLexerRules(chars: string[]) {
  return chars.map((c: string) => ({
    token: c,
    regexp: createStringMatch(c),
  }));
}

function createEscapeMatchLexerRules(map: any) {
  return Object.keys(map).map((k) => ({
    token: map[k],
    regexp: createStringMatch(`\\${k}`),
  }));
}

function createStringMatch(str: string) {
  return `my.createMatchString.bind(undefined, ${JSON.stringify(str)})`;
}

export default (options: Kison.Options) => {
  const nn = n.makeExtendSymbols(options);
  const {
    makeAlternates,
    makeOptionalGroup,
    makeGroup,
    makeOneOrMoreGroup,
    makeZeroOrMoreGroup,
  } = options;
  return {
    my,
    productions: [
      {
        symbol: n.Regexp,
        rhs: ['^?', n.Expression],
      },
      {
        symbol: n.Expression,
        rhs: [n.SubExpression, ...makeZeroOrMoreGroup('|', n.SubExpression)],
      },
      {
        symbol: n.SubExpression,
        rhs: ['ExpressionItem*'],
      },
      {
        symbol: n.ExpressionItem,
        rhs: [n.Match],
      },
      {
        symbol: n.ExpressionItem,
        rhs: [n.Group],
      },
      {
        symbol: n.ExpressionItem,
        rhs: [n.Anchor],
      },
      {
        symbol: n.ExpressionItem,
        rhs: [n.backreference],
      },

      /* Grouping Constructs 
      ------------------------------------------------------------------*/

      {
        symbol: n.Group,
        rhs: ['(', '?:?', n.Expression, ')', nn.QuantifierOptional],
      },
      {
        symbol: n.Group,
        rhs: [n.namedGroupPrefix, n.Expression, ')', nn.QuantifierOptional],
      },

      /* Match
  ------------------------------------------------------------------*/
      {
        symbol: n.Match,
        rhs: [n.MatchItem, nn.QuantifierOptional],
      },
      {
        symbol: n.MatchItem,
        rhs: [n.anyChar],
      },
      {
        symbol: n.MatchItem,
        rhs: [n.MatchCharacterClass],
      },
      {
        symbol: n.MatchItem,
        rhs: [n.char],
      },
      {
        symbol: n.MatchCharacterClass,
        rhs: [n.CharacterGroup],
      },
      {
        symbol: n.MatchCharacterClass,
        rhs: [n.CharacterClass],
      },

      /* Character Classes
  ------------------------------------------------------------------*/
      {
        symbol: n.CharacterGroup,
        rhs: ['[', '^?', n.CharacterGroupInner, ']'],
      },
      {
        symbol: n.CharacterGroupInner,
        rhs: [nn.CharacterGroupItemZeroOrMore],
      },
      {
        symbol: n.CharacterGroupItem,
        rhs: [n.CharacterClass],
      },
      {
        symbol: n.CharacterGroupItem,
        rhs: [n.CharacterRange],
      },
      {
        symbol: n.CharacterClass,
        rhs: [n.characterClassAnyWordInverted],
      },
      {
        symbol: n.CharacterClass,
        rhs: [n.characterClassAnyWord],
      },
      {
        symbol: n.CharacterClass,
        rhs: [n.characterClassAnyDecimalDigit],
      },
      {
        symbol: n.CharacterClass,
        rhs: [n.characterClassAnyDecimalDigitInverted],
      },
      {
        symbol: n.CharacterClass,
        rhs: [n.whitespaceCharacter],
      },
      {
        symbol: n.CharacterClass,
        rhs: [n.whitespaceCharacterInverted],
      },
      {
        symbol: n.CharacterRange,
        rhs: [n.char],
      },
      {
        symbol: n.CharacterRange,
        rhs: [n.char, '-', n.char],
      },

      /* Quantifiers 
      ------------------------------------------------------------------*/
      {
        symbol: n.Quantifier,
        rhs: [n.QuantifierType, nn.OPTIONALOptional],
      },
      {
        symbol: n.QuantifierType,
        rhs: ['*'],
      },
      {
        symbol: n.QuantifierType,
        rhs: ['+'],
      },
      {
        symbol: n.QuantifierType,
        rhs: [n.OPTIONAL],
      },
      {
        symbol: n.QuantifierType,
        rhs: ['{', n.int, '}'],
      },
      {
        symbol: n.QuantifierType,
        rhs: ['{', n.int, ',', nn.intOptional, '}'],
      },

      /* Anchors
      ------------------------------------------------------------------*/
      {
        symbol: n.Anchor,
        rhs: [n.anchorWordBoundary],
      },
      {
        symbol: n.Anchor,
        rhs: [n.anchorNonWordBoundary],
      },
      {
        symbol: n.Anchor,
        rhs: [n.anchorStartOfStringOnly],
      },
      {
        symbol: n.Anchor,
        rhs: [n.anchorEndOfStringOnlyNotNewline],
      },
      {
        symbol: n.Anchor,
        rhs: [n.anchorEndOfStringOnly],
      },
      {
        symbol: n.Anchor,
        rhs: [n.anchorPreviousMatchEnd],
      },
      {
        symbol: n.Anchor,
        rhs: ['$'],
      },
      {
        symbol: n.Anchor,
        rhs: [n.lookahead, n.Expression, ')'],
      },
      {
        symbol: n.Anchor,
        rhs: [n.negativeLookahead, n.Expression, ')'],
      },
      {
        symbol: n.Anchor,
        rhs: [n.lookbehind, n.Expression, ')'],
      },
      {
        symbol: n.Anchor,
        rhs: [n.negativeLookbehind, n.Expression, ')'],
      },
    ],

    lexer: {
      rules: [
        ...createEscapeMatchLexerRules({
          w: n.characterClassAnyWord,
          W: n.characterClassAnyWordInverted,
          s: n.whitespaceCharacter,
          S: n.whitespaceCharacterInverted,
          d: n.characterClassAnyDecimalDigit,
          D: n.characterClassAnyDecimalDigitInverted,

          /* Anchors
         ------------------------------------------------------------------*/
          b: n.anchorWordBoundary,
          B: n.anchorNonWordBoundary,
          A: n.anchorStartOfStringOnly,
          z: n.anchorEndOfStringOnlyNotNewline,
          Z: n.anchorEndOfStringOnly,
          G: n.anchorPreviousMatchEnd,
        }),

        /* Backreferences
  ------------------------------------------------------------------*/
        {
          regexp: `my.matchBackreference`,
          token: n.backreference,
        },

        {
          regexp: 'my.matchEscapeChar',
          token: n.char,
          action(this: any) {
            this.text = this.matches[1];
          },
        },

        /* Assertions
      ------------------------------------------------------------------ */
        {
          regexp: createStringMatch(`(?=`),
          token: n.lookahead,
        },
        {
          regexp: createStringMatch(`(?!`),
          token: n.negativeLookahead,
        },
        {
          regexp: createStringMatch(`(?<=`),
          token: n.lookbehind,
        },
        {
          regexp: createStringMatch(`(?<!`),
          token: n.negativeLookbehind,
        },

        {
          regexp: 'my.matchNamedGroupPrefix',
          token: n.namedGroupPrefix,
          action(this: any) {
            this.text = this.matches[1];
          },
        },

        ...createLiteralLexerRules([
          '$',
          ',',
          '^',
          '?:',
          '(',
          ')',
          '-',
          '|',
          '*',
          '+',
        ]),

        {
          regexp: createStringMatch('?'),
          token: n.OPTIONAL,
          action(this: any) {
            this.userData.insideCharacterGroup = true;
          },
        },

        {
          regexp: createStringMatch('['),
          token: '[',
          action(this: any) {
            this.userData.insideCharacterGroup = true;
          },
        },

        {
          regexp: createStringMatch(']'),
          token: ']',
          action(this: any) {
            this.userData.insideCharacterGroup = false;
          },
        },

        {
          regexp: 'my.matchAnyChar',
          token: n.anyChar,
        },

        {
          regexp: createStringMatch('{'),
          token: '{',
          action(this: any) {
            this.userData.insideQuantifierRange = true;
          },
        },

        {
          regexp: createStringMatch('}'),
          token: '}',
          action(this: any) {
            this.userData.insideQuantifierRange = false;
          },
        },

        {
          regexp: 'my.matchQuantifierNumber',
          token: n.int,
        },

        {
          regexp: 'my.matchChar',
          token: n.char,
        },
      ],
    },
  };
};
