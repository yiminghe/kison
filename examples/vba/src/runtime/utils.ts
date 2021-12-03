import type { Ast_AmbiguousIdentifier_Node, LiteralToken,
  AstNode,
  Ast_CertainIdentifier_Node,
} from '../parser';
import { throwVBRuntimeError } from './data-structure/VBError';
import type { IndexType, VBAny } from './types';
import type { Context } from './Context';

export function isIdentifierSymbol(
  node: AstNode,
): node is Ast_AmbiguousIdentifier_Node | Ast_CertainIdentifier_Node {
  return (
    node.type === 'symbol' &&
    (node.symbol === 'ambiguousIdentifier' ||
      node.symbol === 'certainIdentifier')
  );
}

export function last<T>(stack: T[], n = 1) {
  return stack[stack.length - n];
}

export function warn(msg: string) {
  console.warn(msg);
}

export function isSkipToken(name: LiteralToken) {
  return (
    name === 'NEWLINE' ||
    name === 'COMMENT' ||
    name === 'REMCOMMENT' ||
    name === '$EOF'
  );
}

export function captalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function transformToIndexType(context: Context, values: VBAny[]) {
  const ret: IndexType[] = [];
  for (let v_ of values) {
    const v = v_.type === 'Pointer' ? await v_.getValue() : v_;
    if (v.type === 'integer' || v.type === 'string') {
      ret.push(v.value);
    } else {
      throwVBRuntimeError(context, 'UNEXPECTED_ERROR', 'index access');
    }
  }
  return ret;
}

// lowercase
const prefix = '$vba_p_';
const propertyGetPrefix = prefix + 'g_';
const propertySetPrefix = prefix + 's_';

export function getPropertyGetSubName(t: string) {
  return propertyGetPrefix + t;
}

export function getPropertySetSubName(t: string) {
  return propertySetPrefix + t;
}

export function isClassProperty(t: string) {
  return t.startsWith(prefix);
}

export function getIdentifierName(n: Ast_AmbiguousIdentifier_Node) {
  return n.children[0].text;
}
