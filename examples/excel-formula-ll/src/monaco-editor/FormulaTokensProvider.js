import { getTokens } from "./utils.js";

class Cloneable {
  clone() {
    return new Cloneable();
  }
  equals() {
    return true;
  }
}

const placeholder = new Cloneable();

export default class FormulaTokensProvider {
  getInitialState() {
    return placeholder;
  }

  tokenize(line) {
    const { tokens } = getTokens(line);
    return {
      endState: placeholder,
      tokens: tokens.map(t => {
        return {
          startIndex: t.start,
          scopes: t.token + ".formula"
        };
      })
    };
  }
}
