import data from '../data';
import type { AllState } from './sm';

const { lexer, Lexer, VIRTUAL_OPTIONAL_RULE_INDEX } = data;

interface StateItem {
  state: AllState;
  ruleIndexes: number[];
}

function findBestAlternation(
  strict: boolean,
  _forSymbol: string,
  states: AllState[],
  endState: AllState | null,
  symbolEndState: AllState,
) {
  // const start = Date.now();
  let reachableStates: (StateItem | null)[] = [];
  for (const state of states) {
    reachableStates.push({
      state,
      ruleIndexes: [state.ruleIndex],
    });
  }
  let consumedTokensLength: Map<number, number> = new Map();
  //const times = [];
  let count: number = 0;
  const finishedTokens = new Set<number>();
  let possibleRuleIndexes: Set<number> | undefined;
  while (1) {
    //const start = Date.now();
    reachableStates = getNextReachableStateItems(
      reachableStates,
      consumedTokensLength,
      endState,
      count,
      symbolEndState,
      finishedTokens,
    );
    if (
      reachableStates.length === 1 &&
      !finishedTokens.has(VIRTUAL_OPTIONAL_RULE_INDEX)
    ) {
      if (
        !finishedTokens.size ||
        (finishedTokens.size === 1 &&
          consumedTokensLength.get(Array.from(finishedTokens.keys())[0]) === 0)
      ) {
        const rule = reachableStates[0]!.ruleIndexes[0];
        finishedTokens.add(rule);
        consumedTokensLength.set(rule, count + 1);
        break;
      }
    }
    //times.push(Date.now() - start);
    if (reachableStates.length) {
      ++count;
      possibleRuleIndexes = new Set(
        reachableStates
          .map((r) => r?.ruleIndexes[0])
          .filter((n) => typeof n === 'number') as number[],
      );
      lexer.lex();
    } else {
      break;
    }
  }

  let arr = Array.from(finishedTokens.keys());

  if (!strict && !arr.length) {
    // deep go to error branch
    arr = Array.from(consumedTokensLength.keys());
  }

  if (arr.length > 1) {
    const getOrder = (a: number) => {
      return consumedTokensLength.get(a) || count;
    };
    if (consumedTokensLength.has(VIRTUAL_OPTIONAL_RULE_INDEX)) {
      consumedTokensLength.set(VIRTUAL_OPTIONAL_RULE_INDEX, 0xffff);
    }
    arr = arr.sort((a, b) => {
      const ret = getOrder(b) - getOrder(a);
      if (ret === 0) {
        return a - b;
      }
      return ret;
    });
  }

  // const time=0

  // const time = Date.now() - start;
  // console.log(_forSymbol + ' findBestAlternation: ' + time);

  // for (const a of arr) {
  //   if (a === VIRTUAL_OPTIONAL_RULE_INDEX) {
  //     console.log(_forSymbol, ': skip');
  //   } else {
  //     console.log(_forSymbol, parser.productions[a][1])
  //   }
  // }
  // console.log('');

  if (!arr.length && possibleRuleIndexes) {
    arr = Array.from(possibleRuleIndexes.values());
    arr = arr.sort((a, b) => a - b);
  }
  return arr;
}

function getNextReachableStateItems(
  reachableStates: (StateItem | null)[],
  consumedTokensLength: Map<number, number>,
  endState: AllState | null,
  count: number,
  symbolEndState: AllState,
  finishedTokens: Set<number>,
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

      if (state === symbolEndState) {
        const rootIndex = stateItem.ruleIndexes[0];
        consumedTokensLength.set(rootIndex, count);
      }

      if (
        state === endState ||
        (!state.transitions.length &&
          lexer.getCurrentToken().token === Lexer.STATIC.EOF_TOKEN)
      ) {
        const rootIndex = stateItem.ruleIndexes[0];
        finishedTokens.add(rootIndex);
        continue;
      }

      if (encountered.has(state)) {
        continue;
      }
      encountered.add(state);

      currentRuleIndexes = stateItem.ruleIndexes;
      let finded;
      for (const t of state.getTransitionsToMatch()) {
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
  if (current && finishedTokens.size === 0) {
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
      const ruleIndex = current.ruleIndexes[0];
      finishedTokens.add(ruleIndex);
      consumedTokensLength.set(ruleIndex, count);
      return [];
    }
  }

  return newReachableStates;
}

export { findBestAlternation, getNextReachableStateItems };
