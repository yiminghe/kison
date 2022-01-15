/// <reference path="../types/index.d.ts" />

export const groupStartMark = "'('";
export const groupEndMark = "')'";
export const groupEndOptionalMark = "')'?";
export const groupEndZeroOrMoreMark = "')'*";
export const groupEndOneOrMoreMark = "')'+";
export const alternationMark = "'|'";

function filterS(s: string[]) {
  return s.filter((a) => !!a);
}

export const options: Kison.Options = {
  makeOptionalSymbol: (s: string) => {
    return s + '?';
  },
  makeZeroOrMoreSymbol: (s: string) => {
    return s + '*';
  },
  makeOneOrMoreSymbol: (s: string) => {
    return s + '+';
  },
  makeGroup: (...s: string[]) => {
    return [groupStartMark, ...filterS(s), groupEndMark];
  },
  makeOptionalGroup: (...s: string[]) => {
    return [groupStartMark, ...filterS(s), groupEndOptionalMark];
  },
  makeZeroOrMoreGroup: (...s: string[]) => {
    return [groupStartMark, ...filterS(s), groupEndZeroOrMoreMark];
  },
  makeOneOrMoreGroup: (...s: string[]) => {
    return [groupStartMark, ...filterS(s), groupEndOneOrMoreMark];
  },
  makeAlternates: (...ss: (string | string[])[]) => {
    const ret: string[] = [];
    for (const s of ss) {
      if (s) {
        if (Array.isArray(s)) {
          ret.push(...s);
        } else {
          ret.push(s);
        }
        ret.push(alternationMark);
      }
    }
    if (ret.length) {
      ret.pop();
    }
    return ret;
  },
};
