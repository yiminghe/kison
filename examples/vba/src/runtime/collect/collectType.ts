import type { AsTypeClause_Node, Type__Node } from '../../parser';
import { AsTypeClauseInfo } from '../types';

export function collect_asTypeClause(node: AsTypeClause_Node) {
  const asType: AsTypeClauseInfo = {
    type: 'Variant',
  };
  for (const c of node.children) {
    if (c.type === 'symbol' && c.symbol === 'type_') {
      asType.type =
        (collect_type_(c) as AsTypeClauseInfo['type']) || asType.type;
    }
  }
  return asType;
}

export function collect_type_(node: Type__Node) {
  for (const c of node.children) {
    if (c.type === 'symbol' && c.symbol === 'baseType') {
      const node = c.children[0];
      if (node.type === 'token') {
        return node.text;
      }
    }
  }
}
