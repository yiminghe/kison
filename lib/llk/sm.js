// @ts-check

const { bfsMatch } = require('./bfsMatch');
const { parser, lexer, symbolStack, productionsBySymbol } = require('../data');
const { isSymbol } = require('./initLLK');
const { isOptionalSymbol, isZeroOrMoreSymbol, filterRhs } = require('../utils');
const { createTokenMatcher } = require('./matcher');
const { setStateCacheMatch, getStateCacheMatch } = require('./utils');


function buildRhsSM(symbol, rhs, ruleIndex) {
  function getUnit(rr) {
    if (isSymbol(rr)) {
      return new SymbolStateUnit(rr, ruleIndex);
    }
    const unit = new StateUnit(rr, ruleIndex);
    unit.start.pushTransition(unit.end, createTokenMatcher(rr));
    return unit;
  }

  const units = [];
  let i = -1;
  for (const r of rhs) {
    if (typeof r !== 'string') {
      continue;
    }
    ++i;
    let finalUnit;
    if (isOptionalSymbol(r)) {
      const rr = r.slice(0, -1);
      const unit = getUnit(rr);
      finalUnit = new StateUnit(rr, ruleIndex);
      finalUnit.unitType = 'optional';
      finalUnit.start.pushTransition(unit.start);
      finalUnit.start.pushTransition(finalUnit.end);
      unit.end.pushTransition(finalUnit.end);
    } else if (isZeroOrMoreSymbol(r)) {
      const rr = r.slice(0, -1);
      const unit = getUnit(rr);
      finalUnit = new StateUnit(rr, ruleIndex);
      finalUnit.unitType = 'zeroOrMore';
      finalUnit.start.pushTransition(unit.start);
      unit.start.pushTransition(finalUnit.end);
      unit.end.pushTransition(unit.start);
    } else {
      finalUnit = getUnit(r);
    }
    units.push(finalUnit);
  }
  return concatUnits(symbol, units, ruleIndex);
}

function buildStateMachine() {
  const productions = parser.productions;
  for (let i = 0; i < productions.length; i++) {
    const p = productions[i];
    const symbol = parser.getProductionSymbol(p);

    productionsBySymbol[symbol] = productionsBySymbol[symbol] || {
      ruleIndexes: [],
    };
    productionsBySymbol[symbol][i] = p;
    productionsBySymbol[symbol].ruleIndexes.push(i);
  }
}

function getParentSymbolItem() {
  let parentSymbolItem;

  for (let i = symbolStack.length - 1; i >= 0; i--) {
    const s = symbolStack[i];
    if (s?.type === 'rule') {
      parentSymbolItem = s;
      break;
    }
  }

  return parentSymbolItem;
}

function predictProductionIndexLLK({ childReverseIndex, ruleIndex }, fn) {
  const productions = parser.productions;

  if (ruleIndex === -1) {
    const production = productions[0];
    return {
      unit: buildRhsSM(
        parser.getProductionSymbol(production),
        filterRhs(parser.getProductionRhs(production)),
        0),
      ruleIndex: 0,
    };
  }

  let parentSymbolItem = getParentSymbolItem();
  if (!parentSymbolItem) {
    throw new Error('no parent symbol');
  }
  const parentUnit = parentSymbolItem.ruleUnit;
  const { units } = parentUnit;
  let unit = units[units.length - 1 - childReverseIndex];
  const childSymbol = unit.type;

  if (!isSymbol(unit.type)) {
    return null;
  }

  let returnedUnit = unit;

  const { unitType } = unit;
  if (unitType === 'zeroOrMore' || unitType === 'optional') {
    const newUnit = new SymbolStateUnit(childSymbol, ruleIndex);
    newUnit.end.pushTransition(unit.end);
    if (unitType === "zeroOrMore") {
      returnedUnit = unit.start.transitions[0].to.unit;
    } else {
      returnedUnit = newUnit;
    }
    unit = newUnit;
  } else {
    const alterations = productionsBySymbol[childSymbol];
    if (alterations.ruleIndexes.length <= 1) {
      const ruleIndex = alterations.ruleIndexes[0];
      if (ruleIndex === undefined) {
        throw new Error('no predict!');
      }
      return returnNext(ruleIndex);
    }
  }

  const transitions = unit.start.transitions;

  let maxCount = 0;
  let matchedRuleIndex = -1;

  function returnNext(ruleIndex) {
    return {
      ruleIndex,
      unit: returnedUnit.start.getUnits()[ruleIndex],
    };
  }

  function cacheUnit() {
    return;
    const afterUnits = units.slice(units.length - childReverseIndex);
    for (const afterUnit of afterUnits) {
      setStateCacheMatch(afterUnit.start, parentSymbolItem.tokensLength);
    }
  }

  function getStateCacheMatchLocal(state) {
    return getStateCacheMatch(state, parentSymbolItem.tokensLength)
  }

  for (const t of transitions) {
    lexer.stash();
    if (fn) {
      fn();
    }
    const { match, count } = bfsMatch(t.to, getStateCacheMatchLocal);
    lexer.stashPop();
    if (match) {
      //console.log('match', productions[t.to.unit.ruleIndex] + '');
      cacheUnit();
      return returnNext(t.to.unit.ruleIndex);
    }
    if (maxCount < count) {
      maxCount = count;
      matchedRuleIndex = t.to.unit.ruleIndex;
    }
  }

  if (matchedRuleIndex !== -1) {
    //console.log('matchedRuleIndex', productions[matchedRuleIndex] + '');
    cacheUnit();
    return returnNext(matchedRuleIndex);
  }
  return null;
}

