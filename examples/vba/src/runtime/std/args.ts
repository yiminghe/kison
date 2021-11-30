import { SubBinding } from '../types';

const isMissing: SubBinding = {
  name: 'ismissing',
  type: 'SubBinding',
  argumentsInfo: [
    {
      name: 'arg',
    },
  ],
  async value(args, context) {
    const value = await args.getValue('arg');
    return context.createBoolean(value?.type === 'MissingArgument');
  },
};

export default [isMissing];
