import { parser } from 'bash-parse';
import type { AstSymbolNode, ParserOptions } from 'bash-parse';

export const lex = parser.lex;

export const parse = (input: string, options?: ParserOptions) => {
  return parser.parse(input, options);
};
