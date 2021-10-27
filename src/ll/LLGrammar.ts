import Grammar from '../Grammar';
import Utils from '../utils';
import Production from '../Production';
import Lexer from '../Lexer';
import parse from './parse';

const { serializeObject, filterRhs } = Utils;

function inProductions(productions: Production[], production: Production) {
  for (const p of productions) {
    if (p.equals(production)) {
      return true;
    }
  }
  return false;
}

function addToProductions(productions: Production[], production: Production) {
  if (inProductions(productions, production)) {
    return;
  }
  productions.push(production);
}

export type Table = Record<string, Record<string, number>>;

class LLGrammar extends Grammar {
  table: Table = {};

  findFollows(symbol: string) {
    var { nonTerminals } = this;
    if (!nonTerminals[symbol]) {
      return { [symbol]: 1 };
      // non terminal
    } else {
      return nonTerminals[symbol].follows;
    }
  }

  buildFollows() {
    const { productionInstances, nonTerminals } = this;
    var cont = true;
    var nonTerminal, symbol;
    var mappedStartTag = productionInstances[0].symbol;
    var { EOF_TOKEN } = Lexer.STATIC;
    nonTerminals[mappedStartTag].addFollows({
      [EOF_TOKEN]: 1,
    });
    // loop until no further changes have been made
    while (cont) {
      cont = false;
      for (symbol in nonTerminals) {
        nonTerminal = nonTerminals[symbol];
        for (const p of productionInstances) {
          let { rhs, symbol: leftSymbol } = p;
          rhs = filterRhs(rhs);
          const index = rhs.indexOf(symbol);
          if (index !== -1) {
            if (index !== rhs.length - 1) {
              const nextSymbols = filterRhs(rhs.slice(index + 1));
              cont =
                nonTerminal.addFollows(this.findFirst(nextSymbols)) || cont;
              if (this.isNullable(nextSymbols)) {
                cont =
                  nonTerminal.addFollows(this.findFollows(leftSymbol)) || cont;
              }
            } else {
              cont =
                nonTerminal.addFollows(this.findFollows(leftSymbol)) || cont;
            }
          }
        }
      }
    }
  }

  extractCommonPrefix() {
    const prefixSymbolSlashMap: Record<string, number> = {};

    function getPrefixSymbol(symbol: string) {
      let n = 1;
      if (prefixSymbolSlashMap[symbol]) {
        n = ++prefixSymbolSlashMap[symbol];
      } else {
        prefixSymbolSlashMap[symbol] = n;
      }
      return '_' + n + '(' + symbol + ')';
    }

    let productionInstances = this.productionInstances;

    let needReplace;
    // extract common prefix
    const groupedProductions: Record<string, Production[]> = {};

    for (const p of productionInstances) {
      const ps = (groupedProductions[p.symbol] =
        groupedProductions[p.symbol] || []);
      ps.push(p);
    }

    for (const symbol of Object.keys(groupedProductions)) {
      const ps = groupedProductions[symbol];
      if (ps.length > 1) {
        const ret = this.extractProductionCommonPrefix(ps, getPrefixSymbol);
        if (ret !== ps) {
          needReplace = true;
          groupedProductions[symbol] = ret;
        }
      }
    }

    if (needReplace) {
      productionInstances = this.productionInstances = [];
      for (const symbol of Object.keys(groupedProductions)) {
        productionInstances.push(...groupedProductions[symbol]);
      }
      this.productionInstances = this.removeDuplicate(productionInstances);
    }
  }

  removeDuplicate(newPs: Production[]) {
    return newPs;
    // TODO: optimize
    // const nonTerminals = {};
    // newPs.forEach(p => (nonTerminals[p.symbol] = 1));
    // let cont = true;
    // while (cont) {
    //   cont = false;
    //   for (let i = newPs.length - 1; i--; i >= 0) {
    //     const current = newPs[i];
    //     if (current.rhsEqSymbol(nonTerminals)) {
    //       newPs.splice(i, 1);
    //       newPs.forEach(p => p.replaceSymbol(current.symbol, current.rhs[0]));
    //       cont = true;
    //     }
    //   }
    // }
    // return newPs
  }

  expandProductionsInternal() {
    this.expandOptionalSymbol();
    this.expandOneOrMoreSymbol();
    this.expandZeroOrMoreSymbol();
    this.expandProductionPriority();
  }

  buildProductions() {
    const firstProduction = this.productionInstances[0];
    this.productionInstances.splice(0, 1);
    this.eliminateLeftRecursive();
    this.extractCommonPrefix();
    this.productionInstances.splice(0, 0, firstProduction);
  }

