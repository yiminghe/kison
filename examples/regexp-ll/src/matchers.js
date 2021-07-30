import { isWord, isNumber } from "./utils.js";

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
  }
};
