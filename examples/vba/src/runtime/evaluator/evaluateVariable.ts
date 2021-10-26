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
  VBValue,
  VBVariableInfo,
  Subscript,
  VBObject,
  VBPrimitiveTypeClass,
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
    let ret = [];
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
    let asType: AsTypeClauseInfo = {
      type: 'Variant',
    };
    let subscripts: Subscript[] | undefined;
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'subscripts') {
        subscripts = await evaluate(c, context);
      }
    }
    const lastChild = children[children.length - 1];
    if (lastChild.type === 'symbol' && lastChild.symbol === 'asTypeClause') {
      asType = collect_asTypeClause(lastChild);
    }
    let value: VBValue = null!;

    let typeName = asType.type;

    typeName = (typeName as any).toLowerCase();

    const PrimitiveClass = VBPrimitiveTypeClass[typeName];

    if (subscripts) {
      value = new VBArray(typeName);
      value.subscripts = subscripts;
    } else if (PrimitiveClass) {
      value = new PrimitiveClass();
    } else {
      throw new Error('unexpect type: ' + typeName);
    }
    return {
      value: new VBObject(value, asType.type),
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
    const subSymbolItem = context.symbolTable.get(currentScope.file.id)?.symbolTable.get(currentScope.subName);
    if (!subSymbolItem || subSymbolItem.type === 'variable') {
      throw new Error('expected subSymbolItem when evaluate_variableStmt!');
    }
    isStatic = isStatic || subSymbolItem.isStatic;
    for (const v of variables) {
      if (isStatic) {
        if (!subSymbolItem.hasStaticVariable(v.name)) {
          subSymbolItem.addStaticVariable(v.name, v.value);
        }
      } else {
        currentScope.setVariable(v.name, v.value);
      }
    }
  },
});
