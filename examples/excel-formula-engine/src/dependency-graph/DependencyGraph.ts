import {
  Atom_Value_Type,
  CellAddress,
  CellRange,
  CellValue,
} from '../common/types';
import { addressInRange, isSingleCellRange } from '../interpreter/utils';
import { CYCLE_ERROR, EMPTY_VALUE, REF_ERROR } from '../common/constants';
import {
  FormulaNode,
  ValueNode,
  RangeNode,
  DependencyNode,
} from './dataStructure';
import {
  getCellAddressKey,
  getCellRangeKey,
  transformEmptyValue,
} from './utils';
import { isFormula, isValidCellAddress, isValidCellRange } from './../utils';
import { makeError } from '../functions/utils';
import {
  transformByInsertRows,
  transformRangeByInsertRows,
  transformByDeleteRows,
  transformRangeByDeleteRows,
} from '../transformer/index';
import { serialize } from '../serializer/index';
import type { FormulaTransform, RangeTransform, ChangedCell } from './types';

export type { DependencyNode };

export class DependencyGraph {
  precedents: Map<DependencyNode, Set<DependencyNode>> = new Map();
  dependents: Map<DependencyNode, Set<DependencyNode>> = new Map();
  nodes: DependencyNode[][] = [];
  width = 0;
  formulaNodes: Map<string, FormulaNode> = new Map();
  rangeNodes: Map<string, RangeNode> = new Map();
  batching = 0;
  changedNodes: Set<DependencyNode> = new Set();
  beforeValues: Map<
    DependencyNode,
    { address: CellAddress; value?: CellValue }
  > = new Map();

  get height() {
    return this.nodes.length - 1;
  }

  beginTransaction() {
    this.batching++;
  }

  endTransaction() {
    this.stopTransaction();
    return this.flush();
  }

  stopTransaction() {
    this.batching--;
    if (this.batching < 0) {
      throw new Error('Error batch inside DependencyGraph!');
    }
  }

  _getCellValueFromNode(node: FormulaNode | ValueNode): CellValue {
    if (node.type === 'formula') {
      return {
        type: 'formula',
        value: transformEmptyValue(node.cachedValue),
        formula: node.formula,
      };
    }
    return transformEmptyValue(node.value);
  }

  pushUpdates(
    updates: ChangedCell[],
    address: CellAddress,
    before: CellValue,
    node: FormulaNode | ValueNode,
  ) {
    const { beforeValues } = this;
    if (beforeValues.has(node)) {
      before = beforeValues.get(node)!.value;
    }
    updates.push({
      type: 'update',
      address,
      before,
      after: this._getCellValueFromNode(node),
    });
  }

