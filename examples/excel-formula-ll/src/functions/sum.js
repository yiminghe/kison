import { register } from './register.js';
import { toNumber } from './utils.js';

function sumValues(values) {
  let ret = 0;
  for (const d of values) {
    if (d.type === 'error') {
      return {
        type: 'error',
        value: '#error!',
      };
    }
    ret += toNumber(d) || 0;
  }
  return ret;
}

register('sum', {
  fn(args, context) {
    let ret = 0;
    for (const a of args) {
      if (a.type == 'error') {
        return {
          type: 'error',
          value: '#error!',
        };
      }
      if (a.type === 'array') {
        const v = sumValues(a.value);
        if (v.type === 'error') {
          return v;
        }
        ret += v;
      } else if (a.type === 'reference') {
        const v = sumValues(context.getCellValues(a.value));
        if (v.type === 'error') {
          return v;
        }
        ret += v;
      } else {
        ret += toNumber(a) || 0;
      }
    }
    return {
      type: 'number',
      value: ret,
    };
  }
});
