import type { AsTypeClause_Node, Type__Node } from '../../parser';
import { AsTypeClauseInfo, DEFAULT_AS_TYPE } from '../types';

export function collect_asTypeClause(node: AsTypeClause_Node) {
  let asType: AsTypeClauseInfo = DEFAULT_AS_TYPE;
  for (const c of node.children) {
    if (c.type === 'symbol' && c.symbol === 'type_') {
      asType = collect_type_(c);
    }
  }
  return asType;
}

export function collect_type_(node: Type__Node) {
  const asType: AsTypeClauseInfo = DEFAULT_AS_TYPE;
  for (const c of node.children) {
    if (c.type === 'symbol' && c.symbol === 'baseType') {
      const node = c.children[0];
      if (node.type === 'token') {
        asType.type = node.text as AsTypeClauseInfo['type'];
      }
    } else if (c.type === 'token' && c.token === 'RPAREN') {
      asType.isArray = true;
    }
  }
  return asType;
}
