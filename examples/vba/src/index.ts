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
  VBArray,
  UserSubBinding as SubBinding,
  UserVariableBinding as VariableBinding,
  UserClassBinding as ClassBinding,
} from './runtime/types';
export { parser };
export { VBArguments } from './runtime/types';
export { Context } from './runtime/Context';
export type { CallOptions, VBBindingArguments } from './runtime/Context';
