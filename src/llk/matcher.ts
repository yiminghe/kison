import data from '../data';
const { lexer } = data;

const createTokenMatcher = (token: string) => {
  const fn = () => {
    const currentToken = lexer.getCurrentToken();
    return currentToken.t === token ? { count: 1 } : false;
  };
  fn.token = token;
  return fn;
};

export { createTokenMatcher };
