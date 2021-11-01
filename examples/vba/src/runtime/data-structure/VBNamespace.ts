import type { VBObject } from './VBObject';
import type { SubBinder, ClassBinder } from './runtime';

export type BinderValue =
  | VBObject
  | SubBinder
  | ClassBinder
  | VBNamespaceBinder;

export type BinderMap = Map<string, BinderValue>;

export class VBNamespaceBinder {
  type: 'Namespace' = 'Namespace';
  value: BinderMap = new Map();
  constructor(public name: string) {}

  get(name: string) {
    return this.value.get(name);
  }

  set(name: string, value: VBObject) {
    return this.value.set(name, value);
  }
}
