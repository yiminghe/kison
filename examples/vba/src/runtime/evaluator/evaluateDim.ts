import type {
  IDENTIFIER_Node,
  VariableListStmt_Node,
  ValueStmt_Node,
} from '../../parser';
import { collect_asTypeClause } from '../collect/collectType';
import type { Context } from '../Context';
import {
  AsTypeClauseInfo,
  VBArray,
  VBInteger,
  VBVariableInfo,
  Subscript,
  VBObject,
  VBPrimitiveTypeClass,
  DEFAULT_AS_TYPE,
} from '../types';
import { evaluate, registerEvaluators } from './evaluators';

function getNumberFromSubscript(node: VBObject | VBInteger) {
  if (node.type === 'Object') {
    const vbValue = node.value;
    if (vbValue.type !== 'Integer') {
      throw new Error('unexpected array dimision!');
    }
    return vbValue.value;
  }
  return node.value;
}

registerEvaluators({
  async evaluate_subscripts(node, context) {
    let ret: Subscript[] = [];
    const { children } = node;
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'subscript_') {
        ret.push(await evaluate(c, context));
      }
    }
    return ret;
  },
  async evaluate_variableListStmt(
    node: VariableListStmt_Node,
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

  async evaluate_variableSubStmt(node, context): Promise<VBVariableInfo> {
    const { children } = node;
    const name = (children[0] as IDENTIFIER_Node).text;
    let asType: AsTypeClauseInfo = DEFAULT_AS_TYPE;
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
      asType = collect_asTypeClause(lastChild);
    }

    let typeName = asType.type;

    typeName = (typeName as any).toLowerCase();

    const PrimitiveClass = VBPrimitiveTypeClass[typeName];

    let value: VBVariableInfo['value'];
    if (subscripts) {
      value = () => {
        const value = new VBArray(typeName, subscripts!);
        return new VBObject(value, asType);
      };
    } else if (PrimitiveClass) {
      value = () => {
        const value = new PrimitiveClass();
        return new VBObject(value, asType);
      };
    } else {
      throw new Error('unexpect type: ' + typeName);
    }
    return {
      value,
      name,
    };
  },
  async evaluate_subscript_(node, context): Promise<Subscript> {
    let lower = 0;
    let upper = 0;
    const subs: ValueStmt_Node[] = [];
    for (const c of node.children) {
      if (c.type === 'symbol' && c.symbol === 'valueStmt') {
        subs.push(c);
      }
    }
    let one = false;
    if (subs.length === 2) {
      lower = getNumberFromSubscript(await evaluate(subs[0], context));
      upper = getNumberFromSubscript(await evaluate(subs[1], context));
    } else if (subs.length === 1) {
      one = true;
      upper = getNumberFromSubscript(await evaluate(subs[0], context));
    }
    return {
      lower,
      upper,
      one,
    };
  },
  async evaluate_variableStmt(node, context) {
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
    const currentScope = context.getCurrentScope();
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
          subSymbolItem.addStaticVariable(v.name, v.value());
        }
      } else {
        currentScope.setVariable(v.name, v.value());
      }
    }
  },

  async evaluate_redimSubStmt(node, context): Promise<RedimRet> {
    const { children } = node;
    const obj = await evaluate(children[0], context);
    const subscripts = await evaluate(children[2], context);
    const lastChild = children[children.length - 1];
    let asType: AsTypeClauseInfo | undefined;
    if (lastChild.type === 'symbol' && lastChild.symbol === 'asTypeClause') {
      asType = collect_asTypeClause(lastChild);
    }
    return {
      obj,
      subscripts,
      asType,
    };
  },

  async evaluate_redimStmt(node, context) {
    const { children } = node;
    const preserve = children[1].type === 'token';
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'redimSubStmt') {
        const { obj, asType, subscripts }: RedimRet = await evaluate(
          c,
          context,
        );
        if (obj.value.type === 'Array') {
          if (obj.dynamicArray) {
            obj.value.dynamic = true;
            obj.value.subscripts = subscripts;
            if (!preserve) {
              obj.value.value = [];
            }
            if (asType) {
              obj.value.elementType = asType.type;
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

  async evaluate_eraseStmt({ children }, context) {
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'valueStmt') {
        const obj: VBObject = await evaluate(c, context);
        if (obj.value.type === 'Array') {
          obj.value.value = [];
          if (obj.dynamicArray) {
            obj.value.subscripts = [];
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
