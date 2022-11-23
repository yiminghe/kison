import * as parser from './parserApi';
import type {
  ParserOptions,
  ParseResult,
  LexResult,
  LexerOptions,
} from 'bash-parse';

let currentText: string;
let currentAst: ParseResult;

export function getAst(text: string, options?: ParserOptions): ParseResult {
  if (!options && currentText === text) {
    return currentAst;
  }
  currentText = text;
  currentAst = parser.parse(text, options);
  return currentAst;
}

let currentTokenText: string;
let lexResult: LexResult;

export function getTokens(text: string, options: LexerOptions) {
  if (currentTokenText === text) {
    return lexResult;
  }
  currentTokenText = text;
  lexResult = parser.lex(text, options);
  return lexResult;
}
