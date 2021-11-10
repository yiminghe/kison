import type Input from './Input';
import type AsyncInput from './AsyncInput';

export class State {
  transitions: Transition[] = [];
  asyncTransitions: AsyncTransition[] = [];
  constructor(public type: string) {}
  pushTransition(endState: State, condition: Condition) {
    this.transitions.push(new Transition(endState, condition));
  }
  pushAsyncTransition(endState: State, condition: AsyncCondition) {
    this.asyncTransitions.push(new AsyncTransition(endState, condition));
  }

  getTransitions(async: boolean) {
    return async ? this.asyncTransitions : this.transitions;
  }

  pushEmptyTranstion(endState: State, async?: boolean) {
    if (async) {
      this.asyncTransitions.push(new AsyncTransition(endState));
    } else {
      this.transitions.push(new Transition(endState));
    }
  }
}
type ConditionRet = null | boolean | { count: number };
export type Condition = (input: Input) => ConditionRet;
export type AsyncCondition = (
  input: AsyncInput,
) => Promise<ConditionRet> | ConditionRet;

export class Transition {
  constructor(public to: State, public condition?: Condition) {}
  perform(input: Input) {
    if (this.condition) {
      const ret = this.condition(input);
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

export class AsyncTransition {
  constructor(public to: State, public condition?: AsyncCondition) {}
  async perform(input: AsyncInput) {
    if (this.condition) {
      const ret = await this.condition(input);
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

export class StateUnit {
  start: State;
  end: State;
  constructor(public type: string) {
    this.start = new State(`startOf${type}`);
    this.end = new State(`endOf${type}`);
  }
}
