import { isWord, isNumber } from './utils';
import { Matcher } from './match';
import Input from './Input';
import { AstNode, AstSymbolNode, Ast_CharacterGroupInner_Node } from './parser';
import Compiler from './Compiler';

export const anchorMatchers = {
  '^'(input: Input) {
    return !!(
      !input.index ||
      (input.options.multiline && input.getPrevChar() === '\n')
    );
  },
  anchorWordBoundary(input: Input) {
    return input.isAtWordBoundary();
  },
  anchorNonWordBoundary(input: Input) {
    return !input.isAtWordBoundary();
  },
  anchorStartOfStringOnly(input: Input) {
    return !input.index;
  },
  anchorEndOfStringOnlyNotNewline(input: Input) {
    return input.isEnd();
  },
  $(input: Input) {
    return (
      input.isEnd() || (input.options.multiline && input.getChar() === '\n')
    );
  },
  anchorEndOfStringOnly(input: Input) {
    return input.isEnd() || (input.isAtLastIndex() && input.getChar() === '\n');
  },
  anchorPreviousMatchEnd(input: Input) {
    return input.index === input.previousMatchIndex;
  },
};

export const stringMatcher = (str: string) => {
  return (input: Input) => {
    if (input.isEnd()) {
      return null;
    }
    let ret = input.matchString(str);
    return ret ? { count: str.length } : null;
  };
};

export const backreferenceMatcher = (index: number | string) => {
  return (input: Input) => {
    if (input.isEnd()) {
      return false;
    }
    const group =
      typeof index === 'string'
        ? input.namedGroups[index]
        : input.groups[index - 1];
    if (!group) {
      return false;
    }
    const { match } = group;
    return input.matchString(match) ? { count: match.length } : false;
  };
};

const linefeeds: Record<string, number> = {
  '\n': 1,
  '\r': 1,
  '\u2028': 1,
  '\u2029': 1,
};

export const anyCharMatcher = (input: Input) => {
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

export const charGroupMatcher = (
  items: Ast_CharacterGroupInner_Node['children'],
  invert?: boolean,
) => {
  return (input: Input) => {
    if (input.isEnd()) {
      return null;
    }
    let ret = !!invert;
    const current = input.getChar();
    for (const item of items) {
      const child = item.children[0];
      if (child.type === 'symbol' && child.symbol === 'CharacterClass') {
        const cls = child.children[0].token;
        if (characterClassMatcher[cls](input)) {
          ret = !ret;
          break;
        }
      } else if (child.type === 'symbol' && child.symbol === 'CharacterRange') {
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
const whitespaceCharacters: Record<string, number> = {
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
  characterClassAnyWord(input: Input) {
    let char = input.getChar();
    return isWord(char) ? { count: char.length } : null;
  },
  characterClassAnyWordInverted(input: Input) {
    let char = input.getChar();
    return !isWord(char) ? { count: char.length } : null;
  },
  characterClassAnyDecimalDigit(input: Input) {
    let char = input.getChar();
    return isNumber(char) ? { count: char.length } : null;
  },
  characterClassAnyDecimalDigitInverted(input: Input) {
    let char = input.getChar();
    return !isNumber(char) ? { count: char.length } : null;
  },
  whitespaceCharacter(input: Input) {
    if (input.isEnd()) {
      return false;
    }
    let char = input.getChar();
    return whitespaceCharacters[char] ? { count: char.length } : null;
  },
  whitespaceCharacterInverted(input: Input) {
    if (input.isEnd()) {
      return false;
    }
    let char = input.getChar();
    return !whitespaceCharacters[char] ? { count: char.length } : null;
  },
};

export const assertionMatcher = {
  lookahead(exp: AstNode, compiler: Compiler, invert?: boolean) {
    const unit = compiler.compile(exp);
    const matcher = new Matcher(compiler);
    return (input: Input) => {
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
  negativeLookahead(exp: AstNode, compiler: Compiler) {
    return assertionMatcher.lookahead(exp, compiler, true);
  },
  lookbehind(exp: AstNode, compiler: Compiler, invert?: boolean) {
    compiler.setInverted(true);
    const unit = compiler.compile(exp);
    compiler.setInverted(false);
    const matcher = new Matcher(compiler);
    return (input: Input) => {
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
  negativeLookbehind(exp: AstNode, compiler: Compiler) {
    return assertionMatcher.lookbehind(exp, compiler, true);
  },
};
