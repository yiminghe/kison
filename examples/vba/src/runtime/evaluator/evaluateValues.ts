import {
  collectAmbiguousIdentifier,
  collectIndexesNode,
} from '../collect/collectType';
import {
  VBInteger,
  VBString,
  VB_NOTHING,
  VB_NULL,
  ExitResult,
  VBValue,
  SubBinder,
  VB_EMPTY,
  ClassBinder,
  VBNamespaceBinder,
  VBObject,
} from '../types';
import { evaluate, registerEvaluators } from './evaluators';
import { buildIndexes, checkIndexesInterger } from './common';

registerEvaluators({
  async evaluateIndexes(node, context) {
    let ret: (VBValue | VBObject)[] = [];
    const { children } = node;
    for (const c of children) {
      if (c.type === 'symbol' && c.symbol === 'valueStmt') {
        ret.push(await evaluate(c, context));
      }
    }
    return ret;
  },

  evaluateINTEGERLITERAL(node) {
    return new VBInteger(parseInt(node.text));
  },

  evaluateSTRINGLITERAL(node) {
    return new VBString(node.text);
  },

  evaluateNOTHING() {
    return VB_NOTHING;
  },

  evaluateNULL() {
    return VB_NULL;
  },

  async evaluateICS_S_MembersCall({ children }, context) {
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

    let v:
      | VBObject
      | VBValue
      | SubBinder
      | ClassBinder
      | VBNamespaceBinder
      | undefined = await evaluate(valueNodes[0], context);

    for (let i = 1; i < valueNodes.length; i++) {
      if (!v) {
        throw new Error('unexpected member access!');
      }
      const valueNode = valueNodes[i];
      const indexesNode = collectIndexesNode(valueNode);
      const id = collectAmbiguousIdentifier(valueNode)!;
      if (v.type === 'Object' && v.value.type === 'Class') {
        v = v.value.get(id);
      } else if (v.type === 'Namespace' || v.type === 'Class') {
        v = v.get(id);
      } else {
        throw new Error('unexpected member access!');
      }
      if (indexesNode && v) {
        const indexesValues = await buildIndexes(
          { children: [indexesNode] },
          context,
        );
        if (v.type === 'Object' && v.value.type === 'Array') {
          const indexes = checkIndexesInterger(indexesValues);
          v = v.value.getElement(indexes);
        } else if (v.type === 'SubBinder') {
          const ret = await context.callSubBinder(v, indexesValues);
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

  async evaluateICS_S_VariableOrProcedureCall(node, context) {
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

    let variable: VBObject | VBNamespaceBinder = scope.getVariable(id);

    if (indexes && variable.type === 'Object') {
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
  evaluateExitStmt(node) {
    return new ExitResult(node.children[0]);
  },
});
