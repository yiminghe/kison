// @ts-check
import { isWord } from "./utils.js";

export default class Input {
  constructor(getCharAsync, options) {
    this.getCharAsync = getCharAsync;
    this.buffer = [];
    this.options = options;
    this.inverted = false;
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
    if (isNaN(code) || code === undefined) {
      return "";
    }
    return String.fromCodePoint(code);
  }

  getPrevChar() {
    const code = this.getPrevCharCode();
    if (isNaN(code) || code === undefined) {
      return "";
    }
    return String.fromCodePoint(code);
  }

  async getCharCode() {
    if (this.index >= this.buffer.length) {
      const char = await this.getCharAsync(1);
      this.buffer.push(char);
    }
    return this.buffer[this.index].codePointAt(0);
  }

  getPrevCharCode() {
    return this.buffer[this.index - 1].codePointAt(0);
  }

  async matchString(otherStr) {
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

  injectGroups(match) {
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
    this.index = 0;
    this.buffer = [];
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
    return this.buffer.slice(start, end).join("");
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
    const l = this.index > 0 ? this.getPrevChar() : " ";
    if (isWord(c)) {
      return !isWord(l);
    } else {
      return isWord(l);
    }
  }

  checkGroup(compiler, state) {
    const input = this;
    let groupStartIndex = compiler.groupStartIndex(state);
    if (groupStartIndex) {
      input.startGroupIndex[groupStartIndex.index - 1] = {
        index: input.index,
        name: groupStartIndex.name
      };
    }
    let groupEndIndex = compiler.groupEndIndex(state);
    if (groupEndIndex) {
      let startIndex = input.startGroupIndex[groupEndIndex.index - 1];
      let endIndex = {
        index: input.index,
        name: startIndex.name
      };
      if (startIndex.index > endIndex.index) {
        startIndex = { ...startIndex };
        const s = startIndex.index;
        startIndex.index = Math.max(0, endIndex.index + 1);
        endIndex.index = s + 1;
      }
      let name = groupEndIndex.name;
      let value = {
        index: startIndex.index,
        match: input.buffer.slice(startIndex.index, endIndex.index).join("")
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
