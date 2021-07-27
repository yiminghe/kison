const regexp = require('./pkg').default;

const patternInstance = regexp.compile('(a|b)*z');
const matcher = patternInstance.matcher('abzaaz');
let m;
while (m = matcher.match()) {
  console.log(m);
}
