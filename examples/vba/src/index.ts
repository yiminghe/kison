import parser from './parser';
import { Context } from './runtime/Context';

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

export { parser, Context };
