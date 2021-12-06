import Input from './Input';
import type { GroupValue } from './Input';
import dfsMatch from './dfsMatch';
import bfsMatch from './bfsMatch';

import AsyncInput, { GetCharAsync } from './AsyncInput';
import asyncDfsMatch from './asyncDfsMatch';
import { State } from './state';
import Compiler, { CompilerOptions } from './Compiler';

export interface MatchResult {
  match: string;
  index: number;
  input: string;
  groups?: GroupValue[];
  namedGroups?: Record<string, GroupValue>;
}

export class Matcher {
  cacheResult: Map<State, boolean>[] = [];
  startState: State | undefined;
  input: null | Input;
  matchFn: typeof bfsMatch | typeof dfsMatch;

  constructor(
    public compiler: Compiler,
    str?: string,
    public options: CompilerOptions = {},
  ) {
    this.input = str ? new Input(str, options) : null;
    this.startState = this.compiler.startState;
    this.matchFn = options.bfs ? bfsMatch : dfsMatch;
  }

  setOptions(options: CompilerOptions) {
    this.options = options;
    this.matchFn = options.bfs ? bfsMatch : dfsMatch;
  }

  reset() {
    this.input!.reset();
    this.cacheResult = [];
  }

  getCacheResultIndexMap(input: Input) {
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
      sticky: this.options.sticky,
    });
  }

  firstMatch() {
    // @ts-ignore
    return this.matchInternal({ reset: true });
  }
  // @ts-ignore
  matchInternal({ startState, sticky, onlyMatch, reset } = {}) {
    let input = this.input!;

    do {
      this.cacheResult = [];
      let matchedInput = this.matchFn(
        input,
        startState || this.startState,
        onlyMatch,
      );
      if (matchedInput) {
        input = matchedInput;
        this.input = input;
        const { startIndex, index } = input;
        const matchString = input.getString(startIndex - index);
        const ret: MatchResult = {
          match: matchString,
          index: startIndex,
          input: input.str,
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

export class AsyncMatcher {
  startState?: State | undefined;
  stopped?: boolean;
  input: AsyncInput | null;
  matchFn: typeof asyncDfsMatch;
  cacheResult: Map<State, boolean>[] = [];

  constructor(
    public compiler: Compiler,
    getCharAsync?: GetCharAsync,
    public options: CompilerOptions = {},
  ) {
    this.input = getCharAsync ? new AsyncInput(getCharAsync, options) : null;
    this.startState = this.compiler.startState;
    this.matchFn = asyncDfsMatch;
  }

  setOptions(options: CompilerOptions) {
    this.options = options;
    this.matchFn = asyncDfsMatch;
  }

  stop() {
    this.stopped = true;
  }

  getCacheResultIndexMap(input: AsyncInput) {
    const cacheMap = (this.cacheResult[input.index] =
      this.cacheResult[input.index] || new Map());
    return cacheMap;
  }

  async match() {
    return this.matchInternal();
  }

  // @ts-ignore
  async matchInternal({ startState, onlyMatch } = {}): MatchResult {
    let input = this.input!;

    do {
      this.cacheResult = [];
      let matchedInput = await this.matchFn(
        input,
        startState || this.startState,
        onlyMatch,
      );
      if (matchedInput) {
        input = matchedInput;
        this.input = input;
        const { index } = input;
        const matchString = input.getString(-index);
        const ret: MatchResult = {
          match: matchString,
          index: -1,
          input: '',
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
    } while (!this.stopped);
  }
}
