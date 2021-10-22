import { collect_asTypeClause } from '../collect/collectType';
import { ArgInfo, SubSymbolItem } from '../types';
import { registerBuilders, build } from './builders';

registerBuilders({
  build_subStmt(node, context) {
    let id;
    for (const c of node.children) {
      if (!id) {
        if (c.type === 'token' && c.token === 'IDENTIFIER') {
          id = c.text;
          const subSymbolItem = new SubSymbolItem(node, context);
          context.registerSymbolItem(id, subSymbolItem);
          return;
        }
      }
    }
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
