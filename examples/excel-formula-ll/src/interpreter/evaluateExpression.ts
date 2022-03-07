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
  Ast_PrefixExp_Node,
} from '../parser';

import { evaluate, registerEvaluators } from './evaluators';
import type {
  All_Type,
  Array_Type,
  Atom_Value_Type,
  Atom_Type,
  Error_Type,
  Number_Type,
  Raw_Value,
  Ref_Type,
} from '../common/types';
import { Context } from './types';
import {
  assertType,
  checkArrayNumber,
  checkError,
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
          const e = check && check(false, n, d);
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
  let endRow = value.length - 1;
  let startCol = 0;
  let endCol = value[0].length - 1;

  if (child.type === 'reference') {
    startRow = child.value[0].start.row;
    endRow = child.value[0].end.row;
    startCol = child.value[0].start.col;
    endCol = child.value[0].end.col;
  }

  return {
    startRow,
    endRow,
    startCol,
    endCol,
  };
}

function transformToArray(node: AstSymbolNode, context: Context) {
  let left = evaluate(node, context);
  if (left.type === 'reference') {
    if (left.value.length !== 1) {
      return makeError('more than one range!', VALUE_ERROR);
    }
    left = makeArray(
      context.dependencyGraph.getCellArrayFromRange(left.value[0]),
    );
  }
  if (left.type === 'array' && isSingleValueArray(left.value)) {
    left = left.value[0][0];
  }
  return left;
}

type BinaryDef = {
  fn: (a: Raw_Value, b: Raw_Value) => Atom_Value_Type;
  check?:
    | undefined
    | ((
        isArrayFormula: boolean,
        ...args: (All_Type | null)[]
      ) => Error_Type | undefined);
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
  const { dependencyGraph } = context;
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
    left = makeArray(dependencyGraph.getCellArrayFromRange(leftRet.value[0]));
  } else {
    left = leftRet;
  }
  if (rightRet.type === 'reference') {
    if (rightRet.value.length !== 1) {
      return makeError('more than one range!', VALUE_ERROR);
    }
    right = makeArray(dependencyGraph.getCellArrayFromRange(rightRet.value[0]));
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

  e = check && check(false, left, right);
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

  let rightRowCount = endRightRow - startRightRow + 1;
  let leftRowCount = endLeftRow - startLeftRow + 1;

  let rightColCount = endRightCol - startRightCol + 1;
  let leftColCount = endLeftCol - startLeftCol + 1;

  let rowCount = Math.max(rightRowCount, leftRowCount);
  let colCount = Math.max(rightColCount, leftColCount);

  const ret: Atom_Value_Type[][] = [];

  function getValue(values: Atom_Value_Type[][], row: number, col: number) {
    return row >= 0 && col >= 0 ? values[row][col] : null;
  }

  function getPos(p: number, count: number) {
    return count === 1 ? 0 : p >= count ? -1 : p;
  }

  for (let i = 0; i < rowCount; i++) {
    const row: Atom_Value_Type[] = [];
    ret[i] = row;
    for (let j = 0; j < colCount; j++) {
      const lv = getValue(
        leftValue,
        getPos(i, leftRowCount),
        getPos(j, leftColCount),
      );
      const rv = getValue(
        rightValue,
        getPos(i, rightRowCount),
        getPos(j, rightColCount),
      );
      if (lv && rv) {
        const r = check && check(true, lv, rv);
        if (r) {
          row[j] = r;
        } else {
          row[j] = fn(lv?.value, rv?.value);
        }
      } else {
        row[j] = makeError('unmatch shape', NA_ERROR);
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
    fn(a: Raw_Value, b: Raw_Value) {
      a = Number(a ?? 0);
      b = Number(b ?? 0);
      return {
        type: 'number',
        value: a + b,
      };
    },
    check: checkArrayNumber,
  },
  '-': {
    fn(a: Raw_Value, b: Raw_Value) {
      a = Number(a ?? 0);
      b = Number(b ?? 0);
      return {
        type: 'number',
        value: a - b,
      };
    },
    check: checkArrayNumber,
  },
  '*': {
    fn(a: Raw_Value, b: Raw_Value) {
      a = Number(a ?? 0);
      b = Number(b ?? 0);
      return {
        type: 'number',
        value: a * b,
      };
    },
    check: checkArrayNumber,
  },
  '^': {
    fn(a: Raw_Value, b: Raw_Value) {
      a = Number(a ?? 0);
      b = Number(b ?? 0);
      return {
        type: 'number',
        value: a ** b,
      };
    },
    check: checkArrayNumber,
  },
  '/': {
    fn(a: Raw_Value, b: Raw_Value) {
      a = Number(a ?? 0);
      b = Number(b ?? 0);
      if (b === 0) {
        return makeError('divide by 0', DIV_ERROR);
      }
      return {
        type: 'number',
        value: a / b,
      };
    },
    check: checkArrayNumber,
  },
  '=': {
    fn(a: Raw_Value, b: Raw_Value) {
      return {
        type: 'boolean',
        value: a === b,
      };
    },
  },
  '>=': {
    fn(a: Raw_Value, b: Raw_Value) {
      return {
        type: 'boolean',
        value: a! >= b!,
      };
    },
  },
  '<=': {
    fn(a: Raw_Value, b: Raw_Value) {
      return {
        type: 'boolean',
        value: a! <= b!,
      };
    },
  },
  '>': {
    fn(a: Raw_Value, b: Raw_Value) {
      return {
        type: 'boolean',
        value: a! > b!,
      };
    },
  },
  '<': {
    fn(a: Raw_Value, b: Raw_Value) {
      return {
        type: 'boolean',
        value: a! < b!,
      };
    },
  },
  '<>': {
    fn(a: Raw_Value, b: Raw_Value) {
      return {
        type: 'boolean',
        value: a !== b,
      };
    },
  },
  '&': {
    fn(a: Raw_Value, b: Raw_Value) {
      a = a ?? '';
      b = b ?? '';
      return {
        type: 'string',
        value: a + '' + '' + (b + ''),
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
      const value = Number(a.value ?? 0);
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
      const value = Number(a.value ?? 0);
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
  { fn }: { fn: (arg: Atom_Value_Type) => Number_Type | Error_Type },
): All_Type {
  const a = transformToArray(node.children[1], context);

  function one(b: Atom_Value_Type) {
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
  evaluateBinaryExp(node, context) {
    const op = node.children[1].token;
    return evaluateBinaryExp(node, context, opFn[op]);
  },
  evaluatePercentageExp(node, context) {
    const a = transformToArray(node.children[0], context);

    function one(b: Atom_Type): Number_Type | Error_Type {
      let e = checkError(b);
      if (e) {
        return e;
      }
      const v = Number(b.value);
      if (isNaN(v)) {
        return makeError('not number', VALUE_ERROR);
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
  evaluatePrefixExp(node, context) {
    const op = node.children[0].token;
    return evaluatePrefixExp(node, context, unaryOp[op]);
  },
  evaluateClipExp(node, context) {
    // TODO: implicit intersection
    const a = evaluate(node.children[1], context);
    if (a.type === 'array') {
      return a.value[0]?.[0];
    } else if (a.type === 'reference') {
      const range = a.value[0];
      return makeReference([
        {
          start: range.start,
          end: range.start,
        },
      ]);
    }
    return a;
  },
});
