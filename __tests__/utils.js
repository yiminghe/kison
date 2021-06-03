export function prettyJson(o) {
  return JSON.stringify(o, null, 2).replace(/"/g, "'");
}
