import { serialize, registerSerializers } from './serializers';

registerSerializers({
  serializeRangeReference(node) {
    const { children } = node;
    return `${serialize(children[0])}${children[1].text}${serialize(
      children[2],
    )}`;
  },

  serializeUnionReference(node) {
    const { children } = node;
    return `${serialize(children[0])}${children[1].text}${serialize(
      children[2],
    )}`;
  },

  serializeIntersectionReference(node) {
    const { children } = node;
    return `${serialize(children[0])} ${serialize(children[1])}`;
  },

  serializeCELL(node) {
    return node.text;
  },

  serializeNAME(node) {
    return node.text;
  },
});
