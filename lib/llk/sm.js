const { bfsMatch } = require('./bfsMatch');
const { parser, lexer, stateMachine } = require('../data');
const { concatUnits } = require('./state');
const { isSymbol } = require('./symbolMap');
const {
  isOptionalSymbol,
  normalizeSymbol,
  isZeroOrMoreSymbol,
} = require('../utils');

function buildRhsSM(s, rhs) {
  function getUnit(rr) {
    const unit = new StateUnit(rr);
    unit.start.pushTransition(unit.end, createMatchSymbolToken(rr));
    return unit;
  }

  const units = [];
  for (const r of rhs) {
    if (typeof r !== 'string') {
      continue;
    }
    let finalUnit;
    if (isOptionalSymbol(r)) {
      const rr = r.slice(0, -1);
      const unit = getUnit(rr);
      finalUnit = new StateUnit('?');
      finalUnit.start.pushTransition(unit.start);
      finalUnit.start.pushTransition(finalUnit.end);
      unit.end.pushTransition(finalUnit.end);
    } else if (isZeroOrMoreSymbol(r)) {
      const rr = r.slice(0, -1);
      const unit = getUnit();
      finalUnit = new StateUnit('*');
      finalUnit.start.pushTransition(unit.start);
      unit.start.pushTransition(finalUnit.end);
      unit.end.pushTransition(unit.start);
    } else {
      finalUnit = getUnit(r);
    }
    units.push(finalUnit);
  }
  return concatUnits(s, units);
}

function buildStateMachine() {
  const productions = parser.productions;
  for (let i = 0; i < productions.length; i++) {
    const p = productions[i];
    const symbol = parser.getProductionSymbol(p);
    const rhs = parser.getProductionRhs(p);
    stateMachine[symbol] = stateMachine[symbol] || {};
    stateMachine[symbol][i] = buildRhsSM(symbol, rhs);
  }
}

function predictProductionIndexLLK(symbol, fn = () => {}) {
  if (isZeroOrMoreSymbol(symbol) || isOptionalSymbol(symbol)) {
    symbol = symbol.slice(0, -1);
  }
  if (!isSymbol(symbol)) {
    return -1;
  }
  const symbolSm = stateMachine[symbol];
  if (!symbolSm) {
    throw new Error('No state machine for symbol: ' + symbol);
  }
  const allSms = Object.keys(symbolSm);
  for (const key of allSms) {
    if (symbolSm[key]) {
      lexer.stash();
      fn();
      const ret = bfsMatch(symbolSm[key].start);
      lexer.stashPop();
      if (ret) {
        return Number(key);
      }
    }
  }
  // reduce
  for (const key of Object.keys(symbolSm)) {
    if (!symbolSm[key]) {
      return Number(key);
    }
  }
  return -1;
}

function findExpectedTokenFromStateMachine(
  state,
  ret = [],
  nullable = {},
  stack = new Set(),
) {
  if (state) {
    if (stack.has(state)) {
      return;
    }
    stack.add(state);
    for (const t of state.transitions) {
      if (t.condition) {
        if (t.condition.token) {
          ret.push(t.condition.token);
        } else if (t.condition.symbol) {
          const { symbol } = t.condition;
          const symbolSm = stateMachine[symbol];
          let anotherNull = {};
          for (const key of Object.keys(symbolSm)) {
            if (symbolSm[key]) {
              findExpectedTokenFromStateMachine(
                symbolSm[key].start,
                ret,
                anotherNull,
                stack,
              );
            } else {
              anotherNull.ok = true;
            }
          }
          if (anotherNull.ok) {
            nullable.ok = true;
            findExpectedTokenFromStateMachine(t.to, ret, {}, stack);
          }
        }
      } else {
        nullable.ok = true;
      }
    }
  }
  return ret;
}

function predictProductionIndexNextLLK(symbol) {
  return predictProductionIndexLLK(symbol, () => lexer.lex());
}

module.exports = {
  findExpectedTokenFromStateMachine,
  predictProductionIndexNextLLK,
  predictProductionIndexLLK,
  buildStateMachine,
  buildRhsSM,
  isZeroOrMoreSymbol,
  normalizeSymbol,
  isOptionalSymbol,
};
