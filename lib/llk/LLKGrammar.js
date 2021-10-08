const Production = require('../Production');
const Grammar = require('../Grammar');
const parseCode = require('./parse');
const { AstNode } = require('./AstNode');
const { serializeObject } = require('../utils');
const { productionAddAstNodeFlag } = require('../data');

class LLKGrammar extends Grammar {
  buildMeta() {}

  buildProductions() {
    this.eliminateLeftRecursive();
  }

  expandProductionsInternal() {
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
