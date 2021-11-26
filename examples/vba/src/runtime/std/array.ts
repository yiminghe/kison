import { throwVBRuntimeError } from '../data-structure/VBError';
import { SubBinder } from '../types';

const ubound: SubBinder = {
  name: 'ubound',
  type: 'SubBinder',
  argumentsInfo: [
    {
      name: 'arg',
    },
  ],
  async value(args, context) {
    const value = await args.getValue('arg');
    if (value?.type !== 'Array') {
      throwVBRuntimeError(context, 'EXPECTED_ARRAY_TYPE', 'ubound');
    }
    return value.ubound();
  },
};

const lbound: SubBinder = {
  name: 'lbound',
  type: 'SubBinder',
  argumentsInfo: [
    {
      name: 'arg',
    },
  ],
  async value(args, context) {
    const value = await args.getValue('arg');
    if (value?.type !== 'Array') {
      throwVBRuntimeError(context, 'EXPECTED_ARRAY_TYPE', 'lbound');
    }
    return value.lbound();
  },
};

export default [ubound, lbound];
