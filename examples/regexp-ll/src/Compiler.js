import {
  anchorMatchers,
  backreferenceMatcher,
  anyCharMatcher,
  stringMatcher,
  charGroupMatcher,
} from './matchers.js';
import { concatUnits, upperCaseFirstChar } from './utils.js';
import { StateUnit } from './state.js';

export default class Compiler {
  constructor(options) {
    this.options = options || {};
    this.captureGroups = [];
  }

  compile(node) {
    const m = `compile${node.symbol || upperCaseFirstChar(node.token)}`;
    if (this[m]) {
      return this[m](node);
    };
    throw new Error('no compile procedure for ' + m);
  }

  compileRegexp(node) {
    const { children = [] } = node;
    let units = [];
    if (children[0]) {
      let expression = children[0];
      if (children[0].text === '^') {
        const unit = new StateUnit('^');
        unit.start.pushTransition(unit.end, anchorMatchers['^']);
        expression = children[1];
        units.push(unit);
      }
      const expressionUnit = this.compile(expression);
      units.push(expressionUnit);
      return concatUnits('RegExp', units);
    }
  }

  compileExpression(node) {
    const subUnits = node.children.filter(s => s.text !== '|').map(this.compile, this);
    if (subUnits.length === 1) {
      return subUnits[0];
    }
    const unit = new StateUnit('|');
    for (const u of subUnits) {
      unit.start.pushTransition(u.start);
      u.end.pushTransition(unit.end);
    }
    return unit;
  }

  compileSubExpression(node) {
    return concatUnits('SubExpression', node.children.map(this.compile, this));
  }

  compileExpressionItem(node) {
    return this.compile(node.children[0]);
  }

  compileBackrefernce(node) {
    const index = parseInt(node.text.slice(1));
    const unit = new StateUnit('Backreference' + index);
    unit.start.pushTransition(unit.end, backreferenceMatcher(index));
  }

  _compileQuantifier(unit, quantifier) {
    const lazy = quantifier.children[1]?.text === '?';
    const typeNodes = quantifier.children[0].children;
    const type = typeNodes[0].text;
    switch (type) {
      case '*':
        return this._zeroOrMore(unit, lazy);
      case '+':
        return this._oneOrMore(unit, lazy);
      case '?':
        return this._zeroOrOne(unit, lazy);
      case '{':
        return this._range(unit, typeNodes, lazy);
    }
    throw new Error('unsupported quantifier for ' + type);
  }

  _range(unit, range, lazy) { }

  _zeroOrOne(unit, lazy) {
    const qUnit = new StateUnit('?');
    qUnit.start.pushTransition(unit.start);
    qUnit.start.pushTransition(qUnit.end);
    unit.end.pushTransition(qUnit.end);
    if (lazy) {
      qUnit.end.transitions.reverse();
    }
    return qUnit;
  }

  _oneOrMore(unit, lazy) {
    const qUnit = new StateUnit('+');
    qUnit.start.pushTransition(unit.start);
    unit.end.pushTransition(unit.start);
    unit.end.pushTransition(qUnit.end);
    if (lazy) {
      unit.end.transitions.reverse();
    }
    return qUnit;
  }

  _zeroOrMore(unit, lazy) {
    const qUnit = new StateUnit('*');
    qUnit.start.pushTransition(unit.start);
    unit.start.pushTransition(qUnit.end);
    unit.end.pushTransition(unit.start);
    if (lazy) {
      unit.transitions.reverse();
    }
    return qUnit;
  }

  compileGroup(node) {
    let capture = true;
    const exp = node.children[1];
    if (exp.text === '?:') {
      capture = false;
      exp = node.children[2];
    }
    let groupIndex = this.captureGroups.length;
    if (capture) {
      this.captureGroups.push(0);
    }
    const expUnit = this.compile(exp);
    if (capture) {
      this.captureGroups[groupIndex] = {
        start: expUnit.start,
        end: expUnit.end,
      };
    }
    const lastChild = node.children[node.children.length - 1];
    if (lastChild.symbol === 'Quantifier') {
      return this._compileQuantifier(expUnit, lastChild);
    }
    return expUnit;
  }

  compileMatch(node) {
    const itemUnit = this.compile(node.children[0]);
    const lastChild = node.children[node.children.length - 1];
    if (lastChild.symbol === 'Quantifier') {
      return this._compileQuantifier(itemUnit, lastChild);
    }
    return itemUnit;
  }

  compileMatchItem(node) {
    return this.compile(node.children[0]);
  }

  compileMatchCharacterClass(node) {

  }

  compileCharacterGroup(node) {
    let invert = false;
    const itemsNode = node.children[1];
    if (itemNode.text === '^') {
      invert = true;
      itemsNode = node.children[2];
    }
    const items = itemsNode.children;
    const unit = new StateUnit('CharacterGroup');
    unit.start.pushTransition(unit.end, charGroupMatcher(items, invert));
  }

  'compile.'(node) {
    const unit = new StateUnit('.');
    unit.start.pushTransition(unit.end, anyCharMatcher(this.options.includeNewLine));
    return unit;
  }

  compileChar(node) {
    const char = node.text;
    const unit = new StateUnit('Char');
    unit.start.pushTransition(unit.end, stringMatcher(char, this.options.caseInsensitive));
    return unit;
  }

  compileAnchor(node) {
    const token = node.children[0].token;
    return anchorMatchers[token];
  }
}
