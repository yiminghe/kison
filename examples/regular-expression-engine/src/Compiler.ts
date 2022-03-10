import {
  anchorMatchers,
  backreferenceMatcher,
  anyCharMatcher,
  stringMatcher,
  charGroupMatcher,
  characterClassMatcher,
  assertionMatcher,
} from './matchers';
import {
  asyncAnchorMatchers,
  asyncBackreferenceMatcher,
  asyncAnyCharMatcher,
  asyncStringMatcher,
  asyncCharGroupMatcher,
  asyncCharacterClassMatcher,
  asyncAssertionMatcher,
} from './asyncMatchers';

import {
  concatUnits,
  upperCaseFirstChar,
  annotateGroupIndex,
  wrapUnit,
} from './utils';
import { AsyncCondition, Condition, State, StateUnit } from './state';
import parser from './parser';
import type {
  AstNode,
  AstVisitors,
  Ast_Quantifier_Node,
  ParserOptions,
} from './parser';
import { GroupIndex } from './Input';

export interface CompilerOptions {
  async?: boolean;
  unicode?: boolean;
  caseInsensitive?: boolean;
  sticky?: boolean;
  multiline?: boolean;
  dotMatchesLineSeparators?: boolean;
  bfs?: boolean;
}

type GetUnit = () => StateUnit;

function compile(node: AstNode, compiler: Compiler) {
  return compileVisitors.compile!(node, compiler);
}

