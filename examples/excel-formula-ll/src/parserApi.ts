import parser, { TransformNode } from './parser.js';
import type { AstSymbolNode, ParserOptions } from './parser.js';

export const lex = parser.lex;

function isGroupExp(parent: AstSymbolNode) {
  const { children } = parent;
  const firstChild = children[0];
  const lastChild = children[children.length - 1];
  return (
    firstChild?.type === 'token' &&
    firstChild.token === '(' &&
    lastChild?.type === 'token' &&
    lastChild.token === ')'
  );
}

function transformNode(...args: Parameters<TransformNode>) {
  let { index, parent, defaultTransformNode } = args[0];
  if (
    (index === 0 || index === parent.children.length - 1) &&
    isGroupExp(parent)
  ) {
    return null;
  }
  return defaultTransformNode(args[0]);
}

export const parse = (input: string, options?: ParserOptions) => {
  if (options && options.transformNode !== false && !options.transformNode) {
    options = {
      ...options,
      transformNode,
    };
  }
  return parser.parse(input, options);
};
