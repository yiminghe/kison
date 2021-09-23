// @ts-check
import Compiler from './Compiler.js';
import { AsyncMatcher, Matcher } from './match.js';

export default function compile(pattern, compilerOptions = {}) {
  const compiler = new Compiler(compilerOptions).initWithPattern(pattern);
  return {
    matcher(str, options = {}) {
      if (compilerOptions.async) {
        throw new Error('Can only call matcherStream');
      }
      return new Matcher(compiler, str, {
        ...compilerOptions,
        ...options,
      });
    },
    // TODO match infinite stream ...
    matcherAsync(getCharAsync, options = {}) {
      if (!compilerOptions.async) {
        throw new Error('Can only call matcher');
      }
      return new AsyncMatcher(compiler, getCharAsync, {
        ...compilerOptions,
        ...options,
      });
    },
  };
}
