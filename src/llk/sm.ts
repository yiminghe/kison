

const { bfsMatch } = require('./bfsMatch');
import data from '../data';
var { parser, lexer, symbolStack, productionsBySymbol, smUnitBySymbol } = data;
const {
  isOptionalSymbol,
  isZeroOrMoreSymbol,
  isLazySymbol,
  normalizeSymbol,
} = require('../utils');
const { createTokenMatcher } = require('./matcher');
const { isSymbol } = require('./utils');
import type { Rhs } from '../types';

function buildRhsSM(symbol: string, rhs: Rhs, ruleIndex: number) {
  function getUnit(rr: string) {
    if (isSymbol(rr)) {
      return new SymbolStateUnit(rr, ruleIndex);
    }
    const unit = new StateUnit(rr, ruleIndex);
    unit.start.pushTransition(unit.end, createTokenMatcher(rr));
    return unit;
  }

  const units = [];
  for (const r of rhs) {
    if (typeof r !== 'string') {
      continue;
    }
    let finalUnit;
    if (isOptionalSymbol(r)) {
      const rr = normalizeSymbol(r);
      const unit = getUnit(rr);
      finalUnit = new StateUnit(rr, ruleIndex);
      finalUnit.unitType = 'optional';
      if (isLazySymbol(r)) {
        finalUnit.lazy = true;
      }
      finalUnit.start.pushTransition(unit.start);
      finalUnit.start.pushTransition(finalUnit.end);
      unit.end.pushTransition(finalUnit.end);
    } else if (isZeroOrMoreSymbol(r)) {
      const rr = normalizeSymbol(r);
      const unit = getUnit(rr);
      finalUnit = new StateUnit(rr, ruleIndex);
      finalUnit.unitType = 'zeroOrMore';
      if (isLazySymbol(r)) {
        finalUnit.lazy = true;
      }
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

export interface PredictParam {
  childReverseIndex: number;
  ruleIndex: number;
  topSymbol: any;
}
function predictProductionIndexLLK(
  { childReverseIndex, ruleIndex, topSymbol }: PredictParam,
  fn?: Function,
) {
  let unit;

  if (ruleIndex === -1) {
    unit = getUnitBySymbol(topSymbol);
  } else {
    let parentSymbolItem = getParentSymbolItem();
    if (!parentSymbolItem) {
      throw new Error('no parent symbol');
    }
    const parentUnit = parentSymbolItem.ruleUnit;

    const { units } = parentUnit;
    unit = units[units.length - 1 - childReverseIndex];
  }

  const childSymbol = unit.type;

  if (!isSymbol(unit.type)) {
    return null;
  }

  const { unitType } = unit;

  if (unit.lazy) {
    lexer.stash();
    if (fn) {
      fn();
    }
    const { match } = bfsMatch(unit.end);
    lexer.stashPop();
    if (match) {
      // skip this symbol first
      return null;
    }
  }

  const canSkipped = unitType === 'zeroOrMore' || unitType === 'optional';

  let startState = unit.start;

  let nextUnits: Record<string, Unit>;

  if (canSkipped) {
    startState = unit.start.transitions[0].to;
    nextUnits = startState.getUnits();
  } else {
    nextUnits = startState.getUnits();
    const alternatives: any = productionsBySymbol[childSymbol];
    if (alternatives.ruleIndexes.length <= 1) {
      const ruleIndex = alternatives.ruleIndexes[0];
      if (ruleIndex === undefined) {
        throw new Error('no predict!');
      }
      return returnNext(ruleIndex);
    }
  }

  let maxCount = 0;
  let matchedRuleIndex = -1;

  function returnNext(ruleIndex: number) {
    const nextUnit = nextUnits[ruleIndex];
    return {
      ruleIndex,
      unit: nextUnit,
    };
  }

  for (const key of Object.keys(nextUnits)) {
    const u = nextUnits[key];
    lexer.stash();
    if (fn) {
      fn();
    }
    const { match, count } = bfsMatch(u.start);
    lexer.stashPop();
    if (match) {
      //console.log('match', productions[u.ruleIndex] + '');
      return returnNext(u.ruleIndex);
    }
    if (maxCount < count) {
      maxCount = count;
      matchedRuleIndex = u.ruleIndex;
    }
  }

  if (matchedRuleIndex !== -1 && !canSkipped) {
    //console.log('matchedRuleIndex', productions[matchedRuleIndex] + '');
    return returnNext(matchedRuleIndex);
  }
  return null;
}

function findExpectedTokenFromStateMachine(
  { childReverseIndex }: { childReverseIndex: number },
  stack = new Set(),
) {
  const ret = new Set<string>();
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

function predictProductionIndexNextLLK(arg: PredictParam) {
  return predictProductionIndexLLK(arg, () => lexer.lex());
}

type Unit = StateUnit | SymbolStateUnit | RootSymbolUnit;

class State {
  type: string;
  unit: Unit;
  transitions: Transition[];
  constructor(type: string, unit: Unit) {
    this.type = type;
    this.unit = unit;
    this.transitions = [];
  }
  pushTransition(endState: State | SymbolState, condition?: Function) {
    this.transitions.push(new Transition(endState, condition));
  }
}

class SymbolState {
  symbol: string;
  units: Record<string, RootSymbolUnit>;
  type: string;
  _transitions: Transition[] = [];
  allTranstions: Transition[] = [];
  unit: Unit;
  constructor(symbol: string, type: string, unit: Unit) {
    this.type = type;
    this.symbol = symbol;
    let transitions: Transition[] | undefined = undefined;
    this.unit = unit;
    this.units = {};
    Object.defineProperty(this, 'transitions', {
      get: () => {
        if (!transitions) {
          transitions = [];
          const myProductions = productionsBySymbol[symbol];
          for (const i of (myProductions as any).ruleIndexes as number[]) {
            const p = myProductions[i];
            const rhs = parser.getProductionRhs(p);
            const rootSymbolUnit = buildRhsSM(symbol, rhs, i);
            this.units[i] = rootSymbolUnit;
            transitions.push(new Transition(rootSymbolUnit.start));
            rootSymbolUnit.end.pushTransition(unit.end);
          }
          transitions = transitions.concat(this._transitions);
          this.allTranstions = transitions;
        }
        return transitions;
      },
    });
  }

  getTransitions() {
    return (this as any).transitions;
  }

  getUnits() {
    this.getTransitions();
    return this.units;
  }

  pushTransition(endState: State | SymbolState, condition?: Function) {
    this._transitions.push(new Transition(endState, condition));
  }
}

function concatUnits(type: string, us: Unit[], ruleIndex: number) {
  const l = us.length;
  for (let i = 0; i < l - 1; i++) {
    const first = us[i];
    const s = us[i + 1];
    first.end.pushTransition(s.start);
  }
  const ret = new RootSymbolUnit(type, ruleIndex);
  if (us[0] && us[l - 1]) {
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
  units: Unit[] = [];
  start: SymbolState | State = null!;
  end: State = null!;
  type: string;
  ruleIndex: number;
  unitType = 'rootSymbol';
  constructor(type: string, ruleIndex: number) {
    this.type = type;
    this.ruleIndex = ruleIndex;
  }
}

class StateUnit {
  units = undefined;
  unitType = 'token';
  lazy = false;
  start: State;
  end: State;
  type: string;
  ruleIndex: number;
  constructor(type: string, ruleIndex: number) {
    this.type = type;
    this.ruleIndex = ruleIndex;
    this.start = new State(`startOf${type}`, this);
    this.end = new State(`endOf${type}`, this);
  }
}

class SymbolStateUnit {
  unitType = 'symbol';
  ruleIndex: number;
  type: string;
  end: State;
  start: SymbolState;
  constructor(type: string, ruleIndex: number) {
    this.ruleIndex = ruleIndex;
    this.type = type;
    this.end = new State(`endOf${type}`, this);
    this.start = new SymbolState(type, `startOf${type}`, this);
  }
}

class Transition {
  condition?: Function;
  to: State | SymbolState;
  constructor(to: State | SymbolState, condition?: Function) {
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

function getUnitBySymbol(symbol: string) {
  if (!smUnitBySymbol[symbol]) {
    smUnitBySymbol[symbol] = new SymbolStateUnit(symbol, -1);
  }
  return smUnitBySymbol[symbol];
}

export {
  getUnitBySymbol,
  getParentSymbolItem,
  findExpectedTokenFromStateMachine,
  predictProductionIndexNextLLK,
  predictProductionIndexLLK,
  buildRhsSM,
  SymbolState,
  SymbolStateUnit,
  State,
  concatUnits,
  StateUnit,
  Transition,
  RootSymbolUnit,
};

export type { Unit };