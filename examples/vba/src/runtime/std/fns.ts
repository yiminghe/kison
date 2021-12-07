import { SubBinding } from '../types';

const isObject: SubBinding = {
  name: 'isObject'.toLowerCase(),
  type: 'SubBinding',
  argumentsInfo: [
    {
      name: 'item',
    },
  ],
  async value(args, context) {
    const item = await args.getValue('item');
    if (!item || item.value === undefined) {
      context.throwError('TYPE_MISMATCH');
    }
  },
};

export default [isObject];
