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
    for (const key of Object.keys(parseCode)) {
      code.push(`var ${key} = ${serializeObject(parseCode[key])};`);
    }
    code.push(`${parseCode.initLLK.name}();`);
    code.push(`parser.parse = ${parseCode.parse.name};`);
    return code.join('\n');
  }
}

module.exports = LLKGrammar;
