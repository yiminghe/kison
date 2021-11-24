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
      throw new Error('syntax error!');
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
      throw new Error('syntax error!');
    }
    return value.lbound();
  },
};
