import { throwVBRuntimeError } from '../errorCodes';
import { VBAny } from './VBPointer';

export interface NamedArg {
  type: 'named';
  value: VBAny;
  name: 'string';
}

export interface IndexedArg {
  type: 'indexed';
  value: VBAny;
}

export class VBArguments {
  namedValues: Record<string, VBAny> | undefined = undefined;
  constructor(public indexedValues: VBAny[] = []) {}
  addIndexedValue(value: VBAny) {
    if (this.namedValues) {
      throwVBRuntimeError('SYNTAX_ERROR');
    }
    this.indexedValues.push(value);
  }
  addNamedValue(name: string, value: VBAny) {
    this.namedValues = this.namedValues || {};
    this.namedValues[name] = value;
  }
  getNamedValue(name: string) {
    return this.namedValues && this.namedValues[name];
  }
  getIndexedValue(i: number) {
    return this.indexedValues[i];
  }
  addArg(arg: IndexedArg | NamedArg) {
    if (arg.type === 'indexed') {
      this.addIndexedValue(arg.value);
    } else {
      this.addNamedValue(arg.name, arg.value);
    }
  }
}
