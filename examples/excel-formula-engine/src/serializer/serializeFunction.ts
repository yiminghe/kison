import { serialize, registerSerializers } from './serializers';

registerSerializers({
  serializeFunctionExp(node) {
    const { children } = node;
    const fnName = children[0].text.toLowerCase();

    let argsChildren = children[2].children || [];
    let args: string[] = [];

    for (const a of argsChildren) {
      if (a.type === 'token' && a.token === 'ARGUMENT_SEPARATOR') {
        args.push(a.text);
      } else if (a.type == 'symbol') {
        args.push(serialize(a));
      }
    }
    return `${fnName}(${args.join('')})`;
  },
});
