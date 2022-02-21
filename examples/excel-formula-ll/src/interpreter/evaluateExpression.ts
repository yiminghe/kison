import {
  DIV_ERROR,
  makeArray,
  makeError,
  makeReference,
  NA_ERROR,
  VALUE_ERROR,
} from '../functions/utils';

import type {
  AstSymbolNode,
  Ast_BinaryExp_Node,
  Ast_ClipExp_Node,
  Ast_PercentageExp_Node,
  Ast_PrefixExp_Node,
} from '../parser';

import { evaluate, registerEvaluators } from './evaluators';
import type {
  Array_Element_Type,
  All_Type,
  Array_Type,
  Atom_Value_Type,
  Atom_Type,
  Context,
  Error_Type,
  Number_Type,
  Primary_Type,
  Ref_Type,
} from './types';
import {
  assertType,
  checkError,
  checkNumber,
  isSingleValueArray,
  mapArray,
} from './utils';

function opOneAndMany(
  n: Atom_Value_Type,
  a: Array_Type,
  { fn, check }: BinaryDef,
): All_Type {
  let ret: Array_Type['value'] = [];
  const { value } = a;
  for (let i = 0; i < value.length; i++) {
    const row: Atom_Value_Type[] = value[i];
    if (row) {
      ret[i] = [];
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

function getRowColPos(value: Array_Type['value'], child: All_Type) {
  let startRow = 0;
  let endRow = value.length;
  let startCol = 0;
  let endCol = value[0].length;

  if (child.type === 'reference') {
    startRow = child.value[0].start.row;
    endRow = child.value[0].end?.row ?? startRow + 1;
    startCol = child.value[0].start.col;
    endCol = child.value[0].end?.col ?? startCol + 1;
  }

  return {
    startRow,
    endRow,
    startCol,
    endCol,
  };
}

function fillError(row: Atom_Type[], j: number) {
  row[j] = makeError('unmatch shape', NA_ERROR);
}

function transformToArray(node: AstSymbolNode, context: Context) {
  let left = evaluate(node, context);
  if (left.type === 'reference') {
    if (left.value.length !== 1) {
      return makeError('more than one range!', VALUE_ERROR);
    }
    const value = context.getCellValues(left);
    left = { type: 'array', value };
  }
  if (left.type === 'array' && isSingleValueArray(left.value)) {
    left = left.value[0][0];
  }
  return left;
}

type BinaryDef = {
  fn: (a: Primary_Type, b: Primary_Type) => Atom_Value_Type;
  check?:
    | undefined
    | ((...args: (All_Type | null)[]) => Error_Type | undefined);
};

function evaluateBinaryExp(
  node: Ast_BinaryExp_Node,
  context: Context,
  def: BinaryDef,
): All_Type {
  const { fn } = def;
  let check;
  if ('check' in def) {
    check = def.check;
  }
  const { children } = node;
  let leftRet = evaluate(children[0], context);
  let rightRet = evaluate(children[2], context);
  const leftChild = leftRet;
  const rightChild = rightRet;
  let left: Exclude<All_Type, Ref_Type>;
  let right: Exclude<All_Type, Ref_Type>;

  if (leftRet.type === 'reference') {
    if (leftRet.value.length !== 1) {
      return makeError('more than one range!', VALUE_ERROR);
    }
    const value = context.getCellValues(leftRet);
    left = makeArray(value);
  } else {
    left = leftRet;
  }
  if (rightRet.type === 'reference') {
    if (rightRet.value.length !== 1) {
      return makeError('more than one range!', VALUE_ERROR);
    }
    const value = context.getCellValues(rightRet);
    right = makeArray(value);
  } else {
    right = rightRet;
  }

  if (left.type === 'array' && isSingleValueArray(left.value)) {
    left = left.value[0][0];
  }
  if (right.type === 'array' && isSingleValueArray(right.value)) {
    right = right.value[0][0];
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
    let arr!: Array_Type;
    let no_arr!: Atom_Value_Type;
    if (left.type !== 'array') {
      no_arr = left;
    } else {
      arr = left;
    }
    if (right.type !== 'array') {
      no_arr = right;
    } else {
      arr = right;
    }
    return opOneAndMany(no_arr, arr, { check, fn });
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

  const ret: Array_Type['value'] = [];

  function getLeftValue(row: number, col: number) {
    return leftValue[startLeftRow + row][startLeftCol + col];
  }

  function getRightValue(row: number, col: number) {
    return rightValue[startRightRow + row][startRightCol + col];
  }

  for (let i = 0; i < rowCount; i++) {
    const row: Exclude<Atom_Type, Ref_Type>[] = [];
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

const opFn: Record<string, BinaryDef> = {
  '+': {
    fn(a: Primary_Type, b: Primary_Type) {
      assertType(a, 'number');
      assertType(b, 'number');
      return {
        type: 'number',
        value: a + b,
      };
    },
    check: checkNumber,
  },
  '-': {
    fn(a: Primary_Type, b: Primary_Type) {
      assertType(a, 'number');
      assertType(b, 'number');
      return {
        type: 'number',
        value: a - b,
      };
    },
    check: checkNumber,
  },
  '*': {
    fn(a: Primary_Type, b: Primary_Type) {
      assertType(a, 'number');
      assertType(b, 'number');
      return {
        type: 'number',
        value: a * b,
      };
    },
    check: checkNumber,
  },
  '^': {
    fn(a: Primary_Type, b: Primary_Type) {
      assertType(a, 'number');
      assertType(b, 'number');
      return {
        type: 'number',
        value: a ** b,
      };
    },
    check: checkNumber,
  },
  '/': {
    fn(a: Primary_Type, b: Primary_Type) {
      assertType(a, 'number');
      assertType(b, 'number');
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
    fn(a: Primary_Type, b: Primary_Type) {
      return {
        type: 'boolean',
        value: a === b,
      };
    },
  },
  '>=': {
    fn(a: Primary_Type, b: Primary_Type) {
      return {
        type: 'boolean',
        value: a >= b,
      };
    },
  },
  '<=': {
    fn(a: Primary_Type, b: Primary_Type) {
      return {
        type: 'boolean',
        value: a <= b,
      };
    },
  },
  '>': {
    fn(a: Primary_Type, b: Primary_Type) {
      return {
        type: 'boolean',
        value: a > b,
      };
    },
  },
  '<': {
    fn(a: Primary_Type, b: Primary_Type) {
      return {
        type: 'boolean',
        value: a < b,
      };
    },
  },
  '<>': {
    fn(a: Primary_Type, b: Primary_Type) {
      return {
        type: 'boolean',
        value: a !== b,
      };
    },
  },
  '&': {
    fn(a: Primary_Type, b: Primary_Type) {
      return {
        type: 'string',
        value: a + '' + b,
      };
    },
  },
};

const unaryOp: Record<
  '+' | '-',
  {
    fn: (arg: Atom_Type) => Number_Type | Error_Type;
  }
> = {
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
function evaluatePrefixExp(
  node: Ast_PrefixExp_Node,
  context: Context,
  { fn }: { fn: (arg: Array_Element_Type) => Number_Type | Error_Type },
): All_Type {
  const a = transformToArray(node.children[1], context);

  function one(b: Array_Element_Type) {
    let e = checkError(b);
    if (e) {
      return e;
    }
    return fn(b);
  }

  if (a.type === 'array') {
    return makeArray(mapArray(a.value, one));
  }
  return one(a);
}

registerEvaluators({
  evaluateBinaryExp(node: Ast_BinaryExp_Node, context: Context) {
    const op = node.children[1].token;
    return evaluateBinaryExp(node, context, opFn[op]);
  },
  evaluatePercentageExp(node: Ast_PercentageExp_Node, context: Context) {
    const a = transformToArray(node.children[0], context);

    function one(b: Atom_Type): Number_Type | Error_Type {
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
      return makeArray(mapArray(a.value, one));
    }
    return one(a);
  },
  evaluatePrefixExp(node: Ast_PrefixExp_Node, context: Context) {
    const op = node.children[0].token;
    return evaluatePrefixExp(node, context, unaryOp[op]);
  },
  evaluateClipExp(node: Ast_ClipExp_Node, context: Context) {
    // TODO: implicit intersection
    const a = evaluate(node.children[1], context);
    if (a.type === 'array') {
      return a.value[0]?.[0];
    } else if (a.type === 'reference') {
      const range = a.value[0];
      return makeReference([
        {
          start: range.start,
        },
      ]);
    }
    return a;
  },
});
