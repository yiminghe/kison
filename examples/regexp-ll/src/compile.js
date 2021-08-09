import Compiler from "./Compiler.js";
import { Matcher } from "./match.js";

export default function compile(pattern, compilerOptions = {}) {
  const compiler = new Compiler(compilerOptions).initWithPattern(pattern);
  return {
    matcher(str, options = {}) {
      return new Matcher(compiler, str, {
        ...compilerOptions,
        ...options
      });
    }
  };
}
