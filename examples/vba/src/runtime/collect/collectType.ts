import type { AsTypeClause_Node, Type__Node } from '../../parser';
import { AstNode } from '../../parserLLK';
import { Context } from '../Context';
import { AsTypeClauseInfo, getDEFAULT_AS_TYPE } from '../types';

export function collect_IDENTIFIER(node: AstNode): string | undefined {
  if (node.type === 'token' && node.token === 'IDENTIFIER') {
    return node.text;
  }
  if (node.type === 'symbol') {
    for (const c of node.children) {
      const text = collect_IDENTIFIER(c);
      if (text) {
        return text;
      }
    }
  }
}

export function collect_asTypeClause(
  node: AsTypeClause_Node,
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

export function collect_type_(node: Type__Node, context: Context) {
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
        if (id.token === 'IDENTIFIER') {
          classType.push(id.text);
        }
      }
      classType[0] = context.getFileIdFromFileName(classType[0])!;
      asType.classType = classType;
      asType.type = undefined;
    } else if (c.type === 'token' && c.token === 'RPAREN') {
      asType.isArray = true;
    }
  }
  return asType;
}
