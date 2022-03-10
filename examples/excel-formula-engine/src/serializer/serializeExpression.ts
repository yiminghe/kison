import { serialize, registerSerializers } from './serializers';

registerSerializers({
  serializeExp(node) {
    const { children } = node;
    if (
      children.length === 3 &&
      children[0].type === 'token' &&
      children[0].token === '(' &&
      children[2].type === 'token' &&
      children[2].token === ')'
    ) {
      return '(' + serialize(children[1]) + ')';
    }
    if (children.length === 1) {
      return serialize(children[0]);
    }
    throw new Error('unexpect exp');
  },
  serializeBinaryExp(node) {
    const op = node.children[1].token;
    return `${serialize(node.children[0])}${op}${serialize(node.children[2])}`;
  },
  serializePercentageExp(node) {
    return `${serialize(node.children[0])}${node.children[1].token}`;
  },
  serializePrefixExp(node) {
    return `${node.children[0].token}${serialize(node.children[1])}`;
  },
  serializeClipExp(node) {
    return `${node.children[0].token}${serialize(node.children[1])}`;
  },
});
