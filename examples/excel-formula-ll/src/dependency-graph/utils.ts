import type { CellRange } from '../interpreter/types';
import type { DependencyGraph } from './DependencyGraph';

export function* getCellFromRange(range: CellRange, graph: DependencyGraph) {
  const start = range.start;
  const end = range.end!;
  const maxCol = Math.min(end.col, graph.width);
  const maxRow = Math.min(end.row, graph.height);
  for (let r = start.row; r <= maxRow; r++) {
    for (let c = start.col; c < maxCol; c++) {
      yield { row: r, col: c };
    }
  }
}
