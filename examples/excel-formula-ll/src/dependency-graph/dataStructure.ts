import { collect } from './collectDeps';
import {
  Atom_Value_Type,
  Ref_Type,
  CellAddress,
  CellRange,
} from '../common/types';
import parser from '../parser';
import { Ast_Formula_Node } from '../parser';
import { run } from '../interpreter/index';
import { toCoordString } from '../utils';
import type { DependencyGraph } from './DependencyGraph';
import { isValueEqual } from './utils';

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
    const { ast } = parser.parse(formula);
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
    const value = run(this.ast, {
      dependencyGraph: this.dependencyGraph,
      address: this.address,
    }) as Atom_Value_Type;
    return !currentValue || !isValueEqual(currentValue, value);
  }

  get value(): Atom_Value_Type {
    if (!this.cachedValue) {
      // TODO: fix type & array formula
      this.cachedValue = run(this.ast, {
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
  readonly cachedValue = new Map<string, Atom_Value_Type>();
  constructor(public range: CellRange) {}
}

export type DependencyNode = ValueNode | RangeNode | FormulaNode;
