// @ts-check
import { makeError, makeReference } from "../functions/utils.js";
import { parseCoord } from "../utils.js";
import { evaluators } from "./evaluators.js";
import {
  expandReference,
  intersectReference,
  unionReference
} from "./utils.js";

const rowRangeAddress = new RegExp(`^(?:(\\d+)\\:(\\d+))$`);
const cellAddressLiteral = `(\\$?[A-Za-z]+\\$?[0-9]+)`;
const cellAddress = `(?:
  ${cellAddressLiteral}
  (?:
    \\s*
    \\:
    \\s*
    ${cellAddressLiteral}
    )?
  #?
)`.replace(/\s/g, "");

Object.assign(evaluators, {
  ["evaluate_expand-reference"](node, context) {
    const { children } = node;
    const left = evaluators.evaluate(children[0], context);
    if (children[2]) {
      const right = evaluators.evaluate(children[2]);
      return expandReference(left, right);
    } else {
      return left;
    }
  },

  ["evaluate_union-reference"](node, context) {
    const { children } = node;
    const left = evaluators.evaluate(children[0], context);
    if (children[2]) {
      const right = evaluators.evaluate(children[2]);
      return unionReference(left, right);
    } else {
      return left;
    }
  },

  ["evaluate_intersect-reference"](node, context) {
    const { children } = node;
    const left = evaluators.evaluate(children[0], context);
    if (!children[1]) {
      return left;
    }
    const right = evaluators.evaluate(children[1]);
    return intersectReference(left, right);
  },

  evaluate_CELL(node) {
    const { text } = node;
    let rowMatch = text.match(rowRangeAddress);
    if (rowMatch) {
      let startRow = parseInt(rowMatch[1], 10);
      let endRow = parseInt(rowMatch[2], 10);
      const rowCount = endRow - startRow + 1;
      return makeReference([
        {
          row: startRow,
          rowCount,
          col: 1,
          colCount: 0
        }
      ]);
    }
    const cellMatch = text.match(cellAddress);
    const { row, col } = parseCoord(cellMatch[1]);
    let rowCount = 1;
    let colCount = 1;
    if (cellMatch[2]) {
      const { row: endRow, col: endCol } = parseCoord(cellMatch[2]);
      rowCount = endRow - row + 1;
      colCount = endCol - col + 1;
    }
    return makeReference([
      {
        row,
        col,
        rowCount,
        colCount
      }
    ]);
  },

  evaluate_NAME(node) {
    // TODO name resolution
    // only colum
    const { text } = node;
    if (text.match(/^[A-Za-z]+$/)) {
      const { col } = parseCoord(text);
      return makeReference([
        {
          col,
          colCount: 1,
          row: 1,
          rowCount: 0
        }
      ]);
    } else {
      return makeError("can not find name: " + text);
    }
  }
});
