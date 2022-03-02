import {
  DependencyGraph,
  DependencyNode,
} from '../src/dependency-graph/DependencyGraph';
import { parseCoord, toCoordString } from '../src/utils';
import { makeString, makeNumber } from './utils';

function toNodeString(n: DependencyNode) {
  if (n.type === 'formula') {
    return toCoordString(n.address) + '=' + n.formula;
  } else {
    return JSON.stringify(n);
  }
}

describe('excel-formula-dependency graph', () => {
  it('sort works', () => {
    const g = new DependencyGraph();

    // h-> g->f->d -> c -> b
    // f->h
    // k->f
    // e->c
    g.setFormulaCell(parseCoord('c1'), '=b1');
    g.setFormulaCell(parseCoord('d1'), '=c1');
    g.setFormulaCell(parseCoord('e1'), '=c1');
    g.setCell(parseCoord('a1'), makeString('a'));
    g.setFormulaCell(parseCoord('b1'), '=a1');

    g.setFormulaCell(parseCoord('f1'), '=d1+h1');
    g.setFormulaCell(parseCoord('g1'), '=f1');
    g.setFormulaCell(parseCoord('h1'), '=g1');
    g.setFormulaCell(parseCoord('k1'), '=f1');

    let ret = g.sort(g.changedNodes);
    const ret2 = {
      scc: Array.from(ret.scc.values()).map(toNodeString),
      sorted: ret.sorted.map(toNodeString),
    };

    expect(ret2).toMatchInlineSnapshot(`
      Object {
        "scc": Array [
          "F1=d1+h1",
          "G1=f1",
          "H1=g1",
        ],
        "sorted": Array [
          "{\\"type\\":\\"value\\",\\"value\\":{\\"type\\":\\"string\\",\\"value\\":\\"a\\"}}",
          "B1=a1",
          "C1=b1",
          "E1=c1",
          "D1=c1",
          "K1=f1",
        ],
      }
    `);
  });
});

export {};
