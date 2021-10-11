// @ts-check
const { lexer, Lexer } = require('../data');


function bfsMatch(startState, getStateCacheMatchLocal) {
  let reachableStates = [startState];
  let ret = {};
  let count = 0;
  while (1) {
    reachableStates = getNextReachableStates(reachableStates, ret, getStateCacheMatchLocal);
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

function getNextReachableStates(reachableStates, ret, getStateCacheMatchLocal) {
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
      if (getStateCacheMatchLocal(state)) {
        ret.matchedInput = true;
        return [];
      }
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

module.exports = {
  bfsMatch,
  getNextReachableStates,
};
