import { throwVBError } from '../errorCodes';
import { SubBinder } from '../types';

export const ubound: SubBinder = {
  name: 'ubound',
  type: 'SubBinder',
  argumentsInfo: [
    {
      name: 'arg',
    },
  ],
  async value(args) {
    const value = await args.getValue('arg');
    if (value?.type !== 'Array') {
      throwVBError('EXPECTED_ARRAY_TYPE', 'ubound');
    }
    return value.ubound();
  },
};

export const lbound: SubBinder = {
  name: 'lbound',
  type: 'SubBinder',
  argumentsInfo: [
    {
      name: 'arg',
    },
  ],
  async value(args) {
    const value = await args.getValue('arg');
    if (value?.type !== 'Array') {
      throwVBError('EXPECTED_ARRAY_TYPE', 'lbound');
    }
    return value.lbound();
  },
};
