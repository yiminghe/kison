export const anchorMatchers = {
  "^"(input) {
    return input.isStart() || (input.multiline && input.getString(-1) === '\n');
  },
  anchorWordBoundary(input) {
    return input.isAtWordBoundary();
  },
  anchorNonWordBoundary(input) {
    return !input.isAtWordBoundary();
  },
  anchorStartOfStringOnly(input) {
    return input.isStart();
  },
  anchorEndOfStringOnlyNotNewline(input) {
    return input.isEnd();
  },
  $(input) {
    return input.isEnd() || (input.multiline && input.getString() === '\n')
  },
  anchorEndOfStringOnly(input) {
    return input.isEnd() || (input.isAtLastIndex() && input.getString() === '\n')
  },
  anchorPreviousMatchEnd(input) {
    if (input.isStart()) {
      return true;
    }
    return input.index === input.previousMatchIndex;
  }
};

export const stringMatcher = (str, caseInsensitive) => {
  return input => {
    let ret;
    if (caseInsensitive) {
      ret = input.getString(str.length).toLowerCase() === str.toLowerCase();
    } else {
      ret = input.getString(str.length) === str;
    }
    return ret ? { count: str.length } : null;
  };
};

export const backreferenceMatcher = (index) => {
  return input => {
    const group = input.group[index];
    if (!group) {
      return false;
    }
    return group === input.getString(group.length) ? { count: group.length } : null;
  };
};

export const anyCharMatcher = (includingNewline) => {
  return input => {
    if (input.isEnd()) {
      return false;
    }
    if (input.getString() === '\n') {
      return includingNewline ? { count: 1 } : null;
    }
    return { count: 1 };
  };
}

export const charGroupMatcher=(items,invert)=>{
  return input=>{
    
  };
};