const compileVisitors: AstVisitors<'compile', Compiler, StateUnit> = {
  compile(node: AstNode, compiler: Compiler) {
    // @ts-ignore
    const m = `compile${upperCaseFirstChar(node.symbol || node.token)}`;
    // @ts-ignore
    if (compileVisitors[m]) {
      // @ts-ignore
      return compileVisitors[m](node, compiler);
    }
    throw new Error('no compile procedure for ' + m);
  },
  compileRegexp(node, compiler) {
    const { children = [] } = node;
    let units = [];
    let expression: AstNode | undefined = children[0];
    if (!expression) {
      throw new Error('compileRegexp');
    }
    if (expression.type === 'token' && expression.text === '^') {
      const unit = new StateUnit('^');
      if (compiler.options.async) {
        unit.start.pushAsyncTransition(unit.end, asyncAnchorMatchers['^']);
      } else {
        unit.start.pushTransition(unit.end, anchorMatchers['^']);
      }
      expression = children[1];
      units.push(unit);
    }
    if (!expression) {
      throw new Error('compileRegexp');
    }
    const expressionUnit = compile(expression, compiler);
    units.push(expressionUnit);
    return concatUnits('RegExp', units, compiler.async);
  },

  compileExpression(node, compiler) {
    const subUnits = node.children
      .filter((s) => s.type === 'symbol' || s.text !== '|')
      .map((n) => compile(n, compiler));
    if (subUnits.length === 1) {
      return subUnits[0];
    }
    const unit = new StateUnit('|');
    if (compiler.inverted) {
      subUnits.reverse();
    }
    for (const u of subUnits) {
      unit.start.pushEmptyTranstion(u.start, compiler.async);
      u.end.pushEmptyTranstion(unit.end, compiler.async);
    }
    return unit;
  },

  compileSubExpression(node, compiler) {
    const subUnits = node.children.map((n) => compile(n, compiler));
    if (compiler.inverted) {
      subUnits.reverse();
    }
    return concatUnits('SubExpression', subUnits, compiler.async);
  },

  compileExpressionItem(node, compiler) {
    return compile(node.children[0], compiler);
  },

  compileBackreference(node, compiler) {
    let index;
    const name = node.text.slice(1);
    if (name.lastIndexOf('k<', 0) === 0) {
      index = name.slice(2, -1);
    } else {
      index = parseInt(node.text.slice(1));
    }
    const unit = new StateUnit('Backreference_' + index);
    if (compiler.options.async) {
      unit.start.pushAsyncTransition(
        unit.end,
        asyncBackreferenceMatcher(index),
      );
    } else {
      unit.start.pushTransition(unit.end, backreferenceMatcher(index));
    }
    return unit;
  },

  compileGroup(node, compiler) {
    let exp: AstNode = node.children[1];
    let groupIndex = node.userData?.captureGroupIndex;
    let name: string | undefined;
    if (node.children[0].token === 'namedGroupPrefix') {
      name = node.children[0].text;
    }
    if (!name && !groupIndex) {
      exp = node.children[2];
    }
    const getUnit = () => {
      let expUnit = compile(exp, compiler);
      if (groupIndex) {
        expUnit = wrapUnit(expUnit, compiler.async, true);
        compiler.captureGroupStateStartMap.set(expUnit.start, {
          index: groupIndex,
          name,
        });
        compiler.captureGroupStateEndMap.set(expUnit.end, {
          name,
          index: groupIndex,
        });
      }
      return expUnit;
    };

    const lastChild = node.children[node.children.length - 1];
    if (lastChild.type === 'symbol' && lastChild.symbol === 'Quantifier') {
      return compiler._compileQuantifier(getUnit, lastChild);
    }
    return getUnit();
  },

  compileMatch(node, compiler) {
    const getUnit = () => compile(node.children[0], compiler);
    const lastChild = node.children[node.children.length - 1];
    if (lastChild.type === 'symbol' && lastChild.symbol === 'Quantifier') {
      return compiler._compileQuantifier(getUnit, lastChild);
    }
    return getUnit();
  },

  compileMatchItem(node, compiler) {
    return compile(node.children[0], compiler);
  },

  compileMatchCharacterClass(node, compiler) {
    return compile(node.children[0], compiler);
  },

  compileCharacterClass(node, compiler) {
    const token = node.children[0].token;
    const unit = new StateUnit('CharacterGroup');
    if (compiler.options.async) {
      let matcher = asyncCharacterClassMatcher[token];
      if (!matcher) {
        throw new Error('compileCharacterClass no matcher: ' + token);
      }
      unit.start.pushAsyncTransition(unit.end, matcher);
    } else {
      let matcher = characterClassMatcher[token];
      if (!matcher) {
        throw new Error('compileCharacterClass no matcher: ' + token);
      }
      unit.start.pushTransition(unit.end, matcher);
    }
    return unit;
  },

  compileCharacterGroup(node, compiler) {
    let invert = false;
    let itemsNode: AstNode = node.children[1];
    if (itemsNode.type === 'token' && itemsNode.text === '^') {
      invert = true;
      itemsNode = node.children[2];
    }
    if (itemsNode.type !== 'symbol') {
      throw new Error('');
    }
    const items = itemsNode.children;
    const unit = new StateUnit('CharacterGroup');
    const charGroupM = compiler.options.async
      ? asyncCharGroupMatcher
      : charGroupMatcher;
    compiler.pushTransition(unit.start, unit.end, charGroupM(items, invert));
    return unit;
  },

  compileAnyChar(_, compiler) {
    const unit = new StateUnit('.');
    const anyCharM = compiler.options.async
      ? asyncAnyCharMatcher
      : anyCharMatcher;
    compiler.pushTransition(unit.start, unit.end, anyCharM);
    return unit;
  },

  compileChar(node, compiler) {
    const char = node.text;
    const unit = new StateUnit('Char');
    const stringM = compiler.options.async ? asyncStringMatcher : stringMatcher;
    compiler.pushTransition(unit.start, unit.end, stringM(char));
    return unit;
  },

  compileAnchor(node, compiler) {
    const c0 = node.children[0];
    const token = c0.token;
    const unit = new StateUnit(token);
    if (compiler.options.async) {
      if (token in asyncAssertionMatcher) {
        const exp = node.children[1];
        unit.start.pushAsyncTransition(
          unit.end,
          (asyncAssertionMatcher as any)[token](exp, compiler),
        );
      } else if (token in asyncAnchorMatchers) {
        unit.start.pushAsyncTransition(
          unit.end,
          (asyncAnchorMatchers as any)[token],
        );
      } else {
        throw new Error('unrecognized anchor token: ' + token);
      }
    } else {
      if (token in assertionMatcher) {
        const exp = node.children[1];
        unit.start.pushTransition(
          unit.end,
          (assertionMatcher as any)[token](exp, compiler),
        );
      } else if (token in anchorMatchers) {
        unit.start.pushTransition(unit.end, (anchorMatchers as any)[token]);
      } else {
        throw new Error('unrecognized anchor token: ' + token);
      }
    }

    return unit;
  },
};

