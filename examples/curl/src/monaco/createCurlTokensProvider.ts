import { getTokens } from './cachedParser';
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

export function createCurlTokensProvider(): languages.TokensProvider {
  return {
    getInitialState() {
      return new LexerState();
    },
    tokenize(line, currentState: LexerState) {
      let curState = currentState.state;
      // console.log('line',line);
      // console.log('currentState',JSON.stringify(currentState.state));
      const { tokens, state } = getTokens(line, {
        state: curState,
      });
      let s: any = state;
      if (line.endsWith('\\')) {
        s.endWithSlash = true;
      }
      const last = tokens.length - 2;
      // console.log('state',JSON.stringify(state));
      const retTokens = tokens
        .map((t, index) => {
          const type = t.token;
          let start = t.start;
          let scope: string = '$UNKNOWN';
          if (
            type === 'ANSII_C_STRING' ||
            type === 'QUOTE' ||
            type === 'STRING_CONTENT' ||
            type === 'RAW_STRING'
          ) {
            scope = 'STRING';
          } else if (type === '$UNKNOWN') {
            if (index === last && t.text === '\\') {
              scope = 'NAME';
            }
          } else if (type === 'WORD') {
            if (index === 0 && !curState.endWithSlash) {
              scope = 'FUNCTION';
            } else {
              scope = 'NAME';
            }
          } else {
            start = -1;
          }
          return {
            startIndex: start,
            scopes: scope + '.curl',
          };
        })
        .filter((t) => t.startIndex !== -1);
      return {
        endState: new LexerState(state),
        tokens: retTokens,
      };
    },
  };
}
