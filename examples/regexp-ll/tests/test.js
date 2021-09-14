const regexp = require("../pkg");

{
  const patternInstance = regexp.compile("(a|b)*z");
  const matcher = patternInstance.matcher("abzaaz");
  let m;
  while ((m = matcher.match())) {
    console.log(m);
  }
}

console.log("******************");

(async function() {
  let buffer = ["c", "a", "b", "x", "a", "a", "b"];
  const patternInstance = regexp.compile("a+b", { async: true });
  const matcher = patternInstance.matcherAsync(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (buffer.length) {
          // or as whole:
          // resolve(buffer);
          // buffer=[];
          resolve([buffer.shift()]);
        }
      }, 100);
    });
  });
  let ret = await matcher.match();
  console.log(ret);
  ret = await matcher.match();
  console.log(ret);
})();
