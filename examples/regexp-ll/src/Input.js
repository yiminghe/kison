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

  getChar() {
    const code = this.getCharCode();
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

  getCharCode() {
    return this.options.unicode
      ? this.str.codePointAt(this.index)
      : this.str.charCodeAt(this.index);
  }

  getPrevCharCode() {
    if (this.options.unicode) {
      if (this.index > 1 && this.isPartUnicode(this.index - 1, true)) {
        return this.str.codePointAt(this.index - 2);
      }
      return this.str.codePointAt(this.index - 1);
    }
    return this.str.charCodeAt(this.index - 1);
  }

  matchString(otherStr) {
    let index = 0;
    let m;
    let str = this.str;
    if (this.options.caseInsensitive) {
      str = str.toLowerCase();
      otherStr = otherStr.toLowerCase();
    }
    if (this.options.unicode) {
      while ((m = otherStr.codePointAt(index)) !== undefined) {
        let strIndex = this.inverted ? this.index - index : this.index + index;
        if (m !== str.codePointAt(strIndex)) {
          return false;
        }
        index += String.fromCharCode(m).length;
      }
      return true;
    } else {
      return this.getString(otherStr.length).toLowerCase() === otherStr;
    }
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

  isPartUnicode(index, inverted) {
    if (inverted) {
      return (
        index > 0 &&
        String.fromCodePoint(this.str.codePointAt(index - 1)).length > 1
      );
    }
    return (
      index <= this.endIndex &&
      String.fromCodePoint(this.str.codePointAt(index)).length > 1
    );
  }

  advance(count = 1) {
    if (this.inverted) {
      this.index -= count;
      if (
        this.options.unicode &&
        count === 1 &&
        this.isPartUnicode(this.index, true)
      ) {
        this.index--;
      }
    } else {
      if (this.options.unicode && count === 1) {
        count = this.getChar().length;
      }
      this.index += count;
    }
  }

  advanceStartIndex() {
    if (this.options.unicode && this.isPartUnicode(this.startIndex)) {
      this.startIndex++;
    }
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
    const c = this.getChar();
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
        match: input.str.slice(startIndex.index, endIndex.index)
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
