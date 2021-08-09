import {
  anchorMatchers,
  backreferenceMatcher,
  anyCharMatcher,
  stringMatcher,
  charGroupMatcher,
  characterClassMatcher,
  assertionMatcher
} from "./matchers.js";
import {
  concatUnits,
  upperCaseFirstChar,
  annotateGroupIndex,
  wrapUnit
} from "./utils.js";
import { StateUnit } from "./state.js";
import parser from "./parser.js";

export default class Compiler {
  constructor(options) {
    this.options = options;
    this.captureGroupStateStartMap = new Map();
    this.captureGroupStateEndMap = new Map();
    this.inverted = false;
  }

  initWithPattern(pattern) {
    let parserOptions = {};
    if (this.options.unicode) {
      parserOptions.lexerOptions = { unicode: true };
    }
    const { ast } = parser.parse(pattern, parserOptions);
    annotateGroupIndex(ast);
    this.unit = this.compile(ast);
    this.startState = this.unit.start;
    return this;
  }

  setInverted(inverted) {
    this.inverted = inverted;
  }

  compile(node) {
    const m = `compile${node.symbol || upperCaseFirstChar(node.token)}`;
    if (this[m]) {
      return this[m](node);
    }
    throw new Error("no compile procedure for " + m);
  }

  compileRegexp(node) {
    const { children = [] } = node;
    let units = [];
    if (children[0]) {
      let expression = children[0];
      if (children[0].text === "^") {
        const unit = new StateUnit("^");
        unit.start.pushTransition(unit.end, anchorMatchers["^"]);
        expression = children[1];
        units.push(unit);
      }
      const expressionUnit = this.compile(expression);
      units.push(expressionUnit);
      return concatUnits("RegExp", units);
    }
  }

  compileExpression(node) {
    const subUnits = node.children
      .filter(s => s.text !== "|")
      .map(this.compile, this);
    if (subUnits.length === 1) {
      return subUnits[0];
    }
    const unit = new StateUnit("|");
    if (this.inverted) {
      subUnits.reverse();
    }
    for (const u of subUnits) {
      unit.start.pushTransition(u.start);
      u.end.pushTransition(unit.end);
    }
    return unit;
  }

  compileSubExpression(node) {
    const subUnits = node.children.map(this.compile, this);
    if (this.inverted) {
      subUnits.reverse();
    }
    return concatUnits("SubExpression", subUnits);
  }

  compileExpressionItem(node) {
    return this.compile(node.children[0]);
  }

  compileBackreference(node) {
    let index;
    let named;
    const name = node.text.slice(1);
    if (name.lastIndexOf("k<", 0) === 0) {
      named = true;
      index = name.slice(2, -1);
    } else {
      index = parseInt(node.text.slice(1));
    }
    const unit = new StateUnit("Backreference_" + index);
    unit.start.pushTransition(unit.end, backreferenceMatcher(index, named));
    return unit;
  }

  _compileQuantifier(getUnit, quantifier) {
    const lazy = quantifier.children[1]?.text === "?";
    const typeNodes = quantifier.children[0].children;
    const type = typeNodes[0].text;
    switch (type) {
      case "*":
        return this._zeroOrMore(getUnit, lazy);
      case "+":
        return this._oneOrMore(getUnit, lazy);
      case "?":
        return this._zeroOrOne(getUnit, lazy);
      case "{":
        return this._range(getUnit, typeNodes, lazy);
    }
    throw new Error("unsupported quantifier for " + type);
  }

  _range(getUnit, range, lazy) {
    const lower = parseInt(range[1].text);
    const upper = parseInt(range[3]?.text);
    const hasMore = range.length > 3;
    let units = [];
    for (let i = 0; i < lower; i++) {
      units.push(getUnit());
    }
    if (upper) {
      // `(x(x(x)?)?)?`
      let nest;
      if (upper > lower) {
        for (let i = lower; i < upper; i++) {
          nest = nest ? concatUnits("nest", [getUnit(), nest]) : getUnit();
          nest = this._zeroOrOne(() => nest, lazy);
        }
      }
      if (nest) {
        units.push(nest);
      }
    } else if (hasMore) {
      units.push(this._zeroOrMore(getUnit, lazy));
    }
    return concatUnits("range", units);
  }

