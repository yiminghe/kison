const regexp = require("../pkg");

{
  const patternInstance = regexp.compile("(a|b)*z");
  const matcher = patternInstance.matcher("abzaaz");
  let m;
  while ((m = matcher.match())) {
    console.log(m);
  }
}

console.log('******************');

(async function () {
  const buffer = ["c", "a", "b", "x", "a", "a", "b"];
  const patternInstance = regexp.compile("a+b", { async: true });
  const matcher = patternInstance.matcherAsync(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (buffer.length) resolve(buffer.shift());
      }, 100);
    });
  });
  let ret = await matcher.match();
  console.log(ret);
  ret = await matcher.match();
  console.log(ret);
})();
