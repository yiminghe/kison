import type { AstVisitors, AstNode, AstVisitor } from './calLL';
import parser from './calLL';
import parserLLK from './calLLK';

(function () {
  const visitors: AstVisitors<'visit', undefined> = {
    visitBinaryExp(node) {
      node.children.forEach((c) => visit(c));
      const left = node.children[0].userData.value;
      const right = node.children[2].userData.value;
      const token = node.children[1].token;
      let v: number = 0;
      if (token === '+') {
        v = left + right;
      } else if (token === '*') {
        v = left * right;
      }
      node.userData = {
        value: v,
      };
    },
    visitSingleExp(node) {
      node.userData = {
        value: parseInt(node.children[0].text),
      };
    },
    visitPrefixExp(node) {
      node.userData.value = -node.children[1].userData.value;
    },
  };

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function visit(node: AstNode) {
    let m: string;
    if (node.type === 'symbol') {
      // @ts-ignore
      m = node.label || node.symbol;
    } else {
      m = node.token;
    }
    const fn: AstVisitor<'', null> = (visitors as any)[`visit${capitalize(m)}`];
    if (fn) {
      return fn(node, null);
    }
    let ret;
    if (node.type === 'symbol') {
      node.children.forEach((c) => {
        ret = visit(c);
      });
    }
    return ret;
  }

  const exp = '1+2*3';

  {
    console.log('LL:');
    const { ast } = parser.parse(exp);

    console.log(ast);

    visit(ast);

    console.log(exp + ' = ' + ast.userData.value);
  }

  {
    console.log('LLK:');
    const root = parserLLK.parse(exp);

    visit(root.ast);

    console.log(exp + ' = ' + root.ast.userData.value);
  }
})();
