// @ts-check
import {
  DIV_ERROR,
  makeError,
  NA_ERROR,
  VALUE_ERROR,
} from '../functions/utils.js';
import { evaluators, evaluate } from './evaluators.js';
import {
  checkError,
  checkNumber,
  isSingleValueArray,
  mapArray,
} from './utils.js';

function opOneAndMany(left, right, { fn, check }) {
  let n = left.type === 'number' ? left : right;
  let a = left.type === 'array' ? left : right;
  n = n.value;
  a = a.value;
  let ret = a.concat();
  for (let i = 0; i < a.length; i++) {
    const row = a[i];
    if (row) {
      ret[i] = ret[i].concat();
      for (let j = 0; j < row.length; j++) {
        const d = row[j];
        if (d) {
          const e = check && check(n, d);
          if (e) {
            return e;
          }
          ret[i][j] = fn(n.value, d.value);
        }
      }
    }
  }
  return {
    type: 'array',
    value: ret,
  };
}

function getRowColPos(value, child) {
  let startRow = 0;
  let endRow = value.length;
  let startCol = 0;
  let endCol = value[0].length;

  if (child.type === 'reference') {
    startRow = child.ranges[0].row;
    endRow = startRow + child.ranges[0].rowCount + 1;
    startCol = child.ranges[0].col;
    endCol = startCol + child.ranges[0].colCount + 1;
  }

  return {
    startRow,
    endRow,
    startCol,
    endCol,
  };
}

function fillError(row, j) {
  row[j] = makeError('unmatch shape', NA_ERROR);
}

function transformToArray(node, context) {
  let left = evaluate(node);
  if (left.type === 'reference') {
    if (left.ranges.length !== 1) {
      return makeError('more than one range!', VALUE_ERROR);
    }
    const value = context.getCellValues(left);
    left = { type: 'array', value };
  }
  if (left.type === 'array' && isSingleValueArray(left.value)) {
    left = left.value;
  }
  return left;
}

function evaluateBinaryExp(node, context, { fn, check }) {
  const { children } = node;
  let left = evaluate(children[0]);
  let right = evaluate(children[2]);
  const leftChild = left;
  const rightChild = right;
  if (left.type === 'reference') {
    if (left.ranges.length !== 1) {
      return makeError('more than one range!', VALUE_ERROR);
    }
    const value = context.getCellValues(left);
    left = { type: 'array', value };
  }
  if (right.type === 'reference') {
    if (right.ranges.length !== 1) {
      return makeError('more than one range!', VALUE_ERROR);
    }
    const value = context.getCellValues(right);
    right = { type: 'array', value };
  }
  if (left.type === 'array' && isSingleValueArray(left.value)) {
    left = left.value;
  }
  if (right.type === 'array' && isSingleValueArray(right.value)) {
    right = right.value;
  }

  let e = checkError(left, right);
  if (e) {
    return e;
  }

  e = check && check(left, right);
  if (e) {
    return e;
  }

  if (left.type !== 'array' && right.type !== 'array') {
    return fn(left.value, right.value);
  }

  if (left.type !== 'array' || right.type !== 'array') {
    return opOneAndMany(left, right, { check, fn });
  }

  const leftValue = left.value;
  const rightValue = right.value;

  let {
    startRow: startLeftRow,
    endRow: endLeftRow,
    startCol: startLeftCol,
    endCol: endLeftCol,
  } = getRowColPos(leftValue, leftChild);
  let {
    startRow: startRightRow,
    endRow: endRightRow,
    startCol: startRightCol,
    endCol: endRightCol,
  } = getRowColPos(rightValue, rightChild);

  let rightRowCount = endRightRow - startRightRow;
  let leftRowCount = endLeftRow - startLeftRow;

  let rightColCount = endRightCol - startRightCol;
  let leftColCount = endLeftCol - startLeftCol;

  let rowCount = Math.max(rightRowCount, leftRowCount);
  let colCount = Math.max(rightColCount, leftColCount);

  const ret = [];

  function getLeftValue(row, col) {
    return leftValue[startLeftRow + row][startLeftCol + col];
  }

  function getRightValue(row, col) {
    return rightValue[startRightRow + row][startRightCol + col];
  }

  for (let i = 0; i < rowCount; i++) {
    const row = [];
    ret[i] = row;
    for (let j = 0; j < colCount; j++) {
      let li = i;
      let lj = j;
      let lv = null,
        rv = null;
      if (rightColCount === 1) {
        if (leftRowCount === 1) {
          li = 0;
        } else if (i >= leftRowCount) {
          fillError(row, j);
          continue;
        }
        lv = getLeftValue(li, lj);
        rv = getRightValue(i, 0);
      } else if (leftColCount === 1) {
        if (rightRowCount === 1) {
          li = 0;
        } else if (i >= rightRowCount) {
          fillError(row, j);
          continue;
        }
        lv = getLeftValue(i, 0);
        rv = getRightValue(li, lj);
      } else if (leftRowCount === 1) {
        if (lj >= rightColCount || lj >= leftColCount) {
          fillError(row, j);
        } else {
          lv = getLeftValue(0, lj);
          rv = getRightValue(li, lj);
        }
      } else if (rightRowCount === 1) {
        if (lj >= rightColCount || lj >= leftColCount) {
          fillError(row, j);
        } else {
          lv = getLeftValue(li, lj);
          rv = getRightValue(0, lj);
        }
      } else if (
        li >= rightRowCount ||
        li >= leftRowCount ||
        lj >= rightColCount ||
        lj >= leftColCount
      ) {
        fillError(row, j);
      } else {
        lv = getLeftValue(i, 0);
        rv = getRightValue(li, lj);
      }
      if (lv !== null || rv !== null) {
        const r = check && check(lv, rv);
        if (r) {
          row[j] = r;
        } else {
          row[j] = fn(lv?.value || 0, rv?.value || 0);
        }
      }
    }
  }

  return {
    type: 'array',
    value: ret,
  };
}

