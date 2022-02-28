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
import { getCellFromRange } from './utils';
import { evaluate } from '../interpreter/index';
import { toCoordString } from '../utils';

class FormulaNode {
  readonly type = 'formula';
  deps: Ref_Type[] = [];
  ast: Ast_Formula_Node;

  cachedValue: Atom_Value_Type | undefined;

  constructor(public formula: string, public address: RawCellAddress) {
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

  getValue(): Atom_Value_Type {
    if (!this.cachedValue) {
      // TODO: fix type
      this.cachedValue = evaluate(this.ast) as Atom_Value_Type;
    }
    return this.cachedValue;
  }
}

class ValueNode {
  readonly type = 'value';
  constructor(public value: Atom_Value_Type) {}
}

class RangeNode {
  readonly type = 'range';
  constructor(public value: CellRange) {}
}

class EmptyNode {
  readonly type = 'empty';
  constructor() {}
}

export type DependencyNode = ValueNode | RangeNode | FormulaNode | EmptyNode;

function getCellAddressKey(address: RawCellAddress) {
  return `${address.row}_${address.col}`;
}

function getCellRangeKey(range: CellRange) {
  return `${getCellAddressKey(range.start)}_${
    range.end && getCellAddressKey(range.end)
  }`;
}

function isFormula(text: string) {
  return text.startsWith('=');
}

export class DependencyGraph {
  precedents: Map<DependencyNode, Set<DependencyNode>> = new Map();
  dependents: Map<DependencyNode, Set<DependencyNode>> = new Map();
  nodes: DependencyNode[][] = [];
  width = 0;
  height = 0;
  formulaNodes: Map<string, FormulaNode> = new Map();
  rangeNodes: Map<string, RangeNode> = new Map();
  batching = 0;
  changedNodes: Set<DependencyNode> = new Set();

  beginTransaction() {
    this.batching++;
  }

  endTransaction() {
    this.batching--;
    if (this.batching < 0) {
      throw new Error('Error batch inside DependencyGraph!');
    }
    this.flush();
  }

  flush() {
    if (!this.batching) {
      const changedNodes = Array.from(this.changedNodes.values());
      this.changedNodes.clear();
    }
  }

  sort() {
    const visited = new Set<DependencyNode>();
    const has = (n: DependencyNode) => {
      return !scc.has(n) && !visited.has(n);
    };
    const scc = new Set<DependencyNode>();
    const sorted: DependencyNode[] = [];
    for (const n of this.formulaNodes.values()) {
      if (!has(n)) {
        continue;
      }
      const ret = this._topologicalSortWithScc(n, has);
      for (const s of ret.sccs.flat()) {
        scc.add(s);
      }
      for (const s of ret.sorted) {
        sorted.push(s);
        visited.add(s);
      }
    }
    sorted.reverse();
    return {
      scc,
      sorted,
    };
  }

  /**
   * tarjan algorithm, https://yiminghe.me/lab/playground/find_circuits/index.html
   */
  _topologicalSortWithScc(
    root: DependencyNode,
    has: (n: DependencyNode) => boolean,
    ret = {
      low: new Map<DependencyNode, number>(),
      dfn: new Map<DependencyNode, number>(),
      count: 0,
      visited: new Set<DependencyNode>(),
      stack: [] as DependencyNode[],
      sorted: [] as DependencyNode[],
      // strong connect components
      sccs: [] as DependencyNode[][],
    },
  ) {
    ret.count++;
    const { low, dfn, visited, stack, count, sccs, sorted } = ret;
    low.set(root, count);
    dfn.set(root, count);
    visited.add(root);
    stack.push(root);
    const to = this.dependents.get(root);

    if (to) {
      for (const next of to) {
        if (!has(next)) {
          continue;
        }
        if (!visited.has(next)) {
          this._topologicalSortWithScc(next, has, ret);
          low.set(root, Math.min(low.get(root)!, low.get(next)!));
        } else if (
          stack.indexOf(next) !== -1 &&
          dfn.get(next)! < low.get(root)!
        ) {
          low.set(root, dfn.get(next)!);
        }
      }
    }

    if (low.get(root) === dfn.get(root) && stack.length > 0) {
      let next;
      let scc: DependencyNode[] = [];
      do {
        next = stack.pop()!;
        scc.push(next);
      } while (next !== root);

      if (scc.length > 1) {
        sccs.push(scc.reverse());
      } else {
        sorted.push(scc[0]);
      }
    }

    return ret;
  }

