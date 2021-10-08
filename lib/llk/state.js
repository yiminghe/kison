// @ts-check
const { parser, lexer, stateMachine } = require('../data');

class State {
  constructor(type) {
    this.type = type;
    this.transitions = [];
  }
  pushTransition(endState, condition) {
    this.transitions.push(new Transition(endState, condition));
  }
}

class SymbolState {
  constructor(symbol, type, endState) {
    this.type = type;
    this.symbol = symbol;
    let transitions = undefined;
    this._transitions = [];
    this.allTranstions = [];
    this.endState = endState;
    Object.defineProperty(this, 'transitions', {
      get: () => {
        if (!transitions) {
          transitions = this._transitions.concat();
          let empty = false;
          const symbolSm = stateMachine[symbol];
          const keys = Object.keys(symbolSm);
          for (const key of keys) {
            const symbolUnit = symbolSm[key];
            if (!symbolUnit) {
              empty = true;
            } else {
              transitions.push(new Transition(symbolUnit.start));
              symbolUnit.end.pushTransition(endState);
            }
          }
          if (empty) {
            transitions.push(new Transition(endState));
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

function concatUnits(type, us) {
  if (!us.length) {
    return null;
  }
  const l = us.length;
  if (l === 1) {
    return us[0];
  }
  for (let i = 0; i < l - 1; i++) {
    const first = us[i];
    const s = us[i + 1];
    first.end.pushTransition(s.start);
  }
  const ret = new StateUnit(type);
  ret.start = us[0].start;
  ret.end = us[l - 1].end;
  return ret;
}

class StateUnit {
  constructor(type) {
    this.type = type;
    this.start = new State(`startOf${type}`);
    this.end = new State(`endOf${type}`);
  }
}

class SymbolStateUnit {
  constructor(type) {
    this.type = type;
    this.end = new State(`endOf${type}`);
    this.start = new SymbolState(type, `startOf${type}`, this.end);
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
