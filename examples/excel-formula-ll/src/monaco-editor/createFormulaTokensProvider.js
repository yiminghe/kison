// @ts-check
import { getTokens } from "../cachedParser.js";

class LexerState {
  state = {};
  constructor(state = {}) {
    this.state = state;
  }
  clone() {
    return new LexerState(this.state);
  }
  equals(other) {
    const keys = Object.keys(this.state);
    const otherKeys = Object.keys(other.state);
    if (keys.length !== otherKeys.length) {
      return false;
    }
    for (const k of keys) {
      if (other.state[k] !== this.state[k]) {
        return false
      }
    }
    return true;
  }
}

export default function createFormulaTokensProvider() {
  return {
    getInitialState() {
      return new LexerState();
    },
    tokenize(line, currentState) {
      const { tokens, state } = getTokens(line, {
        state: currentState.state,
      });
      return {
        endState: new LexerState(state),
        tokens: tokens.map((t) => {
          return {
            startIndex: t.start,
            scopes: t.token + ".formula"
          };
        })
      };
    }
  };
}
