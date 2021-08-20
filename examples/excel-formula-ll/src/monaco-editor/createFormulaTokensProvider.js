import { getTokens } from "../cachedParser.js";

class State {
  clone() {
    return new State();
  }
  equals() {
    return true;
  }
}

const placeholderState = new State();

export default function createFormulaTokensProvider() {
  return {
    getInitialState() {
      return placeholderState;
    },
    tokenize(line) {
      const { tokens } = getTokens(line);
      return {
        endState: placeholderState,
        tokens: tokens.map(t => {
          return {
            startIndex: t.start,
            scopes: t.token + ".formula"
          };
        })
      };
    }
  };
}
