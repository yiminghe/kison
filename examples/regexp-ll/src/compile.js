import Compiler from "./Compiler.js";
import { Matcher } from './match.js';

export default function compile(pattern, options = {}) {
  const compiler = new Compiler(options).initWithPattern(pattern);
  return {
    matcher(str) {
      return new Matcher(compiler, str, options);
    }
  };
}
