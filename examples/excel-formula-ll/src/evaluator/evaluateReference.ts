import { makeError, makeReference } from '../functions/utils';

import type { CELL_Node, NAME_Node, Reference_Node } from '../parser';
import { parseCoord } from '../utils';

import { evaluators, evaluate } from './evaluators';

import type { Context } from './types';

import {
  assertIsDefined,
  expandReference,
  intersectReference,
  unionReference,
} from './utils';

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
)`.replace(/\s/g, '');

Object.assign(evaluators, {
  ['evaluate_expand-reference'](node: Reference_Node, context: Context) {
    const { children } = node;
    const left = evaluate(children[0], context);
    if (left.type === 'error') {
      return left;
    }
    if (children[2]) {
      const right = evaluate(children[2], context);
      if (right.type === 'error') {
        return right;
      }
      if (left.type === 'reference' && right.type === 'reference') {
        return expandReference(left, right);
      }
    } else {
      return left;
    }
  },

  ['evaluate_union-reference'](node: Reference_Node, context: Context) {
    const { children } = node;
    const left = evaluate(children[0], context);
    if (left.type === 'error') {
      return left;
    }
    if (children[2]) {
      const right = evaluate(children[2], context);
      if (right.type === 'error') {
        return right;
      }
      if (left.type === 'reference' && right.type === 'reference') {
        return unionReference(left, right);
      }
    } else {
      return left;
    }
  },

  ['evaluate_intersect-reference'](node: Reference_Node, context: Context) {
    const { children } = node;
    const left = evaluate(children[0], context);
    if (left.type === 'error') {
      return left;
    }
    if (!children[1]) {
      return left;
    }
    const right = evaluate(children[1], context);
    if (right.type === 'error') {
      return right;
    }
    if (left.type === 'reference' && right.type === 'reference') {
      return intersectReference(left, right);
    }
  },

  evaluate_CELL(node: CELL_Node) {
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
          colCount: 0,
        },
      ]);
    }
    const cellMatch = text.match(cellAddress);
    assertIsDefined(cellMatch);
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
        colCount,
      },
    ]);
  },

  evaluate_NAME(node: NAME_Node) {
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
          rowCount: 0,
        },
      ]);
    } else {
      return makeError('can not find name: ' + text);
    }
  },
});
