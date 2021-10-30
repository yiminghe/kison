import data from '../data';
import type { AllState } from './sm';

const { lexer, Lexer, VIRTUAL_OPTIONAL_RULE_INDEX } = data;

interface StateItem {
  state: AllState;
  ruleIndexes: number[];
}

function findBestAlternation(
  _forSymbol: string,
  states: AllState[],
  endState: AllState | null,
) {
  //console.log('start findBestAlternation: ' + _forSymbol);
  //const start = Date.now();
  let reachableStates: (StateItem | null)[] = [];
  for (const state of states) {
    reachableStates.push({
      state,
      ruleIndexes: [state.ruleIndex],
    });
  }
  let ruleIndexes: Map<number, number> = new Map();
  //const times = [];
  let count: number = 0;
  while (1) {
    //const start = Date.now();
    reachableStates = getNextReachableStateItems(
      reachableStates,
      ruleIndexes,
      endState,
      count,
    );
    if (
      reachableStates.length === 1 &&
      !ruleIndexes.has(VIRTUAL_OPTIONAL_RULE_INDEX)
    ) {
      const values = new Set(ruleIndexes.values());
      if (!values.size || (values.size === 1 && Array.from(values)[0] === 0)) {
        ruleIndexes.set(reachableStates[0]!.ruleIndexes[0], count + 1);
        break;
      }
    }
    //times.push(Date.now() - start);
    if (reachableStates.length) {
      ++count;
      lexer.lex();
    } else {
      break;
    }
  }

  let arr = Array.from(ruleIndexes.keys());

  if (arr.length > 1) {
    if (ruleIndexes.has(VIRTUAL_OPTIONAL_RULE_INDEX)) {
      ruleIndexes.set(VIRTUAL_OPTIONAL_RULE_INDEX, 0xffff);
    }
    arr = arr.sort((a, b) => {
      const ret = ruleIndexes.get(b)! - ruleIndexes.get(a)!;
      if (ret === 0) {
        return a - b;
      }
      return ret;
    });
  }

  // const time = Date.now() - start;
  // console.log('');
  // const time=0
  // console.log(_forSymbol + ' findBestAlternation: ' + time + ' ' + arr);

  // for(const a of arr){
  //   if(a===VIRTUAL_OPTIONAL_RULE_INDEX){
  //     console.log('skip');
  //   } else {
  //     console.log((parser.productions as any)[a][1])
  //   }
  // }
  // console.log('');
  return arr;
}

function getNextReachableStateItems(
  reachableStates: (StateItem | null)[],
  ruleIndexes: Map<number, number>,
  endState: AllState | null,
  count: number,
) {
  // function last<T>(arr: T[], n = 1) {
  //   return arr[arr.length - n];
  // }
  let stack: (StateItem | null)[] = [];
  let newReachableStates: (StateItem | null)[] = [];
  const encounteredMap: Map<number, Set<AllState>> = new Map();

  for (let i = 0; i < reachableStates.length; i++) {
    const currentState = reachableStates[i];
    if (!currentState) {
      continue;
    }
    stack.push(currentState);
    let stateItem: StateItem;
    let state: AllState;
    let currentRuleIndexes: number[] = currentState.ruleIndexes;

    let encountered = encounteredMap.get(currentRuleIndexes[0]);
    if (!encountered) {
      encountered = new Set<AllState>();
      encounteredMap.set(currentRuleIndexes[0], encountered);
    }

    while (stack.length) {
      stateItem = stack.shift()!;
      if (!stateItem) {
        continue;
      }
      state = stateItem.state;

      if (
        state === endState ||
        (!state.transitions.length &&
          lexer.getCurrentToken().token === Lexer.STATIC.EOF_TOKEN)
      ) {
        const rootIndex = stateItem.ruleIndexes[0];
        ruleIndexes.set(rootIndex, count);
        // for (let j = 0; j < stack.length; j++) {
        //   const s = stack[j];
        //   if (s && s.ruleIndexes[0] === rootIndex) {
        //     stack[j] = null;
        //   }
        // }
        // for (let j = i; j < reachableStates.length; j++) {
        //   const v = reachableStates[j];
        //   if (v && v.ruleIndexes[0] === rootIndex) {
        //     reachableStates[j] = null;
        //   }
        // }
        // for (let j = 0; j < newReachableStates.length; j++) {
        //   const v = newReachableStates[j];
        //   if (v && v.ruleIndexes[0] === rootIndex) {
        //     newReachableStates[j] = null;
        //   }
        // }
        continue;
      }

      if (encountered.has(state)) {
        continue;
      }
      encountered.add(state);

      currentRuleIndexes = stateItem.ruleIndexes;
      let finded;
      for (const t of state.transitions) {
        const find = t.perform();
        finded = finded || !!find;
        if (find) {
          let ruleIndexes = currentRuleIndexes;
          // const toRuleIndex = t.to.ruleIndex;
          // if (last(currentRuleIndexes) !== toRuleIndex) {
          //   ruleIndexes = [...ruleIndexes, toRuleIndex];
          // }
          if (find.count) {
            newReachableStates.push({
              state: t.to,
              ruleIndexes,
            });
          } else {
            stack.push({
              state: t.to,
              ruleIndexes,
            });
          }
        }
      }
    }
  }

  newReachableStates = newReachableStates.filter((n) => !!n);

  let current = newReachableStates[0];
  if (current && ruleIndexes.size === 0) {
    let i = 1;
    for (i = 1; i < newReachableStates.length; i++) {
      let next = newReachableStates[i];
      if (next) {
        if (current.ruleIndexes[0] !== next.ruleIndexes[0]) {
          break;
        }
        current = next;
      }
    }
    if (current && i === newReachableStates.length) {
      ruleIndexes.set(current.ruleIndexes[0], count);
      return [];
    }
  }

  return newReachableStates;
}

export { findBestAlternation, getNextReachableStateItems };
