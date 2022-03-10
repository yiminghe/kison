import parser from './parser';
import compile2 from './compile';

export * from './parser';
export type { CompilerOptions } from './Compiler';
export const parse = parser.parse;
export const compile = compile2;
