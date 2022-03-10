import { State, StateUnit } from './state';
import { AstSymbolNode } from './parser';

export function isWord(s: string) {
  const code = s.charCodeAt(0);
  return (
    s === '_' || (s >= 'a' && s <= 'z') || (s >= 'A' && s <= 'Z') || isNumber(s)
  );
}

export function isNumber(s: string) {
  return s >= '0' && s <= '9';
}

export function concatUnits(type: string, us: StateUnit[], async: boolean) {
  const l = us.length;
  if (l === 1) {
    return us[0];
  }
  for (let i = 0; i < l - 1; i++) {
    const first = us[i];
    const s = us[i + 1];
    first.end.pushEmptyTranstion(s.start, async);
  }
  const ret = new StateUnit(type);
  ret.start = us[0].start;
  ret.end = us[l - 1].end;
  return ret;
}

export function wrapUnit(u: StateUnit, async: boolean, group?: boolean) {
  const ret = new StateUnit(`${u.type}${group ? 'Group' : 'Wrap'}`);
  ret.start.pushEmptyTranstion(u.start, async);
  u.end.pushEmptyTranstion(ret.end, async);
  return ret;
}

export function upperCaseFirstChar(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function annotateGroupIndex(ast: AstSymbolNode, index = { count: 0 }) {
  if (ast.symbol === 'Group') {
    if (ast.children[1]?.type === 'symbol' || ast.children[1]?.text !== '?:') {
      ast.userData = ast.userData || {
        captureGroupIndex: 0,
      };
      ast.userData.captureGroupIndex = ++index.count;
    }
  }
  if (ast.children) {
    ast.children.forEach((c) => {
      if (c.type === 'symbol') {
        annotateGroupIndex(c, index);
      }
    });
  }
}
