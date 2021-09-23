// @ts-check
import { StateUnit } from './state.js';

export function isWord(s) {
  const code = s.charCodeAt(0);
  return (
    s === '_' || (s >= 'a' && s <= 'z') || (s >= 'A' && s <= 'Z') || isNumber(s)
  );
}

export function isNumber(s) {
  return s >= '0' && s <= '9';
}

export function concatUnits(type, us) {
  const l = us.length;
  if (l === 1) {
    return us[0];
  }
  for (let i = 0; i < l - 1; i++) {
    const first = us[i];
    const s = us[i + 1];
    first.end.pushTransition(s.start);
  }
  const ret = new StateUnit(type);
  ret.start = us[0].start;
  ret.end = us[l - 1].end;
  return ret;
}

export function wrapUnit(u, group) {
  const ret = new StateUnit(`${u.type}${group ? 'Group' : 'Wrap'}`);
  ret.start.pushTransition(u.start);
  u.end.pushTransition(ret.end);
  return ret;
}

export function upperCaseFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function annotateGroupIndex(ast, index = { count: 0 }) {
  if (ast.symbol === 'Group') {
    if (ast.children[1].text !== '?:') {
      ast.captureGroupIndex = ++index.count;
    }
  }
  if (ast.children) {
    ast.children.forEach((c) => {
      annotateGroupIndex(c, index);
    });
  }
}
