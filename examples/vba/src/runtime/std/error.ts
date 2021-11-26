import { SubBinder, VariableBinder, VBInteger, VBString } from '../types';

const error: SubBinder = {
  name: 'error',
  type: 'SubBinder',
  argumentsInfo: [
    {
      name: 'number',
    },
  ],
  async value(args, context) {
    const number = await args.getValue('number');
    const n = number?.type === 'Integer' ? number.value : 1000;
    context.throwError(n);
  },
};

const errDescription: VariableBinder = {
  name: 'Err.Description'.toLowerCase(),
  type: 'VariableBinder',
  async get(context) {
    const error = context.getCurrentScopeInternal().error;
    const str = error?.message || '';
    return context.createString(str);
  },
};

const errSource: VariableBinder = {
  name: 'Err.Source'.toLowerCase(),
  type: 'VariableBinder',
  async get(context) {
    const error = context.getCurrentScopeInternal().error;
    const str = error?.vbErrorSource || '';
    return context.createString(str);
  },
};

const errNumber: VariableBinder = {
  name: 'Err.Number'.toLowerCase(),
  type: 'VariableBinder',
  async get(context) {
    const error = context.getCurrentScopeInternal().error;
    const str = error?.vbErrorNumber || 0;
    return context.createInteger(str);
  },
};

const errClear: SubBinder = {
  name: 'Err.Clear'.toLowerCase(),
  type: 'SubBinder',
  argumentsInfo: [],
  async value(_args, context) {
    const { scopeStack } = context;
    const error = scopeStack[scopeStack.length - 2].error;
    if (error) {
      error.vbErrorNumber = 0;
      error.vbErrorSource = '';
      error.message = '';
    }
  },
};

const errRaise: SubBinder = {
  name: 'Err.Raise'.toLowerCase(),
  type: 'SubBinder',
  argumentsInfo: [
    {
      name: 'number',
    },
    {
      name: 'source',
      optional: true,
    },
    {
      name: 'description',
      optional: true,
    },
  ],
  async value(args, context) {
    const number: VBInteger = ((await args.getValue('number')) as VBInteger)!;
    const source: VBString | undefined = (await args.getValue(
      'source',
    )) as VBString;
    const description: VBString | undefined = (await args.getValue(
      'description',
    )) as VBString;
    context.throwError(number?.value || 0, source?.value, description?.value);
  },
};

export default [
  error,
  errDescription,
  errNumber,
  errClear,
  errRaise,
  errSource,
];
