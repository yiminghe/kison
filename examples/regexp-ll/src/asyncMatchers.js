// @ts-check
import { isWord, isNumber } from './utils.js';
import { AsyncMatcher, Matcher } from './match.js';

export const asyncAnchorMatchers = {
  '^'(input) {
    return true;
  },
  anchorWordBoundary(input) {
    return input.isAtWordBoundary();
  },
  async anchorNonWordBoundary(input) {
    return !(await input.isAtWordBoundary());
  },
  anchorStartOfStringOnly(input) {
    return true;
  },
  anchorEndOfStringOnlyNotNewline(input) {
    return false;
  },
  async $(input) {
    return input.options.multiline && (await input.getChar()) === '\n';
  },
  async anchorEndOfStringOnly(input) {
    return input.isAtLastIndex() && (await input.getChar()) === '\n';
  },
  anchorPreviousMatchEnd(input) {
    return false;
  },
};

export const asyncStringMatcher = (str) => {
  return async (input) => {
    if (input.isEnd()) {
      return null;
    }
    let ret = await input.matchString(str);
    return ret ? { count: str.length } : null;
  };
};

export const asyncBackreferenceMatcher = (index, named) => {
  return async (input) => {
    if (input.isEnd()) {
      return null;
    }
    const group = named ? input.namedGroups[index] : input.groups[index - 1];
    if (!group) {
      return null;
    }
    const { match } = group;
    return (await input.matchString(match)) ? { count: match.length } : null;
  };
};

const linefeeds = {
  '\n': 1,
  '\r': 1,
  '\u2028': 1,
  '\u2029': 1,
};

export const asyncAnyCharMatcher = async (input) => {
  if (input.isEnd()) {
    return null;
  }
  const char = await input.getChar();
  if (linefeeds[char]) {
    return input.options.dotMatchesLineSeparators
      ? { count: char.length }
      : null;
  }
  return { count: char.length };
};

export const asyncCharGroupMatcher = (items, invert) => {
  return async (input) => {
    if (input.isEnd()) {
      return null;
    }
    let ret = !!invert;
    const current = await input.getChar();
    for (const item of items) {
      const child = item.children[0];
      if (child.symbol === 'CharacterClass') {
        const cls = child.children[0].token;
        if (await characterClassMatcher[cls](input)) {
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

export const asyncCharacterClassMatcher = {
  async characterClassAnyWord(input) {
    let char = await input.getChar();
    return isWord(char) ? { count: char.length } : null;
  },
  async characterClassAnyWordInverted(input) {
    let char = await input.getChar();
    return !isWord(char) ? { count: char.length } : null;
  },
  async characterClassAnyDecimalDigit(input) {
    let char = await input.getChar();
    return isNumber(char) ? { count: char.length } : null;
  },
  async characterClassAnyDecimalDigitInverted(input) {
    let char = await input.getChar();
    return !isNumber(char) ? { count: char.length } : null;
  },
  async whitespaceCharacter(input) {
    if (input.isEnd()) {
      return false;
    }
    let char = await input.getChar();
    return whitespaceCharacters[char] ? { count: char.length } : null;
  },
  async whitespaceCharacterInverted(input) {
    if (input.isEnd()) {
      return false;
    }
    let char = await input.getChar();
    return !whitespaceCharacters[char] ? { count: char.length } : null;
  },
};

export const asyncAssertionMatcher = {
  lookahead(exp, compiler, invert) {
    const unit = compiler.compile(exp);
    const matcher = new AsyncMatcher(compiler);
    return async (input) => {
      matcher.setOptions(input.options);
      matcher.input = input.clone();
      // @ts-ignore
      let match = await matcher.matchInternal({
        startState: unit.start,
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
    return asyncAssertionMatcher.lookahead(exp, compiler, true);
  },
  lookbehind(exp, compiler, invert) {
    compiler.setInverted(true);
    const unit = compiler.compile(exp);
    compiler.setInverted(false);
    const matcher = new Matcher(compiler);
    return async (input) => {
      matcher.setOptions(input.options);
      matcher.input = input.clone();
      matcher.input.setInverted();
      matcher.input.advance();
      // @ts-ignore
      let match = await matcher.matchInternal({
        startState: unit.start,
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
    return asyncAssertionMatcher.lookbehind(exp, compiler, true);
  },
};
