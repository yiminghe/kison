import { makeError, VALUE_ERROR } from '../functions/utils';
import { evaluate, registerEvaluators } from './evaluators';
import type {
  Array_Type,
  Atom_Value_Type,
  Error_Type,
  Number_Type,
  String_Type,
} from '../common/types';

registerEvaluators({
  evaluateNUMBER(node): Number_Type {
    return {
      type: 'number',
      value: Number(node.text),
    };
  },
  evaluateSTRING(node): String_Type {
    return {
      type: 'string',
      value: node.text,
    };
  },

  evaluateArray(node, context): Array_Type | Error_Type {
    const { children: raw } = node;
    const children = raw.slice(1, -1);
    const ret: Atom_Value_Type[][] = [];
    let row: Atom_Value_Type[] = [];
    let lastRow: Atom_Value_Type[];
    let error = 0;

    function pushRow() {
      if (lastRow && row.length !== lastRow.length) {
        error = 1;
      }
      ret.push(row);
      lastRow = row;
    }

    for (const c of children) {
      if (c.type === 'token' && c.token === 'ARRAY_SEPARATOR') {
        if (c.text === ';') {
          pushRow();
          row = [];
        }
        continue;
      }
      const t = evaluate(c, context);
      if (t.type === 'array' || t.type === 'reference') {
        return makeError('error array format', VALUE_ERROR);
      }
      row.push(t);
    }

    if (row.length) {
      pushRow();
    }

    if (error) {
      return makeError('array cols is not same!', VALUE_ERROR);
    }

    return {
      type: 'array',
      value: ret,
    };
  },
});
