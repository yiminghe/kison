const regexp = require('../pkg');

{
  const patternInstance = regexp.compile('(a|b)*z');
  const matcher = patternInstance.matcher('abzaaz');
  let m;
  while ((m = matcher.match())) {
    console.log(m);
  }
}

console.log('******************');

(async function () {
  const fakeData = ['x', 'a', 'b', 'c', 'a', 'a', 'b'];
  let index = 0;
  let length = fakeData.length;

  let promise: { resolve: Function } | null;
  let stream: string[] = [];
  // push data to steam
  setInterval(() => {
    stream.push(fakeData[index++ % length]);
    if (promise) {
      const { resolve } = promise;
      promise = null;
      resolve();
    }
  }, 100);

  const patternInstance = regexp.compile('a+b', { async: true });
  const matcher = patternInstance.matcherAsync(() => {
    return new Promise((resolve) => {
      function r() {
        if (stream.length) {
          resolve(stream);
          stream = [];
        }
      }
      if (stream.length) {
        r();
      } else {
        // waiting for data
        promise = {
          resolve: r,
        };
      }
    });
  });

  while (true) {
    const { match } = await matcher.match();
    console.log('match: ', match);
  }
})();

export {};
