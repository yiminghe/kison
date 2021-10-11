// @ts-check

const data = require('../data');

let { cachedStateMatchMap } = data;

function setStateCacheMatch(state, tokensLength) {
  return
  let holder = cachedStateMatchMap.get(state);
  if (!holder) {
    holder = new Set();
    cachedStateMatchMap.set(state, holder);
  }
  holder.add(tokensLength);
}

function getStateCacheMatch(state, tokensLength) {
  return;
  // consumed token length may be different!
  const holder = cachedStateMatchMap.get(state);
  return holder?.has(tokensLength);
}

function clearStateMatchCache() {
  return
  cachedStateMatchMap = new Map();
}

module.exports = {
  setStateCacheMatch,
  getStateCacheMatch,
  clearStateMatchCache,
};