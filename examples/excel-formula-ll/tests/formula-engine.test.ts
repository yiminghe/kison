import { utils, FormulaEngine, CellValue } from '../src/index';
import { makeString, makeNumber, makeFormula } from './utils';

const { parseCoord, toCoordString } = utils;

describe('excel-formula-engine', () => {
  let g: FormulaEngine = undefined!;

  beforeEach(() => {
    g = new FormulaEngine();

    // h-> g->f->d -> c -> b
    // f->h
    // k->f
    // e->c
    g.initWithValues([
      [
        makeNumber(1), // a1
        makeFormula('a1'), // b1
        makeFormula('b1+1'), // c1
        makeFormula('c1+1'), // d1
        makeFormula('c1+2'), // e1
        makeFormula('d1+h1'), // f1
        makeFormula('f1'), // g1
        makeFormula('g1'), // h1
        makeFormula('f1'), // i1
      ],
      [makeFormula('sum(a1:c1)')], //a2
    ]);
  });

  type Cell = { adr: string; value: CellValue };

  function getCellValues() {
    const ret: Cell[][] = [[], []];
    for (let col = 1; col <= 9; col++) {
      ret[0].push({
        adr: toCoordString({ row: 1, col }),
        value: g.getCellValue({ row: 1, col }),
      });
    }
    ret[1].push({
      value: g.getCellValue({ row: 2, col: 1 }),
      adr: toCoordString({ row: 2, col: 1 }),
    });
    return ret;
  }

  it('compute works', () => {
    expect(g.width).toBe(9);
    expect(g.height).toBe(2);

    const ret = getCellValues();

    expect(ret).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "adr": "A1",
            "value": Object {
              "type": "number",
              "value": 1,
            },
          },
          Object {
            "adr": "B1",
            "value": Object {
              "formula": "a1",
              "type": "formula",
              "value": Object {
                "type": "number",
                "value": 1,
              },
            },
          },
          Object {
            "adr": "C1",
            "value": Object {
              "formula": "b1+1",
              "type": "formula",
              "value": Object {
                "type": "number",
                "value": 2,
              },
            },
          },
          Object {
            "adr": "D1",
            "value": Object {
              "formula": "c1+1",
              "type": "formula",
              "value": Object {
                "type": "number",
                "value": 3,
              },
            },
          },
          Object {
            "adr": "E1",
            "value": Object {
              "formula": "c1+2",
              "type": "formula",
              "value": Object {
                "type": "number",
                "value": 4,
              },
            },
          },
          Object {
            "adr": "F1",
            "value": Object {
              "formula": "d1+h1",
              "type": "formula",
              "value": Object {
                "message": "",
                "type": "error",
                "value": "#CYCLE!",
              },
            },
          },
          Object {
            "adr": "G1",
            "value": Object {
              "formula": "f1",
              "type": "formula",
              "value": Object {
                "message": "",
                "type": "error",
                "value": "#CYCLE!",
              },
            },
          },
          Object {
            "adr": "H1",
            "value": Object {
              "formula": "g1",
              "type": "formula",
              "value": Object {
                "message": "",
                "type": "error",
                "value": "#CYCLE!",
              },
            },
          },
          Object {
            "adr": "I1",
            "value": Object {
              "formula": "f1",
              "type": "formula",
              "value": Object {
                "message": "",
                "type": "error",
                "value": "#CYCLE!",
              },
            },
          },
        ],
        Array [
          Object {
            "adr": "A2",
            "value": Object {
              "formula": "sum(a1:c1)",
              "type": "formula",
              "value": Object {
                "type": "number",
                "value": 4,
              },
            },
          },
        ],
      ]
    `);
  });

  it('recompute works', () => {
    g.setCellValue(parseCoord('c1'), makeNumber(10));

    const ret = getCellValues();

    expect(ret).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "adr": "A1",
            "value": Object {
              "type": "number",
              "value": 1,
            },
          },
          Object {
            "adr": "B1",
            "value": Object {
              "formula": "a1",
              "type": "formula",
              "value": Object {
                "type": "number",
                "value": 1,
              },
            },
          },
          Object {
            "adr": "C1",
            "value": Object {
              "type": "number",
              "value": 10,
            },
          },
          Object {
            "adr": "D1",
            "value": Object {
              "formula": "c1+1",
              "type": "formula",
              "value": Object {
                "type": "number",
                "value": 11,
              },
            },
          },
          Object {
            "adr": "E1",
            "value": Object {
              "formula": "c1+2",
              "type": "formula",
              "value": Object {
                "type": "number",
                "value": 12,
              },
            },
          },
          Object {
            "adr": "F1",
            "value": Object {
              "formula": "d1+h1",
              "type": "formula",
              "value": Object {
                "message": "",
                "type": "error",
                "value": "#CYCLE!",
              },
            },
          },
          Object {
            "adr": "G1",
            "value": Object {
              "formula": "f1",
              "type": "formula",
              "value": Object {
                "message": "",
                "type": "error",
                "value": "#CYCLE!",
              },
            },
          },
          Object {
            "adr": "H1",
            "value": Object {
              "formula": "g1",
              "type": "formula",
              "value": Object {
                "message": "",
                "type": "error",
                "value": "#CYCLE!",
              },
            },
          },
          Object {
            "adr": "I1",
            "value": Object {
              "formula": "f1",
              "type": "formula",
              "value": Object {
                "message": "",
                "type": "error",
                "value": "#CYCLE!",
              },
            },
          },
        ],
        Array [
          Object {
            "adr": "A2",
            "value": Object {
              "formula": "sum(a1:c1)",
              "type": "formula",
              "value": Object {
                "type": "number",
                "value": 12,
              },
            },
          },
        ],
      ]
    `);
  });
});
