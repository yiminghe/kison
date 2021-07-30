import Compiler from "./Compiler.js";
import { Matcher } from "./match.js";

export default function compile(pattern) {
  const compiler = new Compiler().initWithPattern(pattern);
  return {
    matcher(str, options = {}) {
      return new Matcher(compiler, str, options);
    }
  };
}
