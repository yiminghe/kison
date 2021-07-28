import Compiler from "./Compiler.js";
import Input from "./Input.js";

function matchInput(compiler, input, state) {
  let groupStartIndex = compiler.groupStartIndex(state);
  if (groupStartIndex) {
    groupStartIndex--;
    input.startGroupIndex[groupStartIndex] = input.index;
  }
  let groupEndIndex = compiler.groupEndIndex(state);
  if (groupEndIndex) {
    groupEndIndex--;
    const index = input.startGroupIndex[groupEndIndex];
    input.groups[groupEndIndex] = {
      index,
      match: input.getString(index - input.index)
    };
  }

  if (!state.transitions.length) {
    return input;
  }
  if (input.isEnd()) {
    return false;
  }

  for (const t of state.transitions) {
    let newInput = input.clone();
    const find = t.perform(newInput);
    if (find) {
      newInput.advance(find.count);
      const ret = matchInput(compiler, newInput, t.to);
      if (ret) {
        return ret;
      }
    } else {
      continue;
    }
  }
  return false;
}

class Matcher {
  constructor(compiler, string, options) {
    this.input = new Input(string, options);
    this.compiler = compiler;
  }

  reset() {
    this.input.reset();
  }

  match() {
    let { input, compiler } = this;
    while (!input.isEnd()) {
      let matchedInput = matchInput(compiler, input, compiler.startState);
      if (matchedInput) {
        input = matchedInput;
        this.input = input;
        const { startIndex, index } = input;
        const matchString = input.getString(startIndex - index);
        const ret = {
          input: input.str,
          match: matchString,
          index: startIndex,
          groups: input.groups
        };
        input.advanceMatch();
        return ret;
      }
      input.advanceStartIndex();
    }
    return null;
  }
}

export default function compile(pattern, options = {}) {
  const compiler = new Compiler(options).initWithPattern(pattern);
  return {
    matcher(str) {
      return new Matcher(compiler, str, options);
    }
  };
}
