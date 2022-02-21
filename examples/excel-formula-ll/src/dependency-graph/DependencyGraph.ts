import { makeString } from '../functions/utils';
import { collect } from './collectDeps';
import {
  Atom_Value_Type,
  Raw_Value,
  Ref_Type,
  CellAddress,
  RawCellAddress,
  Range,
} from '../interpreter/types';
import parser from '../parser';

class FormulaNode {
  type: 'formula' = 'formula';
  deps: Ref_Type[] = [];
  constructor(public value: string, public address: RawCellAddress) {
    const { ast } = parser.parse(value);
    collect(ast, {
      addDep: (dep) => {
        this.deps.push(dep);
      },
    });
  }
}

class ValueNode {
  type: 'value' = 'value';
  constructor(public value: Atom_Value_Type, public address: RawCellAddress) {}
}

class RangeNode {
  type: 'range' = 'range';
  constructor(public value: Range) {}
}

class EmptyNode {
  type: 'empty' = 'empty';
  constructor(public address: RawCellAddress) {}
}

type DependencyNode = ValueNode | RangeNode | FormulaNode;

function isFormula(text: string) {
  return text.startsWith('=');
}

function getAddressKey({ row, col }: RawCellAddress) {
  return `${row}_${col}`;
}
export class DependencyGraph {
  precedents: Map<DependencyNode, Set<DependencyNode>> = new Map();
  dependents: Map<DependencyNode, Set<DependencyNode>> = new Map();
  nodes: Map<string, DependencyNode> = new Map();

  setCell(row: number, col: number, data: Raw_Value) {
    const address = { row, col };
    const addressKey = getAddressKey(address);
    let node: DependencyNode | undefined = undefined;
    if (typeof data === 'string') {
      if (isFormula(data)) {
        node = new FormulaNode(data, address);
        for (const dep of node.deps) {
          // TODO edge
        }
      } else {
        node = new ValueNode(makeString(data), address);
      }
    } else {
    }
    if (node) {
      this.swapOrSetNode(address, node);
    }
  }

  swapOrSetNode(address: RawCellAddress, node: DependencyNode) {
    // TODO swap
    const addressKey = getAddressKey(address);
    this.nodes.set(addressKey, node);
  }
}
