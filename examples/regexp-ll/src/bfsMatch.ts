import type Input from './Input';
import { Matcher } from './match';
import type { State, Transition } from './state';

interface MatchedInput {
  matchedInput?: Input;
}

export default function bfsMatch(
  this: Matcher,
  input: Input,
  startState: State,
  onlyMatch?: boolean,
) {
  let reachableStates = [startState];
  let ret: MatchedInput = {};
  while (1) {
    reachableStates = getNextReachableStates.call(
      this,
      input,
      reachableStates,
      ret,
      onlyMatch,
    );
    if (reachableStates.length) {
      input.advance();
    } else {
      break;
    }
  }
  if (ret.matchedInput) {
    return ret.matchedInput;
  }
  return false;
}

function getNextReachableStates(
  this: Matcher,
  input: Input,
  reachableStates: State[],
  ret: MatchedInput,
  onlyMatch?: boolean,
) {
  const stack: State[] = [];
  const newReachableStates = [];
  const { compiler } = this;
  const encountered = new Set();
  for (const currentState of reachableStates) {
    stack.push(currentState);
    while (stack.length) {
      const state = stack.pop()!;
      if (encountered.has(state)) {
        continue;
      }
      if (this.getCacheResultIndexMap(input).get(state) === false) {
        continue;
      }
      input.checkGroup(compiler, state);
      if (!state.transitions.length) {
        ret.matchedInput = input;
        if (onlyMatch) {
          return [];
        }
      }
      let finded;
      for (const t of state.transitions) {
        const find = t.perform(input);
        finded = finded || !!find;
        if (find) {
          if (find.count) {
            newReachableStates.push(t.to);
          } else {
            stack.push(t.to);
          }
        }
      }
      if (!finded) {
        this.getCacheResultIndexMap(input).set(state, false);
      }
    }
  }
  return newReachableStates;
}
