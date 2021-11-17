import type { LiteralToken } from '../parser';
import type { IndexType, VBObject, VBValue } from './types';

export function last<T>(stack: T[], n = 1) {
  return stack[stack.length - n];
}

export function warn(msg: string) {
  console.warn(msg);
}

export function isSkipToken(name: LiteralToken) {
  return (
    name === 'NEWLINE' ||
    name === 'COMMENT' ||
    name === 'REMCOMMENT' ||
    name === '$EOF'
  );
}

export function captalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function transformToIndexType(values: (VBObject | VBValue)[]) {
  const ret: IndexType[] = [];
  for (let v_ of values) {
    const v = v_.type === 'Object' ? v_.value : v_;
    if (v.type === 'Integer' || v.type === 'String') {
      ret.push(v.value);
    } else {
      throw new Error('unexpected index access type!');
    }
  }
  return ret;
}
