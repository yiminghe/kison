const Grammar = require('../Grammar');
const parseCode = require('./parse');
const { serializeObject } = require('../utils');

class LLKGrammar extends Grammar {
  buildMeta() {}

  buildProductions() {
    const firstProduction = this.productions[0];
    this.productions.splice(0, 1);
    this.eliminateLeftRecursive();
    this.productions.splice(0, 0, firstProduction);
  }

  expandProductionsInternal() {
    this.expandOneOrMoreSymbol();
    this.expandProductionPriority();
  }

  genCodeInternal(code) {
    const { productions } = this;
    const productionSkipAstNodeSet = [];
    productions.forEach((p, index) => {
      if (p.skipAstNode) {
        productionSkipAstNodeSet.push(index);
      }
    });
    code.push(
      `const productionSkipAstNodeSet = new Set([${productionSkipAstNodeSet.join(
        ',',
      )}]);`,
    );
    code.push(
      'parser.prioritySymbolMap = ' +
        serializeObject(this.prioritySymbolMap) +
        ';',
    );
    for (const key of Object.keys(parseCode)) {
      code.push(`const ${key} = ${serializeObject(parseCode[key])};`);
    }
    code.push('buildSymbolMap();buildStateMachine();');
    code.push('parser.parse = parse;');
    return code.join('\n');
  }
}

module.exports = LLKGrammar;
