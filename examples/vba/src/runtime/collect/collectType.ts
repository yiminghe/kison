import type {
  Ast_AsTypeClause_Node,
  Ast_Type__Node,
  AstNode,
  Ast_Indexes_Node,
} from '../../parser';
import { Context } from '../Context';
import { AsTypeClauseInfo, getDEFAULT_AS_TYPE } from '../types';

export function collectAmbiguousIdentifier(
  node: AstNode,
  breadth: boolean = false,
): string | undefined {
  if (node.type === 'symbol') {
    if (node.symbol === 'ambiguousIdentifier') {
      return node.children[0].text;
    }
    if (breadth) {
      for (const c of node.children) {
        if (c.type === 'symbol' && c.symbol === 'ambiguousIdentifier') {
          return c.children[0].text;
        }
      }
    }
    for (const c of node.children) {
      const text = collectAmbiguousIdentifier(c, breadth);
      if (text) {
        return text;
      }
    }
  }
}

export function collectAmbiguousIdentifiers(
  node: AstNode,
  ret: string[] = [],
): string[] {
  if (node.type === 'symbol') {
    if (node.symbol === 'ambiguousIdentifier') {
      ret.push(node.children[0].text);
    } else {
      for (const c of node.children) {
        collectAmbiguousIdentifiers(c, ret);
      }
    }
  }
  return ret;
}

export function collectIndexesNode(
  node: AstNode,
  breadth: boolean = false,
): Ast_Indexes_Node | undefined {
  if (node.type === 'symbol') {
    if (node.symbol === 'indexes') {
      return node;
    }
    if (breadth) {
      for (const c of node.children) {
        if (c.type === 'symbol' && c.symbol === 'indexes') {
          return c;
        }
      }
    }
    for (const c of node.children) {
      const indexesNode = collectIndexesNode(c, breadth);
      if (indexesNode) {
        return indexesNode;
      }
    }
  }
}

export function collect_asTypeClause(
  node: Ast_AsTypeClause_Node,
  context: Context,
) {
  let asType: AsTypeClauseInfo = getDEFAULT_AS_TYPE();
  let isNew = false;
  for (const c of node.children) {
    if (c.type === 'symbol' && c.symbol === 'type_') {
      asType = collect_type_(c, context);
    } else if (c.type === 'token' && c.token === 'NEW') {
      isNew = true;
    }
  }
  asType.isNew = isNew;
  return asType;
}

export function collect_type_(node: Ast_Type__Node, context: Context) {
  const asType: AsTypeClauseInfo = getDEFAULT_AS_TYPE();
  for (const c of node.children) {
    if (c.type === 'symbol' && c.symbol === 'baseType') {
      const node = c.children[0];
      if (node.type === 'token') {
        asType.type = node.text as AsTypeClauseInfo['type'];
      }
    } else if (c.type === 'symbol' && c.symbol === 'complexType') {
      const classType = [];
      for (const id of c.children) {
        if (id.type === 'symbol' && id.symbol === 'ambiguousIdentifier') {
          classType.push(id.children[0].text);
        }
      }
      asType.className = classType.join('.');
      classType[0] = context.getFileIdFromFileNameInternal(classType[0])!;
      asType.classType = classType;
      asType.type = undefined;
    } else if (c.type === 'token' && c.token === 'RPAREN') {
      asType.isArray = true;
    }
  }
  return asType;
}
