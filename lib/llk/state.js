// @ts-check
class State {
  constructor(type) {
    this.type = type;
    this.transitions = [];
  }
  pushTransition(endState, condition) {
    this.transitions.push(new Transition(endState, condition));
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
  State,
  concatUnits,
  StateUnit,
  Transition,
};
