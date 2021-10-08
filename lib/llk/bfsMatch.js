const { lexer } = require('../data');

// @ts-check
function bfsMatch(startState) {
  let reachableStates = [startState];
  let ret = {};
  while (1) {
    reachableStates = getNextReachableStates(reachableStates, ret);
    if (reachableStates.length) {
      lexer.lex();
    } else {
      break;
    }
  }
  if (ret.matchedInput) {
    return ret.matchedInput;
  }
  return false;
}

function getNextReachableStates(reachableStates, ret) {
  const stack = [];
  const newReachableStates = [];
  const encountered = new Set();
  for (const currentState of reachableStates) {
    stack.push(currentState);
    let state;
    while (stack.length) {
      state = stack.pop();
      if (encountered.has(state)) {
        continue;
      }
      encountered.add(state);
      if (!state.transitions.length) {
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

module.exports = {
  bfsMatch,
  getNextReachableStates,
};
