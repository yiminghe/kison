import Grammar from '../Grammar';
import * as parseCode from './parse';
import utils from '../utils';

const { serializeObject } = utils;

class LLKGrammar extends Grammar {
  override buildProductions() {
    const firstProduction = this.productionInstances[0];
    this.productionInstances.splice(0, 1);
    this.eliminateLeftRecursive();
    this.productionInstances.splice(0, 0, firstProduction);
  }

  override expandProductionsInternal() {
    this.expandProductionAlternativeAndGroup();
    this.expandOneOrMoreSymbol();
    this.expandProductionPriority();
  }

  override genCodeInternal(code: string[]) {
    this.genTable(code);
    for (const key of Object.keys(parseCode)) {
      code.push(`var ${key} = ${serializeObject((parseCode as any)[key])};`);
    }
    code.push(`${parseCode.initLLK.name}();`);
    code.push(`parser.parse = ${parseCode.parse.name};`);
    return code.join('\n');
  }
}

export default LLKGrammar;
