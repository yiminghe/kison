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
