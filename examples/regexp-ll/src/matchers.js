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

export const stringMatcher = (str, caseInsensitive) => {
  return input => {
    if (input.isEnd()) {
      return null;
    }
    let ret;
    if (caseInsensitive) {
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

export const anyCharMatcher = includingNewline => {
  return input => {
    if (input.isEnd()) {
      return null;
    }
    if (input.getString() === "\n") {
      return includingNewline ? { count: 1 } : null;
    }
    return { count: 1 };
  };
};

export const charGroupMatcher = (items, invert) => {
  return input => {};
};
