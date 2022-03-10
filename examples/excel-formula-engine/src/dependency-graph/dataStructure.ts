import { collect } from './collectDeps';
import {
  Atom_Value_Type,
  Ref_Type,
  CellAddress,
  CellRange,
} from '../common/types';
import { Ast_Formula_Node } from '../parser';
import { evaluateRoot } from '../interpreter/index';
import { toCoordString } from '../utils';
import type { DependencyGraph } from './DependencyGraph';
import { isValueEqual } from './utils';
import { parse } from '../parserApi';
import { makeError } from '../functions/utils';

export class FormulaNode {
  readonly type = 'formula';
  deps: Ref_Type[] = [];
  ast: Ast_Formula_Node;

  cachedValue: Atom_Value_Type | undefined;

  constructor(
    private dependencyGraph: DependencyGraph,
    public formula: string,
    public address: CellAddress,
  ) {
    const { ast } = parse(formula);
    this.ast = (ast as any).toJSON();
    collect(ast, {
      addDep: (dep) => {
        this.deps.push(dep);
      },
    });
  }

  get coord() {
    return toCoordString(this.address);
  }

  clearCache() {
    this.cachedValue = undefined;
  }

  recompute() {
    const currentValue = this.cachedValue;
    const value = evaluateRoot(this.ast, {
      dependencyGraph: this.dependencyGraph,
      address: this.address,
    }) as Atom_Value_Type;
    this.cachedValue = value;
    return !currentValue || !isValueEqual(currentValue, value);
  }

  get value(): Atom_Value_Type {
    if (!this.cachedValue) {
      // TODO: fix type & array formula
      this.cachedValue = evaluateRoot(this.ast, {
        dependencyGraph: this.dependencyGraph,
        address: this.address,
      }) as Atom_Value_Type;
    }
    return this.cachedValue;
  }
}

export class ValueNode {
  readonly type = 'value';
  constructor(public value: Atom_Value_Type) {}
}

export class RangeNode {
  readonly type = 'range';
  private cachedValue = new Map<string, Atom_Value_Type>();
  cyclic = false;
  constructor(public range: CellRange) {}
  getValue(tag: string) {
    if (this.cyclic) {
      return makeError('', '#CYCLE!');
    }
    return this.cachedValue.get(tag);
  }
  setValue(tag: string, value: Atom_Value_Type) {
    this.cachedValue.set(tag, value);
  }
  clear() {
    this.cyclic = false;
    this.cachedValue.clear();
  }
}

export type DependencyNode = ValueNode | RangeNode | FormulaNode;
