import { Raw_Value } from './interpreter/types';
import { DependencyGraph } from './dependency-graph/DependencyGraph';

export class FormulaEngine {
  dependencyGraph: DependencyGraph = new DependencyGraph();

  initWithData(data: Raw_Value[][]) {
    const { dependencyGraph } = this;
    for (let row = 0; row < data.length; ++row) {
      const colData = data[row];
      if (colData) {
        for (let col = 0; col < colData.length; ++col) {
          dependencyGraph.setCell(row, col, colData[col]);
        }
      }
    }
  }
}