const opFn = {
  '+': {
    fn(a, b) {
      return {
        type: 'number',
        value: a + b,
      };
    },
    check: checkNumber,
  },
  '-': {
    fn(a, b) {
      return {
        type: 'number',
        value: a - b,
      };
    },
    check: checkNumber,
  },
  '*': {
    fn(a, b) {
      return {
        type: 'number',
        value: a * b,
      };
    },
    check: checkNumber,
  },
  '^': {
    fn(a, b) {
      return {
        type: 'number',
        value: a ** b,
      };
    },
    check: checkNumber,
  },
  '/': {
    fn(a, b) {
      if (b === 0) {
        return makeError('divide by 0', DIV_ERROR);
      }
      return {
        type: 'number',
        value: a / b,
      };
    },
    check: checkNumber,
  },
  '=': {
    fn(a, b) {
      return {
        type: 'boolean',
        value: a === b,
      };
    },
  },
  '>=': {
    fn(a, b) {
      return {
        type: 'boolean',
        value: a >= b,
      };
    },
  },
  '<=': {
    fn(a, b) {
      return {
        type: 'boolean',
        value: a <= b,
      };
    },
  },
  '>': {
    fn(a, b) {
      return {
        type: 'boolean',
        value: a > b,
      };
    },
  },
  '<': {
    fn(a, b) {
      return {
        type: 'boolean',
        value: a < b,
      };
    },
  },
  '<>': {
    fn(a, b) {
      return {
        type: 'boolean',
        value: a !== b,
      };
    },
  },
  '&': {
    fn(a, b) {
      return {
        type: 'string',
        value: a + '' + b,
      };
    },
  },
};

function evaluate_binary_exp(node, context) {
  return evaluateBinaryExp(node, context, opFn[node.children[1].text]);
}

const unaryOp = {
  '-': {
    fn(a) {
      const value = Number(a.value);
      if (isNaN(value)) {
        return makeError('no number', VALUE_ERROR);
      }
      return {
        type: 'number',
        value: -value,
      };
    },
  },
  '+': {
    fn(a) {
      const value = Number(a.value);
      if (isNaN(value)) {
        return makeError('no number', VALUE_ERROR);
      }
      return {
        type: 'number',
        value,
      };
    },
  },
};
function evaluateUnaryExp(node, context, { check, fn }) {
  const a = transformToArray(node.children[1], context);

  function one(b) {
    let e = checkError(b) || (check && check(b));
    if (e) {
      return e;
    }
    return fn(b);
  }

  if (a.type === 'array') {
    return mapArray(a.value, one);
  }
  return one(a);
}

Object.assign(evaluators, {
  ['evaluate_binary-exp']: evaluate_binary_exp,
  ['evaluate_percentage-exp'](node, context) {
    const a = transformToArray(node.children[0], context);

    function one(b) {
      let e = checkError(b);
      if (e) {
        return e;
      }
      const v = Number(b.value);
      if (isNaN(v)) {
        return makeError('not number', '#VALUE!');
      }
      return {
        type: 'number',
        value: v / 100,
      };
    }

    if (a.type === 'array') {
      return mapArray(a.value, one);
    }
    return one(a);
  },
  ['evaluate_prefix-exp'](node, context) {
    return evaluateUnaryExp(node, context, unaryOp[node.children[0].text]);
  },
  ['evaluate_clip-exp'](node, context) {
    // TODO: implicit intersection
    const a = evaluate(node.children[1]);
    if (a.type === 'array') {
      return a.value[0]?.[0];
    } else if (a.type === 'reference') {
      const range = a.ranges[0];
      return {
        type: a.type,
        ranges: [
          {
            ...range,
            rowCount: 1,
            colCount: 1,
          },
        ],
      };
    }
    return a;
  },
});
