import data from '../data';
import type { State } from './sm';

const { lexer, Lexer } = data;

function bfsMatch(startState: State) {
  let reachableStates = [startState];
  let ret: { matchedInput: boolean } = { matchedInput: false };
  let count = 0;
  while (1) {
    reachableStates = getNextReachableStates(reachableStates, ret);
    if (reachableStates.length) {
      lexer.lex();
      count++;
    } else {
      break;
    }
  }
  if (ret.matchedInput) {
    return {
      match: true,
      count,
    };
  }
  return { match: false, count };
}

function getNextReachableStates(
  reachableStates: State[],
  ret: { matchedInput: boolean },
) {
  const stack: State[] = [];
  const newReachableStates = [];
  const encountered = new Set();
  for (const currentState of reachableStates) {
    stack.push(currentState);
    let state: State;
    while (stack.length) {
      state = stack.pop()!;
      if (encountered.has(state)) {
        continue;
      }
      encountered.add(state);
      if (
        !state.transitions.length &&
        lexer.getCurrentToken().token === Lexer.STATIC.EOF_TOKEN
      ) {
        ret.matchedInput = true;
        return [];
      }
      let finded;
      for (const t of state.transitions) {
        const find = t.perform();
        finded = finded || !!find;
        if (find) {
          if (find.count) {
            newReachableStates.push(t.to as State);
          } else {
            stack.push(t.to as State);
          }
        }
      }
    }
  }
  return newReachableStates;
}

export { bfsMatch, getNextReachableStates };
