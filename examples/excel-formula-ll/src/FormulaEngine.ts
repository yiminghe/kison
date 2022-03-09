import { EMPTY_VALUE } from './common/constants';
import { CellAddress, All_Value_Type, CellValue } from './common/types';
import { DependencyGraph } from './dependency-graph/DependencyGraph';
import { evaluateRoot } from './interpreter/index';
import { parse } from './parserApi';
import type { ChangedCell } from './dependency-graph/types';

export type FormulaEngineOptions = {
  noCompute?: boolean;
};

export type { CellValue, ChangedCell };

export class FormulaEngine {
  dependencyGraph: DependencyGraph = new DependencyGraph();

  initWithValues(values: CellValue[][], options: FormulaEngineOptions = {}) {
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
      return [];
    } else {
      return dependencyGraph.endTransaction();
    }
  }

  private _setCell(address: CellAddress, cell: CellValue) {
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

  setCellValue(address: CellAddress, cell: CellValue) {
    const { dependencyGraph } = this;
    this._setCell(address, cell);
    return dependencyGraph.flush();
  }

  get width() {
    return this.dependencyGraph.width;
  }

  get height() {
    return this.dependencyGraph.height;
  }

  getCellValue(address: CellAddress): CellValue {
    const { dependencyGraph } = this;
    const cellValue = dependencyGraph.getCellValue(address);
    if (cellValue.type === 'empty') {
      return undefined;
    }
    const cell = dependencyGraph.getNode(address);
    if (cell?.type === 'formula') {
      return {
        type: 'formula',
        value: cellValue,
        formula: cell.formula,
      };
    }
    return cellValue;
  }

  insertRows(before: number, count = 1) {
    const { dependencyGraph } = this;
    dependencyGraph.insertRows(before, count);
    return dependencyGraph.flush();
  }

  deleteRows(at: number, count = 1) {
    const { dependencyGraph } = this;
    dependencyGraph.deleteRows(at, count);
    return dependencyGraph.flush();
  }

  evaluateFormula(formula: string): All_Value_Type {
    const ret = parse(formula);
    if (ret.error) {
      throw ret.error;
    }
    return evaluateRoot(ret.ast, {
      dependencyGraph: this.dependencyGraph,
    });
  }
}
