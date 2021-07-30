import Input from "./Input.js";

function matchInput(input, state, callSiteMap = new Map()) {
  // avoid already failed match
  if (this.getCacheResultIndexMap(input).get(state) === false) {
    return false;
  }

  // endless loop
  if (callSiteMap.get(state) === input.index) {
    return false;
  }

  callSiteMap.set(state, input.index);

  let groupStartIndex = this.compiler.groupStartIndex(state);
  if (groupStartIndex) {
    groupStartIndex--;
    input.startGroupIndex[groupStartIndex] = input.index;
  }
  let groupEndIndex = this.compiler.groupEndIndex(state);
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

  for (const t of state.transitions) {
    let newInput = input.clone();
    const find = t.perform(newInput);
    if (find) {
      if (find.count) {
        newInput.advance(find.count);
      }
      const ret = matchInput.call(this, newInput, t.to, callSiteMap);
      if (ret) {
        return ret;
      }
    } else {
      continue;
    }
  }

  callSiteMap.delete(state);

  this.getCacheResultIndexMap(input).set(state, false);

  return false;
}

export class Matcher {
  constructor(compiler, string, options) {
    this.input = new Input(string, options);
    this.compiler = compiler;
    this.cacheResult = [];
  }

  reset() {
    this.input.reset();
    this.cacheResult = [];
  }

  getCacheResultIndexMap(input) {
    const cacheMap = (this.cacheResult[input.index] =
      this.cacheResult[input.index] || new Map());
    return cacheMap;
  }

  match() {
    let { input } = this;
    do {
      this.cacheResult = [];
      let matchedInput = matchInput.call(this, input, this.compiler.startState);
      if (matchedInput) {
        input = matchedInput;
        this.input = input;
        const { startIndex, index } = input;
        const matchString = input.getString(startIndex - index);
        const ret = {
          match: matchString,
          index: startIndex,
          input: input.str
        };
        if (input.groups.length) {
          ret.groups = input.groups;
        }
        input.advanceMatch();
        return ret;
      }
      input.advanceStartIndex();
    } while (!input.isEnd());
    return null;
  }
}
