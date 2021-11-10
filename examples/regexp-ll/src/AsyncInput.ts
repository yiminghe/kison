import { MatchResult } from './match';
import { isWord } from './utils';
import type { CompilerOptions } from './Compiler';
import type { GroupValue, GroupIndex } from './Input';
import Compiler from './Compiler';
import { State } from './state';

export type GetCharAsync = () => Promise<string[]>;

export default class Input {
  buffer: string[] = [];
  inverted: boolean = false;
  startIndex: number = 0;
  index: number = 0;
  previousMatchIndex: number = 0;
  namedGroups: Record<string, GroupValue> = {};
  startGroupIndex: GroupIndex[] = [];
  groups: GroupValue[] = [];

  constructor(
    public getCharAsync: GetCharAsync,
    public options: CompilerOptions,
  ) {
    this.reset();
  }

  setInverted() {
    this.inverted = true;
  }

  reset() {
    this.startIndex = 0;
    this.index = 0;
    this.previousMatchIndex = 0;
    this.resetState();
  }

  resetState() {
    this.namedGroups = {};
    this.startGroupIndex = [];
    this.groups = [];
  }

  async getChar() {
    const code = await this.getCharCode();
    if (code === undefined || isNaN(code)) {
      return '';
    }
    return String.fromCodePoint(code);
  }

  getPrevChar() {
    const code = this.getPrevCharCode();
    if (code === undefined || isNaN(code)) {
      return '';
    }
    return String.fromCodePoint(code);
  }

  async getCharCode() {
    debugger;
    if (this.index >= this.buffer.length) {
      const chars = await this.getCharAsync();
      if (!Array.isArray(chars)) {
        throw new Error('async getChar must resolve array of chars');
      }
      this.buffer.push(...chars);
    }
    return this.buffer[this.index].codePointAt(0);
  }

  getPrevCharCode() {
    return this.buffer[this.index - 1].codePointAt(0);
  }

  async matchString(otherStr: string) {
    let index = 0;
    let m;
    let buffer = this.buffer;
    if (this.options.caseInsensitive) {
      otherStr = otherStr.toLowerCase();
    }
    while ((m = otherStr.codePointAt(index)) !== undefined) {
      let strIndex = this.inverted ? this.index - index : this.index + index;
      if (!this.inverted) {
        await this.getChar();
      }
      let char = buffer[strIndex];
      if (this.options.caseInsensitive) {
        char = char.toLowerCase();
      }
      if (m !== char.codePointAt(0)) {
        return false;
      }
      index += 1;
    }
    return true;
  }

  injectGroups(match: MatchResult) {
    if (match.groups) {
      for (let i = 0; i < match.groups.length; i++) {
        if (match.groups[i]) {
          this.groups[i] = match.groups[i];
        }
      }
    }
    if (match.namedGroups) {
      Object.assign(this.namedGroups, match.namedGroups);
    }
  }

  advance(count = 1) {
    if (this.inverted) {
      this.index -= count;
    } else {
      this.index += count;
    }
  }

  advanceStartIndex() {
    this.index = 0;
    this.buffer.shift();
    this.resetState();
  }

  advanceMatch() {
    this.buffer = this.buffer.slice(this.index);
    this.index = 0;
    this.resetState();
  }

  getString(count = 1) {
    let start = this.index;
    let end;
    if (this.inverted) {
      end = this.index + 1;
      start = Math.max(0, end - count);
    } else {
      end = this.index + count;
    }
    if (start > end) {
      [start, end] = [end, start];
    }
    return this.buffer.slice(start, end).join('');
  }

  clone() {
    const input = new Input(this.getCharAsync, this.options);
    input.index = this.index;
    input.inverted = this.inverted;
    input.startGroupIndex = this.startGroupIndex.concat();
    input.groups = this.groups.concat();
    input.namedGroups = { ...this.namedGroups };
    input.buffer = this.buffer;
    return input;
  }

  isEnd() {
    return false;
  }

  isAtLastIndex() {
    return false;
  }

  async isAtWordBoundary() {
    if (this.isEnd()) {
      return true;
    }
    const c = await this.getChar();
    const l = this.index > 0 ? this.getPrevChar() : ' ';
    if (isWord(c)) {
      return !isWord(l);
    } else {
      return isWord(l);
    }
  }

  checkGroup(compiler: Compiler, state: State) {
    const input = this;
    let groupStartIndex = compiler.groupStartIndex(state);
    if (groupStartIndex) {
      input.startGroupIndex[groupStartIndex.index - 1] = {
        index: input.index,
        name: groupStartIndex.name,
      };
    }
    let groupEndIndex = compiler.groupEndIndex(state);
    if (groupEndIndex) {
      let startIndex = input.startGroupIndex[groupEndIndex.index - 1];
      let endIndex = {
        index: input.index,
        name: startIndex.name,
      };
      if (startIndex.index > endIndex.index) {
        startIndex = { ...startIndex };
        const s = startIndex.index;
        startIndex.index = Math.max(0, endIndex.index + 1);
        endIndex.index = s + 1;
      }
      let name = groupEndIndex.name;
      let value: GroupValue = {
        index: startIndex.index,
        match: input.buffer.slice(startIndex.index, endIndex.index).join(''),
      };
      if (startIndex.name) {
        value.name = startIndex.name;
      }
      input.groups[groupEndIndex.index - 1] = value;
      if (name) {
        input.namedGroups[name] = value;
      }
    }
  }
}
