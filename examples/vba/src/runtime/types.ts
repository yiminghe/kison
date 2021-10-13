export class VBNumber {
  type: 'number' = 'number';
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

export type VBTypes = VBNumber | undefined;

interface SubDefArgs {
  args: VBTypes[];
}

export interface SubDef {
  fn: (args: SubDefArgs) => VBTypes;
  name: string;
}
