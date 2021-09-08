// @ts-check
import Input from "./Input.js";
import dfsMatch from "./dfsMatch.js";
import bfsMatch from "./bfsMatch.js";

export class Matcher {
  constructor(compiler, string, options = {}) {
    this.input = string ? new Input(string, options) : null;
    this.compiler = compiler;
    this.startState = this.compiler.startState;
    this.cacheResult = [];
    this.setOptions(options);
  }

  setOptions(options) {
    this.options = options;
    this.matchFn = options.bfs ? bfsMatch : dfsMatch;
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

  isMatched() {
    // @ts-ignore
    return !!this.matchInternal({ reset: true, onlyMatch: true });
  }

  match() {
    // @ts-ignore
    return this.matchInternal({
      sticky: this.options.sticky
    });
  }

  firstMatch() {
    // @ts-ignore
    return this.matchInternal({ reset: true });
  }
  // @ts-ignore
  matchInternal({ startState, sticky, onlyMatch, reset } = {}) {
    let { input } = this;

    do {
      this.cacheResult = [];
      let matchedInput = this.matchFn(
        input,
        startState || this.startState,
        onlyMatch
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
        if (reset) {
          input.reset();
        } else {
          input.advanceMatch();
        }
        return ret;
      }
      if (sticky) {
        break;
      } else {
        input.advanceStartIndex();
      }
    } while (!input.isEnd());
    if (reset) {
      input.reset();
    }
    return null;
  }
}