  flush() {
    if (!this.batching && this.changedNodes.size) {
      const { beforeValues } = this;
      const shouldCheckSet = new Set(this.changedNodes);
      const { scc, sorted } = this.sort(this.changedNodes);
      this.changedNodes.clear();
      const updateNodes: ChangedCell[] = [];
      for (const c of scc) {
        if (c.type === 'range') {
          c.cyclic = true;
          continue;
        }
        if (c.type !== 'formula') {
          throw new Error(c.type + ': cyclic but not formula!');
        }
        const { cachedValue } = c;
        if (
          !cachedValue ||
          cachedValue.type !== 'error' ||
          cachedValue.value !== CYCLE_ERROR
        ) {
          const before = this._getCellValueFromNode(c);
          c.cachedValue = makeError('', CYCLE_ERROR);
          this.pushUpdates(updateNodes, c.address, before, c);
        }
        beforeValues.delete(c);
      }
      for (const s of sorted) {
        if (!shouldCheckSet.has(s)) {
          continue;
        }
        let check = false;
        if (s.type === 'value') {
          check = true;
          if (!beforeValues.has(s)) {
            throw new Error('beforeValues/changeNodes unsync!');
          }
          const { address, value } = beforeValues.get(s)!;
          this.pushUpdates(updateNodes, address, value, s);
        } else if (s.type === 'range') {
          s.clear();
          check = true;
        } else if (s.type === 'formula') {
          const before = this._getCellValueFromNode(s);
          // recompute
          check = s.recompute();
          if (check || beforeValues.has(s)) {
            this.pushUpdates(updateNodes, s.address, before, s);
          }
        }
        if (check) {
          const dependents = this.dependents.get(s);
          if (dependents) {
            for (const d of dependents) {
              shouldCheckSet.add(d);
            }
          }
        }
        beforeValues.delete(s);
      }
      for (const node of beforeValues.keys()) {
        if (node.type === 'formula') {
          this.pushUpdates(updateNodes, node.address, undefined, node);
        }
      }
      beforeValues.clear();
      return updateNodes;
    }
    return [];
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

  getCellValue(address: CellAddress) {
    if (!isValidCellAddress(address)) {
      return makeError('', REF_ERROR);
    }
    const node = this.getNode(address) as FormulaNode | ValueNode;
    if (!node) {
      return EMPTY_VALUE;
    }
    return node.value;
  }

  getCellArrayFromRange(range: CellRange) {
    if (!isValidCellRange(range)) {
      return [[makeError('', REF_ERROR)]];
    }
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
    const maxCol = !isFinite(end.col) ? this.width : end.col;
    const maxRow = !isFinite(end.row) ? this.height : end.row;
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
    address: CellAddress,
    formula: string,
    value?: Atom_Value_Type,
  ) {
    const { col } = address;
    this.width = Math.max(this.width, col);
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

  setCell(address: CellAddress, value: Atom_Value_Type) {
    const { col } = address;
    this.width = Math.max(this.width, col);
    const valueNode = this.getNode(address);
    if (!valueNode && value.type === 'empty') {
      return;
    }
    this.swapOrSetNode(address, new ValueNode(value));
  }

  deleteRows(at: number, count = 1) {
    const { nodes } = this;
    if (nodes.length > at) {
      for (let row = at; row < at + count; row++) {
        const rowCells = nodes[row];
        if (rowCells) {
          for (const [col, d] of rowCells.entries()) {
            if (!d) {
              continue;
            }
            this.removeCellNode({ row, col });
          }
        }
      }
      nodes.splice(at, count);
    }

    this._transform(
      (node) => transformByDeleteRows(node.address, node.ast, at, count),
      (node) => transformRangeByDeleteRows(node.range, at, count),
    );
  }

  _transform(
    formulaTransform: FormulaTransform,
    rangeTransform: RangeTransform,
  ) {
    const { formulaNodes, rangeNodes } = this;

    for (const node of Array.from(formulaNodes.values())) {
      const { ast, address } = formulaTransform(node);
      if (node.address !== address) {
        const oldAddressKey = getCellAddressKey(node.address);
        node.address = address;
        formulaNodes.delete(oldAddressKey);
        formulaNodes.set(getCellAddressKey(node.address), node);
      }
      if (node.ast !== ast) {
        this.beforeValues.set(node, {
          address: node.address,
          value: this._getCellValueFromNode(node),
        });
        node.ast = ast;
        node.formula = serialize(ast);
      }
    }
    for (const node of Array.from(rangeNodes.values())) {
      const newRange = rangeTransform(node);
      if (newRange !== node.range) {
        rangeNodes.delete(getCellRangeKey(node.range));
        node.range = newRange;
        rangeNodes.set(getCellRangeKey(node.range), node);
        this.changedNodes.add(node);
      }
    }
  }

  insertRows(before: number, count = 1) {
    const { nodes } = this;
    if (nodes.length > before) {
      nodes.splice(before, 0, ...new Array(count));
    }
    this._transform(
      (node) => transformByInsertRows(node.address, node.ast, before, count),
      (node) => transformRangeByInsertRows(node.range, before, count),
    );
  }

  removeCellNode(address: CellAddress) {
    const node = this.getNode(address);
    if (!node) {
      return;
    }
    const row = this.nodes[address.row];
    if (row) {
      row[address.col] = undefined!;
    }
    this.formulaNodes.delete(getCellAddressKey(address));
    this.removeNode(node);
  }

  removeRangeNode(range: CellRange) {
    const key = getCellRangeKey(range);
    const rangeNode = this.rangeNodes.get(key);
    if (rangeNode) {
      this.removeNode(rangeNode);
    }
  }

  removeNode(node: DependencyNode) {
    const dependents = this.dependents.get(node);
    if (dependents?.size) {
      for (const d of dependents) {
        this.changedNodes.add(d);
      }
    }
    this.changedNodes.delete(node);
    this.removeEdge(node);
  }

  getNode(address: CellAddress): DependencyNode | undefined {
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

  getOrCreateCellNode(address: CellAddress) {
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

  swapOrSetNode(address: CellAddress, node: DependencyNode) {
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

    const { beforeValues } = this;

    if (oldNode) {
      if (beforeValues.has(oldNode)) {
        const v = beforeValues.get(oldNode)!;
        beforeValues.delete(oldNode);
        beforeValues.set(node, v);
      }

      if (!beforeValues.has(node)) {
        if (oldNode.type === 'value') {
          beforeValues.set(node, {
            address,
            value: transformEmptyValue(oldNode.value),
          });
        } else if (oldNode.type === 'formula') {
          this.beforeValues.set(node, {
            address,
            value: {
              type: 'formula',
              value: transformEmptyValue(oldNode.cachedValue),
              formula: oldNode.formula,
            },
          });
        }
      }
      this.changedNodes.delete(oldNode);
    }

    const current = beforeValues.get(node) || { address };
    current.address = address;
    beforeValues.set(node, current);

    this.changedNodes.add(node);
    return node;
  }
}
