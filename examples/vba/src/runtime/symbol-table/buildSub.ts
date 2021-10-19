import type {
  SubStmt_Node,
  ArgList_Node, Arg_Node, AsTypeClause_Node, Type__Node
} from '../../parser';
import type { Runtime } from '../runtime';
import {
  ArgInfo, SubSymbolItem, AsTypeClauseInfo,
} from '../types';
import { builds, build } from './builds';

Object.assign(builds, {
  build_subStmt(node: SubStmt_Node, runtime: Runtime) {
    let id;
    for (const c of node.children) {
      if (!id) {
        if (c.type === 'token' && c.token === 'IDENTIFIER') {
          id = c.text;
          const subSymbolItem = new SubSymbolItem(node, runtime);
          runtime.registerSymbolItem(id, subSymbolItem);
          return;
        }
      }
    }
  },

  build_argList(node: ArgList_Node, runtime: Runtime) {
    const ret: ArgInfo[] = [];
    for (const c of node.children) {
      if (c.type === 'symbol' && c.symbol === 'arg') {
        ret.push(build(c, runtime));
      }
    }
    return ret;
  },

  build_arg(node: Arg_Node, runtime: Runtime): ArgInfo {
    const argInfo: ArgInfo = {
      byRef: true,
      name: '',
      asType: {
        type: 'Variant'
      },
    };
    for (const c of node.children) {
      if (c.type === 'token' && c.token === 'BYVAL') {
        argInfo.byRef = false;
      } else if (c.type === 'token' && c.token === 'IDENTIFIER') {
        argInfo.name = c.text;
      } else if (c.type === 'symbol' && c.symbol === 'asTypeClause') {
        argInfo.asType = build(c, runtime);
      }
    }
    return argInfo;
  },

  build_asTypeClause(node: AsTypeClause_Node, runtime: Runtime) {
    const asType: AsTypeClauseInfo = {
      type: 'Variant'
    };
    for (const c of node.children) {
      if (c.type === 'symbol' && c.symbol === 'type_') {
        asType.type = build(c, runtime) || asType.type;
      }
    }
    return asType;
  },

  build_type_(node: Type__Node) {
    for (const c of node.children) {
      if (c.type === 'symbol' && c.symbol === 'baseType') {
        const node = c.children[0];
        if (node.type === 'token') {
          return node.text;
        }
      }
    }
  },
});
