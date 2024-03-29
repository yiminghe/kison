import { Atom_Value_Type, Error_Type } from '../common/types';
import { isSingleCellRange } from '../interpreter/utils';
import { isValidCellRange } from '../utils';
import { register } from './register';
import { makeError, REF_ERROR, VALUE_ERROR } from './utils';

function sumValues(values: Atom_Value_Type[][]): Error_Type | number {
  let ret = 0;
  for (const line of values) {
    if (line) {
      for (const d of line) {
        if (d.type === 'error') {
          return d;
        }
        if (typeof d.value === 'number') {
          ret += d.value;
        }
      }
    }
  }
  return ret;
}

register('sum', {
  fn(args, { dependencyGraph }) {
    let ret: number = 0;
    for (const a of args) {
      if (a.type == 'error') {
        return a;
      }
      if (a.type === 'array') {
        const v = sumValues(a.value);
        if (typeof v !== 'number') {
          return v;
        }
        ret += v;
      } else if (a.type === 'reference') {
        const rs = a.value;
        let values: Atom_Value_Type[][] = [];

        for (const r of rs) {
          if (!isValidCellRange(r)) {
            return makeError('', REF_ERROR);
          }
          if (isSingleCellRange(r)) {
            const value = dependencyGraph.getCellValue(r.start);
            values.push([value]);
          } else {
            const rangeNode = dependencyGraph.getOrCreateRangeNode(r);
            let sumValue = rangeNode.getValue('sum');
            if (!sumValue) {
              let rangeValues: Atom_Value_Type[][] = [];
              for (const sr of dependencyGraph.getCellFromRange(r)) {
                const value = dependencyGraph.getCellValue(sr);
                rangeValues.push([value]);
              }
              const ret = sumValues(rangeValues);
              if (typeof ret === 'number') {
                sumValue = {
                  type: 'number',
                  value: ret,
                };
                rangeNode.setValue('sum', sumValue);
              } else {
                sumValue = ret;
                rangeNode.setValue('sum', ret);
              }
            }
            values.push([sumValue]);
          }
        }

        const v = sumValues(values);

        if (typeof v !== 'number') {
          return v;
        }
        ret += v;
      } else if (typeof a.value === 'number') {
        ret += a.value;
      } else {
        return makeError('not number type!', VALUE_ERROR);
      }
    }
    return {
      type: 'number',
      value: ret,
    };
  },
});
