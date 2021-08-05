import { isWord } from "./utils.js";

export default class Input {
  constructor(str, options) {
    this.str = str;
    this.options = options;
    this.endIndex = str.length - 1;
    this.reset();
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

  advance(count) {
    this.index += count;
  }

  advanceStartIndex() {
    this.startIndex++;
    this.index = this.startIndex;
    this.resetState();
  }

  advanceMatch() {
    const { index } = this;
    this.previousMatchIndex = index;
    this.startIndex = index;
    this.resetState();
  }

  getString(count = 1) {
    let start = this.index;
    let end = start + count;
    if (start > end) {
      [start, end] = [end, start];
    }
    return this.str.slice(start, end);
  }

  clone() {
    const input = new Input(this.str, this.options);
    input.previousMatchIndex = this.previousMatchIndex;
    input.index = this.index;
    input.startIndex = this.startIndex;
    input.startGroupIndex = this.startGroupIndex.concat();
    input.groups = this.groups.concat();
    input.namedGroups = { ...this.namedGroups };
    return input;
  }

  isEnd() {
    return this.index > this.endIndex;
  }

  isAtLastIndex() {
    return this.index === this.endIndex;
  }

  isAtWordBoundary() {
    if (this.isEnd()) {
      return true;
    }
    const c = this.getString();
    const l = this.index > this.startIndex ? this.getString(-1) : " ";
    if (isWord(c)) {
      return !isWord(l);
    } else {
      const r =
        this.index === this.endIndex
          ? " "
          : this.input.slice(this.index + 1, 1);
      return isWord(l) && isWord(r);
    }
  }
}
