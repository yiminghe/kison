import { isWord, isNumber } from './utils';
import { AsyncMatcher, Matcher } from './match';
import type AsyncInput from './AsyncInput';
import { AstNode, Ast_CharacterGroupInner_Node } from './parser';
import Compiler from './Compiler';

export const asyncAnchorMatchers = {
  '^'(input: AsyncInput) {
    return true;
  },
  anchorWordBoundary(input: AsyncInput) {
    return input.isAtWordBoundary();
  },
  async anchorNonWordBoundary(input: AsyncInput) {
    return !(await input.isAtWordBoundary());
  },
  anchorStartOfStringOnly() {
    return true;
  },
  anchorEndOfStringOnlyNotNewline() {
    return false;
  },
  async $(input: AsyncInput) {
    return input.options.multiline && (await input.getChar()) === '\n';
  },
  async anchorEndOfStringOnly(input: AsyncInput) {
    return input.isAtLastIndex() && (await input.getChar()) === '\n';
  },
  anchorPreviousMatchEnd() {
    return false;
  },
};

export const asyncStringMatcher = (str: string) => {
  return async (input: AsyncInput) => {
    if (input.isEnd()) {
      return null;
    }
    let ret = await input.matchString(str);
    return ret ? { count: str.length } : null;
  };
};

export const asyncBackreferenceMatcher = (index: number | string) => {
  return async (input: AsyncInput) => {
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
    return (await input.matchString(match)) ? { count: match.length } : false;
  };
};

const linefeeds: Record<string, number> = {
  '\n': 1,
  '\r': 1,
  '\u2028': 1,
  '\u2029': 1,
};

export const asyncAnyCharMatcher = async (input: AsyncInput) => {
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

export const asyncCharGroupMatcher = (
  items: Ast_CharacterGroupInner_Node['children'],
  invert?: boolean,
) => {
  return async (input: AsyncInput) => {
    if (input.isEnd()) {
      return null;
    }
    let ret = !!invert;
    const current = await input.getChar();
    for (const item of items) {
      const child = item.children[0];
      if (child.symbol === 'CharacterClass') {
        const cls = child.children[0].token;
        if (await asyncCharacterClassMatcher[cls](input)) {
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
        throw new Error(
          'charGroupMatcher unmatch item:' + (child as any).symbol,
        );
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

export const asyncCharacterClassMatcher = {
  async characterClassAnyWord(input: AsyncInput) {
    let char = await input.getChar();
    return isWord(char) ? { count: char.length } : null;
  },
  async characterClassAnyWordInverted(input: AsyncInput) {
    let char = await input.getChar();
    return !isWord(char) ? { count: char.length } : null;
  },
  async characterClassAnyDecimalDigit(input: AsyncInput) {
    let char = await input.getChar();
    return isNumber(char) ? { count: char.length } : null;
  },
  async characterClassAnyDecimalDigitInverted(input: AsyncInput) {
    let char = await input.getChar();
    return !isNumber(char) ? { count: char.length } : null;
  },
  async whitespaceCharacter(input: AsyncInput) {
    if (input.isEnd()) {
      return false;
    }
    let char = await input.getChar();
    return whitespaceCharacters[char] ? { count: char.length } : null;
  },
  async whitespaceCharacterInverted(input: AsyncInput) {
    if (input.isEnd()) {
      return false;
    }
    let char = await input.getChar();
    return !whitespaceCharacters[char] ? { count: char.length } : null;
  },
};

export const asyncAssertionMatcher = {
  lookahead(exp: AstNode, compiler: Compiler, invert?: boolean) {
    const unit = compiler.compile(exp);
    const matcher = new AsyncMatcher(compiler);
    return async (input: AsyncInput) => {
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
  negativeLookahead(exp: AstNode, compiler: Compiler) {
    return asyncAssertionMatcher.lookahead(exp, compiler, true);
  },
  lookbehind(exp: AstNode, compiler: Compiler, invert?: boolean) {
    compiler.setInverted(true);
    const unit = compiler.compile(exp);
    compiler.setInverted(false);
    const matcher = new AsyncMatcher(compiler);
    return async (input: AsyncInput) => {
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
  negativeLookbehind(exp: AstNode, compiler: Compiler) {
    return asyncAssertionMatcher.lookbehind(exp, compiler, true);
  },
};
