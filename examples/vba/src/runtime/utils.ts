import type { LiteralToken } from '../parser';

export function last<T>(stack: T[], n = 1) {
  return stack[stack.length - n];
}

export function warn(msg: string) {
  console.warn(msg);
}

export function isSkipToken(name: LiteralToken) {
  return name === 'NEWLINE' || name === 'COMMENT' || name === 'REMCOMMENT';
}

export function captalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
