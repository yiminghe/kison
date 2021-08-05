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
    input.startGroupIndex[groupStartIndex.index - 1] = {
      index: input.index,
      name: groupStartIndex.name
    };
  }
  let groupEndIndex = this.compiler.groupEndIndex(state);
  if (groupEndIndex) {
    let startIndex = { ...input.startGroupIndex[groupEndIndex.index - 1] };
    let endIndex = {
      index: input.index,
      name: startIndex.name
    };
    if (startIndex.index > endIndex.index) {
      const s = startIndex.index;
      startIndex.index = Math.max(0, endIndex.index + 1);
      endIndex.index = s + 1;
    }
    let name = groupEndIndex.name;
    let value = {
      ...startIndex,
      match: input.str.slice(startIndex.index, endIndex.index)
    };
    input.groups[groupEndIndex.index - 1] = value;
    if (name) {
      input.namedGroups[name] = value;
    }
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
    this.input = string ? new Input(string, options) : null;
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

  match(startState, once) {
    let { input } = this;
    do {
      this.cacheResult = [];
      let matchedInput = matchInput.call(
        this,
        input,
        startState || this.compiler.startState
      );
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
          if (Object.keys(input.namedGroups).length) {
            ret.namedGroups = input.namedGroups;
          }
        }
        input.advanceMatch();
        return ret;
      }
      input.advanceStartIndex();
    } while (!once && !input.isEnd());
    return null;
  }
}
