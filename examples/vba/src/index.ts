import parser from './parser';
import { Context } from './runtime/Context';
import type {
  SubBinder as StrictSubBinder,
  UserVariableBinder,
} from './runtime/types';

// // @ts-ignore
// const parse = parser.parse;
// // @ts-ignore
// parser.parse = (input, options = {}) => {
//   return parse(input, {
//     ...options,
//     globalMatch: false,
//   })
// };

export { VBObject, VBBoolean, VBInteger } from './runtime/types';

export type SubBinder = Omit<StrictSubBinder, 'type'>;
export type VariableBinder = UserVariableBinder;

export { parser, Context };