function findExpectedTokenFromStateMachine(
  { childReverseIndex },
  stack = new Set(),
) {
  const ret = new Set();
  const { ruleUnit: parentUnit } = getParentSymbolItem();
  const { units } = parentUnit;
  let unit = units[units.length - 1 - childReverseIndex];
  const states = [unit.start];
  while (states.length) {
    const state = states.pop();
    if (stack.has(state)) {
      continue;
    }
    stack.add(state);
    for (const t of state.transitions) {
      if (t.condition?.token) {
        ret.add(t.condition.token);
        continue;
      }
      if (t.to) {
        states.push(t.to);
      }
    }
  }
  return Array.from(ret);
}

function predictProductionIndexNextLLK(arg) {
  return predictProductionIndexLLK(arg, () => lexer.lex());
}

class State {
  constructor(type, unit) {
    this.type = type;
    this.unit = unit;
    this.transitions = [];
  }
  pushTransition(endState, condition) {
    this.transitions.push(new Transition(endState, condition));
  }
}

class SymbolState {
  constructor(symbol, type, unit) {
    this.type = type;
    this.symbol = symbol;
    let transitions = undefined;
    this._transitions = [];
    this.allTranstions = [];
    this.unit = unit;
    this.emptyRuleIndex = undefined;
    this.units = {};
    Object.defineProperty(this, 'transitions', {
      get: () => {
        if (!transitions) {
          transitions = this._transitions.concat();
          const myProductions = productionsBySymbol[symbol];
          for (const i of myProductions.ruleIndexes) {
            const p = myProductions[i];
            const rhs = parser.getProductionRhs(p);
            const rootSymbolUnit = buildRhsSM(symbol, rhs, i);
            this.units[i] = rootSymbolUnit;
            transitions.push(new Transition(rootSymbolUnit.start));
            rootSymbolUnit.end.pushTransition(unit.end);
          }
          this.allTranstions = transitions;
        }
        return transitions;
      },
    });
  }

  getTransitions() {
    return this['transitions'];
  }

  getUnits() {
    this.getTransitions();
    return this.units;
  }

  pushTransition(endState, condition) {
    this._transitions.push(new Transition(endState, condition));
  }
}

function concatUnits(type, us, ruleIndex) {
  const l = us.length;
  for (let i = 0; i < l - 1; i++) {
    const first = us[i];
    const s = us[i + 1];
    first.end.pushTransition(s.start);
  }
  const ret = new RootSymbolUnit(type, ruleIndex);
  if (l >= 1) {
    ret.start = us[0].start;
    ret.end = us[l - 1].end;
  } else {
    ret.start = new State(`startOf${type}`, ret);
    ret.end = new State(`endOf${type}`, ret);
    ret.start.pushTransition(ret.end);
  }
  ret.units = us;
  return ret;
}

class RootSymbolUnit {
  units = undefined;
  start = undefined;
  end = undefined;
  unitType = 'rootSymbol';
  constructor(type, ruleIndex) {
    this.type = type;
    this.ruleIndex = ruleIndex;
  }
}

class StateUnit {
  units = undefined;
  unitType = 'token';
  constructor(type, ruleIndex) {
    this.type = type;
    this.ruleIndex = ruleIndex;
    this.start = new State(`startOf${type}`, this);
    this.end = new State(`endOf${type}`, this);
  }
}

class SymbolStateUnit {
  unitType = 'symbol';
  constructor(type, ruleIndex) {
    this.ruleIndex = ruleIndex;
    this.type = type;
    this.end = new State(`endOf${type}`, this);
    this.start = new SymbolState(type, `startOf${type}`, this);
  }
}

class Transition {
  constructor(to, condition) {
    this.to = to;
    this.condition = condition;
  }
  perform() {
    if (this.condition) {
      const ret = this.condition();
      if (ret === true) {
        return {
          count: 0,
        };
      }
      return ret;
    }
    return {
      count: 0,
    };
  }
}

module.exports = {
  getParentSymbolItem,
  findExpectedTokenFromStateMachine,
  predictProductionIndexNextLLK,
  predictProductionIndexLLK,
  buildStateMachine,
  buildRhsSM,
  SymbolState,
  SymbolStateUnit,
  State,
  concatUnits,
  StateUnit,
  Transition,
  RootSymbolUnit,
};
