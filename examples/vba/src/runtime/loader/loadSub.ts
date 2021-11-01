import { FunctionStmt_Node, SubStmt_Node } from '../../parser';
import { collect_asTypeClause } from '../collect/collectType';
import { Context } from '../Context';
import { evaluate } from '../evaluator/index';
import { ArgInfo, SubSymbolItem } from '../types';
import { registerLoaders, load } from './loaders';

async function loadSub(
  node: FunctionStmt_Node | SubStmt_Node,
  context: Context,
) {
  for (const c of node.children) {
    if (c.type === 'symbol' && c.symbol === 'ambiguousIdentifier') {
      const subSymbolItem = new SubSymbolItem(node, context);
      await subSymbolItem.init();
      context.registerSymbolItem(c.children[0].text, subSymbolItem);
      return;
    }
  }
  throw new Error(`expect ${node.symbol} definition name!`);
}

registerLoaders({
  load_subStmt(node, context) {
    return loadSub(node, context);
  },

  load_functionStmt(node, context) {
    return loadSub(node, context);
  },

  async load_argList(node, context) {
    const ret: ArgInfo[] = [];
    for (const c of node.children) {
      if (c.type === 'symbol' && c.symbol === 'arg') {
        ret.push(await load(c, context));
      }
    }
    return ret;
  },

  async load_arg(node, context) {
    const argInfo: ArgInfo = {
      byRef: true,
      name: '',
      asType: {
        type: 'Variant',
        isArray: false,
      },
    };
    for (const c of node.children) {
      if (c.type === 'token' && c.token === 'BYVAL') {
        argInfo.byRef = false;
      } else if (c.type === 'symbol' && c.symbol === 'ambiguousIdentifier') {
        argInfo.name = c.children[0].text;
      } else if (c.type === 'symbol' && c.symbol === 'asTypeClause') {
        argInfo.asType = collect_asTypeClause(c, context);
      } else if (c.type === 'token' && c.token === 'OPTIONAL') {
        argInfo.optional = true;
      } else if (c.type === 'symbol' && c.symbol === 'argDefaultValue') {
        argInfo.defaultValue = await evaluate(c, context);
      }
    }
    return argInfo;
  },
});
