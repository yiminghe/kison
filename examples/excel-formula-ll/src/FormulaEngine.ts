import { EMPTY_VALUE } from './common/constants';
import { Atom_Value_Type, RawCellAddress, Empty_Type } from './common/types';
import { DependencyGraph } from './dependency-graph/DependencyGraph';
import { evaluate } from './interpreter/index';
import { parse } from './parserApi';

type FormulaType = {
  type: 'formula';
  formula: string;
  value?: Atom_Value_Type;
};

type Options = {
  noCompute?: boolean;
};

export type CellValue =
  | Exclude<Atom_Value_Type, Empty_Type>
  | FormulaType
  | undefined;

export class FormulaEngine {
  dependencyGraph: DependencyGraph = new DependencyGraph();

  initWithValues(values: CellValue[][], options: Options = {}) {
    const { dependencyGraph } = this;
    dependencyGraph.beginTransaction();
    for (let row = 0; row < values.length; ++row) {
      const colData = values[row];
      if (colData) {
        for (let col = 0; col < colData.length; ++col) {
          const address = { row: row + 1, col: col + 1 };
          const cell = colData[col];
          this._setCell(address, cell);
        }
      }
    }
    if (options.noCompute) {
      dependencyGraph.stopTransaction();
    } else {
      dependencyGraph.endTransaction();
    }
  }

  private _setCell(address: RawCellAddress, cell: CellValue) {
    const { dependencyGraph } = this;
    if (cell) {
      if (cell.type === 'formula') {
        dependencyGraph.setFormulaCell(address, cell.formula, cell.value);
      } else {
        dependencyGraph.setCell(address, cell);
      }
    } else {
      dependencyGraph.setCell(address, EMPTY_VALUE);
    }
  }

  setCellValue(address: RawCellAddress, cell: CellValue) {
    const { dependencyGraph } = this;
    this._setCell(address, cell);
    dependencyGraph.flush();
  }

  get width() {
    return this.dependencyGraph.width;
  }

  get height() {
    return this.dependencyGraph.height;
  }

  getCellValue(address: RawCellAddress): CellValue {
    const { dependencyGraph } = this;
    const cellValue = dependencyGraph.getCellValue(address);
    if (cellValue.type === 'empty') {
      return undefined;
    }
    const cell = dependencyGraph.getNode(address);
    if (cell.type === 'formula') {
      return {
        type: 'formula',
        value: cellValue,
        formula: cell.formula,
      };
    }
    return cellValue;
  }

  evaluateFormula(formula: string) {
    const ret = parse(formula);
    if (ret.error) {
      throw ret.error;
    }
    return evaluate(ret.ast, {
      dependencyGraph: this.dependencyGraph,
    });
  }
}
