// @ts-check
import {
  DIV_ERROR,
  makeError,
  NA_ERROR,
  VALUE_ERROR
} from "../functions/utils.js";
import { evaluators, evaluate } from "./evaluators.js";
import { checkError, checkNumber, isSingleValueArray } from "./utils.js";

function opOneAndMany(left, right, fn) {
  let n = left.type === "number" ? left : right;
  let a = left.type === "array" ? left : right;
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
          const e = checkNumber(n, d);
          if (e) {
            return e;
          }
          ret[i][j] = fn(n.value, d.value);
        }
      }
    }
  }
  return {
    type: "array",
    value: ret
  };
}

function getRowColPos(value, child) {
  let startRow = 0;
  let endRow = value.length;
  let startCol = 0;
  let endCol = value[0].length;

  if (child.type === "reference") {
    startRow = child.ranges[0].row;
    endRow = startRow + child.ranges[0].rowCount + 1;
    startCol = child.ranges[0].col;
    endCol = startCol + child.ranges[0].colCount + 1;
  }

  return {
    startRow,
    endRow,
    startCol,
    endCol
  };
}

function fillError(row, j) {
  row[j] = makeError("unmatch shape", NA_ERROR);
}

function evaluateExp(node, context, fn) {
  const { children } = node;
  let left = evaluate(children[0]);
  let right = evaluate(children[2]);
  const leftChild = left;
  const rightChild = right;
  if (left.type === "reference") {
    if (left.ranges.length !== 1) {
      return makeError("more than one range!", VALUE_ERROR);
    }
    const value = context.getCellValues(left);
    left = { type: "array", value };
  }
  if (right.type === "reference") {
    if (right.ranges.length !== 1) {
      return makeError("more than one range!", VALUE_ERROR);
    }
    const value = context.getCellValues(right);
    right = { type: "array", value };
  }
  if (left.type === "array" && isSingleValueArray(left.value)) {
    left = left.value;
  }
  if (right.type === "array" && isSingleValueArray(right.value)) {
    right = right.value;
  }

  let e = checkError(left, right);
  if (e) {
    return e;
  }

  e = checkNumber(left, right);
  if (e) {
    return e;
  }

  if (left.type === "number" && right.type === "number") {
    return fn(left.value, right.value);
  }

  if (left.type === "number" || right.type === "number") {
    return opOneAndMany(left, right, fn);
  }

  const leftValue = left.value;
  const rightValue = right.value;

  let {
    startRow: startLeftRow,
    endRow: endLeftRow,
    startCol: startLeftCol,
    endCol: endLeftCol
  } = getRowColPos(leftValue, leftChild);
  let {
    startRow: startRightRow,
    endRow: endRightRow,
    startCol: startRightCol,
    endCol: endRightCol
  } = getRowColPos(rightValue, rightChild);

  let rightRowCount = endRightRow - startRightRow;
  let leftRowCount = endLeftRow - startLeftRow;

  let rightColCount = endRightCol - startRightCol;
  let leftColCount = endLeftCol - startLeftCol;

  let rowCount = Math.max(rightRowCount, leftRowCount);
  let colCount = Math.max(rightColCount, leftColCount);

  const ret = [];

  function getLeftValue(row, col) {
    return leftValue[startLeftRow + row][startLeftCol + col]?.value || 0;
  }

  function getRightValue(row, col) {
    return rightValue[startRightRow + row][startRightCol + col]?.value || 0;
  }

  for (let i = 0; i < rowCount; i++) {
    const row = [];
    ret[i] = row;
    for (let j = 0; j < colCount; j++) {
      let li = i;
      let lj = j;
      if (rightColCount === 1) {
        if (leftRowCount === 1) {
          li = 0;
        } else if (i >= leftRowCount) {
          fillError(row, j);
          continue;
        }
        row[j] = fn(getLeftValue(li, lj), getRightValue(i, 0));
      } else if (leftColCount === 1) {
        if (rightRowCount === 1) {
          li = 0;
        } else if (i >= rightRowCount) {
          fillError(row, j);
          continue;
        }
        row[j] = fn(getLeftValue(i, 0), getRightValue(li, lj));
      } else if (leftRowCount === 1) {
        if (lj >= rightColCount || lj >= leftColCount) {
          fillError(row, j);
        } else {
          row[j] = fn(getLeftValue(0, lj), getRightValue(li, lj));
        }
      } else if (rightRowCount === 1) {
        if (lj >= rightColCount || lj >= leftColCount) {
          fillError(row, j);
        } else {
          row[j] = fn(getLeftValue(li, lj), getRightValue(0, lj));
        }
      } else if (
        li >= rightRowCount ||
        li >= leftRowCount ||
        lj >= rightColCount ||
        lj >= leftColCount
      ) {
        fillError(row, j);
      } else {
        row[j] = fn(getLeftValue(i, 0), getRightValue(li, lj));
      }
    }
  }

  return {
    type: "array",
    value: ret
  };
}

const opFn = {
  "+"(a, b) {
    return {
      type: "number",
      value: a + b
    };
  },
  "-"(a, b) {
    return {
      type: "number",
      value: a - b
    };
  },
  "*"(a, b) {
    return {
      type: "number",
      value: a * b
    };
  },
  "/"(a, b) {
    if (b === 0) {
      return makeError("divide by 0", DIV_ERROR);
    }
    return {
      type: "number",
      value: a / b
    };
  }
};

function evaluate_exp(node, context) {
  return evaluateExp(node, context, opFn[node.children[1].text]);
}

Object.assign(evaluators, {
  evaluate_addExp: evaluate_exp,
  evaluate_mulExp: evaluate_exp
});
