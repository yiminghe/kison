import Compiler, { CompilerOptions } from './Compiler';
import { AsyncMatcher, Matcher } from './match';
import type { GetCharAsync } from './AsyncInput';

export default function compile(
  pattern: string,
  compilerOptions: CompilerOptions = {},
) {
  const compiler = new Compiler(compilerOptions).initWithPattern(pattern);
  return {
    matcher(str: string, options: CompilerOptions = {}) {
      if (compilerOptions.async) {
        throw new Error('Can only call matcherStream');
      }
      return new Matcher(compiler, str, {
        ...compilerOptions,
        ...options,
      });
    },
    // TODO match infinite stream ...
    matcherAsync(getCharAsync: GetCharAsync, options: CompilerOptions = {}) {
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
