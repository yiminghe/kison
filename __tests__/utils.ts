export function prettyJson(o: any) {
  return JSON.stringify(o, null, 2).replace(/"/g, "'");
}

// global eval
export const run = eval;

export const HIDDEN_LEXER_RULE = {
  regexp: /^\s+/,
  token: 'HIDDEN',
  channel: 'HIDDEN',
};
export const HIDDEN_LEXER = {
  lexer: {
    rules: [HIDDEN_LEXER_RULE],
  },
};