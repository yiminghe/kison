import { throwVBRuntimeError } from '../data-structure/VBError';
import { SubBinding } from '../types';

const ubound: SubBinding = {
  name: 'ubound',
  type: 'SubBinding',
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

const lbound: SubBinding = {
  name: 'lbound',
  type: 'SubBinding',
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

const array: SubBinding = {
  name: 'array',
  type: 'SubBinding',
  argumentsInfo: [
    {
      name: 'values',
      paramArray: true,
    },
  ],
  async value(args) {
    return await args.getValue('values');
  },
};

export default [ubound, lbound, array];