export default class Compiler {
  captureGroupStateStartMap: Map<State, GroupIndex> = new Map();
  captureGroupStateEndMap: Map<State, GroupIndex> = new Map();
  inverted: boolean = false;
  unit: StateUnit | undefined;
  startState: State | undefined;

  constructor(public options: CompilerOptions) {}

  get async() {
    return !!this.options.async;
  }

  initWithPattern(pattern: string) {
    let parserOptions: ParserOptions = {};
    if (this.options.unicode) {
      parserOptions.lexerOptions = { unicode: true };
    }
    const { ast } = parser.parse(pattern, parserOptions);
    annotateGroupIndex(ast);
    this.unit = compile(ast, this);
    this.startState = this.unit?.start;
    return this;
  }

  setInverted(inverted: boolean) {
    this.inverted = inverted;
  }

  compile(node: AstNode) {
    return compile(node, this);
  }

  pushTransition(
    start: State,
    end: State,
    condition: Condition | AsyncCondition,
  ) {
    if (this.options.async) {
      start.pushAsyncTransition(end, condition as AsyncCondition);
    } else {
      start.pushTransition(end, condition as Condition);
    }
  }

  groupStartIndex(state: State) {
    return this.captureGroupStateStartMap.get(state);
  }

  groupEndIndex(state: State) {
    return this.captureGroupStateEndMap.get(state);
  }

  _compileQuantifier(getUnit: GetUnit, quantifier: Ast_Quantifier_Node) {
    const lazy = quantifier.children[1]?.text === '?';
    const typeNodes = quantifier.children[0].children;
    const type = typeNodes[0].text;
    switch (type) {
      case '*':
        return this._zeroOrMore(getUnit, lazy);
      case '+':
        return this._oneOrMore(getUnit, lazy);
      case '?':
        return this._zeroOrOne(getUnit, lazy);
      case '{':
        return this._range(
          getUnit,
          parseInt(typeNodes[1]?.text || '0'),
          parseInt(typeNodes[3]?.text || '0'),
          typeNodes.length > 3,
          lazy,
        );
    }
    throw new Error('unsupported quantifier for ' + type);
  }

  _range(
    getUnit: GetUnit,
    lower: number,
    upper: number,
    hasMore: boolean,
    lazy: boolean,
  ) {
    let units = [];
    for (let i = 0; i < lower; i++) {
      units.push(getUnit());
    }
    if (upper) {
      // `(x(x(x)?)?)?`
      let nest: StateUnit | undefined;
      if (upper > lower) {
        for (let i = lower; i < upper; i++) {
          nest = nest
            ? concatUnits('nest', [getUnit(), nest], this.async)
            : getUnit();
          nest = this._zeroOrOne(() => nest!, lazy);
        }
      }
      if (nest) {
        units.push(nest);
      }
    } else if (hasMore) {
      units.push(this._zeroOrMore(getUnit, lazy));
    }
    return concatUnits('range', units, this.async);
  }

  _zeroOrOne(getUnit: GetUnit, lazy: boolean) {
    const unit = getUnit();
    const qUnit = new StateUnit('?');
    qUnit.start.pushEmptyTranstion(unit.start, this.async);
    qUnit.start.pushEmptyTranstion(qUnit.end, this.async);
    unit.end.pushEmptyTranstion(qUnit.end, this.async);
    if (lazy) {
      qUnit.start.getTransitions(this.async).reverse();
    }
    return qUnit;
  }

  _oneOrMore(getUnit: GetUnit, lazy: boolean) {
    const unit = getUnit();
    const qUnit = new StateUnit('+');
    qUnit.start.pushEmptyTranstion(unit.start, this.async);
    unit.end.pushEmptyTranstion(unit.start, this.async);
    unit.end.pushEmptyTranstion(qUnit.end, this.async);
    if (lazy) {
      unit.end.getTransitions(this.async).reverse();
    }
    return qUnit;
  }

  _zeroOrMore(getUnit: GetUnit, lazy: boolean) {
    const unit = getUnit();
    const qUnit = new StateUnit('*');
    qUnit.start.pushEmptyTranstion(unit.start, this.async);
    unit.start.pushEmptyTranstion(qUnit.end, this.async);
    unit.end.pushEmptyTranstion(unit.start, this.async);
    if (lazy) {
      unit.start.getTransitions(this.async).reverse();
    }
    return qUnit;
  }
}
