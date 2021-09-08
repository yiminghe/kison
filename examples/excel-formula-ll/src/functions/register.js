// @ts-check
export const functions = new Map();

export function register(name, def) {
  functions.set(name, def);
}
