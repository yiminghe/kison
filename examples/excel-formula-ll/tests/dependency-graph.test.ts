import {
  DependencyGraph,
  DependencyNode,
} from '../src/dependency-graph/DependencyGraph';
import { parseCoord, toCoordString } from '../src/utils';

function toNodeString(n: DependencyNode) {
  if (n.type === 'formula') {
    return toCoordString(n.address) + '=' + n.formula;
  } else {
    return n.type;
  }
}

describe('dependency graph', () => {
  it.only('sort works', () => {
    const g = new DependencyGraph();

    // h-> g->f->d -> c -> b
    // f->h
    // k->f
    // e->c
    g.setCell(parseCoord('c1'), '=b1');
    g.setCell(parseCoord('d1'), '=c1');
    g.setCell(parseCoord('e1'), '=c1');
    g.setCell(parseCoord('a1'), '1');
    g.setCell(parseCoord('b1'), '=a1');

    // debugger;
    g.setCell(parseCoord('f1'), '=d1+h1');
    g.setCell(parseCoord('g1'), '=f1');
    g.setCell(parseCoord('h1'), '=g1');
    g.setCell(parseCoord('k1'), '=f1');

    let ret = g.sort();
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
