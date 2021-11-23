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
import {
  ArgInfo,
  VBPointer,
  VBPrimitiveTypeClass,
  VBSub,
  VBValue,
} from '../types';
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
      const vbSub = new VBSub(node, context);
      await vbSub.init();
      let name = c.children[0].text;
      if (node.symbol === 'propertyGetStmt') {
        name = getPropertyGetSubName(name);
      } else if (
        node.symbol === 'propertySetStmt' ||
        node.symbol === 'propertyLetStmt'
      ) {
        name = getPropertySetSubName(name);
      }
      context.registerSymbolItemInternal(name, vbSub);
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
        const defaultValue: VBPointer | VBValue = await evaluate(
          c.children[1],
          context,
        );
        if (defaultValue.type === 'Pointer') {
          argInfo.defaultValue = await defaultValue.getValue();
        } else {
          argInfo.defaultValue = defaultValue;
        }
      }
    }
    if (argInfo.optional && !argInfo.defaultValue) {
      const type = argInfo.asType?.type || 'Variant';
      const PrimitiveClass = (VBPrimitiveTypeClass as any)[type];
      if (!PrimitiveClass) {
        throw new Error('optional parameter defaultValue must be basic type!');
      }
      argInfo.defaultValue = new PrimitiveClass();
    }
    return argInfo;
  },
});
