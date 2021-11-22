import parser from './parser';

// // @ts-ignore
// const parse = parser.parse;
// // @ts-ignore
// parser.parse = (input, options = {}) => {
//   return parse(input, {
//     ...options,
//     globalMatch: false,
//   })
// };

export type {
  UserSubBinder as SubBinder,
  UserVariableBinder as VariableBinder,
  UserClassBinder as ClassBinder,
} from './runtime/types';
export { parser };
export { Context } from './runtime/Context';
export type { CallOptions, VBArguments } from './runtime/Context';
