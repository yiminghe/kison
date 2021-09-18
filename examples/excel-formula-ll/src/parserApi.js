import parser from './parser.js';

export const lex = parser.lex;

function isGroupExp(parent) {
  const { children } = parent;
  return (
    children[0].token === '(' && children[children.length - 1].token === ')'
  );
}

function transformNode(args) {
  let { index, parent, defaultTransformNode } = args;
  if (
    (index === 0 || index === parent.children.length - 1) &&
    isGroupExp(parent)
  ) {
    return null;
  }
  return defaultTransformNode(args);
}

export const parse = (input, options = {}) => {
  if (options.transformNode !== false && !options.transformNode) {
    options = {
      ...options,
      transformNode,
    };
  }
  return parser.parse(input, options);
};
