// @ts-check
export default async function dfsMatch(input, state, callSiteMap = new Map()) {
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
