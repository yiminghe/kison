import data from '../data';
import type { AllState } from './sm';

const { lexer, Lexer } = data;

function bfsMatch(startState: AllState) {
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
  reachableStates: AllState[],
  ret: { matchedInput: boolean },
) {
  const stack: AllState[] = [];
  const newReachableStates = [];
  const encountered = new Set();
  for (const currentState of reachableStates) {
    stack.push(currentState);
    let state: AllState;
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
            newReachableStates.push(t.to);
          } else {
            stack.push(t.to);
          }
        }
      }
    }
  }
  return newReachableStates;
}

export { bfsMatch, getNextReachableStates };
