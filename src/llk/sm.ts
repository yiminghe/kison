import * as bfsMatchModule from './bfsMatch';
import * as matcher from './matcher';
import * as localUtils from './utils';
import data from '../data';
import utils from '../utils';
import type { Rhs } from '../types';

const { findBestAlternation } = bfsMatchModule;
const { createTokenMatcher } = matcher;
const { isSymbol } = localUtils;
var {
  parser,
  lexer,
  symbolStack,
  productionsBySymbol,
  smUnitBySymbol,
  VIRTUAL_OPTIONAL_RULE_INDEX,
} = data;
const { isOptionalSymbol, isZeroOrMoreSymbol, isLazySymbol, normalizeSymbol } =
  utils;

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
  // expensive
  globalMatch: boolean,
  { childReverseIndex, ruleIndex, topSymbol }: PredictParam,
  fn?: Function,
) {
  let unit;
  let lastUnit;
  let endState;

  if (ruleIndex === -1) {
    lastUnit = unit = getUnitBySymbol(topSymbol);
  } else {
    let parentSymbolItem = getParentSymbolItem();
    if (!parentSymbolItem) {
      throw new Error('no parent symbol');
    }
    const parentUnit: RootSymbolUnit = parentSymbolItem.ruleUnit;
    const { units } = parentUnit;
    unit = units[units.length - 1 - childReverseIndex];
    lastUnit = units[units.length - 1];
  }

  const childSymbol = unit.type;

  if (!isSymbol(unit.type)) {
    return null;
  }

  const { unitType } = unit;

  function getSkipCheckStates(unit: Unit) {
    const u: any = unit;
    let states: AllState[] = u.checkStates;
    if (!states) {
      u.checkStates = states = [];
      const skipStartState = new State(
        'startOfSkip$' + childSymbol,
        null,
        VIRTUAL_OPTIONAL_RULE_INDEX,
      );
      skipStartState.pushTransition(unit.end);
      const symbolUnit = new SymbolStateUnit(childSymbol, -2);
      symbolUnit.end.pushTransition(unit.end);
      states.push(
        skipStartState,
        ...symbolUnit.start.getAlternativeStartStates(),
      );
    }
    return states;
  }

  let nextUnits: Record<string, Unit>;

  let startState: AllState;

  function returnNext(ruleIndex: number) {
    const nextUnit = nextUnits[ruleIndex];
    return {
      ruleIndex,
      unit: nextUnit,
    };
  }

  if (unit.lazy) {
    lexer.stash();
    if (fn) {
      fn();
    }
    let states: AllState[] = getSkipCheckStates(unit);
    endState = lastUnit.end;
    const ruleIndexes = findBestAlternation(
      childSymbol,
      states,
      globalMatch ? null : endState,
    );
    lexer.stashPop();
    if (
      ruleIndexes[0] === VIRTUAL_OPTIONAL_RULE_INDEX ||
      ruleIndexes.length === 0
    ) {
      // skip this symbol first
      return null;
    } else {
      startState = unit.start.transitions[0].to;
      if (startState.classType !== 'SymbolState') {
        throw new Error('expect SymbolState!');
      }
      nextUnits = startState.getUnits();
      return returnNext(Array.from(ruleIndexes.values())[0]);
    }
  }

  const canSkipped = unitType === 'zeroOrMore' || unitType === 'optional';

  let startStates: AllState[] = [];

  if (canSkipped) {
    startState = unit.start.transitions[0].to;
    if (startState.classType !== 'SymbolState') {
      throw new Error('expect SymbolState!');
    }
    nextUnits = startState.getUnits();
    startStates = getSkipCheckStates(unit);
    endState = lastUnit.end;
  } else {
    const alternatives: any = productionsBySymbol[childSymbol];
    startState = unit.start;
    if (startState.classType !== 'SymbolState') {
      throw new Error('expect SymbolState!');
    }
    nextUnits = startState.getUnits();
    if (alternatives.ruleIndexes.length <= 1) {
      const ruleIndex = alternatives.ruleIndexes[0];
      if (ruleIndex === undefined) {
        throw new Error('no predict!');
      }
      return returnNext(ruleIndex);
    }
    startStates = startState.getAlternativeStartStates();
    endState = lastUnit.end;
  }

  lexer.stash();
  if (fn) {
    fn();
  }
  const ruleIndexes = findBestAlternation(
    childSymbol,
    startStates,
    globalMatch ? null : endState,
  );
  lexer.stashPop();

  if (ruleIndexes[0] === VIRTUAL_OPTIONAL_RULE_INDEX) {
    ruleIndexes.shift();
  }

  if (ruleIndexes.length) {
    return returnNext(ruleIndexes[0]);
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

function predictProductionIndexNextLLK(
  globalMatch: boolean,
  arg: PredictParam,
) {
  return predictProductionIndexLLK(globalMatch, arg, () => lexer.lex());
}

export type Unit = StateUnit | SymbolStateUnit | RootSymbolUnit;
export type AllState = State | SymbolState;

class State {
  classType: 'State' = 'State';
  transitions: Transition[] = [];
  constructor(
    public type: string,
    public unit: Unit | null,
    public ruleIndex: number,
  ) {
    this.transitions = [];
  }
  pushTransition(endState: State | SymbolState, condition?: Function) {
    this.transitions.push(new Transition(endState, condition));
  }
}

class SymbolState {
  classType: 'SymbolState' = 'SymbolState';
  startStates: AllState[];
  units: Record<string, RootSymbolUnit> = {};
  _afterTransitions: Transition[] = [];
  _beforeTransitions: Transition[] = [];
  alltransitions?: Transition[];
  constructor(
    public symbol: string,
    public type: string,
    public unit: Unit,
    public ruleIndex: number,
  ) {
    this.startStates = [];
  }

  get transitions() {
    let transitions = this.alltransitions;
    if (!transitions) {
      const { symbol, unit, startStates, units } = this;
      this.alltransitions = transitions = [];
      const myProductions = productionsBySymbol[symbol];
      if (!myProductions) {
        throw new Error('unexpected productionsBySymbol: ' + symbol);
      }
      for (const i of myProductions.ruleIndexes) {
        const p = myProductions.productions[i];
        const rhs = parser.getProductionRhs(p);
        const rootSymbolUnit = buildRhsSM(symbol, rhs, i);
        units[i] = rootSymbolUnit;
        startStates.push(rootSymbolUnit.start);
        transitions.push(new Transition(rootSymbolUnit.start));
        rootSymbolUnit.end.pushTransition(unit.end);
      }
      this.alltransitions = transitions = [
        ...this._beforeTransitions,
        ...transitions,
        ...this._afterTransitions,
      ];
    }
    return transitions;
  }

  getTransitions() {
    return this.transitions;
  }

  getUnits() {
    this.getTransitions();
    return this.units;
  }

  getAlternativeStartStates() {
    this.getTransitions();
    return this.startStates;
  }

  pushBeforeTransition(endState: State | SymbolState, condition?: Function) {
    this._beforeTransitions.push(new Transition(endState, condition));
  }

  pushTransition(endState: State | SymbolState, condition?: Function) {
    this._afterTransitions.push(new Transition(endState, condition));
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
    ret.start = new State(`startOf${type}`, ret, ruleIndex);
    ret.end = new State(`endOf${type}`, ret, ruleIndex);
    ret.start.pushTransition(ret.end);
  }
  ret.units = us;
  return ret;
}

class RootSymbolUnit {
  units: Unit[] = [];
  start: SymbolState | State = null!;
  end: State = null!;
  lazy = false;
  unitType = 'rootSymbol';
  constructor(public type: string, public ruleIndex: number) {}
}

class StateUnit {
  units = undefined;
  unitType = 'token';
  lazy = false;
  start: State;
  end: State;

  constructor(public type: string, public ruleIndex: number) {
    this.start = new State(`startOf${type}`, this, ruleIndex);
    this.end = new State(`endOf${type}`, this, ruleIndex);
  }
}

class SymbolStateUnit {
  unitType = 'symbol';
  units: undefined;
  end: State;
  lazy = false;
  start: SymbolState;
  constructor(public type: string, public ruleIndex: number) {
    this.end = new State(`endOf${type}`, this, ruleIndex);
    this.start = new SymbolState(type, `startOf${type}`, this, ruleIndex);
  }
}

class Transition {
  constructor(public to: AllState, public condition?: Function) {}
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
