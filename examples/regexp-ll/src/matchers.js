import { isWord, isNumber } from "./utils.js";
import { Matcher } from "./match.js";

export const anchorMatchers = {
  "^"(input) {
    return (
      !input.index || (input.options.multiline && input.getString(-1) === "\n")
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
      input.isEnd() || (input.options.multiline && input.getString() === "\n")
    );
  },
  anchorEndOfStringOnly(input) {
    return (
      input.isEnd() || (input.isAtLastIndex() && input.getString() === "\n")
    );
  },
  anchorPreviousMatchEnd(input) {
    return input.index === input.previousMatchIndex;
  }
};

export const stringMatcher = str => {
  return input => {
    if (input.isEnd()) {
      return null;
    }
    let ret;
    if (input.options.caseInsensitive) {
      ret = input.getString(str.length).toLowerCase() === str.toLowerCase();
    } else {
      ret = input.getString(str.length) === str;
    }
    return ret ? { count: str.length } : null;
  };
};

export const backreferenceMatcher = index => {
  return input => {
    const group = input.groups[index - 1];
    if (!group) {
      return null;
    }
    if (input.isEnd()) {
      return null;
    }
    const { match } = group;
    return match === input.getString(match.length)
      ? { count: match.length }
      : null;
  };
};

export const anyCharMatcher = input => {
  if (input.isEnd()) {
    return null;
  }
  if (input.getString() === "\n") {
    return input.options.dotMatchesLineSeparators ? { count: 1 } : null;
  }
  return { count: 1 };
};

export const charGroupMatcher = (items, invert) => {
  return input => {
    if (input.isEnd()) {
      return null;
    }
    let ret = !!invert;
    for (const item of items) {
      const child = item.children[0];
      if (child.symbol === "CharacterClass") {
        const cls = child.children[0].token;
        if (characterClassMatcher[cls](input)) {
          ret = !ret;
          break;
        }
      } else if (child.symbol === "CharacterRange") {
        const chars = child.children.map(c => c.text);
        const lower = chars[0];
        let upper = chars[2];
        const current = input.getString();
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
        throw new Error("charGroupMatcher unmatch item:" + child.symbol);
      }
    }
    return ret
      ? {
          count: 1
        }
      : false;
  };
};

// \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff
const whitespaceCharacters = {
  " ": 1,
  "\f": 1,
  "\n": 1,
  "\r": 1,
  "\t": 1,
  "\v": 1,
  "\u00a0": 1,
  "\u1680": 1,

  "\u2028": 1,
  "\u2029": 1,
  "\u202f": 1,
  "\u205f": 1,
  "\u3000": 1,
  "\ufeff": 1
};

for (let code = 0x2000; code < 0x200b; code++) {
  whitespaceCharacters[String.fromCharCode(code)] = 1;
}

export const characterClassMatcher = {
  characterClassAnyWord(input) {
    return isWord(input.getString()) ? { count: 1 } : null;
  },
  characterClassAnyWordInverted(input) {
    return !isWord(input.getString()) ? { count: 1 } : null;
  },
  characterClassAnyDecimalDigit(input) {
    return isNumber(input.getString()) ? { count: 1 } : null;
  },
  characterClassAnyDecimalDigitInverted(input) {
    return !isNumber(input.getString()) ? { count: 1 } : null;
  },
  whitespaceCharacter(input) {
    if (input.isEnd()) {
      return false;
    }
    return whitespaceCharacters[input.getString()] ? { count: 1 } : null;
  },
  whitespaceCharacterInverted(input) {
    if (input.isEnd()) {
      return false;
    }
    return !whitespaceCharacters[input.getString()] ? { count: 1 } : null;
  }
};

export const assertionMatcher = {
  lookahead(exp, compiler, invert) {
    const unit = compiler.compile(exp);
    const matcher = new Matcher(compiler);
    return input => {
      matcher.input = input.clone();
      let match = matcher.match(unit.start, true);
      if (invert) {
        return match ? false : { count: 0 };
      }
      if (match) {
        input.injectGroups(match);
        return {
          count: 0
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
    return input => {
      matcher.input = input.clone();
      matcher.input.setInverted();
      matcher.input.advance(1);
      let match = matcher.match(unit.start, true);
      if (invert) {
        return match ? false : { count: 0 };
      }
      if (match) {
        input.injectGroups(match);
        return {
          count: 0
        };
      }
      return false;
    };
  },
  negativeLookbehind(exp, compiler) {
    return assertionMatcher.lookbehind(exp, compiler, true);
  }
};
