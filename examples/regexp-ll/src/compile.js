import parser from './parser.js';
import Compiler from './Compiler.js';
import Input from './Input.js';

function match(input, start) {
  while (!input.isEnd()) {
    if (matchInput(input, start)) {
      let start = input.startIndex;
      const matchString = input.str.slice(input.startIndex, input.index);
      input.previousMatchIndex = input.index;
      input.startIndex = input.previousMatchIndex;
      return {
        match: matchString,
        index: start,
      }
    }
    input.startIndex++;
  }
  return null;
}

function matchInput(input, state) {
  if (!state.transitions.length) {
    return true;
  }
  if (input.isEnd()) {
    return false;
  }
  for (const t of state.transitions) {
    let newInput = input.clone();
    const find = t.perform(newInput);
    if (find) {
      newInput.advance(find.count);
      if (matchInput(newInput, t.to)) {
        input.index = newInput.index;
        return true;
      }
    } else {
      continue;
    }
  }
  return false;
}

export default function compile(pattern, options = {}) {
  const compiler = new Compiler(options);
  const start = compiler.compile(parser.parse(pattern).ast).start;
  return {
    matcher(str) {
      const input = new Input(str);
      input.multiline = options.multiline;
      return {
        match() {
          return match(input, start);
        }
      };
    }
  }
}