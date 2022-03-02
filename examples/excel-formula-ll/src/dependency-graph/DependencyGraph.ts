import { Atom_Value_Type, RawCellAddress, CellRange } from '../common/types';
import { addressInRange, isSingleCellRange } from '../interpreter/utils';
import { CYCLE_ERROR, EMPTY_VALUE } from '../common/constants';
import {
  FormulaNode,
  ValueNode,
  RangeNode,
  DependencyNode,
} from './dataStructure';
import { getCellAddressKey, getCellRangeKey } from './utils';
import { isFormula } from './../utils';
import { makeError } from '../functions/utils';

export type { DependencyNode };

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
    this.stopTransaction();
    this.flush();
  }

  stopTransaction() {
    this.batching--;
    if (this.batching < 0) {
      throw new Error('Error batch inside DependencyGraph!');
    }
  }

  flush() {
    if (!this.batching) {
      const shouldCheckSet = new Set(this.changedNodes);
      const { scc, sorted } = this.sort(this.changedNodes);
      this.changedNodes.clear();
      for (const c of scc) {
        if (c.type !== 'formula') {
          throw new Error('cyclic but not formula!');
        }
        c.cachedValue = makeError('', CYCLE_ERROR);
      }
      for (const s of sorted) {
        if (!shouldCheckSet.has(s)) {
          continue;
        }
        let check = false;
        if (s.type === 'value') {
          check = true;
        } else if (s.type === 'range') {
          s.cachedValue.clear();
          check = true;
        } else if (s.type === 'formula') {
          // recompute
          check = s.recompute();
        }
        if (check) {
          const dependents = this.dependents.get(s);
          if (dependents) {
            for (const d of dependents) {
              shouldCheckSet.add(d);
            }
          }
        }
      }
    }
  }

  sort(nodes: Iterable<DependencyNode>) {
    const visited = new Set<DependencyNode>();
    const has = (n: DependencyNode) => {
      return !scc.has(n) && !visited.has(n);
    };
    const scc = new Set<DependencyNode>();
    const sorted: DependencyNode[] = [];
    for (const n of nodes) {
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

  getCellValue(address: RawCellAddress) {
    const node = this.getNode(address) as FormulaNode | ValueNode;
    if (!node) {
      return EMPTY_VALUE;
    }
    return node.value;
  }

  getCellArrayFromRange(range: CellRange) {
    let lastRowNumber = -1;
    const value: Atom_Value_Type[][] = [];
    let lastRow: Atom_Value_Type[] = [];
    for (const cell of this.getCellFromRange(range)) {
      if (cell.row !== lastRowNumber) {
        if (lastRowNumber !== -1) {
          value.push(lastRow);
          lastRow = [];
        }
        lastRowNumber = cell.row;
      }
      lastRow.push(this.getCellValue(cell));
    }
    if (lastRowNumber !== -1) {
      value.push(lastRow);
    }
    return value;
  }

  *getCellFromRange(range: CellRange) {
    const start = range.start;
    const end = range.end!;
    const maxCol = Math.min(end.col, this.width);
    const maxRow = Math.min(end.row, this.height);
    for (let r = start.row; r <= maxRow; r++) {
      for (let c = start.col; c <= maxCol; c++) {
        yield { row: r, col: c };
      }
    }
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

  checkAndcleanNode(node: DependencyNode) {
    if (node.type === 'value' && node.value.type === 'empty') {
    }
    if (node.type === 'range') {
    }
  }

  removePrecedents(oldNode: DependencyNode) {
    const precedents = this.precedents.get(oldNode);
    if (precedents) {
      this.precedents.delete(oldNode);
      for (const d of precedents) {
        const dependents = this.dependents.get(d)!;
        dependents.delete(oldNode);
        if (!dependents.size && d.type == 'range') {
          this.removePrecedents(d);
          this.rangeNodes.delete(getCellRangeKey(d.range));
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

  setFormulaCell(
    address: RawCellAddress,
    formula: string,
    value?: Atom_Value_Type,
  ) {
    const { row, col } = address;
    this.width = Math.max(this.width, col);
    this.height = Math.max(this.height, row);
    let node: DependencyNode | undefined = undefined;
    if (isFormula(formula)) {
      formula = formula.slice(1);
    }
    node = new FormulaNode(this, formula, address);
    if (value) {
      node.cachedValue = value;
    }
    for (const dep of node.deps) {
      for (const r of dep.value) {
        if (isSingleCellRange(r)) {
          const depNode = this.getOrCreateCellNode(r.start);
          this.addEdge(depNode, node);
        } else {
          const depNode = this.getOrCreateRangeNode(r);
          this.addDependent(depNode, node);
          this.addPrecedent(node, depNode);
          for (const cellAddress of this.getCellFromRange(r)) {
            const cell = this.getOrCreateCellNode(cellAddress);
            this.addEdge(cell, depNode);
          }
        }
      }
    }
    this.swapOrSetNode(address, node);
  }

  setCell(address: RawCellAddress, value: Atom_Value_Type) {
    const { row, col } = address;
    this.width = Math.max(this.width, col);
    this.height = Math.max(this.height, row);
    const valueNode = this.getNode(address);

    if (valueNode && value.type === 'empty') {
      const dependents = this.dependents.get(valueNode);
      if (!dependents || !dependents.size) {
        this.removeNode(address);
        return;
      }
    }

    if (valueNode && valueNode.type === 'value') {
      valueNode.value = value;
      this.swapOrSetNode(address, valueNode);
    } else {
      if (!valueNode && value.type === 'empty') {
        return;
      }
      this.swapOrSetNode(address, new ValueNode(value));
    }
  }

  removeNode(address: RawCellAddress) {
    const node = this.getNode(address);
    const row = this.nodes[address.row];
    if (row) {
      row[address.col] = undefined!;
    }
    this.formulaNodes.delete(getCellAddressKey(address));
    this.removeEdge(node);
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
    const node = new ValueNode(EMPTY_VALUE);
    nodes[address.row] = nodes[address.row] || [];
    nodes[address.row][address.col] = node;
    return node;
  }

  swapOrSetNode(address: RawCellAddress, node: DependencyNode) {
    const oldNode = this.getNode(address);

    if (oldNode) {
      this.removePrecedents(oldNode);
      const dependents = this.dependents.get(oldNode);
      if (dependents) {
        this.dependents.delete(oldNode);
        this.dependents.set(node, dependents);
        for (const d of dependents) {
          const precedents = this.precedents.get(d)!;
          if (precedents.has(oldNode)) {
            precedents.delete(oldNode);
            precedents.add(node);
          }
        }
      }
    } else {
      for (const r of this.rangeNodes.values()) {
        if (addressInRange(r.range, address)) {
          this.addEdge(node, r);
        }
      }
    }

    const { nodes } = this;
    nodes[address.row] = nodes[address.row] || [];
    nodes[address.row][address.col] = node;

    if (node.type === 'formula') {
      this.formulaNodes.set(getCellAddressKey(address), node);
    }

    this.changedNodes.add(node);
    return node;
  }
}
