import type {
  Ast_FunctionStmt_Node,
  Ast_SubStmt_Node,
  Ast_PropertyLetStmt_Node,
  Ast_PropertySetStmt_Node,
  Ast_PropertyGetStmt_Node,
} from '../../parser';
import { collect_asTypeClause } from '../collect/collectType';
import { Context } from '../Context';
import { evaluate } from '../evaluator/index';
import { ArgInfo, SubSymbolItem } from '../types';
import { getPropertyGetSubName, getPropertySetSubName } from '../utils';
import { registerLoaders, load } from './loaders';

async function loadCall(
  node:
    | Ast_FunctionStmt_Node
    | Ast_SubStmt_Node
    | Ast_PropertyGetStmt_Node
    | Ast_PropertyLetStmt_Node
    | Ast_PropertySetStmt_Node,
  context: Context,
) {
  for (const c of node.children) {
    if (c.type === 'symbol' && c.symbol === 'ambiguousIdentifier') {
      const subSymbolItem = new SubSymbolItem(node, context);
      await subSymbolItem.init();
      let name = c.children[0].text;
      if (node.symbol === 'propertyGetStmt') {
        name = getPropertyGetSubName(name);
      } else if (
        node.symbol === 'propertySetStmt' ||
        node.symbol === 'propertyLetStmt'
      ) {
        name = getPropertySetSubName(name);
      }
      context.registerSymbolItem(name, subSymbolItem);
      return;
    }
  }
  throw new Error(`expect ${node.symbol} definition name!`);
}

registerLoaders({
  loadSubStmt(node, context) {
    return loadCall(node, context);
  },

  loadFunctionStmt(node, context) {
    return loadCall(node, context);
  },

  loadPropertyGetStmt(node, context) {
    return loadCall(node, context);
  },

  loadPropertySetStmt(node, context) {
    return loadCall(node, context);
  },

  loadPropertyLetStmt(node, context) {
    return loadCall(node, context);
  },

  async loadArgList(node, context) {
    const ret: ArgInfo[] = [];
    for (const c of node.children) {
      if (c.type === 'symbol' && c.symbol === 'arg') {
        ret.push(await load(c, context));
      }
    }
    return ret;
  },

  async loadArg(node, context) {
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