  addDependent(from: DependencyNode, to: DependencyNode) {
    let set = this.dependents.get(from);
    if (!set) {
      set = new Set();
      this.dependents.set(from, set);
    }
    set.add(to);
  }

  addPrecedent(from: DependencyNode, to: DependencyNode) {
    let set = this.precedents.get(from);
    if (!set) {
      set = new Set();
      this.precedents.set(from, set);
    }
    set.add(to);
  }

  removeDependents(oldNode: DependencyNode) {
    const dependents = this.dependents.get(oldNode);
    if (dependents) {
      this.dependents.delete(oldNode);
      for (const d of dependents) {
        const precedents = this.precedents.get(d);
        if (precedents?.has(oldNode)) {
          precedents.delete(oldNode);
        }
      }
    }
  }

  removePrecedents(oldNode: DependencyNode) {
    const precedents = this.precedents.get(oldNode);
    if (precedents) {
      this.precedents.delete(oldNode);
      for (const d of precedents) {
        const dependents = this.dependents.get(d);
        if (dependents?.has(oldNode)) {
          dependents.delete(oldNode);
        }
      }
    }
  }

  removeEdge(oldNode: DependencyNode) {
    this.removeDependents(oldNode);
    this.removePrecedents(oldNode);
  }

  addEdge(from: DependencyNode, to: DependencyNode) {
    this.addDependent(from, to);
    this.addPrecedent(to, from);
  }

  setCell({ row, col }: RawCellAddress, data: Raw_Value) {
    this.width = Math.max(this.width, col);
    this.height = Math.max(this.height, row);
    const address = { row, col };
    let node: DependencyNode | undefined = undefined;
    if (typeof data === 'string') {
      if (isFormula(data)) {
        const oldNode = this.getNode(address);
        if (oldNode) {
          this.removePrecedents(oldNode);
        }
        node = new FormulaNode(data.slice(1), address);
        for (const dep of node.deps) {
          for (const r of dep.value) {
            if (isSingleCellRange(r)) {
              const depNode = this.getOrCreateCellNode(r.start);
              this.addEdge(depNode, node);
            } else {
              const depNode = this.getOrCreateRangeNode(r);
              this.addDependent(depNode, node);
              this.addPrecedent(node, depNode);
              for (const cellAddress of getCellFromRange(r, this)) {
                const cell = this.getOrCreateCellNode(cellAddress);
                this.addEdge(cell, depNode);
              }
            }
          }
        }
      } else {
        node = new ValueNode(makeString(data));
      }
    } else {
    }
    if (node) {
      this.swapOrSetNode(address, node);
    }
  }

  getNode(address: RawCellAddress) {
    return this.nodes[address.row]?.[address.col];
  }

  getOrCreateRangeNode(range: CellRange) {
    const key = getCellRangeKey(range);
    const existNode = this.rangeNodes.get(key);
    if (existNode) {
      return existNode;
    }
    const node = new RangeNode(range);
    this.rangeNodes.set(key, node);
    return node;
  }

  getOrCreateCellNode(address: RawCellAddress) {
    const { nodes } = this;
    const existNode = nodes[address.row]?.[address.col];
    if (existNode) {
      return existNode;
    }
    const node = new EmptyNode();
    nodes[address.row] = nodes[address.row] || [];
    nodes[address.row][address.col] = node;
    return node;
  }

  swapOrSetNode(address: RawCellAddress, node: DependencyNode) {
    const oldNode = this.getNode(address);
    const { nodes } = this;
    nodes[address.row] = nodes[address.row] || [];
    nodes[address.row][address.col] = node;
    if (node.type === 'formula') {
      this.formulaNodes.set(getCellAddressKey(address), node);
    }
    if (oldNode) {
      {
        const dependents = this.dependents.get(oldNode);
        if (dependents) {
          this.dependents.delete(oldNode);
          this.dependents.set(node, dependents);
          for (const d of dependents) {
            const precedents = this.precedents.get(d);
            if (precedents?.has(oldNode)) {
              precedents.delete(oldNode);
              precedents.add(node);
            }
          }
        }
      }

      {
        const precedents = this.precedents.get(oldNode);
        if (precedents) {
          this.precedents.delete(oldNode);
          this.precedents.set(node, precedents);
          for (const d of precedents) {
            const dependents = this.dependents.get(d);
            if (dependents?.has(oldNode)) {
              dependents.delete(oldNode);
              dependents.add(node);
            }
          }
        }
      }
    } else {
      for (const r of this.rangeNodes.values()) {
        if (addressInRange(r.value, address)) {
          this.addEdge(node, r);
        }
      }
    }
    this.changedNodes.add(node);
    return node;
  }
}
