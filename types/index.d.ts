declare namespace Kison {
  interface Options {
    makeOptionalSymbol: (s: string) => string;
    makeZeroOrMoreSymbol: (s: string) => string;
    makeOneOrMoreSymbol: (s: string) => string;
    makeGroup: (...s: string[]) => string[];
    makeOptionalGroup: (...s: string[]) => string[];
    makeZeroOrMoreGroup: (...s: string[]) => string[];
    makeOneOrMoreGroup: (...s: string[]) => string[];
    makeAlternates: (...s: (string | string[])[]) => string[];
  }
}