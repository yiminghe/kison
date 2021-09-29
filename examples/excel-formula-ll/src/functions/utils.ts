import type {
  Error_Type,
  ERROR_ENUM,
  Atom_Type,
  Ref_Type,
  Range,
  Array_Type,
  Atom_Value_Type,
} from '../evaluator/types';

export function toNumber(a: Atom_Type) {
  const { type, value } = a;
  if (type === 'string') {
    return Number(value);
  }
  if (type === 'boolean') {
    return value === 'true' ? 1 : 0;
  }
  return Number(value);
}

export function makeError(message: string, value?: ERROR_ENUM): Error_Type {
  return {
    type: 'error',
    value: value || '#ERROR!',
    message,
  };
}

export function makeReference(ranges: Range[]): Ref_Type {
  return {
    type: 'reference',
    value: ranges,
  };
}

export function makeArray(value: Atom_Value_Type[][]): Array_Type {
  return {
    type: 'array',
    value,
  };
}

export * from '../common/constants';
