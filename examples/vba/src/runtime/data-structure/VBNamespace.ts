import type { VBPointer } from './VBPointer';
import type { SubBinding, ClassBinding } from './runtime';

export type NamespaceValue =
  | VBPointer
  | SubBinding
  | ClassBinding
  | VBNamespace;

export type NamespaceMap = Map<string, NamespaceValue>;

export class VBNamespace {
  type: 'Namespace' = 'Namespace';
  value: NamespaceMap = new Map();
  constructor(public name: string) {}

  get(name: string) {
    return this.value.get(name);
  }

  set(name: string, value: VBPointer) {
    return this.value.set(name, value);
  }
}
