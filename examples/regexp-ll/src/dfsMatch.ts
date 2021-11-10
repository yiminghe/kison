import Input from './Input';
import { Matcher } from './match';
import { State } from './state';

export default function dfsMatch(
  this: Matcher,
  input: Input,
  state: State,
  _: any,
  callSiteMap: Map<State, number> = new Map(),
): false | Input {
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

  if (!state.transitions.length) {
    return input;
  }

  for (const t of state.transitions) {
    let newInput = input.clone();
    const find = t.perform(newInput);
    if (find) {
      if (find.count) {
        newInput.advance(find.count);
      }
      const ret = dfsMatch.call(this, newInput, t.to, _, callSiteMap);
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
