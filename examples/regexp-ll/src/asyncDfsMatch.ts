import type AsyncInput from './AsyncInput';
import { AsyncMatcher } from './match';
import { State } from './state';

export default async function dfsMatch(
  this: AsyncMatcher,
  input: AsyncInput,
  state: State,
  callSiteMap: Map<State, number> = new Map(),
): Promise<AsyncInput | false> {
  // avoid already failed match
  if (this.getCacheResultIndexMap(input).get(state) === false) {
    return false;
  }

  // endless loop
  if (callSiteMap.get(state) === input.index) {
    return false;
  }

  callSiteMap.set(state, input.index);

  input.checkGroup(this.compiler, state);

  if (!state.asyncTransitions.length) {
    return input;
  }
  debugger;
  for (const t of state.asyncTransitions) {
    let newInput = input.clone();
    const find = await t.perform(newInput);
    if (find) {
      if (find.count) {
        await newInput.advance(find.count);
      }
      const ret = await dfsMatch.call(this, newInput, t.to, callSiteMap);
      if (ret) {
        return ret;
      }
    } else {
      continue;
    }
  }

  callSiteMap.delete(state);

  this.getCacheResultIndexMap(input).set(state, false);

  return false;
}