  _zeroOrOne(getUnit, lazy) {
    const unit = getUnit();
    const qUnit = new StateUnit("?");
    qUnit.start.pushTransition(unit.start);
    qUnit.start.pushTransition(qUnit.end);
    unit.end.pushTransition(qUnit.end);
    if (lazy) {
      qUnit.start.transitions.reverse();
    }
    return qUnit;
  }

  _oneOrMore(getUnit, lazy) {
    const unit = getUnit();
    const qUnit = new StateUnit("+");
    qUnit.start.pushTransition(unit.start);
    unit.end.pushTransition(unit.start);
    unit.end.pushTransition(qUnit.end);
    if (lazy) {
      unit.end.transitions.reverse();
    }
    return qUnit;
  }

  _zeroOrMore(getUnit, lazy) {
    const unit = getUnit();
    const qUnit = new StateUnit("*");
    qUnit.start.pushTransition(unit.start);
    unit.start.pushTransition(qUnit.end);
    unit.end.pushTransition(unit.start);
    if (lazy) {
      unit.start.transitions.reverse();
    }
    return qUnit;
  }

  groupStartIndex(state) {
    return this.captureGroupStateStartMap.get(state);
  }

  groupEndIndex(state) {
    return this.captureGroupStateEndMap.get(state);
  }

  compileGroup(node) {
    let exp = node.children[1];
    let groupIndex = node.captureGroupIndex;
    let name;
    if (node.children[0].token === "namedGroupPrefix") {
      name = node.children[0].text;
    }
    if (!name && !groupIndex) {
      exp = node.children[2];
    }
    const getUnit = () => {
      let expUnit = this.compile(exp);
      if (groupIndex) {
        expUnit = wrapUnit(expUnit, true);
        this.captureGroupStateStartMap.set(expUnit.start, {
          index: groupIndex,
          name
        });
        this.captureGroupStateEndMap.set(expUnit.end, {
          name,
          index: groupIndex
        });
      }
      return expUnit;
    };

    const lastChild = node.children[node.children.length - 1];
    if (lastChild.symbol === "Quantifier") {
      return this._compileQuantifier(getUnit, lastChild);
    }
    return getUnit();
  }

  compileMatch(node) {
    const getUnit = () => this.compile(node.children[0]);
    const lastChild = node.children[node.children.length - 1];
    if (lastChild.symbol === "Quantifier") {
      return this._compileQuantifier(getUnit, lastChild);
    }
    return getUnit();
  }

  compileMatchItem(node) {
    return this.compile(node.children[0]);
  }

  compileMatchCharacterClass(node) {
    return this.compile(node.children[0]);
  }

  compileCharacterClass(node) {
    const token = node.children[0].token;
    const unit = new StateUnit("CharacterGroup");
    let matcher = characterClassMatcher[token];
    if (!matcher) {
      throw new Error("compileCharacterClass no matcher: " + token.token);
    }
    unit.start.pushTransition(unit.end, matcher);
    return unit;
  }

  compileCharacterGroup(node) {
    let invert = false;
    let itemsNode = node.children[1];
    if (itemsNode.text === "^") {
      invert = true;
      itemsNode = node.children[2];
    }
    const items = itemsNode.children;
    const unit = new StateUnit("CharacterGroup");
    unit.start.pushTransition(unit.end, charGroupMatcher(items, invert));
    return unit;
  }

  compileAnyChar(node) {
    const unit = new StateUnit(".");
    unit.start.pushTransition(unit.end, anyCharMatcher);
    return unit;
  }

  compileChar(node) {
    const char = node.text;
    const unit = new StateUnit("Char");
    unit.start.pushTransition(unit.end, stringMatcher(char));
    return unit;
  }

  compileAnchor(node) {
    const c0 = node.children[0];
    const token = c0.token;
    const unit = new StateUnit(token);
    if (assertionMatcher[token]) {
      const exp = node.children[1];
      unit.start.pushTransition(unit.end, assertionMatcher[token](exp, this));
    } else if (anchorMatchers[token]) {
      unit.start.pushTransition(unit.end, anchorMatchers[token]);
    } else {
      throw new Error("unrecognized anchor token: " + token);
    }
    return unit;
  }
}
