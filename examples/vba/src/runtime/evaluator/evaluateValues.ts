import {
  collectAmbiguousIdentifier,
  collectIndexesNode,
} from '../collect/collectType';
import {
  VBInteger,
  VBString,
  VB_NOTHING,
  VB_NULL,
  VBObject,
  ExitResult,
  VBValue,
  VB_EMPTY,
} from '../types';
import { evaluate, registerEvaluators } from './evaluators';
import { buildArgs, buildIndexes, checkIndexesInterger } from './common';

registerEvaluators({
  async evaluate_indexes(node, context) {
    let ret: (VBValue | VBObject)[] = [];
    const { children } = node;
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'valueStmt') {
        ret.push(await evaluate(c, context));
      }
    }
    return ret;
  },

  evaluate_INTEGERLITERAL(node) {
    return new VBInteger(parseInt(node.text));
  },

  evaluate_STRINGLITERAL(node) {
    return new VBString(node.text);
  },

  evaluate_NOTHING() {
    return VB_NOTHING;
  },

  evaluate_NULL() {
    return VB_NULL;
  },

  async evaluate_iCS_S_MembersCall({ children }, context) {
    const valueNodes = [];

    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'iCS_S_VariableOrProcedureCall') {
        valueNodes.push(c);
      } else if (c.type === 'symbol' && c.symbol === 'iCS_S_MemberCall') {
        for (const c2 of c.children) {
          if (
            c2.type === 'symbol' &&
            c2.symbol === 'iCS_S_VariableOrProcedureCall'
          ) {
            valueNodes.push(c);
          }
        }
      }
    }

    let v: VBObject | VBValue | undefined = await evaluate(
      valueNodes[0],
      context,
    );

    for (let i = 1; i < valueNodes.length; i++) {
      if (!v) {
        throw new Error('unexpected member access!');
      }
      const valueNode = valueNodes[i];
      const indexesNode = collectIndexesNode(valueNode);
      const id = collectAmbiguousIdentifier(valueNode)!;
      if (
        (v.type === 'Object' && v.value.type === 'Class') ||
        (v.type === 'Object' && v.value.type === 'Namespace')
      ) {
        v = v.value.get(id);
      } else if (v.type === 'Namespace' || v.type === 'Class') {
        v = v.get(id);
      } else {
        throw new Error('unexpected member access!');
      }
      if (indexesNode && v) {
        const vbValue = v.value;
        const indexesValues = await buildIndexes(
          { children: [indexesNode] },
          context,
        );
        if (vbValue.type === 'Array') {
          const indexes = checkIndexesInterger(indexesValues);
          v = vbValue.getElement(indexes);
        } else if (vbValue.type === 'subBinder') {
          const ret = await context.callSubBinder(vbValue, indexesValues);
          if (ret?.type === 'Exit') {
            return ret;
          }
          v = ret;
        }
      }
    }

    return v || VB_EMPTY;
  },

  // async evaluate_iCS_S_ProcedureOrArrayCall(node, context){

  // },

  async evaluate_iCS_S_VariableOrProcedureCall(node, context) {
    let indexes: (VBObject | VBValue)[] | undefined;

    for (const c of node.children) {
      if (c.type === 'symbol' && c.symbol === 'indexes') {
        indexes = await evaluate(c, context);
      }
    }

    const id = collectAmbiguousIdentifier(node, true)!;
    const scope = context.getCurrentScope();

    if (indexes) {
      // a = r(1)
      if (!scope.hasVariable(id)) {
        let args: (VBValue | VBObject)[] = indexes;
        return await context.callSub(id, args);
      }
    }

    let variable: VBObject = scope.getVariable(id);

    if (indexes) {
      if (variable.value.type !== 'Array') {
        throw new Error('expect array or function or sub');
      }
      const ns: number[] = [];
      for (const index of indexes) {
        let v: VBValue;
        if (index.type === 'Object') {
          v = index.value;
        } else {
          v = index;
        }
        if (v.type !== 'Integer') {
          throw new Error('expect Integer when access array');
        }
        ns.push(v.value);
      }
      variable = variable.value.getElement(ns);
    }
    return variable;
  },
  evaluate_exitStmt(node) {
    return new ExitResult(node.children[0]);
  },
});
