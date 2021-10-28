import type { VBObject } from './VBObject';

export class VBNamespace {
  type: 'Namespace' = 'Namespace';
  value: Map<string, VBObject> = new Map();
  constructor(public name: string) {}

  get(name: string) {
    return this.value.get(name);
  }

  set(name: string, value: VBObject) {
    return this.value.set(name, value);
  }
}
