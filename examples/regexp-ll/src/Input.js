import { isWord } from "./utils.js";

export default class Input {
  constructor(str, options) {
    this.str = str;
    this.options = options;
    this.endIndex = str.length - 1;
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

  advance(count) {
    if (this.inverted) {
      this.index -= count;
    } else {
      this.index += count;
    }
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
    return this.str.slice(start, end);
  }

  clone() {
    const input = new Input(this.str, this.options);
    input.previousMatchIndex = this.previousMatchIndex;
    input.index = this.index;
    input.inverted = this.inverted;
    input.startIndex = this.startIndex;
    input.startGroupIndex = this.startGroupIndex.concat();
    input.groups = this.groups.concat();
    input.namedGroups = { ...this.namedGroups };
    return input;
  }

  isEnd() {
    return this.index < 0 || this.index > this.endIndex;
  }

  isAtLastIndex() {
    return this.index === this.endIndex;
  }

  isAtWordBoundary() {
    if (this.isEnd()) {
      return true;
    }
    const c = this.getString();
    const l = this.index > 0 ? this.getString(-1) : " ";
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
