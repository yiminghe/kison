import type {
  Ast_VariableListStmt_Node,
  Ast_ValueStmt_Node,
} from '../../parser';
import {
  collect_asTypeClause,
  collectAmbiguousIdentifier,
} from '../collect/collectType';
import type { Context } from '../Context';
import {
  AsTypeClauseInfo,
  VBArray,
  VBInteger,
  VBVariableInfo,
  Subscript,
  VBObject,
  VBPrimitiveTypeClass,
  getDEFAULT_AS_TYPE,
  VB_EMPTY,
  VBNativeObject,
} from '../types';
import { evaluate, registerEvaluators } from './evaluators';

async function getNumberFromSubscript(node: VBObject | VBInteger) {
  if (node.type === 'Object') {
    const vbValue = await node.getValue();
    if (vbValue.type !== 'Integer') {
      throw new Error('unexpected array dimision!');
    }
    return vbValue.value;
  }
  return node.value;
}

registerEvaluators({
  async evaluateSubscripts(node, context) {
    let ret: Subscript[] = [];
    const { children } = node;
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'subscript_') {
        ret.push(await evaluate(c, context));
      }
    }
    return ret;
  },
  async evaluateVariableListStmt(
    node: Ast_VariableListStmt_Node,
    context: Context,
  ) {
    const ret: VBVariableInfo[] = [];
    const { children } = node;
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'variableSubStmt') {
        ret.push(await evaluate(c, context));
      }
    }
    return ret;
  },

  async evaluateVariableSubStmt(node, context): Promise<VBVariableInfo> {
    const { children } = node;
    const name = collectAmbiguousIdentifier(node, true)!;
    let asType: AsTypeClauseInfo = getDEFAULT_AS_TYPE();
    let subscripts: Subscript[] | undefined;
    for (const c of children) {
      if (c.type == 'token' && c.token === 'LPAREN') {
        subscripts = subscripts || [];
      } else if (c.type === 'symbol' && c.symbol === 'subscripts') {
        subscripts = await evaluate(c, context);
      }
    }
    const lastChild = children[children.length - 1];
    if (lastChild.type === 'symbol' && lastChild.symbol === 'asTypeClause') {
      asType = collect_asTypeClause(lastChild, context);
    }

    const { type, isNew, className } = asType;
    let value: VBVariableInfo['value'] | undefined;

    if (type) {
      const lowerType = type.toLowerCase() as any;
      const PrimitiveClass = (VBPrimitiveTypeClass as any)[lowerType];
      if (subscripts) {
        value = () => {
          const value = new VBArray(lowerType, subscripts!);
          return new VBNativeObject(value, asType);
        };
      } else if (PrimitiveClass) {
        value = () => {
          const value = new PrimitiveClass();
          return new VBNativeObject(value, asType);
        };
      }
    } else if (className) {
      if (isNew) {
        value = async () => {
          return new VBNativeObject(
            await context.createObject(className),
            asType,
          );
        };
      } else {
        value = () => {
          return new VBNativeObject(VB_EMPTY, asType);
        };
      }
    }
    if (!value) {
      throw new Error(
        'unexpect asType: ' + asType.type || asType.classType?.join(''),
      );
    }
    return {
      value,
      name,
    };
  },
  async evaluateSubscript_(node, context): Promise<Subscript> {
    let lower = 0;
    let upper = 0;
    const subs: Ast_ValueStmt_Node[] = [];
    for (const c of node.children) {
      if (c.type === 'symbol' && c.symbol === 'valueStmt') {
        subs.push(c);
      }
    }
    let one = false;
    if (subs.length === 2) {
      lower = await getNumberFromSubscript(await evaluate(subs[0], context));
      upper = await getNumberFromSubscript(await evaluate(subs[1], context));
    } else if (subs.length === 1) {
      one = true;
      upper = await getNumberFromSubscript(await evaluate(subs[0], context));
    }
    return {
      lower,
      upper,
      one,
    };
  },
  async evaluateVariableStmt(node, context) {
    const { children } = node;
    const first = children[0];
    const variableListStmt = children[children.length - 1];
    const variables: VBVariableInfo[] = await evaluate(
      variableListStmt,
      context,
    );
    let isStatic: boolean = false;
    if (first.type === 'token') {
      isStatic = first.token === 'STATIC';
    }
    const currentScope = context.getCurrentScopeInternal();
    const subSymbolItem = context.symbolTable
      .get(currentScope.file.id)
      ?.symbolTable.get(currentScope.subName);
    if (!subSymbolItem || subSymbolItem.type === 'variable') {
      throw new Error('expected subSymbolItem when evaluate_variableStmt!');
    }
    isStatic = isStatic || subSymbolItem.isStatic;
    for (const v of variables) {
      if (isStatic) {
        if (!subSymbolItem.hasStaticVariable(v.name)) {
          const value = await v.value();
          subSymbolItem.addStaticVariable(v.name, value);
        }
      } else {
        const value = await v.value();
        currentScope.setVariable(v.name, value);
      }
    }
  },

  async evaluateRedimSubStmt(node, context): Promise<RedimRet> {
    const { children } = node;
    const obj = await evaluate(children[0], context);
    const subscripts = await evaluate(children[2], context);
    const lastChild = children[children.length - 1];
    let asType: AsTypeClauseInfo | undefined;
    if (lastChild.type === 'symbol' && lastChild.symbol === 'asTypeClause') {
      asType = collect_asTypeClause(lastChild, context);
    }
    return {
      obj,
      subscripts,
      asType,
    };
  },

  async evaluateRedimStmt(node, context) {
    const { children } = node;
    const preserve = children[1].type === 'token';
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'redimSubStmt') {
        const { obj, asType, subscripts }: RedimRet = await evaluate(
          c,
          context,
        );
        const objValue = await obj.getValue();
        if (objValue.type === 'Array' && obj.subType === 'address') {
          if (obj.dynamicArray) {
            objValue.dynamic = true;
            objValue.subscripts = subscripts;
            if (!preserve) {
              objValue.value = [];
            }
            if (asType) {
              objValue.elementType = asType.type!;
              obj.asType = asType;
            }
          } else {
            throw new Error('unexpected redim!');
          }
        } else {
          throw new Error('unexpected redim!');
        }
      }
    }
  },

  async evaluateEraseStmt({ children }, context) {
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'valueStmt') {
        const obj: VBObject = await evaluate(c, context);
        if (obj.type === 'Object' && obj.subType === 'address') {
          const value = await obj.getValue();
          if (value.type === 'Array') {
            value.value = [];
            if (obj.dynamicArray) {
              value.subscripts = [];
            }
          }
        }
      }
    }
  },
});

type RedimRet = {
  obj: VBObject;
  subscripts: Subscript[];
  asType?: AsTypeClauseInfo;
};
