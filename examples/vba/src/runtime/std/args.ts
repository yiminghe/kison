import { SubBinder } from '../types';

const isMissing: SubBinder = {
  name: 'ismissing',
  type: 'SubBinder',
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
