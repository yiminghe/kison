import { isWord } from './utils.js';

export default class Input {
  constructor(str, startIndex = 0, index = 0) {
    this.str = str;
    this.multiline = false;
    this.startIndex = startIndex;
    this.index = index || startIndex;
    this.endIndex = str.length - 1;
    this.previousMatchIndex = -1;
  }

  advance(count) {
    this.index += count;
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
    return new Input(this.str, this.startIndex, this.index);
  }

  isStart() {
    return this.index === this.startIndex;
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
    const l = this.index > this.startIndex ? this.getString(-1) : ' ';
    if (isWord(c)) {
      return !isWord(l);
    } else {
      const r = this.index === this.endIndex ? ' ' : this.input.slice(this.index + 1, 1);
      return isWord(l) && isWord(r);
    }
  }
}
