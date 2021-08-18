import parser from "../parser.js";

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
    const ret = parser.parse(line);
    const tokens = ret.tokens;
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
