// @ts-check
const { parser, lexer, stateMachine } = require('../data');
const { buildRhsSM } = require('./sm');

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
    this.emptyIndex = undefined;
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
                this.emptyIndex = i;
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
  constructor(type, index) {
    this.type = type;
    this.index = index;
    this.start = new State(`startOf${type}`, this);
    this.end = new State(`endOf${type}`, this);
  }
}

class SymbolStateUnit {
  constructor(type, index) {
    this.index = index;
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
  SymbolState,
  SymbolStateUnit,
  State,
  concatUnits,
  StateUnit,
  Transition,
};
