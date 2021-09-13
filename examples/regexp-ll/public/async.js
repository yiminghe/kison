import { parse, compile } from "../src/index.js";

const asyncPattern = document.getElementById("asyncPattern");
const stream = document.getElementById("stream");
const startAsync = document.getElementById("startAsync");
const stopAsync = document.getElementById("stopAsync");

let started = 0;

let promise;

let buffer;

stream.disabled = true;

stream.addEventListener("keydown", e => {
  const key = e.key;
  if (started && key.length == 1) {
    buffer.push(key);
    console.log("buffer", buffer);
    setTimeout(() => {
      if (promise) {
        promise.resolve();
      }
      stream.value = "";
    }, 100);
  }
});

function stopListen() {
  stream.disabled = true;
  started = 0;
  buffer = [];
}

stopAsync.addEventListener("click", stopListen);

let lastMatcher;

startAsync.addEventListener("click", async () => {
  stopListen();
  stream.disabled = false;
  if (lastMatcher) {
    lastMatcher.stop();
    if (promise) {
      promise.resolve("$");
    }
  }
  started = 1;
  const patternInstance = compile(asyncPattern.value, { async: true });
  const matcher = patternInstance.matcherAsync(() => {
    return new Promise(resolve => {
      if (buffer.length >= 1) {
        const b = buffer[0];
        buffer.shift();
        resolve(b);
      } else {
        promise = {
          resolve(c) {
            promise = null;
            if (c) {
              resolve(c);
            } else {
              const b = buffer[0];
              buffer.shift();
              resolve(b);
            }
          }
        };
      }
    });
  });

  lastMatcher = matcher;

  while (!matcher.stopped) {
    const ret = await matcher.match();
    if (!matcher.stopped) {
      console.log("async match:", ret);
    }
  }
});
