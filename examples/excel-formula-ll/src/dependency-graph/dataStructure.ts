import { makeString } from '../functions/utils';
import { collect } from './collectDeps';
import {
  Atom_Value_Type,
  Raw_Value,
  Ref_Type,
  CellAddress,
  RawCellAddress,
  CellRange,
} from '../interpreter/types';
import parser from '../parser';
import { addressInRange, isSingleCellRange } from '../interpreter/utils';
import { Ast_Formula_Node } from '../parser';
import { run } from '../interpreter/index';
import { toCoordString } from '../utils';
import { EMPTY_VALUE } from '../common/constants';
import type { DependencyGraph } from './DependencyGraph';

export class FormulaNode {
  readonly type = 'formula';
  deps: Ref_Type[] = [];
  ast: Ast_Formula_Node;

  cachedValue: Atom_Value_Type | undefined;

  constructor(
    private dependencyGraph: DependencyGraph,
    public formula: string,
    public address: RawCellAddress,
  ) {
    const { ast } = parser.parse(formula);
    this.ast = ast;
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

export class EmptyNode {
  readonly type = 'empty';
  readonly value = EMPTY_VALUE;
  constructor() {}
}

export type DependencyNode = ValueNode | RangeNode | FormulaNode | EmptyNode;
