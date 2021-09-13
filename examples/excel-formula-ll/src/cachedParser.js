// @ts-check
import * as parser from "./parserApi.js";

let currentText;
let currentAst;

function trimEmptyLine(text) {
  return text.replace(/\n+$/, "");
}

export function getAst(text, options) {
  text = trimEmptyLine(text);
  if (!options && currentText === text) {
    return currentAst;
  }
  currentText = text;
  currentAst = parser.parse(text, options);
  return currentAst;
}

let currentTokenText;
let currentTokens;

export function getTokens(text) {
  text = trimEmptyLine(text);
  if (currentTokenText === text) {
    return currentTokens;
  }
  currentTokenText = text;
  currentTokens = parser.lex(text);
  return currentTokens;
}