  extractProductionCommonPrefix(
    ps: Production[],
    getPrefixSymbol: (s: string) => string,
  ) {
    let cont = true;
    let newPs = [...ps];
    let changed;
    while (cont) {
      cont = false;

      for (let i = 0; i < newPs.length - 1; i++) {
        let indexes = [];
        indexes.push(i);
        let minLeft = 9999;
        const left = newPs[i];

        for (let j = i + 1; j < newPs.length; j++) {
          const right = newPs[j];
          let commonLeftIndex = left.commonLeftIndex(right);
          if (commonLeftIndex) {
            if (commonLeftIndex < minLeft) {
              minLeft = commonLeftIndex;
            }
            indexes.push(j);
          }
        }

        if (indexes.length > 1) {
          indexes.reverse();
          const newSymbol = getPrefixSymbol(left.symbol);
          const ps = [];
          for (const index of indexes) {
            ps.push(newPs[index]);
            newPs.splice(index, 1);
          }
          for (const p of ps) {
            const two = new Production({
              symbol: newSymbol,
              ruleIndex: p.ruleIndex,
              rhs: p.rhs.slice(p.indexAtStringIndex(minLeft, true)),
              skipAstNode: true,
            });
            addToProductions(newPs, two);
          }
          const one = new Production({
            symbol: left.symbol,
            label: left.label,
            ruleIndex: left.ruleIndex,
            skipAstNode: left.skipAstNode,
            rhs: [
              ...left.rhs.slice(0, left.indexAtStringIndex(minLeft)),
              newSymbol,
            ],
          });
          addToProductions(newPs, one);
          cont = true;
          changed = true;
          break;
        }
      }
    }
    return changed ? this.removeDuplicate(newPs) : ps;
  }

  buildMeta() {
    super.buildMeta();
    this.buildFollows();
    this.buildTable();
  }

  setTable(symbol: string, terminal: string, index: number, follow = false) {
    index = follow ? -index : index;
    const { table, productionInstances } = this;
    table[symbol] = table[symbol] || {};
    const original = table[symbol][terminal];
    table[symbol][terminal] = index;
    if (original !== undefined && original !== index) {
      const e = ['', `Conflict: ${symbol} , ${terminal} ->`];
      for (const i of [original, index]) {
        e.push(
          (i > 0 ? '' : '-: ') + productionInstances[Math.abs(i)].toString(),
        );
      }
      e.push('');
      console.error(e.join('\n'));
    }
  }

  getTableVal(row: string, col: string) {
    const { table } = this;
    return table[row] && table[row][col];
  }

  buildTable() {
    const { productionInstances } = this;
    for (let index = 0; index < productionInstances.length; index++) {
      const p = productionInstances[index];
      let { symbol, rhs: oRhs } = p;
      const rhs = filterRhs(oRhs);
      const firsts = this.findFirst(rhs);
      for (const terminal of Object.keys(firsts)) {
        this.setTable(symbol, terminal, index);
      }
      if (this.isNullable(rhs)) {
        const follows = this.findFollows(symbol);
        for (const terminal of Object.keys(follows)) {
          this.setTable(symbol, terminal, index, true);
        }
      }
    }
  }

  visualizeTable() {
    const ret = [];
    const { table, productionInstances } = this;
    for (const nonTerminal of Object.keys(table)) {
      const col = table[nonTerminal];
      if (col) {
        for (const terminal of Object.keys(col)) {
          const ps = col[terminal];
          if (ps !== undefined) {
            const production = productionInstances[Math.abs(ps)];
            ret.push(
              (ps > 0 ? '' : '-: ') +
                `${nonTerminal} ${terminal} => ${production.symbol} -> ${
                  filterRhs(production.rhs).join(', ') || 'EMPTY'
                }`,
            );
          }
        }
      }
    }
    return ret.join('\n');
  }

  genCodeInternal(code: string[]) {
    const { table, lexer } = this;
    const mappedTable: Table = {};
    for (const nonTerminal of Object.keys(table)) {
      const col = table[nonTerminal];
      if (col) {
        const mappedCol: Record<string, number> = {};
        for (const terminal of Object.keys(col)) {
          const ps = col[terminal];
          if (ps !== undefined) {
            col[terminal] = Math.abs(ps);
            mappedCol[lexer.mapSymbol(terminal)] = col[terminal];
          }
        }
        mappedTable[lexer.mapSymbol(nonTerminal)] = mappedCol;
      }
    }
    code.push('parser.table = ' + serializeObject(mappedTable) + ';');
    code.push('parser.parse = ' + parse.toString() + ';');
    return code.join('\n');
  }
}

export default LLGrammar;
