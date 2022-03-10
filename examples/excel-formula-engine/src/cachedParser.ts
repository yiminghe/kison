import * as parser from './parserApi';
import type {
  ParserOptions,
  ParseResult,
  LexResult,
  LexerOptions,
} from './parser';

let currentText: string;
let currentAst: ParseResult;

function trimEmptyLine(text: string) {
  return text.replace(/\n+$/, '');
}

export function getAst(text: string, options?: ParserOptions): ParseResult {
  text = trimEmptyLine(text);
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
  text = trimEmptyLine(text);
  if (currentTokenText === text) {
    return lexResult;
  }
  currentTokenText = text;
  lexResult = parser.lex(text, options);
  return lexResult;
}
