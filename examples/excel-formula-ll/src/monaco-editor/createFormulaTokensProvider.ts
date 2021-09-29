import { getTokens } from '../cachedParser';
import type { languages } from 'monaco-editor';

class LexerState implements languages.IState {
  state: Record<string, any> = {};
  constructor(state = {}) {
    this.state = state;
  }
  clone() {
    return new LexerState(JSON.parse(JSON.stringify(this.state)));
  }
  equals(other: LexerState) {
    const keys = Object.keys(this.state);
    const otherKeys = Object.keys(other.state);
    if (keys.length !== otherKeys.length) {
      return false;
    }
    for (const k of keys) {
      if (other.state[k] !== this.state[k]) {
        return false;
      }
    }
    return true;
  }
}

export default function createFormulaTokensProvider(): languages.TokensProvider {
  return {
    getInitialState() {
      return new LexerState();
    },
    tokenize(line, currentState: LexerState) {
      // console.log('line',line);
      // console.log('currentState',JSON.stringify(currentState.state));
      const { tokens, state } = getTokens(line, {
        state: currentState.state,
      });
      // console.log('state',JSON.stringify(state));
      return {
        endState: new LexerState(state),
        tokens: tokens.map((t) => {
          return {
            startIndex: t.start,
            scopes: t.token + '.formula',
          };
        }),
      };
    },
  };
}
