export class State {
  constructor(type) {
    this.type = type;
    this.transitions = [];
  }
  pushTransition(endState, condition) {
    this.transitions.push(new Transition(endState, condition));
  }
}

export class Transition {
  constructor(to, condition) {
    this.to = to;
    this.condition = condition;
  }
  perform(input) {
    if (this.condition) {
      const ret = this.condition(input);
      if (ret === true) {
        return {
          count: 0
        };
      }
      return ret;
    }
    return {
      count: 0
    };
  }
}

export class StateUnit {
  constructor(type) {
    this.type = type;
    this.start = new State(`startOf${type}`);
    this.end = new State(`endOf${type}`);
  }
}
