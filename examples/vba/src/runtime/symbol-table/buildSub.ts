import { FunctionStmt_Node, SubStmt_Node } from '../../parser';
import { collect_asTypeClause } from '../collect/collectType';
import { Context } from '../Context';
import { ArgInfo, SubSymbolItem } from '../types';
import { registerBuilders, build } from './builders';

function buildSub(node: FunctionStmt_Node | SubStmt_Node, context: Context) {
  for (const c of node.children) {
    if (c.type === 'token' && c.token === 'IDENTIFIER') {
      const subSymbolItem = new SubSymbolItem(node, context);
      context.registerSymbolItem(c.text, subSymbolItem);
      return;
    }
  }
  throw new Error(`expect ${node.symbol} definition name!`);
}

registerBuilders({
  build_subStmt(node, context) {
    buildSub(node, context);
  },

  build_functionStmt(node, context) {
    buildSub(node, context);
  },

  build_argList(node, context) {
    const ret: ArgInfo[] = [];
    for (const c of node.children) {
      if (c.type === 'symbol' && c.symbol === 'arg') {
        ret.push(build(c, context));
      }
    }
    return ret;
  },

  build_arg(node): ArgInfo {
    const argInfo: ArgInfo = {
      byRef: true,
      name: '',
      asType: {
        type: 'Variant',
      },
    };
    for (const c of node.children) {
      if (c.type === 'token' && c.token === 'BYVAL') {
        argInfo.byRef = false;
      } else if (c.type === 'token' && c.token === 'IDENTIFIER') {
        argInfo.name = c.text;
      } else if (c.type === 'symbol' && c.symbol === 'asTypeClause') {
        argInfo.asType = collect_asTypeClause(c);
      }
    }
    return argInfo;
  },
});
