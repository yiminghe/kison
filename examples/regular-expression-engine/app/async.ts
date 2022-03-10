// import { compile } from "regular-expression-engine";
import { compile } from '../src/index';

const asyncPattern = document.getElementById(
  'asyncPattern',
) as HTMLInputElement;
const startAsync = document.getElementById('startAsync')!;
const stopAsync = document.getElementById('stopAsync')!;

asyncPattern.value = `a{2}b`;

let promise: { resolve: Function } | null;

let buffer: string[];

function onKeyDown(e: KeyboardEvent) {
  const key = e.key;
  if (key.length == 1) {
    buffer.push(key);
    console.log('buffer', buffer);
    if (promise) {
      const { resolve } = promise;
      promise = null;
      resolve();
    }
  }
}

function stopListen() {
  document.removeEventListener('keyup', onKeyDown);
  buffer = [];
  promise = null;
}

stopAsync.addEventListener('click', stopListen);

startAsync.addEventListener('click', async () => {
  stopListen();
  document.addEventListener('keyup', onKeyDown);
  const patternInstance = compile(asyncPattern.value, { async: true });
  const matcher = patternInstance.matcherAsync(() => {
    return new Promise((resolve) => {
      function r() {
        if (buffer && buffer.length) {
          resolve([buffer.shift()!]);
        }
      }
      if (buffer.length) {
        r();
      } else {
        promise = {
          resolve: r,
        };
      }
    });
  });

  while (true) {
    const ret = await matcher.match();
    const msg = 'catch async match: ' + ret.match;
    console.log(msg);
    alert(msg);
  }
});
