declare namespace Kison {
  type SymbolItem = string | Function;
  type GroupOptions = {
    oneOrMore?: boolean;
    optional?: boolean;
    zeroOrMore?: boolean; predict?: boolean; lazy?: boolean
  };
  interface Options {
    makeOptionalSymbol: (s: string) => string;
    makeZeroOrMoreSymbol: (s: string) => string;
    makeOneOrMoreSymbol: (s: string) => string;
    makeGroup: (...s: SymbolItem[]) => SymbolItem[];
    makeOptionalGroup: (...s: SymbolItem[]) => SymbolItem[];
    makeZeroOrMoreGroup: (...s: SymbolItem[]) => SymbolItem[];
    makeOneOrMoreGroup: (...s: SymbolItem[]) => SymbolItem[];
    makeGroupWithOptions: (s: SymbolItem[], o: GroupOptions = {}) => SymbolItem[];
    makeAlternates: (...s: (SymbolItem | SymbolItem[])[]) => SymbolItem[];
    makePredictAlternates: (...s: (SymbolItem | SymbolItem[])[]) => SymbolItem[];
  }
}