import { StateUnit } from "./state.js";

export function isWord(s) {
  const code = s.charCodeAt(0);
  return (
    s === "_" ||
    (s >= "a" && s <= "z") ||
    (s >= "A" && s <= "Z") ||
    (code >= 0x4e00 && code <= 0x9fa5)
  );
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

export function wrapUnit(u) {
  const ret = new StateUnit(type);
  ret.start.pushTransition(u.start);
  u.end.pushTransition(ret.end);
  return ret;
}

export function upperCaseFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
