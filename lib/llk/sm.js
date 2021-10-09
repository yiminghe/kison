// @ts-check

const { bfsMatch } = require('./bfsMatch');
const { parser, lexer, stateMachine, Lexer } = require('../data');
const { isSymbol } = require('./symbolMap');
const { isOptionalSymbol, isZeroOrMoreSymbol } = require('../utils');
const { createTokenMatcher } = require('./matcher');

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
      finalUnit.optional = true;
      finalUnit.start.pushTransition(unit.start);
      finalUnit.start.pushTransition(finalUnit.end);
      unit.end.pushTransition(finalUnit.end);
    } else if (isZeroOrMoreSymbol(r)) {
      const rr = r.slice(0, -1);
      const unit = getUnit(rr);
      finalUnit = new StateUnit(rr, ruleIndex);
      finalUnit.zeroOrMore = true;
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
    const rhs = parser.getProductionRhs(p);
    stateMachine[i] = buildRhsSM(symbol, rhs, i);
  }
}

function predictProductionIndexLLK({ childReverseIndex, ruleIndex }, fn) {
  if (ruleIndex === -1) {
    return 0;
  }

  const parentUnit = stateMachine[ruleIndex];
  const { units } = parentUnit;
  let unit = units[units.length - 1 - childReverseIndex];
  if (unit.zeroOrMore || unit.optional) {
    const newUnit = new SymbolStateUnit(unit.type, ruleIndex);
    newUnit.end.pushTransition(unit.end);
    unit = newUnit;
  }
  const startState = unit.start;
  const transitions = startState.transitions;
  let maxCount = 0;
  let matchedRuleIndex = -1;
  for (const t of transitions) {
    if (t.to !== unit.end) {
      lexer.stash();
      if (fn) {
        fn();
      }
      const { match, count } = bfsMatch(t.to);
      lexer.stashPop();
      if (match) {
        return t.to.unit.ruleIndex;
      }
      if (maxCount < count) {
        maxCount = count;
        matchedRuleIndex = t.to.unit.ruleIndex;
      }
    }
  }
  if (matchedRuleIndex !== -1) {
    return matchedRuleIndex;
  }
  if (startState.emptyRuleIndex !== undefined) {
    return startState.emptyRuleIndex;
  }
  return -1;
}

function findExpectedTokenFromStateMachine(
  { childReverseIndex, ruleIndex },
  stack = new Set(),
) {
  const ret = new Set();
  const parentUnit = stateMachine[ruleIndex];
  const { units } = parentUnit;
  let unit = units[units.length - 1 - childReverseIndex];
  const startState = unit.start;
  const states = [startState];
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
    const productions = parser.productions;
    Object.defineProperty(this, 'transitions', {
      get: () => {
        if (!transitions) {
          transitions = this._transitions.concat();
          let empty = false;
          for (let i = 0; i < productions.length; i++) {
            const p = productions[i];
            const currentSymbol = parser.getProductionSymbol(p);
            if (currentSymbol === symbol) {
              const rhs = parser.getProductionRhs(p);
              const rootSymbolUnit = buildRhsSM(symbol, rhs, i);
              if (!rootSymbolUnit) {
                empty = true;
                this.emptyRuleIndex = i;
              } else {
                transitions.push(new Transition(rootSymbolUnit.start));
                rootSymbolUnit.end.pushTransition(unit.end);
              }
            }
          }
          if (empty) {
            transitions.push(new Transition(unit.end));
          }
          this.allTranstions = transitions;
        }
        return transitions;
      },
    });
  }

  pushTransition(endState, condition) {
    this._transitions.push(new Transition(endState, condition));
  }
}

function concatUnits(type, us, ruleIndex) {
  if (!us.length) {
    return null;
  }
  const l = us.length;
  if (l === 1) {
    const ret = new RootSymbolUnit(type, ruleIndex);
    ret.start = us[0].start;
    ret.end = us[0].end;
    ret.units = us;
    return ret;
  }
  for (let i = 0; i < l - 1; i++) {
    const first = us[i];
    const s = us[i + 1];
    first.end.pushTransition(s.start);
  }
  const ret = new RootSymbolUnit(type, ruleIndex);
  ret.start = us[0].start;
  ret.end = us[l - 1].end;
  ret.units = us;
  return ret;
}

class RootSymbolUnit {
  units = undefined;
  start = undefined;
  end = undefined;
  type = 'rootSymbol';
  constructor(type, ruleIndex) {
    this.type = type;
    this.ruleIndex = ruleIndex;
  }
}

class StateUnit {
  units = undefined;
  zeroOrMore = undefined;
  optional = undefined;
  constructor(type, ruleIndex) {
    this.type = type;
    this.ruleIndex = ruleIndex;
    this.start = new State(`startOf${type}`, this);
    this.end = new State(`endOf${type}`, this);
  }
}

class SymbolStateUnit {
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
