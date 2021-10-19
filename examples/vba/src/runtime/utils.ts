export function last<T>(stack: T[], n = 1) {
  return stack[stack.length - n];
}
