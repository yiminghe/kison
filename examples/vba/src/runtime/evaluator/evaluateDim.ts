import type {
  IDENTIFIER_Node,
  VariableListStmt_Node,
  VariableStmt_Node,
  VariableSubStmt_Node,
  // Visibility_Node,
} from '../../parser';
import { collect_asTypeClause } from '../common/collectType';
import type { Context } from '../Context';
import {
  AsTypeClauseInfo,
  VBInteger,
  VBString,
  VBValue,
  VBVariable,
  VBVariableInfo,
} from '../types';
import { evaluators } from './evaluators';

function evaluate_variableListStmt(node: VariableListStmt_Node) {
  const ret: VBVariableInfo[] = [];
  const { children } = node;
  for (const c of children) {
    if (c.type === 'symbol' && c.symbol === 'variableSubStmt') {
      ret.push(evaluate_variableSubStmt(c));
    }
  }
  return ret;
}

function evaluate_variableSubStmt(node: VariableSubStmt_Node): VBVariableInfo {
  const { children } = node;
  const name = (children[0] as IDENTIFIER_Node).text;
  let asType: AsTypeClauseInfo = {
    type: 'Variant',
  };
  const lastChild = children[children.length - 1];
  if (lastChild.type === 'symbol' && lastChild.symbol === 'asTypeClause') {
    asType = collect_asTypeClause(lastChild);
  }
  let value: VBValue = null!;
  if (asType.type === 'Integer') {
    value = new VBInteger();
  } else if (asType.type === 'String') {
    value = new VBString();
  }
  return {
    value,
    name,
    variant: asType.type === 'Variant',
  };
}

Object.assign(evaluators, {
  async evaluate_variableStmt(node: VariableStmt_Node, context: Context) {
    const { children } = node;

    // const first = children[0];
    // let staticFlag: boolean = false;
    // if (first.type === 'token') {
    //   staticFlag = first.token === 'STATIC';
    // }
    // let visibility: Visibility_Node['children'][0]['token'] = 'PUBLIC';
    // if (first.type === 'symbol') {
    //   visibility = first.children[0].token;
    // }

    const variableListStmt = children[children.length - 1];
    const variables: VBVariableInfo[] = evaluate_variableListStmt(
      variableListStmt as VariableListStmt_Node,
    );
    const currentScope = context.getCurrentScope();
    for (const v of variables) {
      currentScope.setVariable(
        v.name,
        new VBVariable(v.name, v.value, v.variant),
      );
    }
  },
});
