import type { All_Type, Context } from '../evaluator/types';

export const functions = new Map();

interface Def {
  argumentLength?: number;
  allowErrorArgument?: boolean;
  interceptArgument?: (
    arg: {
      index: number;
      value?: All_Type;
    },
    args: All_Type[],
  ) => {
    value: All_Type | undefined;
  } | null;
  fn: (args: All_Type[], context: Context) => All_Type;
}

export function register(name: string, def: Def) {
  functions.set(name, def);
}
