import type { Context } from '../interpreter/types';
import type { All_Value_Type } from '../common/types';

export const functions = new Map();

interface Def {
  argumentLength?: number;
  allowErrorArgument?: boolean;
  interceptArgument?: (
    arg: {
      index: number;
      value?: All_Value_Type;
    },
    args: All_Value_Type[],
  ) => {
    value: All_Value_Type | undefined;
  } | null;
  fn: (args: All_Value_Type[], context: Context) => All_Value_Type;
}

export function register(name: string, def: Def) {
  functions.set(name, def);
}
