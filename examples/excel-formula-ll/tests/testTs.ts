import parser from '../src/parser.js';

const ret = parser.parse('1');

const root = ret.ast;

console.log(JSON.stringify(root));

const exps = root.children;
const node = exps[0].children[0];
if (node.type == 'symbol') {
  console.log('symbol', node.symbol);
  // node.
} else if (node.type === 'token') {
  console.log('token', node.token);
  // node.
}
