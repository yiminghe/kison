import { parser } from '../src/';

const ret = parser.parse('sum(1,2)');

console.log(ret);

const root = ret.ast;

console.log(JSON.stringify(root, null, 2));

const exps = root.children;
const node = exps[0].children[0];
if (node.type == 'symbol') {
  console.log('symbol', node.symbol);
  if (node.symbol === 'function') {
    const args = node.children[2];
    args.children;
  }
  // node.
} else if (node.type === 'token') {
  console.log('token', node.token);
  // node.
}
