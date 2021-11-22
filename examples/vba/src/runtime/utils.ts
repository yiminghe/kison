import type { LiteralToken } from '../parser';
import type { IndexType, VBPointer, VBValue } from './types';

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

export async function transformToIndexType(values: (VBPointer | VBValue)[]) {
  const ret: IndexType[] = [];
  for (let v_ of values) {
    const v = v_.type === 'Pointer' ? await v_.getValue() : v_;
    if (v.type === 'Integer' || v.type === 'String') {
      ret.push(v.value);
    } else {
      throw new Error('unexpected index access type!');
    }
  }
  return ret;
}

// lowercase
const prefix = '$vba_p_';
const propertyGetPrefix = prefix + 'g_';
const propertySetPrefix = prefix + 's_';

export function getPropertyGetSubName(t: string) {
  return propertyGetPrefix + t;
}

export function getPropertySetSubName(t: string) {
  return propertySetPrefix + t;
}

export function isClassProperty(t: string) {
  return t.startsWith(prefix);
}
