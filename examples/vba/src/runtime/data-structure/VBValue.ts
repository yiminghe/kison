import type { VBClass } from './VBClass';
import type { VBArray } from './VBArray';
import { Ast_ExitStmt_Node } from '../../parser';

export class VBByte {
  readonly type = 'byte';
  constructor(public readonly value: number = 0) {}
}

export class VBDouble {
  readonly type = 'double';
  constructor(public readonly value: number = 0) {}
}

export class VBSingle {
  readonly type = 'single';
  constructor(public readonly value: number = 0) {}
}

export class VBInteger {
  readonly type = 'integer';
  readonly value: number = 0;
  constructor(value: number = 0) {
    this.value = value | 0;
  }
}

export class VBLongLong {
  readonly type = 'longlong';
  constructor(public readonly value: number = 0) {}
}

export const VBLongPtr = VBLongLong;

export class VBLong {
  readonly type = 'long';
  constructor(public readonly value: number = 0) {}
}

export class VBCurrency {
  readonly type = 'currency';
  constructor(public readonly value: number = 0) {}
}

export class VBDate {
  readonly type = 'date';
  constructor(public readonly value: number = 0) {}
}

export class VBDecimal {
  readonly type = 'decimal';
  constructor(public readonly value: number = 0) {}
}

export class VBString {
  readonly type = 'string';
  constructor(public readonly value: string = '') {}
}

export class VBNull {
  readonly type = 'null';
  readonly value = null;
}

export class VBEmpty {
  readonly type = 'Empty';
  readonly value = undefined;
}

export class VBBoolean {
  readonly type = 'boolean';
  constructor(public readonly value: boolean = false) {}
}

export interface Subscript {
  lower?: number;
  upper: number;
}

export class VBNothing {
  readonly type = 'Nothing';
  readonly value: undefined;
}

export class VBMissingArgument {
  readonly type = 'MissingArgument';
  readonly value: undefined;
}

export type VBBasicType =
  | VBByte
  | VBCurrency
  | VBDate
  | VBDecimal
  | VBInteger
  | VBDouble
  | VBLong
  | VBLongLong
  | VBSingle
  | VBNull
  | VBBoolean
  | VBString
  | VBNothing
  | VBMissingArgument
  | VBEmpty;

export const VBBasicTypeClasses = {
  string: VBString,
  single: VBSingle,
  integer: VBInteger,
  boolean: VBBoolean,
  byte: VBByte,
  currency: VBCurrency,
  date: VBDate,
  decimal: VBDecimal,
  double: VBDouble,
  long: VBLong,
  longLong: VBLongLong,
  variant: VBEmpty,
};

Object.keys(VBBasicTypeClasses).forEach((k) => {
  (VBBasicTypeClasses as any)[k.toLowerCase()] = (VBBasicTypeClasses as any)[k];
});

export type VBBasicTypeKey = keyof typeof VBBasicTypeClasses;

export type VBValue = VBBasicType | VBArray | VBClass;

export const VB_NULL = new VBNull();
export const VB_NOTHING = new VBNothing();
export const VB_EMPTY = new VBEmpty();
export const VB_MISSING_ARGUMENT = new VBMissingArgument();
export const VB_TRUE = new VBBoolean(true);
export const VB_FALSE = new VBBoolean(false);

export interface AsTypeClauseInfo {
  type?: VBBasicTypeKey | undefined;
  isArray?: boolean | undefined;
  isNew?: boolean;
  classType?: string[];
  className?: string;
}

export const getDEFAULT_AS_TYPE: () => AsTypeClauseInfo = () => ({
  type: 'variant',
});

export type ExitToken = {
  type: 'Exit';
  subType: Ast_ExitStmt_Node['children'][0]['token'];
};

export const VB_EXIT_SUB: ExitToken = {
  type: 'Exit',
  subType: 'EXIT_SUB',
};
export const VB_EXIT_FOR: ExitToken = {
  type: 'Exit',
  subType: 'EXIT_FOR',
};
export const VB_EXIT_FUNCTION: ExitToken = {
  type: 'Exit',
  subType: 'EXIT_FUNCTION',
};
export const VB_EXIT_PROPERTY: ExitToken = {
  type: 'Exit',
  subType: 'EXIT_PROPERTY',
};
export const VB_EXIT_DO: ExitToken = {
  type: 'Exit',
  subType: 'EXIT_DO',
};
export const VB_EXIT_END: ExitToken = {
  type: 'Exit',
  subType: 'END',
};

export type PromiseOrNot<T> = T | Promise<T>;

export type PromiseOrNotFn<T> = () => PromiseOrNot<T>;

export function getExitToken(node: Ast_ExitStmt_Node) {
  const c = node.children[0];
  if (c.token === 'END') {
    return VB_EXIT_END;
  }
  if (c.token === 'EXIT_FUNCTION') {
    return VB_EXIT_FUNCTION;
  }
  if (c.token === 'EXIT_SUB') {
    return VB_EXIT_SUB;
  }
  if (c.token === 'EXIT_PROPERTY') {
    return VB_EXIT_PROPERTY;
  }
  if (c.token === 'EXIT_FOR') {
    return VB_EXIT_FOR;
  }
  if (c.token === 'EXIT_DO') {
    return VB_EXIT_DO;
  }
  throw new Error('unexpected exit!');
}
