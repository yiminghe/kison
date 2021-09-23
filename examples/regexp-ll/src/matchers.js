// @ts-check
import { isWord, isNumber } from './utils.js';
import { Matcher } from './match.js';

export const anchorMatchers = {
  '^'(input) {
    return (
      !input.index || (input.options.multiline && input.getPrevChar() === '\n')
    );
  },
  anchorWordBoundary(input) {
    return input.isAtWordBoundary();
  },
  anchorNonWordBoundary(input) {
    return !input.isAtWordBoundary();
  },
  anchorStartOfStringOnly(input) {
    return !input.index;
  },
  anchorEndOfStringOnlyNotNewline(input) {
    return input.isEnd();
  },
  $(input) {
    return (
      input.isEnd() || (input.options.multiline && input.getChar() === '\n')
    );
  },
  anchorEndOfStringOnly(input) {
    return input.isEnd() || (input.isAtLastIndex() && input.getChar() === '\n');
  },
  anchorPreviousMatchEnd(input) {
    return input.index === input.previousMatchIndex;
  },
};

export const stringMatcher = (str) => {
  return (input) => {
    if (input.isEnd()) {
      return null;
    }
    let ret = input.matchString(str);
    return ret ? { count: str.length } : null;
  };
};

export const backreferenceMatcher = (index, named) => {
  return (input) => {
    if (input.isEnd()) {
      return null;
    }
    const group = named ? input.namedGroups[index] : input.groups[index - 1];
    if (!group) {
      return null;
    }
    const { match } = group;
    return input.matchString(match) ? { count: match.length } : null;
  };
};

const linefeeds = {
  '\n': 1,
  '\r': 1,
  '\u2028': 1,
  '\u2029': 1,
};

export const anyCharMatcher = (input) => {
  if (input.isEnd()) {
    return null;
  }
  const char = input.getChar();
  if (linefeeds[char]) {
    return input.options.dotMatchesLineSeparators
      ? { count: char.length }
      : null;
  }
  return { count: char.length };
};

export const charGroupMatcher = (items, invert) => {
  return (input) => {
    if (input.isEnd()) {
      return null;
    }
    let ret = !!invert;
    const current = input.getChar();
    for (const item of items) {
      const child = item.children[0];
      if (child.symbol === 'CharacterClass') {
        const cls = child.children[0].token;
        if (characterClassMatcher[cls](input)) {
          ret = !ret;
          break;
        }
      } else if (child.symbol === 'CharacterRange') {
        const chars = child.children.map((c) => c.text);
        const lower = chars[0];
        let upper = chars[2];
        if (upper) {
          if (current >= lower && current <= upper) {
            ret = !ret;
            break;
          }
        } else if (current === lower) {
          ret = !ret;
          break;
        }
      } else {
        throw new Error('charGroupMatcher unmatch item:' + child.symbol);
      }
    }
    return ret
      ? {
          count: current.length,
        }
      : false;
  };
};

// \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff
const whitespaceCharacters = {
  ...linefeeds,

  ' ': 1,
  '\f': 1,
  '\t': 1,
  '\v': 1,
  '\u00a0': 1,
  '\u1680': 1,
  '\u202f': 1,
  '\u205f': 1,
  '\u3000': 1,
  '\ufeff': 1,
};

for (let code = 0x2000; code < 0x200b; code++) {
  whitespaceCharacters[String.fromCharCode(code)] = 1;
}

export const characterClassMatcher = {
  characterClassAnyWord(input) {
    let char = input.getChar();
    return isWord(char) ? { count: char.length } : null;
  },
  characterClassAnyWordInverted(input) {
    let char = input.getChar();
    return !isWord(char) ? { count: char.length } : null;
  },
  characterClassAnyDecimalDigit(input) {
    let char = input.getChar();
    return isNumber(char) ? { count: char.length } : null;
  },
  characterClassAnyDecimalDigitInverted(input) {
    let char = input.getChar();
    return !isNumber(char) ? { count: char.length } : null;
  },
  whitespaceCharacter(input) {
    if (input.isEnd()) {
      return false;
    }
    let char = input.getChar();
    return whitespaceCharacters[char] ? { count: char.length } : null;
  },
  whitespaceCharacterInverted(input) {
    if (input.isEnd()) {
      return false;
    }
    let char = input.getChar();
    return !whitespaceCharacters[char] ? { count: char.length } : null;
  },
};

export const assertionMatcher = {
  lookahead(exp, compiler, invert) {
    const unit = compiler.compile(exp);
    const matcher = new Matcher(compiler);
    return (input) => {
      matcher.setOptions(input.options);
      matcher.input = input.clone();
      // @ts-ignore
      let match = matcher.matchInternal({
        startState: unit.start,
        sticky: true,
      });
      if (invert) {
        return match ? false : { count: 0 };
      }
      if (match) {
        input.injectGroups(match);
        return {
          count: 0,
        };
      }
      return false;
    };
  },
  negativeLookahead(exp, compiler) {
    return assertionMatcher.lookahead(exp, compiler, true);
  },
  lookbehind(exp, compiler, invert) {
    compiler.setInverted(true);
    const unit = compiler.compile(exp);
    compiler.setInverted(false);
    const matcher = new Matcher(compiler);
    return (input) => {
      matcher.setOptions(input.options);
      matcher.input = input.clone();
      matcher.input.setInverted();
      matcher.input.advance();
      // @ts-ignore
      let match = matcher.matchInternal({
        startState: unit.start,
        sticky: true,
      });
      if (invert) {
        return match ? false : { count: 0 };
      }
      if (match) {
        input.injectGroups(match);
        return {
          count: 0,
        };
      }
      return false;
    };
  },
  negativeLookbehind(exp, compiler) {
    return assertionMatcher.lookbehind(exp, compiler, true);
  },
};
