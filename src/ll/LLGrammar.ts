import Grammar from '../Grammar';
import Production from '../Production';
import parse from './parse';

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

class LLGrammar extends Grammar {
  override checkConflicts = true;

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

  override expandProductionsInternal() {
    this.expandProductionAlternative();
    this.expandProductionGroup();
    this.expandOptionalSymbol();
    this.expandOneOrMoreSymbol();
    this.expandZeroOrMoreSymbol();
    this.expandProductionPriority();
  }

  override buildProductions() {
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

  override genCodeInternal(code: string[]) {
    this.genTable(code);
    code.push('parser.parse = ' + parse.toString() + ';');
    return code.join('\n');
  }
}

export default LLGrammar;
