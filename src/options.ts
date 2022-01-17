/// <reference path="../types/index.d.ts" />

export const groupStartMark = "'('";
export const groupEndMark = "')'";
export const groupEndOptionalMark = groupEndMark + '?';
export const groupEndZeroOrMoreMark = groupEndMark + '*';
export const groupEndOneOrMoreMark = groupEndMark + '+';
export const alternationMark = "'|'";
export const alternationPredictMark = `'|?'`;
export const groupStartPredictMarker = `'(?'`;

function filterS(s: any[]) {
  return s.filter((a) => !!a);
}

function makeG(start: string, s: any[], end: string) {
  return [start, ...filterS(s), end];
}

function makeLazy(s: string, lazy?: boolean) {
  return lazy ? s + '?' : s;
}

function makeA(m: string, ss: (SymbolItem | SymbolItem[])[]) {
  const ret: SymbolItem[] = [];
  for (const s of ss) {
    if (s) {
      if (Array.isArray(s)) {
        ret.push(...s);
      } else {
        ret.push(s);
      }
      ret.push(m);
    }
  }
  if (ret.length) {
    ret.pop();
  }
  return ret;
}

type SymbolItem = Kison.SymbolItem;

export const options: Kison.Options = {
  makeOptionalSymbol: (s: string, lazy?: boolean) => {
    return makeLazy(s + '?', lazy);
  },
  makeZeroOrMoreSymbol: (s: string, lazy?: boolean) => {
    return makeLazy(s + '*', lazy);
  },
  makeOneOrMoreSymbol: (s: string, lazy?: boolean) => {
    return makeLazy(s + '+', lazy);
  },
  makeGroup: (...s: SymbolItem[]) => {
    return makeG(groupStartMark, filterS(s), groupEndMark);
  },
  makeOptionalGroup: (...s: SymbolItem[]) => {
    return makeG(groupStartMark, filterS(s), groupEndOptionalMark);
  },
  makeZeroOrMoreGroup: (...s: SymbolItem[]) => {
    return makeG(groupStartMark, filterS(s), groupEndZeroOrMoreMark);
  },
  makeOneOrMoreGroup: (...s: SymbolItem[]) => {
    return makeG(groupStartMark, filterS(s), groupEndOneOrMoreMark);
  },
  makeGroupWithOptions(s: SymbolItem[], o: Kison.GroupOptions = {}) {
    const start = o.predict ? groupStartPredictMarker : groupStartMark;
    let end = o.zeroOrMore
      ? groupEndZeroOrMoreMark
      : o.oneOrMore
      ? groupEndOneOrMoreMark
      : o.optional
      ? groupEndOptionalMark
      : groupEndMark;

    if (o.lazy) {
      end = makeLazy(end, true);
    }
    return makeG(start, s, end);
  },
  makeAlternates: (...ss: (SymbolItem | SymbolItem[])[]) => {
    return makeA(alternationMark, ss);
  },
  makePredictAlternates: (...ss: (SymbolItem | SymbolItem[])[]) => {
    return makeA(alternationPredictMark, ss);
  },
};

export const symbolUtils = {
  isZeroOrMoreSymbol(s: any) {
    return (
      typeof s === 'string' && s !== '*?' && s.length > 1 && !!s.match(/\*\??$/)
    );
  },

  isOneOrMoreSymbol(s: any) {
    return (
      typeof s === 'string' && s !== '+?' && s.length > 1 && !!s.match(/\+\??$/)
    );
  },

  isLazySymbol(s: any) {
    const match = typeof s === 'string' && s.match(/(\*|\+|\?)\?$/);
    return match && s.length !== 2;
  },

  isOptionalSymbol(s: any) {
    return typeof s === 'string' && s.length > 1 && !!s.match(/\??\?$/);
  },

  normalizeSymbol(s: any): string {
    const ret =
      isOptionalSymbol(s) || isZeroOrMoreSymbol(s) || isOneOrMoreSymbol(s)
        ? s.replace(/(\*|\+|\?)?\??$/, '')
        : s;
    // ??
    return ret || (s && s.slice(0, -1));
  },
};

const { isOptionalSymbol, isZeroOrMoreSymbol, isOneOrMoreSymbol } = symbolUtils;
